import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProgramaComponent } from './form-programa.component';

describe('FormProgramaComponent', () => {
  let component: FormProgramaComponent;
  let fixture: ComponentFixture<FormProgramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormProgramaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
