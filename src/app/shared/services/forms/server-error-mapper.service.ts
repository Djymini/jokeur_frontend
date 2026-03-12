import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ServerErrorMapperService {
  private readonly messages: Record<string, { field: string; message: string }> = {
    TATTOO_ALREADY_USED: {
      field: 'tattooNumber',
      message: 'Ce numéro de tatouage est déjà utilisé.',
    },
    IDENTIFICATION_NUMBER_ALREADY_USED: {
      field: 'identificationNumber',
      message: "Ce numéro d'identification est déjà utilisé.",
    },
    FILE_TOO_LARGE: {
      field: 'photo',
      message: 'Le fichier est trop volumineux (maximum 2MB).',
    },
  };

  resolve(errorCode: string, fieldOverride?: string): { field: string; message: string } | null {
    const entry = this.messages[errorCode] ?? null;
    if (!entry) return null;
    return fieldOverride ? { ...entry, field: fieldOverride } : entry;
  }
}
