import { Component, OnInit, booleanAttribute } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuariosrandomService } from 'src/app/services/usuariosrandom.service';
import { Usuario, usuarioIniciado } from '../profile/usuarios.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  esDocente: boolean | undefined;
  loginForm: FormGroup; // validar formulario
  user: any   //    capturar todo del usuario random
  emailValue?: string //Para capturar el correo del usuario random
  passValue?: string  //Para capturar la contraseña del usuario random
  runValue?: string  //Para capturar el run del usuario random
  nameValue?: string  //Para capturar el nombre del usuario random
  picValue?: string  //Para capturar el nombre del usuario random
  locationValue?: string  //Para capturar el nombre del usuario random

  constructor(private UsuarioService: UsuarioService,
              private router: Router, 
              private toastController:ToastController,
              private usuariosrandom: UsuariosrandomService,
              private formBuilder: FormBuilder,
              ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    })
  }

  ngOnInit() {
    this.usuariosrandom.getRandomUser().subscribe(
      (data) => {
        this.user = data.results[0] //console.log(this.user)
        this.emailValue = this.user.email
        this.passValue = this.user.login.password
        this.runValue = this.user.name.title + ' ' + this.user.name.first + ' ' + this.user.name.last
        this.nameValue = this.user.id.value
        this.picValue = this.user.picture.large
        this.locationValue = this.user.location.city
      })
  }

  listaUsuarios: Usuario[] = [];
  buscador: Usuario[] = [];
  usuarioIniciado : usuarioIniciado [] = [];
  
  listarUsuarios(){
    this.listaUsuarios = this.UsuarioService.GetAll()
  }

  async mensaje(mensaje: string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
    toast.present()
  }

  addEstudiante(correo: any, contrasena: any, rut: any, nombre: any, imagen: any, carrera: any, sede: any, docente: boolean=false) {
    this.UsuarioService.addUsuario(correo.value, contrasena.value, rut.value, nombre.value, imagen.value, carrera.value, sede.value, docente);
    this.UsuarioService.addUsuarioIniciado(correo.value,  rut.value,  nombre.value,  imagen.value,  carrera.value,  sede.value,  docente);
    this.mensaje("Estudiante registrado con éxito!");
    this.router.navigate(['home']);
  }

  addDocente(correo: any, contrasena: any, rut: any, nombre: any, imagen: any, carrera: any, sede: any, docente: boolean=true) {
    this.UsuarioService.addUsuario(correo.value, contrasena.value, rut.value, nombre.value, imagen.value, carrera.value, sede.value, docente);
    // Aquí debería haber una validación que tome el correo y valide si está registrado ya.
    this.mensaje("Docente registrado con éxito!");
    this.router.navigate(['/login']);
  }
}
