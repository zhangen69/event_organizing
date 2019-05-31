import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventProcessFormComponent } from './event-process-form.component';

describe('EventProcessFormComponent', () => {
  let component: EventProcessFormComponent;
  let fixture: ComponentFixture<EventProcessFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventProcessFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventProcessFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
