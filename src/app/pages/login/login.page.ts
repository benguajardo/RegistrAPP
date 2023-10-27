import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuariosrandomService } from 'src/app/services/usuariosrandom.service';
import { usuarioIniciado } from '../profile/usuarios.model';
import { ApiService } from 'src/app/services/api/api.service';
import { IUsuario } from 'src/app/interfaces/iusuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
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
              ){
                this.loginForm = this.formBuilder.group({
                  email: ['', [Validators.required]],
                  password: ['', [Validators.required, Validators.minLength(1)]]
                })
                
              } 

  ngOnInit() {
    //AQUI SE ABRE EL MODAL DE TERMINOS Y CONDICIONES PQ NO QUEREMOS HACER UNA PÁGINA MÁS
    //COMO ABRIR UN COMPONENTE
    this.usuariosrandom.getRandomUser().subscribe(
      (data) => {
        this.user = data.results[0] //console.log(this.user)
        this.emailValue = this.user.email
        this.passValue = this.user.login.password
      })
    console.log('users',this.listaUsuarios)
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

  login(correo: any, contrasena: any) {
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
}