import { Component, OnInit } from '@angular/core';
import { Geolocation, GeolocationPosition } from '@capacitor/geolocation';
import { Preferences } from '@capacitor/preferences';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-registrar-datos-qr',
  templateUrl: './registrar-datos-qr.page.html',
  styleUrls: ['./registrar-datos-qr.page.scss'],
})
export class RegistrarDatosQRPage implements OnInit {

  msjPreferences: string | null = '';
  latitude: number | undefined;
  longitude: number | undefined;
  horaPreferences: string | null = '';
  usuarios: any[] = [];
  imageSrc: string = '';

  constructor() {}

  ngOnInit() {
    this.getCurrentPosition();
    this.retrieveMessageFromPreferences();
    this.retrieveUsuariosFromPreferences();
    this.retrieveHoraFromPreferences();
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

  async abrirCamara() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      });

      if (image && image.webPath) {
        this.imageSrc = image.webPath;
      } else {
        console.log('No se ha capturado ninguna imagen');
      }
    } catch (error) {
      console.error('Se ha encontrado un error con la camara', error);
    }
  }

  async retrieveMessageFromPreferences() {
    try {
      const mensaje = await Preferences.get({ key: 'msj' });
      if (mensaje && mensaje.value) {
        this.msjPreferences = this.agregarSaltosDeLinea(mensaje.value);
        console.log("ahora si ",mensaje);
        
      }
    } catch (error) {
      console.error('No se ah podido recuperar el mensaje desde Preferences', error);
    }
  }

  async retrieveUsuariosFromPreferences() {
    try {
      const usuariosJSON = await Preferences.get({ key: 'usuarios' });
      if (usuariosJSON && usuariosJSON.value) {
        this.usuarios = JSON.parse(usuariosJSON.value);
      }
    } catch (error) {
      console.error('No se ha podido recuperar los usuarios desde Preferences', error);
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

  agregarSaltosDeLinea(mensaje: string) {
    return mensaje.replace(/,/g, '<br>');
  }
}
