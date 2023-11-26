import { Component, OnInit } from '@angular/core';
import { GuardadoService } from '../servicios/guardado.service';
import { UsuarioService } from '../servicios/usuario.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuario: any[]=[];
  
  
  constructor( private usuarioService:UsuarioService, private router:Router ) { }

  ngOnInit() {
  }

  actualizarUsuario() {
    this.usuario = this.usuarioService.obtenerUser();
  }

  ionViewDidEnter() {
    this.actualizarUsuario
  }
}
