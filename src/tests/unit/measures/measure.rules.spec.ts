import { MeasureModel } from '../../../app/features/measures/models/measureModel';
import { MeasureRules } from '../../../app/features/measures/domain/measure.rules';


describe('MeasureRules (unit tests)', () => {
  let measure: MeasureModel;

  beforeEach(() => {
    measure = {
      id: 1,
      value: 22,
      type: 'respiratory rate',
      creationDate: '2025-02-01',
      healthRecordNumber: 1001,
    };
  });

  it('should pass if type is good', () => {
    expect(() => MeasureRules.validateType(measure.type)).not.toThrow();
  });

  it('should throw error if type is wrong', () => {
    measure.type = 'respiratory';
    expect(() => MeasureRules.validateType(measure.type)).toThrow(Error);
  });
});
