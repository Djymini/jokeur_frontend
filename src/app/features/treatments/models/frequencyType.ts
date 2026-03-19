export class FrequencyType {
  readonly types: { label: string; name: string }[] = [
    { label: 'Journalier', name: 'DAILY' },
    { label: 'Hebdomadaire', name: 'WEEKLY' },
    { label: 'Mensuel', name: 'MONTHLY' },
    { label: 'Annuel', name: 'ANNUAL' },
    { label: 'Prise unique', name: 'ONETIME' },
  ];
}
