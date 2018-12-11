import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanoramaPage } from './panorama.page';

describe('PanoramaPage', () => {
  let component: PanoramaPage;
  let fixture: ComponentFixture<PanoramaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanoramaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanoramaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
