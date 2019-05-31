import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeeGroupListComponent } from './attendee-group-list.component';

describe('AttendeeGroupListComponent', () => {
  let component: AttendeeGroupListComponent;
  let fixture: ComponentFixture<AttendeeGroupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendeeGroupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendeeGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
