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
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-crearclase',
  templateUrl: './crearclase.page.html',
  styleUrls: ['./crearclase.page.scss'],
})
export class CrearclasePage implements OnInit {
  
  
  constructor(private ClaseService : ClaseService, private router: Router, private toastController:ToastController,
    private usuarioService : UsuarioService,
    private apiService: ApiService,
    private firestore : FirestoreService,
    private transService: TranslateService) {
      this.langs = this.transService.getLangs();
      setInterval(() => {
        this.getLocation();
      }, 10000);
    }
    
    listaUsuarioIniciado :usuarioIniciado[] = []
    langs: string[] =[];


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
    sala: '',
    lat: 0,
    lgn: 0
  }

  ngOnInit() {
    
    this.listaUsuarioIniciado = this.usuarioService.GetUsuarioIniciado()
    this.getLocation();
  }
  ionViewWillEnter(){
    this.getLocation();
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

  async getLocation(){
    try {
      const coordenadas = await Geolocation.getCurrentPosition();
      this.clase.lat = coordenadas.coords.latitude;
      this.clase.lgn = coordenadas.coords.longitude;
      console.log('lat: ',this.clase.lat, 'lng',this.clase.lgn)
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
    }
  }
}
