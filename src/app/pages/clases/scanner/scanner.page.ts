import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ClaseService } from 'src/app/services/clase.service';
import { Clase } from '../clases.model';
import { Qrcode } from './qrcode.model';
import { QrcodeService } from 'src/app/services/qrcode.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { estudiantePresente, usuarioIniciado } from '../../profile/usuarios.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {
  listaQR : Qrcode[] = [];
  listaEstudiantePresente : estudiantePresente[]= [];
  listaUsuarioIniciado : usuarioIniciado [] = [];
  clase! : Clase;
  qrcode! :Qrcode;
  
  constructor(private router : Router,
              private toastController : ToastController,
              private usuarioService : UsuarioService,
              private claseService : ClaseService,
              private qrcodeService : QrcodeService,
              private alertController: AlertController,
              private activatedRoute : ActivatedRoute,
              private httpClient :HttpClient,) { }
  ngOnInit() {
    if(this.usuarioService.usuarioIniciado.length != 1){
      this.router.navigate(['/login'])
    }
    this.listaUsuarioIniciado = this.usuarioService.GetUsuarioIniciado()
    this.listaEstudiantePresente = this.usuarioService.GetEstudiantePresente()
    this.listaQR = this.qrcodeService.GetAll()
    
    this.activatedRoute.paramMap.subscribe(param => {
      const aux = param.get('id')
      if (aux) {
        this.clase = this.claseService.getClase(aux)
      }
      return aux
    });
  }

  cargarData(p_clase: any, p_sala: any){
    const url = `https://api.qrserver.com/v1/create-qr-code/?data=${p_clase+'-'+p_sala}&size=150x150`
    this.qrcodeService.addClase(p_clase, url)
  }

  ionViewWillEnter(){
    if(this.usuarioService.usuarioIniciado.length != 1){
      this.router.navigate(['/login'])
    }
    console.log(this.listaQR)
  }


  async mensajeToast(mensaje: string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'  
    });
    toast.present()
  }

  async deleteClase() {
    //this.mensajeToast("clase ELIMINADO!");
    const alerta = await this.alertController.create({
      header: 'Eliminar la clase',
      message: 'Estás seguro que desea eliminar la clase?',
      buttons: [
        {
          text: 'Eliminar',
          handler: () => {
            if (this.clase && this.clase.id !== undefined){
              this.claseService.deleteClase(this.clase.id);
              this.router.navigate(['/clases']);
              this.mensajeToast("Clase eliminada!");
            }
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            this.mensajeToast("Acción cancelada!");
          }
        }
      ]
    });
    await alerta.present();
    let resultado = await alerta.onDidDismiss();
  }

  async deleteQR() {
    //this.mensajeToast("clase ELIMINADO!");
    const alerta = await this.alertController.create({
      header: 'Eliminar la clase',
      message: 'Estás seguro que desea eliminar la clase?',
      buttons: [
        {
          text: 'Eliminar',
          handler: () => {
            if (this.clase && this.clase.id !== undefined){
              this.qrcodeService.deleteClase(this.clase.id);
              this.router.navigate(['/clases']);
              this.mensajeToast("QR eliminado!");
            }
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            this.mensajeToast("Acción cancelada!");
          }
        }
      ]
    });
    await alerta.present();
    let resultado = await alerta.onDidDismiss();
  }

  addQR(idclase: any, qrcode: any){
    this.qrcodeService.addClase(idclase.value, qrcode.value)
    this.mensajeToast("Código cargado con éxito!");
  }

  hora = new Date()
  
  addEstudiantePresente(idClase: any, rutEstudiante: any){
    this.usuarioService.addEstudiantePresente(idClase, rutEstudiante, this.hora.toLocaleTimeString())
    console.log(this.usuarioService.estudiantePresente)
    console.log(idClase,rutEstudiante)
  }
}



