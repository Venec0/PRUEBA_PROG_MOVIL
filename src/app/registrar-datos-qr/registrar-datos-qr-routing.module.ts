import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarDatosQRPage } from './registrar-datos-qr.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarDatosQRPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarDatosQRPageRoutingModule {}
