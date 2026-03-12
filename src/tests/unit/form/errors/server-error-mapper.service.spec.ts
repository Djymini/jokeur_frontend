import { ServerErrorMapperService } from '@/shared/services/forms/server-error-mapper.service';

describe('ServerErrorMapperService', () => {
  let service: ServerErrorMapperService;

  beforeEach(() => {
    service = new ServerErrorMapperService();
  });

  it('should resolve TATTOO_ALREADY_USED to tattooNumber field', () => {
    const result = service.resolve('TATTOO_ALREADY_USED');
    expect(result).toEqual({
      field: 'tattooNumber',
      message: 'Ce numéro de tatouage est déjà utilisé.',
    });
  });

  it('should resolve IDENTIFICATION_NUMBER_ALREADY_USED to identificationNumber field', () => {
    const result = service.resolve('IDENTIFICATION_NUMBER_ALREADY_USED');
    expect(result).toEqual({
      field: 'identificationNumber',
      message: "Ce numéro d'identification est déjà utilisé.",
    });
  });

  it('should return null for an unknown error code', () => {
    expect(service.resolve('UNKNOWN_ERROR')).toBeNull();
  });

  it('should return null for an empty string', () => {
    expect(service.resolve('')).toBeNull();
  });
});
