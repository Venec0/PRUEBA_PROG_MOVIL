import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from 'capacitor-barcode-scanner';

@Component({
  selector: 'app-qrscanner',
  templateUrl: './qrscanner.page.html',
  styleUrls: ['./qrscanner.page.scss'],
})
export class QrscannerPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  async scanner(){
    var resultadoQr = (await BarcodeScanner.scan()).code;

    if (resultadoQr) {
      console.log("QR", JSON.parse(resultadoQr));
    }
    var infoQr = [];
    infoQr.push(
      {

        },

              );

              const parametros = {dataQr:infoQr};

  }
  
}
