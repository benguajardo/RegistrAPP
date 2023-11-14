import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ClaseService } from 'src/app/services/clase.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { usuarioIniciado } from '../../profile/usuarios.model';
import { IClase } from 'src/app/interfaces/iclase';
import { ApiService } from 'src/app/services/api/api.service';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-crearclase',
  templateUrl: './crearclase.page.html',
  styleUrls: ['./crearclase.page.scss'],
})
export class CrearclasePage implements OnInit {
  
<<<<<<< HEAD
  
  constructor(private ClaseService : ClaseService, private router: Router, private toastController:ToastController,
    private usuarioService : UsuarioService,
    private apiService: ApiService,
    private firestore : FirestoreService,
    private transService: TranslateService) {
      this.langs = this.transService.getLangs();
    }
    
    listaUsuarioIniciado :usuarioIniciado[] = []
    langs: string[] =[];
=======
  langs: string[] =[];

  constructor(private ClaseService : ClaseService, private router: Router, private toastController:ToastController,
              private usuarioService : UsuarioService,
              private apiService: ApiService,
              private firestore : FirestoreService,
              private transService: TranslateService) {
                this.langs = this.transService.getLangs();
              }
  listaUsuarioIniciado :usuarioIniciado[] = []
>>>>>>> ce97312c135241df40a66a30d2eee47e24a352d8
  
  clase: IClase ={
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
  }

  ngOnInit() {
    this.listaUsuarioIniciado = this.usuarioService.GetUsuarioIniciado()
  }
  ionViewWillEnter(){
    
  }
  async mensaje(mensaje: string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
    toast.present()
  }
  
  addClase(){
    this.firestore.createClase('Clases',this.clase)
    this.router.navigate(['/clases']);
  }
}
