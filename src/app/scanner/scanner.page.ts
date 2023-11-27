import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from 'capacitor-barcode-scanner';
import { GuardadoService } from 'src/app/servicios/guardado.service';
import { Geolocation, GeolocationPosition } from '@capacitor/geolocation';
import { Preferences } from '@capacitor/preferences';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {

  usuarios: any[] = [];
  qr: any[] = [];
  latitude: number | undefined;
  longitude: number | undefined;
  horaPreferences: string | null = '';

  constructor(private storage: GuardadoService, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.scan();
    this.getCurrentPosition();
    this.retrieveHoraFromPreferences();
    this.retrieveUsuariosFromPreferences();
   }

  async scan() {
    try {
      const resultQr = (await BarcodeScanner.scan()).code;

      if (resultQr) {
        console.log("RESULTADO QR ---->", JSON.parse(resultQr));
        this.qr.push(JSON.parse(resultQr));
      }

      console.log("propiedad con la información del qr", this.qr);

    } catch (error) {
      console.error('Error al escanear el código QR:', error);
    }
  }

  async saveDataQr() {
    try {
      await this.storage.agregarAsistencia(this.qr);
      this.qr = [];
    } catch (error) {
      console.error('Error al guardar los datos del QR:', error);
    }
  }

  async getCurrentPosition() {
    try {
      const coordinates: GeolocationPosition = await Geolocation.getCurrentPosition();
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;
    } catch (error) {
      console.error('Se ha encontrado un error con la posicion actual', error);
    }
  }

  async retrieveHoraFromPreferences() {
    try {
      const hora = await Preferences.get({ key: 'hora' });
      if (hora && hora.value) {
        this.horaPreferences = hora.value;
      }
    } catch (error) {
      console.error('No se ha podido recuperar la hora desde Preferences:', error);
    }
  }

  async retrieveUsuariosFromPreferences() {
    try {
      const usuariosJSON = await Preferences.get({ key: 'usuarios' });
      if (usuariosJSON && usuariosJSON.value) {
        this.usuarios = JSON.parse(usuariosJSON.value);
      }
    } catch (error) {
      console.error('Error al recuperar usuarios desde Preferences:', error);
    }
  }
  async confirmCancel() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar Cancelación',
      message: '¿Estás seguro de que deseas cancelar el escaneo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.qr = [];
          }
        }
      ]
    });
  
    await alert.present();
  }
}
