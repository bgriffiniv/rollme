import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolodexPage } from './rolodex.page';

describe('RolodexPage', () => {
  let component: RolodexPage;
  let fixture: ComponentFixture<RolodexPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolodexPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolodexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
