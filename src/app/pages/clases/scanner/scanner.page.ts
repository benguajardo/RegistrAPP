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
import { IQrCodes } from 'src/app/interfaces/iqr-codes';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { IClase } from 'src/app/interfaces/iclase';
import { IClases } from 'src/app/interfaces/iclases';

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
  
  handleRefresh(event: any) {
    setTimeout(() => {
      this.listarQR()
      this.listaUsuarioIniciado = this.usuarioService.GetUsuarioIniciado()
      this.listaEstudiantePresente = this.usuarioService.GetEstudiantePresente()
      this.getClase(this.getId())
      this.getQR(this.getId())
      //Soy dios
      //--Atte: Nico
      event.target.complete();
    }, 2000);
  }

  constructor(private router : Router,
              private toastController : ToastController,
              private usuarioService : UsuarioService,
              private qrcodeService : QrcodeService,
              private alertController: AlertController,
              private apiService:ApiService,
              private firestore : FirestoreService,
              private route : ActivatedRoute) { }

  ngOnInit() {
    this.listarQR()
    this.listaUsuarioIniciado = this.usuarioService.GetUsuarioIniciado()
    this.listaEstudiantePresente = this.usuarioService.GetEstudiantePresente()
    this.getClase(this.getId())
    this.getQR(this.getId())
    
  }

  ionViewWillEnter(){
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

  clase : IClases ={
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
  
   codQR = {
    id : "",
    idClase : "",
    imagen : ""
   }
  
  getId() {
    let url = this.router.url
    let aux = url.split("/",3)
    let id = aux[2]
    return id
  }

  getQR(id:any){
    if (id){
      this.firestore.getQRId('QR',id).subscribe((qr)=>{
        this.qr = qr || {} as IQrCodes
      })
    }
  }

  getClase(id: any) {
    if (id){
      this.firestore.getClaseId('Clases',id).subscribe((clase)=>{
        this.clase = clase || {} as IClases
      })
    }
  }

  deleteClase() {
    const classId = this.route.snapshot.paramMap.get('id')
    if (classId){
      this.firestore.deleteClase('Clases',classId);
      this.router.navigate(['/clases'])
    }
  }

  qr : IQrCodes ={
    id: this.clase.id,
    idClase: '',
    imagen: this.clase.id,
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
            
            this.qr.imagen = url;
            console.log(this.qr)
            // this.firestore.createQR('QR',this.qr)
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
    presente: false,
    nombre: "",
    apellido: ""
  }
  marcarAsistencia(p_codigo: any, p_query: any, idClase: any, rutEstudiante: any, p_nombre: any, p_apellido: any){
    if(p_codigo === p_query){
      this.presente.rutEstudiante = rutEstudiante;
      this.presente.idClase = idClase;
      this.presente.presente = true;
      this.presente.horaLlegada = this.hora.toLocaleTimeString();
      this.presente.nombre = p_nombre;
      this.presente.apellido = p_apellido;
      this.apiService.addPresente(this.presente).subscribe()
      this.router.navigate(['/clases/asistencia/'+idClase]);
      this.mensajeToast('Asistencia Confirmada.')
    }else{
      this.mensajeToast('El código es incorrecto')
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
            this.apiService.deleteQR(this.codQR.id).subscribe()
            this.mensajeToast("QR eliminado!");
            this.router.navigate(['/clases']);
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

 

  hora = new Date()
  
  addEstudiantePresente(idClase: any, rutEstudiante: any){
    this.usuarioService.addEstudiantePresente(idClase, rutEstudiante, this.hora.toLocaleTimeString())
    console.log(this.usuarioService.estudiantePresente)
    console.log(idClase,rutEstudiante)
  }
}



