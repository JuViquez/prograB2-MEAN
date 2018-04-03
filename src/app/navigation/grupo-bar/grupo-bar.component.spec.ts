import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoBarComponent } from './grupo-bar.component';

describe('GrupoBarComponent', () => {
  let component: GrupoBarComponent;
  let fixture: ComponentFixture<GrupoBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
