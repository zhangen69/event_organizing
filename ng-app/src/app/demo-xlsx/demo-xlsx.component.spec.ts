import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoXlsxComponent } from './demo-xlsx.component';

describe('DemoXlsxComponent', () => {
  let component: DemoXlsxComponent;
  let fixture: ComponentFixture<DemoXlsxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoXlsxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoXlsxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
