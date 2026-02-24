import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ServerErrorMapperService {
  private readonly messages: Record<string, { field: string; message: string }> = {
    TATTOO_ALREADY_USED: {
      field: 'tattooNumber',
      message: 'Ce numéro de tatouage est déjà utilisé.',
    },
    OWNER_EMAIL_ALREADY_USED: {
      field: 'email',
      message: 'Cette adresse email est déjà utilisée.',
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
