import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HockdetailPage } from './hockdetail.page';

describe('HockdetailPage', () => {
  let component: HockdetailPage;
  let fixture: ComponentFixture<HockdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HockdetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HockdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
