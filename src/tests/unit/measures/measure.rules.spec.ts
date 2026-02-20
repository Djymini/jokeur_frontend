import { MeasureModel } from '@/features/measures/models/measureModel';
import { MeasureRules } from '@/features/measures/domain/measure.rules';


describe('MeasureRules (unit tests)', () => {
  let measure: MeasureModel;

  beforeEach(() => {
    measure = {
      id: 1,
      value: 22,
      measureType: 'respiratory rate',
      creationDate: '2025-02-01',
      healthRecordId: 1001,
    };
  });

  it('should pass if type is good', () => {
    const valdate = MeasureRules.validateType(measure.measureType);
    expect(valdate).toBe(true);
  });

  it('should throw error if type is wrong', () => {
    measure.measureType = 'respiratory';
    const invalidate = MeasureRules.validateType(measure.measureType);
    expect(invalidate).toBe(false);
  });
});
