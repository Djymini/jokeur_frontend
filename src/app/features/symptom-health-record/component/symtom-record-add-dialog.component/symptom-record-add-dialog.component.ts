import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SymptomStore } from '@/features/symptom/services/symptom.store';
import { SymptomFacade } from '@/features/symptom/services/symptom.facade';

@Component({
  selector: 'app-symtom-add-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './symptom-record-add-dialog.component.html',
  styleUrl: './symptom-record-add-dialog.component.scss',
})
export class SymptomRecordAddDialogComponent {
  private _symptomStore: SymptomStore = inject(SymptomStore);
  private _symptomFacade: SymptomFacade = inject(SymptomFacade);

  symptomArray = this._symptomStore.symptomArray;

  form = new FormGroup({
    symptomId: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    observation: new FormControl<string>('', { nonNullable: true }),
    observationDate: new FormControl<string>(new Date().toISOString().split('T')[0], {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
}
