import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComPanoramaComponent } from './com-panorama.component';

describe('ComPanoramaComponent', () => {
  let component: ComPanoramaComponent;
  let fixture: ComponentFixture<ComPanoramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComPanoramaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComPanoramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
