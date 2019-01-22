import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HockmapPage } from './hockmap.page';

describe('HockmapPage', () => {
  let component: HockmapPage;
  let fixture: ComponentFixture<HockmapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HockmapPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HockmapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
