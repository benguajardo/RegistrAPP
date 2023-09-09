import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { usuarioIniciado } from '../profile/usuarios.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private usuarioService : UsuarioService,
              private router :Router) { }
  listaUsuarioIniciado : usuarioIniciado [] = []
  
  ngOnInit() {
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
