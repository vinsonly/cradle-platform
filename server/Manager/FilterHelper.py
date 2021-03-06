from Manager.PatientFacilityManager import PatientFacilityManager
patientFacilityManager = PatientFacilityManager()
# todo: should probably refactor all of this into one function b/c there's some code reuse
# todo: when cleaning up code, can use search insted of manually finding
def filtered_list_hcw(patients, referrals, users, userId):
    print("Filtering list...")
    patient_id_list = []
    patient_filtered_list = []

    # need to look up userId in user table to find what health facility person is from
    # may need to add error check here depending on if front end is okay with catching them
    facilityName = ""
    for u in users:
        if u['id'] == userId:
            facilityName = u['healthFacilityName']
    
    # we can technically get rid of filtering via referrals alltogether
    # however curently our data seeding file does not use apis to add patients so that relationship is never entered into the patient_facility table
    # so leaving this referral filter here for now, but can remove it in production as all patient creation will happen via APIs
    # getting patient Ids for all patients referred to the clinic in question
    for r in referrals:
        if r['referralHealthFacilityName'] == facilityName:  
            if(r['patientId'] not in patient_id_list):
                patient_id_list.append(r['patientId'])
      
    # finding patients that have relationship to facility that current user is from
    args = {
    "healthFacilityName": facilityName}
    patients_created_at_facility = patientFacilityManager.search(args)
    
    # adding those patients to filtered list
    for p in patients_created_at_facility:
        if(p['patientId'] not in patient_id_list):
            patient_id_list.append(p['patientId'])
        
    # getting all patient rows based on patientIds collected
    for patient in patients:
        if patient['patientId'] in patient_id_list:
            patient_filtered_list.append(patient) 

    # now we have a filtered list
    return patient_filtered_list


def filtered_list_vht(patients, readings, userId):
    print("Filtering list...")
    patient_id_list = []
    patient_filtered_list = []

    # getting patient Ids for all patients this VHT has taken readings for
    for r in readings:
        if r['userId'] == userId:  
            if(r['patientId'] not in patient_id_list):
                patient_id_list.append(r['patientId'])
        
    # getting all patient rows based on patientIds collected in last table
    for p in patients:
        if p['patientId'] in patient_id_list:
            patient_filtered_list.append(p)   

    # now we have a filtered list
    return patient_filtered_list


def filtered_list_cho(patients, readings, vhtList, userId):
    print("Filtering list...")
    patient_id_list = []
    patient_filtered_list = []

    # adding cho user id to VHT list because we need the patients CHO sees as well 
    vhtList.append(userId)

    for v in vhtList:
        patient_filtered_list.extend(filtered_list_vht(patients, readings, v))

    return patient_filtered_list








