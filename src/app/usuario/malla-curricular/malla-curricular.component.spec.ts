import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MallaCurricularComponent } from './malla-curricular.component';

describe('MallaCurricularComponent', () => {
  let component: MallaCurricularComponent;
  let fixture: ComponentFixture<MallaCurricularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MallaCurricularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MallaCurricularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
