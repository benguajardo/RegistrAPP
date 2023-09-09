import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario, usuarioIniciado } from '../../profile/usuarios.model';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  constructor(private usuarioService : UsuarioService,
  ) { }
  listaUsuario : Usuario [] = [];
  listaUsuarioIniciado : usuarioIniciado [] = [];

  ngOnInit() {
    this.listaUsuario = this.usuarioService.GetAll();
    this.listaUsuarioIniciado = this.usuarioService.GetUsuarioIniciado();
  }

}
