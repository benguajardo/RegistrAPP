import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuariosrandomService } from 'src/app/services/usuariosrandom.service';
import { usuarioIniciado } from '../profile/usuarios.model';

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
 

  constructor(private toastController: ToastController,
              private usuarioService: UsuarioService,
              private router: Router,
              private usuariosrandom: UsuariosrandomService,
              private formBuilder: FormBuilder
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

    const usuario = this.usuarioService.getUser(correo);
    const usuarioDocente = this.usuarioService.getUser(correo);

    if (usuario && usuario.contrasena === contrasena) {
        this.usuarioService.addUsuarioIniciado(usuario.correo,  usuario.rut,  usuario.nombre,  usuario.imagen,  usuario.carrera,  usuario.sede,  usuario.docente);
        this.router.navigate(['home']);
        
      } else if (usuarioDocente && usuarioDocente.contrasena === contrasena) {
        this.usuarioService.addUsuarioIniciado(usuarioDocente.correo,  usuarioDocente.rut,  usuarioDocente.nombre,  usuarioDocente.imagen,  usuarioDocente.carrera,  usuarioDocente.sede,  usuarioDocente.docente);
        this.router.navigate(['home']);
      } else {
        // Credenciales inválidas, mostrar mensaje de error
        this.mensaje("Credenciales inválidas. Intente nuevamente.");
      }
  }
}