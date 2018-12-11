import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaRegistrarComponent } from './mapa-registrar.component';

describe('MapaRegistrarComponent', () => {
  let component: MapaRegistrarComponent;
  let fixture: ComponentFixture<MapaRegistrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaRegistrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
