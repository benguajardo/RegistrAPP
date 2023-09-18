import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ClaseService } from 'src/app/services/clase.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { usuarioIniciado } from '../../profile/usuarios.model';

@Component({
  selector: 'app-crearclase',
  templateUrl: './crearclase.page.html',
  styleUrls: ['./crearclase.page.scss'],
})
export class CrearclasePage implements OnInit {
  
  constructor(private ClaseService : ClaseService, private router: Router, private toastController:ToastController,
              private usuarioService : UsuarioService,) { }
  listaUsuarioIniciado :usuarioIniciado[] = []
  
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

  addClase(nombreAsignatura: any, siglaAsignatura: any, seccion: any, fecha: any, horaInicio: any, horaTermino: any, sede: any, sala: any, docente: any){
    this.ClaseService.addClase(nombreAsignatura.value, siglaAsignatura.value, seccion.value, fecha.value, horaInicio.value,horaTermino.value, sede.value, sala.value, docente.value);
    this.mensaje("Clase creada con éxito!")
    this.router.navigate(['/clases']);
  }
}
