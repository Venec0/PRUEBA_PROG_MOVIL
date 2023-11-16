import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { promises } from 'dns';

const storageUser = "userData";

@Injectable({
  providedIn: 'root'
})
export class LogInService {
  public userMail = "";

  constructor() {}

  async getItem(llave:string):Promise<string | null {
    const obj = await Preferences.get({key:llave});
    return obj.value;
  }

  async setItem(llave:string, valor:string) {
    await Preferences.set({key:llave, value:valor});
  }

  async obtenerUser() {
    const storageData = await this.getItem(storageUser);
    if (storageData == null){
      return[];
    } 
  }

  const data:any[] = JSON.parse(storageData);
  if(data) {
    return data;
  }else{
    return[];
  }

  async agregarUser(user:any[]){
    const users = await this.obtenerUser();
    for(const i of users) {
      if (i) {
        user.push(i);
      }
    }
    this.setItem(storageUser, JSON.stringify(user));
  }
}