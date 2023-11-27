import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarDatosQRPageRoutingModule } from './registrar-datos-qr-routing.module';

import { RegistrarDatosQRPage } from './registrar-datos-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarDatosQRPageRoutingModule
  ],
  declarations: [RegistrarDatosQRPage]
})
export class RegistrarDatosQRPageModule {}
