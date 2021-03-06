#!/bin/bash

set -e

MYSQL_IMAGE="mysql:5.7"
DB_NETWORK="db_network"

function require-env-var {
  local name=$1
  if [[ -z ${!name} ]]; then
    echo "Error: $1 has not been defined, please check your environement variables"
    exit 1
  else
    echo "Found $1"
  fi
}

function container-id {
  docker container list --quiet --filter "name=$1"
}

function network-id {
  docker network list --quiet --filter "name=$1"
}

function volume-name {
  printf "mysql_%s_data" $DEPLOYMENT_MODE
}

function instance-already-running {
  [[ ! -z "$(container-id $CLIENT_CONTAINER_NAME)" ]] || \
  [[ ! -z "$(container-id $SERVER_CONTAINER_NAME)" ]]
}

echo "Checking environment variables..."
# System Variables
require-env-var "DEPLOYMENT_MODE"
require-env-var "CLIENT_CONTAINER_NAME"
require-env-var "SERVER_CONTAINER_NAME"
require-env-var "DB_CONTAINER_NAME"
require-env-var "MYSQL_ROOT_PASSWORD"
require-env-var "COMPOSE_FILE"

# Cradle Server Variables
require-env-var "DB_USERNAME"
require-env-var "DB_PASSWORD"
require-env-var "DB_HOSTNAME"
require-env-var "DB_PORT"
require-env-var "DB_NAME"
require-env-var "EMAIL_USER"
require-env-var "EMAIL_PASSWORD"
echo "Done!"
echo ""

echo "Begining deployment: $DEPLOYMENT_MODE"
echo ""

echo "Searching for database network..."
if [[ -z "$(network-id $DB_NETWORK)" ]]; then
  echo "Not found"

  echo "Creating database network..."
  docker network create $DB_NETWORK
  echo "Done!"
else
  echo "Found!"
fi
echo ""

echo "Searching for database instance..."
if [[ -z "$(container-id $DB_CONTAINER_NAME)" ]]; then
  echo "Not found"

  echo "Creating a new database instance..."
  docker run \
    --name $DB_CONTAINER_NAME \
    -e MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD \
    -e MYSQL_USER=$DB_USERNAME \
    -e MYSQL_PASSWORD=$DB_PASSWORD \
    -p "$DB_PORT:3306" \
    --mount "type=volume,src=$(volume-name),dst=/var/lib/mysql" \
    --network $DB_NETWORK \
    --detach \
    $MYSQL_IMAGE
  echo "Done!"

  echo "Waiting for database to startup..."
  sleep 10
  echo "Done!"

  echo "Adding MySQL user: $DB_USERNAME..."
  docker exec $DB_CONTAINER_NAME \
    mysql -u root -p$MYSQL_ROOT_PASSWORD \
    -e "CREATE USER IF NOT EXISTS '$DB_USERNAME'@'localhost' IDENTIFIED BY '$DB_PASSWORD';"

  docker exec $DB_CONTAINER_NAME \
    mysql -u root -p$MYSQL_ROOT_PASSWORD \
    -e "CREATE USER IF NOT EXISTS '$DB_USERNAME'@'%' IDENTIFIED BY '$DB_PASSWORD';"
  
  docker exec $DB_CONTAINER_NAME \
    mysql -u root -p$MYSQL_ROOT_PASSWORD \
    -e "GRANT ALL PRIVILEGES ON * . * TO '$DB_USERNAME'@'localhost';"

  docker exec $DB_CONTAINER_NAME \
    mysql -u root -p$MYSQL_ROOT_PASSWORD \
    -e "GRANT ALL PRIVILEGES ON * . * TO '$DB_USERNAME'@'%';"
  echo "Done!"

  echo "Creating $DB_NAME database..."
  docker exec $DB_CONTAINER_NAME \
    mysql -u $DB_USERNAME -p$DB_PASSWORD \
    -e "CREATE DATABASE $DB_NAME;"
  echo "Done!"
else
  echo "Found!"
fi
echo ""

echo "Searching for existing containers..."
if instance-already-running; then
  echo "Found"
  echo "Tearing down existing instances..."
  docker-compose --file $COMPOSE_FILE down --rmi local
  echo "Done!"
else
  echo "Not found, ready for a new deployment"
fi
echo ""

echo "Deploying..."
docker-compose --file $COMPOSE_FILE up --build --renew-anon-volumes --force-recreate --detach
echo "Done!"

echo "Finished deployment: $DEPLOYMENT_MODE!"
