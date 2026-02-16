import { FieldKey } from '@/features/form/types/field-key.type';

export type FieldOverride = Partial<{
  label: string;
  placeholder: string;
  required: boolean;
}>;

export type VariantField = FieldKey | { key: FieldKey; override: FieldOverride };

export type FormVariantModel = {
  title: string;
  submitLabel: string;
  layout?: 'oneColumn' | 'twoColumns';
  fields: VariantField[];
};

const overrideField = (key: FieldKey, override: FieldOverride): VariantField => ({ key, override });

export const FORM_VARIANTS = {
  HEALTH_RECORD_ADD: {
    title: 'Ajouter un animal',
    submitLabel: 'Ajouter',
    layout: 'oneColumn',
    fields: [
      'petName',
      'breed',
      'color',
      overrideField('currentWeight', { label: 'Poids (kg)' }),
      'identificationNumber',
      overrideField('tattoo', { label: 'Texte' }),
    ],
  },

  HEALTH_RECORD_EDIT: {
    title: 'Modifier les informations',
    submitLabel: 'Enregistrer',
    layout: 'oneColumn',
    fields: [
      'petName',
      'breed',
      'color',
      overrideField('currentWeight', { label: 'Poids (kg)' }),
      'identificationNumber',
      overrideField('tattoo', { label: 'Texte' }),
    ],
  },

  ALLERGY_EDIT: {
    title: 'Ajouter une allergie',
    submitLabel: 'Ajouter',
    layout: 'oneColumn',
    fields: [
      overrideField('allergy', { label: 'Allergie', placeholder: 'Ex : Saumon', required: true }),
    ],
  },


  DOCUMENT_ADD: {
    title: 'Ajouter un document',
    submitLabel: 'Ajouter',
    layout: 'oneColumn',
    fields: ['documentName', 'documentType', 'documentDate', 'documentFile'],
  },
} as const satisfies Record<string, FormVariantModel>;

export type FormVariantId = keyof typeof FORM_VARIANTS;
