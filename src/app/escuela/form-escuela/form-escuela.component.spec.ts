import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEscuelaComponent } from './form-escuela.component';

describe('FormEscuelaComponent', () => {
  let component: FormEscuelaComponent;
  let fixture: ComponentFixture<FormEscuelaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEscuelaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEscuelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
