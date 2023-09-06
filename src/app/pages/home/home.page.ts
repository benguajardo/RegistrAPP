import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { usuarioIniciado } from '../profile/usuarios.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private usuarioService : UsuarioService) { }
  listaUsuarioIniciado : usuarioIniciado [] = []
  
  ngOnInit() {
    this.listaUsuarioIniciado = this.usuarioService.GetUsuarioIniciado()
    console.log(this.listaUsuarioIniciado)
  }

}
