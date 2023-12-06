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
import { AuthService } from 'src/app/services/firebase/auth.service';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Geolocation } from '@capacitor/geolocation';
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
  listaUsuarios: any;
  usuario: any;
  lat :any;
  lng :any;
  v_dist:any;
  handleRefresh(event: any) {
    setTimeout(() => {
      this.listarQR()
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
              private transService: TranslateService,
              private auth: AuthService
              ){this.langs = this.transService.getLangs();
                setInterval(() => {
                  this.getLocation();
                  this.fn_Calc_Dist()
                }, 1000);}

  v_idClase:any;
  ngOnInit() {
    this.listarQR()
    this.listaUsuarioIniciado = this.usuarioService.GetUsuarioIniciado()
    this.listaEstudiantePresente = this.usuarioService.GetEstudiantePresente()
    this.getClase(this.getId())
    this.getQR(this.getId())
    this.v_idClase= this.getId()
    this.obtenerDatosUsuario()
    this.getLocation();
    this.fn_Calc_Dist()

    this.barcodes=[];
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }
  ionViewWillEnter(){
    console.log(this.listaQR)
    this.getClase(this.getId())
    this.getLocation();
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
    sala: '',
    lat :0,
    lgn: 0
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
 
  async cargarData(p_clase: any) {
    const alerta = await this.alertController.create({
      header: 'Generar código',
      message: 'Quiere generar un código QR?',
      buttons: [
        {
          text: 'Cargar',
          handler: () => {
            this.creaQR(p_clase)
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

  creaQR(p_clase: any){
    const url = `https://api.qrserver.com/v1/create-qr-code/?data=${p_clase}&size=150x150` 
    const idClase = `${p_clase}` 
    this.qr.id = this.getId();
    this.qr.imagen = url;
    this.qr.idClase=this.getId();
    this.firestore.createQR('QR',this.qr)
  }


  marcarAsistencia(p_codigo: any, p_query: any, idClase: any, rutEstudiante: any, p_nombre: any, p_apellido: any){
    const distancia= this.fn_Calc_Dist()
    if(p_codigo === p_query ){
      this.presente.rutEstudiante = rutEstudiante;
      this.presente.idClase = this.v_idClase;
      this.presente.presente = true;
      this.presente.horaLlegada = this.hora.toLocaleTimeString();
      this.presente.nombre = p_nombre;
      this.presente.apellido = p_apellido;
      this.apiService.addPresente(this.presente).subscribe()
      this.router.navigate(['/clases/asistencia/'+idClase]);
      this.mensajeToast('Asistencia Confirmada.')
    }else{
      this.mensajeToast('El código es incorrecto o estás')
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

  async obtenerDatosUsuario() {
    try {
      const usuario = await this.auth.getCurrentUser();
      if (usuario) {
        this.usuario = {
          uid: usuario.uid,
          email: usuario.email
        };
        this.listarUser(this.usuario.email)
      } else {
        console.error('No hay un usuario iniciado.');
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario: ', error);
    }
  }

  listarUser(email : string) {
    this.firestore.getCollection('Usuarios').subscribe((user)=>{
      let aux = JSON.stringify(user)
      this.listaUsuarios=JSON.parse(aux);
    })
  }


  async getLocation() {
    try {
      const coordenadas = await Geolocation.getCurrentPosition();
      this.lat = coordenadas.coords.latitude;
      this.lng = coordenadas.coords.longitude;
      console.log('lat: ',this.lat, 'lng',this.lng)
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
    }
  }

calcularDistancia(latitud1: number, longitud1: number, latitud2: number, longitud2: number): number {
    const radioTierra = 6371000; // Radio de la Tierra en metros
  
    // Convertir las latitudes y longitudes de grados a radianes
    const latitudRad1 = (latitud1 * Math.PI) / 180;
    const longitudRad1 = (longitud1 * Math.PI) / 180;
    const latitudRad2 = (latitud2 * Math.PI) / 180;
    const longitudRad2 = (longitud2 * Math.PI) / 180;
  
    // Calcular las diferencias de latitud y longitud
    const dLat = latitudRad2 - latitudRad1;
    const dLon = longitudRad2 - longitudRad1;
  
    // Calcular la distancia haversine
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(latitudRad1) * Math.cos(latitudRad2) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distancia = radioTierra * c;
  
    return distancia;
  }
  
  fn_Calc_Dist(){
    const latitudPunto1 = this.lat; // Latitud del primer punto
    const longitudPunto1 = this.lng; // Longitud del primer punto
    const latitudPunto2 = this.clase.lat; // Latitud del segundo punto
    const longitudPunto2 = this.clase.lgn; // Longitud del segundo punto
    const distancia = this.calcularDistancia(latitudPunto1, longitudPunto1, latitudPunto2, longitudPunto2);
    this.v_dist=Math.round(distancia)
  }

  estudiantePresente4(p_codigo: any, p_query: any, idClase: any, rutEstudiante: any, p_nombre: any, p_apellido: any ){
    if(p_codigo === p_query){
      this.presente.rutEstudiante = rutEstudiante;
      this.presente.idClase = idClase;
      this.presente.presente = true;
      this.presente.horaLlegada = this.hora.toLocaleTimeString();
      this.presente.nombre = p_nombre;
      this.presente.apellido = p_apellido;
      this.firestore.createPresente('Asistencia',this.presente)
      this.router.navigate(['/clases/asistencia/'+idClase]);
      this.mensajeToast('Asistencia Confirmada.')
    }else{
      this.mensajeToast('El código es incorrecto')
    }
  }

  estudiantePresente(p_codigo: any, p_query: any, idClase: any, rutEstudiante: any, p_nombre: any, p_apellido: any, ){
    if(p_codigo === p_query && this.v_dist<=50){
      this.presente.rutEstudiante = rutEstudiante;
      this.presente.idClase = idClase;
      this.presente.presente = true;
      this.presente.horaLlegada = this.hora.toLocaleTimeString();
      this.presente.nombre = p_nombre;
      this.presente.apellido = p_apellido;
      this.firestore.createPresente('Asistencia',this.presente)
      this.router.navigate(['/clases/asistencia/'+idClase]);
      this.mensajeToast('Asistencia Confirmada.')
    }else{
      this.mensajeToast('El código es incorrecto o estás demasiado lejos de la sala')
    }
  }


  isSupported = false;
  barcodes: Barcode[] = [];
  v_barcode : string ='';

  async scan(p_codigo: any, p_idClase:any, rutEstudiante: any, p_nombre: any, p_apellido: any): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    // deja la lista de barcodes vacía para que sólo haya un barcode
    this.barcodes=[];
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
    this.estudiantePresente(p_codigo,this.barcodes[0],p_idClase,rutEstudiante,p_nombre,p_apellido)
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}



