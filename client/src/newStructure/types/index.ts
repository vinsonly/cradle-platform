import {
  SexEnum,
  TrafficLightEnum,
  GestationalAgeUnitEnum,
  RoleEnum
} from '../enums';

export type Callback<T, U = void> = (args: T) => U;

export type OrNull<T> = T | null;

export type OrUndefined<T> = T | undefined;

export type Reading = {
  appVersion: OrNull<string>;
  bpDiastolic: number;
  bpSystolic: number;
  dateLastSaved: OrNull<number>;
  dateRecheckVitalsNeeded: OrNull<number>;
  dateTimeTaken: OrNull<number>;
  dateUploadedToServer: OrNull<number>;
  deviceInfo: OrNull<string>;
  gpsLocationOfReading: OrNull<string>;
  heartRateBPM: number;
  isFlaggedForFollowup: OrNull<boolean>;
  manuallyChangeOcrResults: OrNull<number>;
  patient: string;
  patientId: string;
  readingId: string;
  referral: OrNull<string>;
  retestOfPreviousReadingIds: OrNull<string>;
  symptoms: string;
  temporaryFlags: OrNull<number>;
  totalOcrSeconds: OrNull<number>;
  trafficLightStatus: TrafficLightEnum;
  userHasSelectedNoSymptoms: boolean;
  urineTest: string;
  urineTests: OrNull<string>;
  comment?: string;
  dateReferred?: number;
};

export type PatientTableData = {
  id: number;
};

export type Patient = {
  dob: OrNull<number>;
  drugHistory: OrNull<string>;
  gestationalAgeUnit: GestationalAgeUnitEnum;
  gestationalAgeValue: string;
  isPregnant: boolean;
  medicalHistory: OrNull<string>;
  needsAssessment: boolean;
  patientAge: number;
  patientId: string;
  patientName: string;
  patientSex: SexEnum;
  villageNumber: string;
  readings: Array<Reading>;
  tableData: PatientTableData;
  zone: OrNull<string>;
};

export type User = {
  email: string;
  firstName: string;
  healthFacilityName: string;
  isLoggedIn: boolean;
  roles: Array<RoleEnum>;
  userId: number;
  vhtList: Array<string>;
};

export type VHTS = {
  id: number;
  email: string;
};

export type CheckedItems = {
  none: boolean;
  headache: boolean;
  bleeding: boolean;
  blurredVision: boolean;
  feverish: boolean;
  abdominalPain: boolean;
  unwell: boolean;
  other: boolean;
  otherSymptoms: string;
};
