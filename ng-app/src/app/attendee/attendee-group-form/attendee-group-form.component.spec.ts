import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeeGroupFormComponent } from './attendee-group-form.component';

describe('AttendeeGroupFormComponent', () => {
  let component: AttendeeGroupFormComponent;
  let fixture: ComponentFixture<AttendeeGroupFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendeeGroupFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendeeGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
