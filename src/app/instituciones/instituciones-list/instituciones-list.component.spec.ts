import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitucionesListComponent } from './instituciones-list.component';

describe('InstitucionesListComponent', () => {
  let component: InstitucionesListComponent;
  let fixture: ComponentFixture<InstitucionesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitucionesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitucionesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
