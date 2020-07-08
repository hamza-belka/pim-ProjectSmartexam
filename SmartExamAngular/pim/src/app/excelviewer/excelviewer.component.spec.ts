import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelviewerComponent } from './excelviewer.component';

describe('ExcelviewerComponent', () => {
  let component: ExcelviewerComponent;
  let fixture: ComponentFixture<ExcelviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelviewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
