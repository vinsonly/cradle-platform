import { requestActionCreator } from './api';
import { Endpoint, Method } from '../api/constants';


export const GET_PATIENTS = 'patients/GET_PATIENTS'
export const GET_PATIENTS_REQUESTED = 'patient/GET_PATIENTS_REQUESTED'
export const GET_PATIENTS_ERR = 'patient/GET_PATIENTS_ERR'

export const UPDATE_PATIENT = 'patient/UPDATE_PATIENT'
export const UPDATE_PATIENT_REQUESTED  = 'patients/UPDATE_PATIENTS_REQUESTED'
export const UPDATE_PATIENT_ERR = 'patients/UPDATE_PATIENT_ERR'

export const getPatients = () => {
    return requestActionCreator(
        Endpoint.PATIENTS_ALLINFO,
        Method.GET,
        null,
        getPatientsOnSuccess,
        getPatientsOnError
    )
}

export const updatePatient = (patientId, data) => {
    return requestActionCreator(
        Endpoint.PATIENT + '/' + patientId,
        Method.PUT,
        data,
        updatePatientOnSuccess,
        updatePatientOnError
    )
}

const updatePatientOnSuccess = response => ({
    type: UPDATE_PATIENT,
    payload: response
})

const updatePatientOnError = error => ({
    type: UPDATE_PATIENT_ERR,
    payload: error
})

export const getPatientsRequested = () => ({
    type: GET_PATIENTS_REQUESTED
})

const getPatientsOnSuccess = response => ({
    type: GET_PATIENTS,
    payload: response
})

const getPatientsOnError = error => ({
    type: GET_PATIENTS_ERR,
    payload: error
})