import { TestBed } from '@angular/core/testing';
import { CounterService } from '@/features/counter.service';

describe('CounterService (integration)', () => {
  let service: CounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CounterService],
    });

    service = TestBed.inject(CounterService);
  });

  it('should be created via Angular injector', () => {
    expect(service).toBeTruthy();
  });

  it('should increment using Angular-managed instance', () => {
    service.increment();

    expect(service.getCount()).toBe(1);
  });
});
