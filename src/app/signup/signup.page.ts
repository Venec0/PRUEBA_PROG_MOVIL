import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Preferences } from '@capacitor/preferences';
import { AlertController } from '@ionic/angular';
import { Comuna } from 'src/app/api/comuna';
import { Region } from 'src/app/api/region';
import { LocationService } from 'src/app/servicios/location.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})


export class SignupPage {

  formRegis: FormGroup;

  regiones: Region[] = [];
  comunas: Comuna[] = [];
  regionSelect: number = 0;
  comunaSelect: number = 0;

  constructor(private locationService: LocationService,private router: Router,public fb: FormBuilder, public alertController: AlertController) {
    this.formRegis = this.fb.group({
      'nombre': new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.pattern(/^[a-zA-Z]*$/)]),
      'rut': new FormControl("", [Validators.required, Validators.minLength(9), Validators.maxLength(9),Validators.pattern(/^\d+$/)]),
      'Telefono': new FormControl("", [Validators.required, Validators.minLength(9),Validators.maxLength(9), Validators.pattern(/^\d+$/)]),
      'usuario': new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(10), Validators.pattern(/^[a-zA-Z0-9]*$/)]),
      'password': new FormControl("", [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\d]{4,15}$/),
        Validators.minLength(4),
        Validators.maxLength(15)
      ])
    });
    
  }

  ngOnInit() {
    this.obtRegion();
    this.obtComuna();
  }

  async obtRegion() {
    const req = await this.locationService.getRegion();
    this.regiones = req.data;
    console.log("REGION", this.regiones);
  }

  async obtComuna() {
    const req = await this.locationService.getComuna(this.regionSelect);
    this.comunas = req.data;
    console.log("COMUNA", this.comunas);
  }
  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Aceptar']
    });

    await alert.present();
  }


  async save() {
    const f = this.formRegis.value;
    const usuariosJSON = await Preferences.get({ key:'usuarios'});
    const usuarios = usuariosJSON && usuariosJSON.value ? JSON.parse(usuariosJSON.value) : [];

    if (this.usuarioExiste(usuarios, f.usuario))

    if (this.usuarioExiste(usuarios, f.usuario)) {
      await this.mostrarAlerta('El Usuario existe', 'El usuario ya existe. Por favor elige otro nombre de usuario para poder ingresar.');
      return;
    }
    

    var userRegis = {
      nombre: f.nombre,
      password: f.password,
      telefono: f.telefono,
      rut: f.rut,
      usuario: f.usuario,
      region: this.regiones.find(region => region.id === this.regionSelect),
      comuna: this.comunas.find(comuna => comuna.id === this.comunaSelect)
    }
    

    usuarios.push(userRegis);
    console.log(userRegis);
    await Preferences.set({ key:'usuarios', value: JSON.stringify(usuarios) } );


    console.log('Usuario registrado completado.');
    const successAlert = await this.alertController.create({
      header: 'Usuario Registrado',
      message: 'Usuario registrado, gracias por registrarte :).',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await successAlert.present();

  }

  usuarioExiste(usuarios: any[], usuario: string): boolean {
    return usuarios.some(u => u.usuario === usuario);
    
  }
}

