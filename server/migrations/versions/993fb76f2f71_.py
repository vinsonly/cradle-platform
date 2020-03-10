"""empty message

Revision ID: 993fb76f2f71
Revises: 767282df9ea8
Create Date: 2020-03-08 11:52:32.549846

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '993fb76f2f71'
down_revision = '767282df9ea8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('followup', sa.Column('frequency', sa.Text(), nullable=True))
    op.add_column('followup', sa.Column('instruction', sa.Text(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('followup', 'instruction')
    op.drop_column('followup', 'frequency')
    # ### end Alembic commands ###
