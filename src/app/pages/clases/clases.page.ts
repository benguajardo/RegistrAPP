import { Component, OnInit } from '@angular/core';
import { Clase } from './clases.model';
import { Router } from '@angular/router';
import { ClaseService } from 'src/app/services/clase.service';
import { usuarioIniciado } from '../profile/usuarios.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {
  listaUsuarioIniciado : usuarioIniciado [] = []
  listaClases : Clase[] = [];
  constructor(private router: Router, private usuarioService : UsuarioService, private claseService: ClaseService) { }

  ngOnInit() {
    if(this.usuarioService.usuarioIniciado.length != 1){
      this.router.navigate(['/login'])
    }
    this.listaUsuarioIniciado = this.usuarioService.GetUsuarioIniciado()
    this.listaClases = this.claseService.GetAll()
  }
  ionViewWillEnter() {
    if(this.usuarioService.usuarioIniciado.length != 1){
      this.router.navigate(['/login'])
    }
    this.listaClases = this.claseService.GetAll()
  }
  
}