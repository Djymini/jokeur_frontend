export class FrequencyType {
  readonly types: { label: string; name: string }[] = [
    { label: 'Journalière', name: 'DAILY' },
    { label: 'Hebdomadaire', name: 'WEEKLY' },
    { label: 'Mensuelle', name: 'MONTHLY' },
    { label: 'Annuelle', name: 'ANNUAL' },
    { label: 'Prise unique', name: 'ONETIME' },
  ];
}
