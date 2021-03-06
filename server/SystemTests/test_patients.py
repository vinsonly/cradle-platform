import pytest
import requests
import json
import random
import string
import uuid
from datetime import datetime
from manage import getRandomInitials


def get_login_token():
    url = "http://localhost:5000/api/user/auth"
    payload = {"email": "admin123@admin.com", "password": "admin123"}

    response = requests.post(url, json=payload)
    resp_json = response.json()
    return resp_json["token"]


def get_bearer_token():
    return "Bearer {}".format(get_login_token())


def get_authorization_header():
    auth = {"Authorization": get_bearer_token()}
    return auth


base_url = "http://localhost:5000"


def getRandomPatientId():
    return str(random.randint(48300000000, 48300099999))


def getRandomGender():
    GENDER_LIST = ["MALE", "FEMALE"]
    return GENDER_LIST[random.randint(0, 1)]


def getRanomdUUID():
    return str(uuid.uuid4())


def getRandomUserId():
    return random.randint(1, 4)


def getGreenTrafficLight():
    systolic = 126
    diastolic = 75
    hr = 84
    return {"bpSystolic": systolic, "bpDiastolic": diastolic, "hr": hr}


def getYellowUpTrafficLight():
    systolic = 141
    diastolic = 83
    hr = 50
    return {"bpSystolic": systolic, "bpDiastolic": diastolic, "hr": hr}


def getRedUpTrafficLight():
    systolic = 112
    diastolic = 130
    hr = 99
    return {"bpSystolic": systolic, "bpDiastolic": diastolic, "hr": hr}


def getRandomSymtoms():
    symptoms = ["headache", "body pain", "feverish", "bleeding"]
    return symptoms[random.randint(0, 3)]


auth_header = get_authorization_header()
##############################################################
#                     SUCCESS CODE 201 TESTS                 #
##############################################################
def test_pass_create_patient():
    patientId = getRandomPatientId()
    patientName = getRandomInitials()
    patientSex = "FEMALE"

    url = base_url + "/api/patient"

    data = {
        "patientId": patientId,
        "patientName": patientName,
        "patientSex": patientSex,
    }

    response = requests.post(url, json=data, headers=auth_header)
    response_body = response.json()

    assert response.status_code == 201
    assert response_body["patientId"] == patientId
    assert response_body["patientName"] == patientName
    assert response_body["patientSex"] == patientSex


def test_pass_create_patient2():
    patientId = getRandomPatientId()
    patientName = getRandomInitials()
    patientSex = "MALE"

    url = base_url + "/api/patient"

    data = {
        "patientId": patientId,
        "patientName": patientName,
        "patientSex": patientSex,
    }

    response = requests.post(url, json=data, headers=auth_header)
    response_body = json.loads(response.text)

    assert response.status_code == 201
    assert response_body["patientId"] == patientId
    assert response_body["patientName"] == patientName
    assert response_body["patientSex"] == patientSex


def test_pass_create_patient_reading():
    patientId = getRandomPatientId()
    patientName = getRandomInitials()
    patientSex = getRandomGender()
    readingId = getRanomdUUID()

    vitals = getGreenTrafficLight()
    bpSystolic = vitals["bpSystolic"]
    bpDiastolic = vitals["bpDiastolic"]
    hr = vitals["hr"]
    dateTimeTaken = int((datetime.now() - datetime(1970, 1, 1)).total_seconds())
    userId = getRandomUserId()

    url = base_url + "/api/patient/reading"

    patient = {
        "patientId": patientId,
        "patientName": patientName,
        "patientSex": patientSex,
    }

    reading = {
        "readingId": readingId,
        "bpSystolic": bpSystolic,
        "bpDiastolic": bpDiastolic,
        "heartRateBPM": hr,
        "dateTimeTaken": dateTimeTaken,
        "userId": userId,
        "isFlaggedForFollowup": "false",
        "symptoms": "heache",
    }
    data = {"patient": patient, "reading": reading}

    response = requests.post(url, json=data, headers=auth_header)
    response_body = json.loads(response.text)

    assert response.status_code == 201
    assert response_body["patient"]["patientId"] == patientId
    assert response_body["patient"]["patientName"] == patientName
    assert response_body["patient"]["patientSex"] == patientSex
    assert response_body["reading"]["bpSystolic"] == bpSystolic
    assert response_body["reading"]["bpDiastolic"] == bpDiastolic
    assert response_body["reading"]["heartRateBPM"] == hr


def test_get_patient():

    # hardcoded id 204652 based on deterministic patient data seeded in test database
    url = base_url + "/api/patient/204652"
    response = requests.get(url, headers=auth_header)
    response_body = response.json()

    # testing the 3 required fields of a patient
    assert response_body["patientId"] == "204652"
    assert response_body["patientName"] == "BB"
    assert response_body["patientSex"] == "FEMALE"
    assert response.status_code == 200


# ##############################################################
#                      ERROR CODE 400 TESTS                    #
# ##############################################################


def test_fail_create_patient_reading():
    # should fail because missing some reading information
    patientId = getRandomPatientId()
    patientName = getRandomInitials()
    patientSex = getRandomGender()
    readingId = getRanomdUUID()

    url = base_url + "/api/patient/reading"

    patient = {
        "patientId": patientId,
        "patientName": patientName,
        "patientSex": patientSex,
    }

    reading = {
        "readingId": readingId,
    }
    data = {"patient": patient, "reading": reading}

    response = requests.post(url, json=data, headers=auth_header)
    assert response.status_code == 400


def test_fail_create_patient_duplicate():
    # should fail because we are creating a duplicate patient

    patientId = getRandomPatientId()
    patientName = getRandomInitials()
    patientSex = "MALE"

    url = base_url + "/api/patient"

    data = {
        "patientId": patientId,
        "patientName": patientName,
        "patientSex": patientSex,
    }

    response = requests.post(url, json=data, headers=auth_header)
    response = requests.post(url, json=data, headers=auth_header)

    assert response.status_code == 400


def test_fail_create_patient_missing_fields():
    # should fail because we are missing patientName

    patientId = getRandomPatientId()
    patientSex = "FEMALE"

    url = base_url + "/api/patient"

    data = {"patientId": patientId, "patientSex": patientSex}

    response = requests.post(url, json=data, headers=auth_header)
    assert response.status_code == 400
