import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Preferences } from '@capacitor/preferences';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {

  formRegis: FormGroup;

  constructor(public fb: FormBuilder,private router: Router, public alertController: AlertController) {
    this.formRegis = this.fb.group({
      'NombreCompleto': new FormControl("",[Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.pattern(/^[a-zA-Z]*$/)]),
      'email': new FormControl("", [Validators.required,Validators.minLength(3),Validators.maxLength(20), Validators.pattern(/.+/)]),
      'contraseña': new FormControl("",[Validators.required,Validators.minLength(4), Validators.maxLength(15),Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]),
      'Telefono': new FormControl("", [Validators.required, Validators.minLength(9),Validators.maxLength(9), Validators.pattern(/^\d+$/)]),
      'rut': new FormControl("", [Validators.required, Validators.minLength(9), Validators.maxLength(9),Validators.pattern(/^\d+$/)])
    })
   }

   async save() {
    const s = this.formRegis.value;
    const userJSON = await Preferences.get({ key:'users'});
    const users = userJSON && userJSON.value ? JSON.parse(userJSON.value) : [];

    var userRegis = {
      nameuser: s.NombreCompleto,
      useremail: s.email,
      userpass: s.contraseña,
      celular: s.Telefono,
      userrut: s.rut
    }

    users.push(userRegis);
    await Preferences.set({key:'users', value: JSON.stringify(users)})

    console.log('El Usuario registrado exitosamente.');
    const successAlert = await this.alertController.create({
      header: 'Usuario Registrado',
      message: 'El Usuario registrado exitosamente.',
      buttons: [
        {
          text: 'Seguir',
          handler: () => {
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await successAlert.present();

  }
}

