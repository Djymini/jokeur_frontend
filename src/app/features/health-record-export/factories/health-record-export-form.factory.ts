import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormDefinition } from '@/shared/models/forms/form-definition.model';
import { maxDateTodayValidator } from '@/shared/utils/forms/date-validators';

@Injectable({ providedIn: 'root' })
export class HealthRecordExportFormFactory {
  getDefinitions(): FormDefinition[] {
    return [this._createExportForm()];
  }

  private _createExportForm(): FormDefinition {
    return {
      id: 'health-record.export',
      title: 'Exporter la fiche santé',
      submitLabel: 'Télécharger',
      cancelLabel: 'Annuler',
      fields: [
        {
          key: 'format',
          label: 'Format',
          type: 'radio',
          radioOptions: [
            { value: 'PDF', label: 'PDF' },
            { value: 'XLSX', label: 'XSLX' },
          ],
          validators: [Validators.required],
        },
        {
          key: 'from',
          label: 'Du',
          type: 'date',
          validators: [Validators.required, maxDateTodayValidator()],
        },
        {
          key: 'to',
          label: 'Au',
          type: 'date',
          validators: [Validators.required, maxDateTodayValidator()],
        },
        {
          key: 'TEMPERATURE',
          label: 'Mesures',
          type: 'checkbox',
          checkboxLabel: 'Température',
        },
        {
          key: 'WEIGHT',
          label: 'Mesures',
          type: 'checkbox',
          checkboxLabel: 'Poids (mesures)',
        },
        {
          key: 'RESPIRATORY_RATE',
          label: 'Mesures',
          type: 'checkbox',
          checkboxLabel: 'Fréquence respiratoire',
        },
        {
          key: 'BPM',
          label: 'Mesures',
          type: 'checkbox',
          checkboxLabel: 'Fréquence cardiaque (BPM)',
        },
        {
          key: 'includeVaccines',
          label: 'Vaccins',
          type: 'checkbox',
          checkboxLabel: 'Inclure les vaccins',
        },
      ],
    };
  }
}
