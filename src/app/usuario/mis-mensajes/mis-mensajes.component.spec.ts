import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisMensajesComponent } from './mis-mensajes.component';

describe('MisMensajesComponent', () => {
  let component: MisMensajesComponent;
  let fixture: ComponentFixture<MisMensajesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisMensajesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisMensajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
