import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuariosrandomService } from 'src/app/services/usuariosrandom.service';
import { usuarioIniciado } from '../profile/usuarios.model';
import { ApiService } from 'src/app/services/api/api.service';
import { IUsuario } from 'src/app/interfaces/iusuario';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  langs: string[] =[];
  loginForm: FormGroup // validar formulario
  user: any   //    capturar todo del usuario random
  emailValue?: string //Para capturar el correo del usuario random
  passValue?: string  //Para capturar la contraseña del usuario random
  listaUsuarios: any = [];

 usuario : IUsuario ={
  id: '',
  run: '',
  dv: "",
  nombre: "",
  apellido: "",
  docente: false,
  correo: "",
  contrasena: "",
  carrera: "ingeniería en informática",
  sede: "",
  imagen: "",

}

constructor(private toastController: ToastController,
  private usuarioService: UsuarioService,
  private router: Router,
  private usuariosrandom: UsuariosrandomService,
  private formBuilder: FormBuilder,
  private apiService: ApiService,
  private authService: AuthService,
  private alertController: AlertController,
  private transService: TranslateService,
  private firestore: FirestoreService
  ){this.langs = this.transService.getLangs();
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    })
    
  } 

  ngOnInit() {
    this.passValue=''
    this.emailValue=''
    this.authService.checkAuth().then((user)=>{
      if(user){
        this.router.navigate(['home']);
      }
    })
    .catch((error) =>{
      console.log('Error en autenticación:',error);
    });
  }

  ionViewWillEnter() {
    this.passValue=''
    this.emailValue=''
  }

  usuarioIniciado : usuarioIniciado [] = [];


  async mensaje(mensaje: string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
    toast.present()
  }
  
  async login2(user:any, pass: any){
    this.authService.login(user,pass);
    
  }

  login(correo: any, contrasena: any) {
    contrasena = this.passValue
    if (!correo || !contrasena) {
      this.mensaje("Debe completar todos los campos.");
      return;
    }
    this.apiService.getUsuario(correo).subscribe((resp:any) => {
      this.usuario ={
        id: resp[0].id,
        run: resp[0].run,
        dv: resp[0].dv,
        nombre: resp[0].nombre,
        apellido: resp[0].apellido,
        docente: resp[0].docente,
        correo: resp[0].correo,
        contrasena: resp[0].contrasena,
        carrera: resp[0].carrera,
        sede: resp[0].sede,
        imagen: resp[0].imagen,
      }

    if (this.usuario && this.usuario.contrasena === contrasena) {
        this.usuarioService.addUsuarioIniciado(this.usuario.correo,  this.usuario.run,  this.usuario.nombre,this.usuario.apellido,  this.usuario.imagen,  
                                               this.usuario.carrera,  this.usuario.sede,  this.usuario.docente);
        this.router.navigate(['home']);
      } else {
        
        this.mensaje("Credenciales inválidas. Intente nuevamente.");
      }
    })
  }

  register(){
    this.router.navigate(['register'])
  }

  async recuperarContrasena() {
    const alert = await this.alertController.create({
        header: 'Recuperar Contraseña',
        inputs: [
            {
                name: 'email',
                type: 'text',
                placeholder: 'Correo Electrónico',
            },
        ],
        buttons: [
            {
                text: 'Cancelar',
                role: 'cancel',
            },
            {
                text: 'Enviar',
                handler: async (data) => {
                    try {
                        const user = await this.authService.obtenerEmail(data.email);

                        if (user && user.docs.length > 0) {
                            await this.authService.restablecerContraseña(data.email);
                            this.mensaje('Se ha enviado un correo electrónico.');
                        } else {
                            this.mensaje('El correo electrónico ingresado no se encuentra registrado.');
                        }
                    } catch (error) {
                        this.mensaje('Hubo un error al enviar el correo electrónico.');
                    }
                },
            },
        ],
    });

    await alert.present();
  }
}