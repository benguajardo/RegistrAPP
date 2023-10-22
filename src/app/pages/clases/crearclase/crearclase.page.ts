import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ClaseService } from 'src/app/services/clase.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { usuarioIniciado } from '../../profile/usuarios.model';
import { IClase } from 'src/app/interfaces/iclase';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-crearclase',
  templateUrl: './crearclase.page.html',
  styleUrls: ['./crearclase.page.scss'],
})
export class CrearclasePage implements OnInit {
  
  constructor(private ClaseService : ClaseService, private router: Router, private toastController:ToastController,
              private usuarioService : UsuarioService,
              private apiService: ApiService) { }
  listaUsuarioIniciado :usuarioIniciado[] = []
  
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
    
    if(this.usuarioService.usuarioIniciado.length != 1){
      this.router.navigate(['/login'])
    }
    this.listaUsuarioIniciado = this.usuarioService.GetUsuarioIniciado()
  }
  ionViewWillEnter(){
    if(this.usuarioService.usuarioIniciado.length != 1){
      this.router.navigate(['/login'])
    }
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
    this.apiService.addClase(this.clase).subscribe()
    this.router.navigate(['/clases']);
  }
}
