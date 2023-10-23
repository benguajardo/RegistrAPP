import { Component, OnInit } from '@angular/core';
import { Clase } from './clases.model';
import { Router } from '@angular/router';
import { ClaseService } from 'src/app/services/clase.service';
import { usuarioIniciado } from '../profile/usuarios.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {
  listaUsuarioIniciado : usuarioIniciado [] = []
  listaClases : any = [];

  constructor(private router: Router, private usuarioService : UsuarioService, private claseService: ClaseService,
    private apiService: ApiService) { }

  ngOnInit() {
    if(this.usuarioService.usuarioIniciado.length != 1){
      this.router.navigate(['/login'])
    }
    this.listaUsuarioIniciado = this.usuarioService.GetUsuarioIniciado()
    this.listar()
  }
  ionViewWillEnter() {
    this.listar()
    if(this.usuarioService.usuarioIniciado.length != 1){
      this.router.navigate(['/login'])
    }
    
  }
  listar() {
    this.apiService.listaClases().subscribe((resp) => {
      //console.log(resp)
      let aux = JSON.stringify(resp)
      this.listaClases = JSON.parse(aux)
    })
  }
}