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
import { TranslateService } from '@ngx-translate/core';

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
  langs: string[] =[];
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
              private route : ActivatedRoute,
              private transService: TranslateService
              ){this.langs = this.transService.getLangs();}

  v_idClase:any;
  ngOnInit() {
    this.listarQR()
    this.listaUsuarioIniciado = this.usuarioService.GetUsuarioIniciado()
    this.listaEstudiantePresente = this.usuarioService.GetEstudiantePresente()
    this.getClase(this.getId())
    this.getQR(this.getId())
    this.v_idClase= this.getId()
  }
  ionViewWillEnter(){
    console.log(this.listaQR)
    this.getClase(this.getId())
  }

  listarQR() {
    this.firestore.getQR('QR').subscribe((QR)=>{
      let aux = JSON.stringify(QR)
      this.listaQR=JSON.parse(aux);
      console.log(this.listaQR[0])
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
  
   codQR : IQrCodes = {
    id: '',
    idClase:'',
    imagen:''
   }
  
  getId() {
    let url = this.router.url
    let aux = url.split("/",3)
    let id = aux[2]
    return id
  }

  getQR(id:any){
    if (id){
      this.firestore.getQR('QR').subscribe((qr)=>{
        this.listaQR=qr
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

  async deleteClase() {
    const alerta = await this.alertController.create({
      header: 'Eliminar la clase',
      message: 'Estás seguro que desea eliminar la clase?',
      buttons: [
        {
          text: 'Eliminar',
          handler: () => {
            const classId = this.route.snapshot.paramMap.get('id')
            if (classId){
              this.firestore.deleteClase('Clases',classId);
              this.router.navigate(['/clases'])
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

  qr : IQrCodes ={
    id: '',
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
            this.creaQR(p_clase, p_sala, p_asignatura, p_seccion, p_sede)
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

  creaQR(p_clase: any, p_sala: any, p_asignatura: any, p_seccion: any, p_sede: any){
    const url = `https://api.qrserver.com/v1/create-qr-code/?data=${p_clase + '-' + p_sala + '-' + p_asignatura + '-' + p_seccion + '-' + p_sede +'-'+ this.listaQR.length}&size=150x150` 
    const idClase = `${p_clase}` 
    this.qr.id = this.getId();
    this.qr.imagen = url;
    this.qr.idClase=this.getId();
    this.firestore.createQR('QR',this.qr)
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


  async deleteQR(p_idQR : any) {
    //this.mensajeToast("clase ELIMINADO!");
    const alerta = await this.alertController.create({
      header: 'Eliminar la clase',
      message: 'Estás seguro que desea eliminar la clase?',
      buttons: [
        {
          text: 'Eliminar',
          handler: () => {
            this.firestore.deleteQR('QR',p_idQR)
            this.mensajeToast("QR eliminado!");
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



