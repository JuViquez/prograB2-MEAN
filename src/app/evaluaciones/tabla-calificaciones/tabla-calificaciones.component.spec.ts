import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaCalificacionesComponent } from './tabla-calificaciones.component';

describe('TablaCalificacionesComponent', () => {
  let component: TablaCalificacionesComponent;
  let fixture: ComponentFixture<TablaCalificacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaCalificacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaCalificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
