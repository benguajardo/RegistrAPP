import { Component, OnInit } from '@angular/core';
import { usuarioIniciado } from './usuarios.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { IUsuario } from 'src/app/interfaces/iusuario';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  
  constructor(private usuarioService: UsuarioService, 
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController, 
    private toastController : ToastController,
    private router : Router,
    private auth: AuthService,
    private firestore :FirestoreService,
    private transService: TranslateService){
      this.langs = this.transService.getLangs();
    }
    
  listaUsuarioIniciado : usuarioIniciado [] = [];
  listaUsuarios : any;
  langs: string[] =[];
  usuario : any;
  user: IUsuario = {
    id: '',
    run: '',
    apellido: '',
    carrera: '',
    contrasena: '',correo: '',
    docente: false,
    imagen: '',
    nombre: '',
    sede: '',
    dv: '',
  }
  ngOnInit() {
    this.obtenerDatosUsuario();
  }

  ionViewWillEnter() {
    this.obtenerDatosUsuario();
  }
  async mensajeToast(mensaje: string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'  
    });
    toast.present()
  }

  async cerrarSesion() {
    const alerta = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Estás segur@ que desea cerrar sesión?',
      buttons: [
        {
          text: 'Cerrar sesión',
          handler: () => {
              this.usuarioService.deleteUsuarioIniciado();
              this.router.navigate(['/login']);
              this.mensajeToast("Sesión cerrada!");
            
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

  async logout(){
    try {
      await this.auth.logout();
      this.router.navigate(['/login'])
    } catch (error) {
      console.error('Error en logout:', Error);
    }
  }


  async obtenerDatosUsuario() {
    try {
      const usuario = await this.auth.getCurrentUser();
      if (usuario) {
        this.usuario = {
          uid: usuario.uid,
          email: usuario.email
        };
        this.listar(this.usuario.email)
        console.log('user: ',this.usuario)
      } else {
        console.error('No hay un usuario iniciado.');
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario: ', error);
    }
  }

  listar(email : string) {
    this.firestore.getCollection('Usuarios').subscribe((user)=>{
      let aux = JSON.stringify(user)
      this.listaUsuarios=JSON.parse(aux);
      console.log('usuario',this.listaUsuarios);
    })
  }
}
