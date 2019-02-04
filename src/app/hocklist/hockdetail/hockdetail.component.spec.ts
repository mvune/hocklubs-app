import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HockdetailComponent } from './hockdetail.component';

describe('HockdetailComponent', () => {
  let component: HockdetailComponent;
  let fixture: ComponentFixture<HockdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HockdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HockdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
