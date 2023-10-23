import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario, estudiantePresente, usuarioIniciado } from '../../profile/usuarios.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaseService } from 'src/app/services/clase.service';
import { Clase } from '../clases.model';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  constructor(private usuarioService : UsuarioService,
              private claseService : ClaseService,
              private router : Router,
              private activatedRoute: ActivatedRoute,
              private apiService :ApiService
  ) { }
  clase! : Clase;
  listaUsuarioIniciado : usuarioIniciado [] = [];
  
  listaEstudiantePresente : any = [];
  listaUsuario : any = [];

  ngOnInit() {
    if(this.usuarioService.usuarioIniciado.length != 1){
      this.router.navigate(['/login'])
    }
    this.listaUsuarioIniciado = this.usuarioService.GetUsuarioIniciado();
    this.listar();
    this.listaUser();
    this.activatedRoute.paramMap.subscribe(param => {
      const aux = param.get('id')
      if (aux) {
        this.clase = this.claseService.getClase(aux)
      }
      return aux
    });
  }
  
  ionViewWillEnter(){
    if(this.usuarioService.usuarioIniciado.length != 1){
      this.router.navigate(['/login'])
    }
    this.listar();
    this.listaUser();
  }

  listar() {
    this.apiService.listaPresentes().subscribe((resp) => {
      //console.log(resp)
      let aux = JSON.stringify(resp)
      this.listaEstudiantePresente = JSON.parse(aux)
    })

  }

  listaUser(){
    this.apiService.listaUsuarios().subscribe((respose) => {
      //console.log(resp)
      let aux = JSON.stringify(respose)
      this.listaUsuario = JSON.parse(aux)
    })
  }


}
