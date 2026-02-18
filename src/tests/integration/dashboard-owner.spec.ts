import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { OwnerComponent } from '@/features/dashboard/owner.component/owner.component';
import { AppointmentApiService } from '@/features/appointment/services/appointment.api.service';
import { HealthRecordApi } from '@/features/health-records/services/health-record.api';

describe('OwnerComponent', () => {
  let component: OwnerComponent;
  let fixture: ComponentFixture<OwnerComponent>;

  let mockAppointmentApi: any;
  let mockHealthRecordApi: any;
  let mockActivatedRoute: any;

  // 1. Arrange
  beforeEach(async () => {

    mockAppointmentApi = {
      getAppointments: jest.fn().mockResolvedValue([
        { id: 1, reason: 'Checkup', dateTime: new Date() }
      ])
    };

    mockHealthRecordApi = {
      getAnimalInformation: jest.fn().mockResolvedValue([
        {
          id: 1,
          petName: 'Jokeur',
          AnimalType: 'DOG',
          image: 'base64image',
          imageType: 'image/png'
        }
      ])
    };

    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jest.fn().mockReturnValue('1')
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [OwnerComponent],
      providers: [
        { provide: AppointmentApiService, useValue: mockAppointmentApi },
        { provide: HealthRecordApi, useValue: mockHealthRecordApi },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    // 2. Act
    fixture = TestBed.createComponent(OwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // 3. Assert
  it('should create component', () => {

    expect(component).toBeTruthy();
  });

});
