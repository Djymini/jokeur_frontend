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
  };

  resolve(errorCode: string): { field: string; message: string } | null {
    return this.messages[errorCode] ?? null;
  }
}
