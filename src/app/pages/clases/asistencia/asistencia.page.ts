import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario, estudiantePresente, usuarioIniciado } from '../../profile/usuarios.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaseService } from 'src/app/services/clase.service';
import { Clase } from '../clases.model';
import { ApiService } from 'src/app/services/api/api.service';
import { IClases } from 'src/app/interfaces/iclases';
import { ToastController } from '@ionic/angular';

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
              private apiService :ApiService,
              private toastController: ToastController
  ) { }
  clase : IClases= {
    id: 0,
    sigla: '',
    seccion: '',
    jornada: '',
    nombre: '',
    docente: '',
    dia: '',
    horaInicio: '',
    horaTermino: '',
    sede: '',
    sala: ''
  };
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
    this.getClase(this.getId())
  }
  
  ionViewWillEnter(){
    if(this.usuarioService.usuarioIniciado.length != 1){
      this.router.navigate(['/login'])
    }
    this.listar();
    this.listaUser();
    this.getClase(this.getId())
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

  deletePresente(id:any) {
    this.apiService.deletePresente(id).subscribe();
    this.router.navigate(['/clases'])
    this.mensajeToast('Estudiante quitado con éxito')
  }

  getId() {
    let url = this.router.url
    let aux = url.split("/",4)
    let id = parseInt(aux[3])
    return id
  }

  getClase(id: Number) {
    this.apiService.getClase(id).subscribe((resp:any) => {
      this.clase = {
        id: resp[0].id,
        sigla: resp[0].sigla,
        seccion: resp[0].seccion,
        jornada: resp[0].jornada,
        nombre: resp[0].nombre,
        docente: resp[0].docente,
        dia: resp[0].dia,
        horaInicio: resp[0].horaInicio,
        horaTermino: resp[0].horaTermino,
        sede: resp[0].sede,
        sala: resp[0].sala
        
      }
    })
  }

  async mensajeToast(mensaje: string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'  
    });
    toast.present()
  }

}
