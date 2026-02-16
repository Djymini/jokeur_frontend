import { Injectable } from '@angular/core';

import { FORM_VARIANTS, FormVariantId, VariantField } from './form-variants';
import { FormModalConfig } from '../models/form-config.model';
import { FormField } from '../models/form-field.model';

import * as fieldCatalogModule from './field-catalog';

type FieldCatalog = Record<string, FormField>;

@Injectable({ providedIn: 'root' })
export class FormConfigFactory {
  create(variantId: FormVariantId): FormModalConfig {
    const variantConfig = FORM_VARIANTS[variantId];

    const fieldCatalog = this._getFieldCatalog();

    return {
      title: variantConfig.title,
      submitLabel: variantConfig.submitLabel,
      cancelLabel: 'Annuler',
      layout: variantConfig.layout ?? 'oneColumn',
      fields: variantConfig.fields.map((fieldRef) => this._buildField(fieldRef, fieldCatalog)),
    };
  }

  private _buildField(fieldRef: VariantField, fieldCatalog: FieldCatalog): FormField {
    if (typeof fieldRef === 'string') {
      return this._getFieldOrThrow(fieldCatalog, fieldRef);
    }

    const baseField = this._getFieldOrThrow(fieldCatalog, fieldRef.key);
    return { ...baseField, ...fieldRef.override };
  }

  private _getFieldCatalog(): FieldCatalog {
    const catalog =
      (fieldCatalogModule as any).FIELD_CATALOG ??
      (fieldCatalogModule as any).FIELD_DEFINITIONS ??
      (fieldCatalogModule as any).FIELDS ??
      (fieldCatalogModule as any).default;

    if (!catalog) {
      throw new Error(
        `Field catalog not found in "./field-catalog". Export one of: FIELD_CATALOG, FIELD_DEFINITIONS, FIELDS, or default export.`
      );
    }

    return catalog as FieldCatalog;
  }

  private _getFieldOrThrow(fieldCatalog: FieldCatalog, key: string): FormField {
    const field = fieldCatalog[key];
    if (!field) {
      throw new Error(`Unknown field key "${key}" (missing from field-catalog).`);
    }
    return field;
  }
}
