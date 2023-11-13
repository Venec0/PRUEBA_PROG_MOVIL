import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent  implements OnInit {

  camera: string | undefined;

  onScanSuccess(result: string): void {
    console.log('Código QR escaneado:', result);
    // Aquí puedes manejar el resultado del escaneo, como enviarlo a un servicio o mostrarlo en la interfaz de usuario.
  }

  constructor() { }

  ngOnInit() {}

}
