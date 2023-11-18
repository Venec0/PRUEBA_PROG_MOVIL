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

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public alertController: AlertController
  ) {
    this.formLogin = this.fb.group({
      'nombre': new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{3,8}$/)]),
      'password': new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-Z\d]{4,}$/)])
    });
  }

  ngOnInit() {}

  async ingresar() {
    if (this.formLogin.valid) {
      const f = this.formLogin.value;
      const usuariosJSON = await Preferences.get({ key: 'usuarios'});
      const usuarios: { nombre: string, password: string} [] = usuariosJSON && usuariosJSON.value ? JSON.parse(usuariosJSON.value) : [];

      const user = usuarios.find((u: any) => u.usuario === f.nombre && u.password === f.password);

        if (user) {
          await Preferences.set({ key: 'nombreDeUsuario', value: user.nombre});
          await Preferences.set({ key: 'usuario', value: JSON.stringify(usuarios)});
          console.log("Sesión iniciada");
          localStorage.setItem("Sesión iniciada", "true");
          this.router.navigate(['/qrreader']);
          }else{
            const alert = await this.alertController.create({
              header: 'Datos incorrectos',
              message: 'Los datos que se ingresaron no son correctos.',
              buttons: ['Aceptar']
            });

            await alert.present();
          }

      }else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete todos los campos correctamente.',
        buttons: ['Aceptar']
      });

      await alert.present();
    }
  }


  
  redirectToSignup() {
    this.router.navigate(['/signup']);
  }

}
