import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasureResumeComponent } from './measure-resume.component';

describe('MeasureResumeComponent', () => {
  let component: MeasureResumeComponent;
  let fixture: ComponentFixture<MeasureResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasureResumeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasureResumeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
