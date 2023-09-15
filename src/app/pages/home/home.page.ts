import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { usuarioIniciado } from '../profile/usuarios.model';
import { Router } from '@angular/router';
import { MensajeService } from 'src/app/services/mensaje.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private usuarioService : UsuarioService,
              private router :Router,
              private mensajeService: MensajeService) { }
  listaUsuarioIniciado : usuarioIniciado [] = []
  
  ngOnInit() {
    this.mensajeService.avisoLogin()
    if(this.usuarioService.usuarioIniciado.length != 1){
      this.router.navigate(['/login'])
    }
    this.listaUsuarioIniciado = this.usuarioService.GetUsuarioIniciado()
    console.log(this.listaUsuarioIniciado)
  }

  ionViewWillEnter() {
    if(this.usuarioService.usuarioIniciado.length != 1){
      this.router.navigate(['/login'])
    }
    
  }

}
