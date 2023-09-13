import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario, usuarioIniciado } from '../../profile/usuarios.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  constructor(private usuarioService : UsuarioService,
              private router : Router,
  ) { }
  listaUsuario : Usuario [] = [];
  listaUsuarioIniciado : usuarioIniciado [] = [];

  ngOnInit() {
    if(this.usuarioService.usuarioIniciado.length != 1){
      this.router.navigate(['/login'])
    }
    this.listaUsuario = this.usuarioService.GetAll();
    this.listaUsuarioIniciado = this.usuarioService.GetUsuarioIniciado();
  }
  ionViewWillEnter(){
    if(this.usuarioService.usuarioIniciado.length != 1){
      this.router.navigate(['/login'])
    }
  }

}
