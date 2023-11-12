import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Preferences } from '@capacitor/preferences';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{

  formLogin: FormGroup;

  constructor(public fb: FormBuilder,private router: Router, public alertController: AlertController) {
    this.formLogin = this.fb.group({
      'email': new FormControl("", [Validators.required, Validators.pattern(/.+/)]),
      'pass': new FormControl("", [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)])

    })
  }


  async ingresar() {
    if (this.formLogin.valid) {
      const i = this.formLogin.value;

      const userJSON = await Preferences.get({ key: 'users'});
      const users: { email: string, pass: string }[] = userJSON && userJSON.value ? JSON.parse(userJSON.value) : [];
      const user = users.find((u: any) => u.email === i.email && u.pass === i.pass);

      if (user) {
        await Preferences.set({ key: 'Mail', value: user.email});
        await Preferences.set({ key: 'usuario', value: JSON.stringify(users)});
        console.log("Inicio de sesion exitoso");
        localStorage.setItem("Inicio de sesion exitoso", "true");
        this.router.navigate(['/home']);
        }else{
          const alert = await this.alertController.create({
            header: 'Datos Ingresados incorrectos',
            message: 'Los datos que ha ingresado no son correctos, porfavor intente de nuevo.',
            buttons: ['Aceptar']
          });

          await alert.present();
        }

    }else {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Por favor, ingrese los datos correctmente.',
      buttons: ['Aceptar']
    });

    await alert.present();
    }
  }

  
  redirectToSignup() {
    this.router.navigate(['/signup']);
  }

}
