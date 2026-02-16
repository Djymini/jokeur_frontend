export type FieldKey =
// health_record
  | 'petName'
  | 'breed'
  | 'sex'
  | 'birthDate'
  | 'currentWeight'
  | 'color'
  | 'identificationNumber'
  | 'tattoo'
  | 'allergy'
  | 'animalType'

  // food_plan
  | 'foodPlanFood'
  | 'foodPlanReason'
  | 'foodPlanObservation'
  | 'foodPlanStartDate'
  | 'foodPlanEndDate'

  // treatment
  | 'treatmentName'
  | 'treatmentObservation'
  | 'treatmentStartDate'
  | 'treatmentEndDate'

  // symptom
  | 'symptomObservation'
  | 'symptomStartDate'
  | 'symptomEndDate'

  // measure
  | 'measureValue'
  | 'measureType'
  | 'measureCreationDate'

  // appointment
  | 'appointmentReason'
  | 'appointmentDateTime'

  // document
  | 'documentName'
  | 'documentType'
  | 'documentDate'
  | 'documentFile';
