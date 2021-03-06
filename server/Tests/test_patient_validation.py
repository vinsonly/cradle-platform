from Validation import PatientValidation

patient_request_body = {
    "patientId": "51253242033",
    "patientName": "BF",
    "patientAge": 49,
    "gestationalAgeUnit": "GESTATIONAL_AGE_UNITS_WEEKS",
    "gestationalAgeValue": "45",
    "villageNumber": "1251515",
    "patientSex": "FEMALE",
    "isPregnant": "true",
    "block": "15",
    "medicalHistory": "pre-diabetic",
    "drugHistory": "",
}

patient_request_body_missing_fields = {
    "patientAge": 49,
    "gestationalAgeUnit": "GESTATIONAL_AGE_UNITS_WEEKS",
    "gestationalAgeValue": "45",
    "villageNumber": "1251515",
    "patientSex": "FEMALE",
    "isPregnant": "true",
}

reading_request_body = {
    "readingId": "asdasd8231280222223",
    "dateTimeTaken": 2344658,
    "userId": "1",
    "bpSystolic": 20,
    "bpDiastolic": 30,
    "heartRateBPM": 10,
    "dateRecheckVitalsNeeded": "2019-09-25T19:15:38.032-07:00[America/Vancouver]",
    "isFlaggedForFollowup": False,
    "symptoms": "Headache,Blurred vision,Bleeding,sleepy",
}

reading_request_body_missing_fields = {
    "dateTimeTaken": 2344658,
    "userId": "1",
    "bpSystolic": 20,
    "heartRateBPM": 10,
    "dateRecheckVitalsNeeded": "2019-09-25T19:15:38.032-07:00[America/Vancouver]",
    "isFlaggedForFollowup": False,
    "symptoms": "Headache,Blurred vision,Bleeding,sleepy",
}


def test_check_if_required_keys_present_with_all_keys():
    required_keys = {"patientName", "villageNumber", "patientSex"}
    valid = PatientValidation.check_if_required_keys_present(
        patient_request_body, required_keys
    )
    assert valid is None


def test_check_if_required_keys_present_with_missing_keys():
    required_keys = {"patientName", "villageNumber", "patientSex", "dob"}
    invalid_code = PatientValidation.check_if_required_keys_present(
        patient_request_body, required_keys
    )
    # invalid_code should return as a tuple that looks like:
    # ({'HTTP 400': 'The request body key {dob} is required.'}, 400)
    assert invalid_code[0]["HTTP 400"] is not None
    assert invalid_code[1] == 400


def test_check_if_values_string_or_int_succeeds_with_int():
    must_be_int = {"patientAge", "villageNumber", "gestationalAgeValue"}
    result = PatientValidation.check_if_values_string_or_int(
        patient_request_body, None, must_be_int
    )
    assert result is None


def test_check_if_values_string_or_int_succeeds_with_string_and_int():
    must_be_string = {
        "patientName",
        "gestationalAgeUnit",
        "medicalHistory",
        "drugHistory",
    }

    must_be_int = {"patientAge", "villageNumber", "gestationalAgeValue"}
    result = PatientValidation.check_if_values_string_or_int(
        patient_request_body, must_be_string, must_be_int
    )
    assert result is None


def test_check_patient_fields_succeeds():
    result = PatientValidation.check_patient_fields(patient_request_body)
    assert result is None


def test_check_patient_fields_fails():
    result = PatientValidation.check_patient_fields(patient_request_body_missing_fields)
    assert result[1] == 400


def test_check_reading_fields_succeeds():
    result = PatientValidation.check_reading_fields(reading_request_body)
    assert result is None


def test_check_reading_fields_fails():
    result = PatientValidation.check_reading_fields(reading_request_body_missing_fields)
    assert result[1] == 400


def test_update_info_invalid_succeeds():
    patient_id = 45464
    result = PatientValidation.update_info_invalid(patient_id, patient_request_body)
    assert result is None


def test_update_info_invalid_succeeds():
    patient_id = 45464
    result = PatientValidation.update_info_invalid(
        patient_id, patient_request_body_missing_fields
    )
    assert result[1] == 400
