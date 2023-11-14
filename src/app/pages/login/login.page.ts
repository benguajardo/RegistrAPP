import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuariosrandomService } from 'src/app/services/usuariosrandom.service';
import { usuarioIniciado } from '../profile/usuarios.model';
import { ApiService } from 'src/app/services/api/api.service';
import { IUsuario } from 'src/app/interfaces/iusuario';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  langs: string[] =[];
<<<<<<< HEAD
=======

>>>>>>> ce97312c135241df40a66a30d2eee47e24a352d8
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

<<<<<<< HEAD
constructor(private toastController: ToastController,
  private usuarioService: UsuarioService,
  private router: Router,
  private usuariosrandom: UsuariosrandomService,
  private formBuilder: FormBuilder,
  private apiService: ApiService,
  private authService: AuthService,
  private transService: TranslateService
  ){this.langs = this.transService.getLangs();
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    })
    
  } 
=======
  constructor(private toastController: ToastController,
              private usuarioService: UsuarioService,
              private router: Router,
              private usuariosrandom: UsuariosrandomService,
              private formBuilder: FormBuilder,
              private apiService: ApiService,
              private authService: AuthService,
              private transService: TranslateService
              ){this.langs = this.transService.getLangs();
                this.loginForm = this.formBuilder.group({
                  email: ['', [Validators.required]],
                  password: ['', [Validators.required, Validators.minLength(1)]]
                })
                
              } 
>>>>>>> ce97312c135241df40a66a30d2eee47e24a352d8

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
  
  login2(user:any, pass: any){
    this.authService.login(user,pass);
    //if de error
    
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

  register(correo: any, pass: any){
    this.authService.register(correo,pass);
  }
}