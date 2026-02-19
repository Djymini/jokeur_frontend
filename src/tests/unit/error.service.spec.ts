import { ErrorService } from '../../app/core/services/error.service'

describe('ErrorService (unit tests)', () => {
  it('should start with null error', () => {
    // Arrange
    const service = new ErrorService();

    // Act + Assert
    expect(service.error()).toBeNull();
  });

  it('should set error message when notify is called', () => {
    // Arrange
    const service = new ErrorService();

    // Act
    service.notify('Oups');

    // Assert
    expect(service.error()).toBe('Oups');
  });
});
