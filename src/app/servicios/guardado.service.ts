import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';


const storageUser = "userData";

@Injectable({
  providedIn: 'root'
})
export class LogInService {
  public userCorreo = "";
  constructor() { }

    //obtiene un elemento segun su key desde el Storage (capacitor)

  async getItem(llave:string):Promise<string | null>{
    const obj = await Preferences.get({key:llave});
    return obj.value;
  }

  //agrega un valor al storage
  async setItem(llave:string, valor:string){
    await Preferences.set({key:llave,value:valor});
  }

//obtiene un usuario desde el storage
  async obtenerUsuario(){
    const storageData = await this.getItem(storageUser);
    if (storageData == null) {
      return [];
    }

    const data:any[] = JSON.parse(storageData);
    if (data) {
      return data;
    }else{
      return [];
    }
  }
// agrega un user al storage
  async agregarUsuario(user:any[]){
    const usuarios = await this.obtenerUsuario();
    for (const i of usuarios) {
      if (i) {
        user.push(i);
      }
    }

    this.setItem(storageUser,JSON.stringify(user));
  }



}