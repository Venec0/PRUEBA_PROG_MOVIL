import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarDatosQRPage } from './registrar-datos-qr.page';

describe('RegistrarDatosQRPage', () => {
  let component: RegistrarDatosQRPage;
  let fixture: ComponentFixture<RegistrarDatosQRPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistrarDatosQRPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
