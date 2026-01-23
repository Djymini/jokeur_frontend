import { CounterService } from '../../app/features/counter.service';

describe('CounterService (unit)', () => {
  let service: CounterService;

  beforeEach(() => {
    service = new CounterService(); // 👈 instanciation directe
  });

  it('should start with 0', () => {
    expect(service.getCount()).toBe(0);
  });

  it('should increment the counter', () => {
    service.increment();
    service.increment();

    expect(service.getCount()).toBe(2);
  });
});
