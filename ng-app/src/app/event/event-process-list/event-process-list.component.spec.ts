import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventProcessListComponent } from './event-process-list.component';

describe('EventProcessListComponent', () => {
  let component: EventProcessListComponent;
  let fixture: ComponentFixture<EventProcessListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventProcessListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventProcessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
