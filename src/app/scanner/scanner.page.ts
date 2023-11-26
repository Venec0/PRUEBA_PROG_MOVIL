import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from 'capacitor-barcode-scanner';
import { GuardadoService } from 'src/app/servicios/guardado.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {

  qr:any[]=[];
  constructor(private storage:GuardadoService) { }

  ngOnInit() {
    
  }

  async scan(){
    var resultQr = (await BarcodeScanner.scan()).code;
    
    if (resultQr) {
      console.log("RESULTADO QR ---->", JSON.parse(resultQr));
      this.qr.push(JSON.parse(resultQr));
    }

    console.log("propiedad con la información del qr", this.qr);
    
  }


    async saveDataQr(){
      await this.storage.agregarAsistencia(this.qr);
      this.qr = [];
    }

}
