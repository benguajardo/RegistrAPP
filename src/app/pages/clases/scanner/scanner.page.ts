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
import { ApiService } from 'src/app/services/api/api.service';
import { IQrCode } from 'src/app/interfaces/iqr-code';
import { IPresente } from 'src/app/interfaces/ipresente';

// import { Camera } from '@capacitor/camera';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})

export class ScannerPage implements OnInit {
  listaEstudiantePresente : estudiantePresente[]= [];
  listaUsuarioIniciado : usuarioIniciado [] = [];
  listaQR : any = [];
  // clase! : Clase;
  qrcode! :Qrcode;
  
  constructor(private router : Router,
              private toastController : ToastController,
              private usuarioService : UsuarioService,
              private qrcodeService : QrcodeService,
              private alertController: AlertController,
              private apiService:ApiService) { }

  ngOnInit() {
    if(this.usuarioService.usuarioIniciado.length != 1){
      this.router.navigate(['/login'])
    }
    this.listarQR()
    this.listaUsuarioIniciado = this.usuarioService.GetUsuarioIniciado()
    this.listaEstudiantePresente = this.usuarioService.GetEstudiantePresente()
    this.getClase(this.getId())
    
    
  }

  ionViewWillEnter(){
    if(this.usuarioService.usuarioIniciado.length != 1){
      this.router.navigate(['/login'])
    }
    console.log(this.listaQR)
    this.getClase(this.getId())
  }

  listarQR() {
    this.apiService.listaQR().subscribe((resp) => {
      //console.log(resp)
      let aux = JSON.stringify(resp)
      this.listaQR = JSON.parse(aux)
    })
  }

  clase ={
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
    sala: ''
  }
  
  
  getId() {
    let url = this.router.url
    let aux = url.split("/",3)
    let id = parseInt(aux[2])
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
        sala: resp[0].sala,
        
      }
    })
  }

  deleteClase() {
    this.apiService.deleteClase(this.clase.id).subscribe();
    this.router.navigate(['/clases'])
  }

  qr : IQrCode ={
    idClase: '',
    imagen: '',
    
  }
 
  async cargarData(p_clase: any, p_sala: any, p_asignatura: any, p_seccion: any, p_sede: any) {
    
    const alerta = await this.alertController.create({
      header: 'Generar código',
      message: 'Quiere generar un código QR?',
      buttons: [
        {
          text: 'Cargar',
          handler: () => {
            const url = `https://api.qrserver.com/v1/create-qr-code/?data=${p_clase + '-' + p_sala + '-' + p_asignatura + '-' + p_seccion + '-' + p_sede +'-'+ this.listaQR.length}&size=150x150`
            this.qr.imagen= url;
            this.qr.idClase= p_clase;
            this.apiService.addQR(this.qr).subscribe()
            this.router.navigate(['/clases']);
            this.mensajeToast("Código generado!");
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
  presente : IPresente={
    rutEstudiante: "",
    idClase: 0,
    horaLlegada: "",
    presente: false
  }
  marcarAsistencia(p_codigo: any, p_query: any, idClase: any, rutEstudiante: any){
    if(p_codigo === p_query){
      this.presente.rutEstudiante = rutEstudiante;
      this.presente.idClase = idClase;
      this.presente.horaLlegada = this.hora.toLocaleTimeString();
      this.apiService.addPresente(this.presente).subscribe()
      this.router.navigate(['/clases/asistencia/'+idClase]);
      this.mensajeToast('Asistencia Confirmada.')
    }else{
      this.mensajeToast('No Funciona')
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

  // addQR(idclase: any, qrcode: any){
  //   this.qrcodeService.addClase(idclase.value, qrcode.value)
  //   this.mensajeToast("Código cargado con éxito!");
  // }

  hora = new Date()
  
  addEstudiantePresente(idClase: any, rutEstudiante: any){
    this.usuarioService.addEstudiantePresente(idClase, rutEstudiante, this.hora.toLocaleTimeString())
    console.log(this.usuarioService.estudiantePresente)
    console.log(idClase,rutEstudiante)
  }
}



