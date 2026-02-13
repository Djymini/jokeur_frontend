import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormDefinition } from '@/shared/models/forms/form-definition.model';

@Injectable({ providedIn: 'root' })
export class AnimalFormFactory {
  getDefinitions(): FormDefinition[] {
    return [
      this._createAnimalCreateForm(),
      this._createAnimalEditForm()
    ];
  }

  private _createAnimalCreateForm(): FormDefinition {
    return {
      id: 'animal.create',
      title: 'Ajouter un animal',
      submitLabel: 'Ajouter',
      cancelLabel: 'Annuler',
      fields: this.createAnimalFields()
    };
  }

  private _createAnimalEditForm(): FormDefinition {
    return {
      id: 'animal.edit',
      title: 'Modifier les informations',
      submitLabel: 'Modifier',
      cancelLabel: 'Annuler',
      fields: this.createAnimalFields()
    };
  }

  private _createAnimalFields(): FormDefinition['fields'] {
    return [
      {
        key: 'petName',
        label: 'Nom',
        type: 'text',
        placeholder: 'Rex',
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        key: 'animalType',
        label: "Type d'animal",
        type: 'select',
        validators: [Validators.required],
        selectSource: { kind: 'metadata', key: 'animalTypes' }
      },
      {
        key: 'breed',
        label: 'Race',
        type: 'select',
        validators: [Validators.required, Validators.maxLength(50)],
        selectSource: { kind: 'metadataBy', key: 'breedsByAnimalType', dependsOn: 'animalType' }
      },
      {
        key: 'sex',
        label: 'Sexe',
        type: 'select',
        validators: [Validators.required],
        selectSource: { kind: 'metadata', key: 'sexes' }
      },
      {
        key: 'birthDate',
        label: 'Date de naissance',
        type: 'date'
      },
      {
        key: 'currentWeight',
        label: 'Poids (kg)',
        type: 'number',
        placeholder: '9.99',
        inputMode: 'decimal',
        validators: [Validators.required, Validators.min(0.01), Validators.max(99.99)]
      },
      {
        key: 'color',
        label: 'Couleur',
        type: 'select',
        validators: [Validators.required, Validators.maxLength(50)],
        selectSource: { kind: 'metadata', key: 'colors' }
      },
      {
        key: 'identificationNumber',
        label: "N° d'identification",
        type: 'text',
        placeholder: 'FR250268500123456',
        validators: [Validators.maxLength(20)]
      },
      {
        key: 'tattooNumber',
        label: 'Tatouage',
        type: 'text',
        placeholder: 'ABC123',
        validators: [Validators.maxLength(50)]
      },
      {
        key: 'allergy',
        label: 'Allergie',
        type: 'text',
        placeholder: 'Ex : Saumon',
        validators: [Validators.maxLength(100)]
      },
    ];
  }
}
