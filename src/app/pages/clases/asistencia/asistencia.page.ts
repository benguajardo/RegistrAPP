import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario, estudiantePresente, usuarioIniciado } from '../../profile/usuarios.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaseService } from 'src/app/services/clase.service';
import { Clase } from '../clases.model';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  constructor(private usuarioService : UsuarioService,
              private claseService : ClaseService,
              private router : Router,
              private activatedRoute: ActivatedRoute
  ) { }
  clase! : Clase;
  listaUsuario : Usuario [] = [];
  listaUsuarioIniciado : usuarioIniciado [] = [];
  listaEstudiantePresente : estudiantePresente [] = [];

  ngOnInit() {
    if(this.usuarioService.usuarioIniciado.length != 1){
      this.router.navigate(['/login'])
    }
    this.listaUsuario = this.usuarioService.GetAll();
    this.listaUsuarioIniciado = this.usuarioService.GetUsuarioIniciado();
    this.listaEstudiantePresente = this.usuarioService.GetEstudiantePresente();

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
  }

}
