import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario, estudiantePresente, usuarioIniciado } from '../../profile/usuarios.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaseService } from 'src/app/services/clase.service';
import { Clase } from '../clases.model';
import { ApiService } from 'src/app/services/api/api.service';
import { IClases } from 'src/app/interfaces/iclases';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';

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
              private toastController: ToastController,
              private transService: TranslateService,
              private firestore : FirestoreService) {
      this.langs = this.transService.getLangs();
    }
  clase : IClases= {
    id: '',
    sigla: '',
    seccion: '',
    jornada: '',
    nombre: '',
    docente: '',
    dia: '',
    horaInicio: '',
    horaTermino: '',
    sede: '',
    sala: '',
    lat: 0,
    lgn: 0
  };
  listaUsuarioIniciado : usuarioIniciado [] = [];
  
  listaEstudiantePresente : any = [];
  listaUsuario : any = [];
  langs: string[] =[];

  v_idClase = this.getId()

  ngOnInit() {
    this.listaUsuarioIniciado = this.usuarioService.GetUsuarioIniciado();
    // this.listar();
    this.getAsistencia()
    this.listaUser();
    this.getClase(this.getId())
    console.log(this.listaEstudiantePresente)
  }
  
  ionViewWillEnter(){
    this.getAsistencia()
    // this.listar();
    this.listaUser();
    this.getClase(this.getId())
  }

  // listar() {
  //   this.apiService.listaPresentes().subscribe((resp) => {
  //     //console.log(resp)
  //     let aux = JSON.stringify(resp)
  //     this.listaEstudiantePresente = JSON.parse(aux)
  //   })

  // }

  getAsistencia(){
    this.firestore.getPresente('Asistencia').subscribe((asistencia)=>{
      let aux = JSON.stringify(asistencia);
      this.listaEstudiantePresente=JSON.parse(aux);
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
    let id = aux[3]
    return id
  }

  getClase(id: any) {
    if (id){
      this.firestore.getClaseId('Clases',id).subscribe((clase)=>{
        this.clase = clase || {} as IClases
      })
    }
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
