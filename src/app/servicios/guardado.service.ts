import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';


const storageUser = "userData";

@Injectable({
  providedIn: 'root'
})
export class GuardadoService {
  public userCorreo = "";
  constructor() { }

  async getItem(llave:string):Promise<string | null>{
    const obj = await Preferences.get({key:llave});
    return obj.value;
  }

  async setItem(llave:string, valor:string){
    await Preferences.set({key:llave,value:valor});
  }


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