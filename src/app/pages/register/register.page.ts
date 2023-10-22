import { Component, OnInit, booleanAttribute } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuariosrandomService } from 'src/app/services/usuariosrandom.service';
import { Usuario, usuarioIniciado } from '../profile/usuarios.model';
import { IUsuario } from 'src/app/interfaces/iusuario';
import { ApiService } from 'src/app/services/api/api.service';
import { timestamp } from 'rxjs';

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
              private apiService :ApiService
              ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    })
  }
  usuario: IUsuario ={
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

  ngOnInit() {
    this.usuariosrandom.getRandomUser().subscribe(
      (data) => {
        this.user = data.results[0] //console.log(this.user)
        this.usuario.correo = this.user.email
        this.usuario.contrasena = this.user.login.password
        this.usuario.nombre = this.user.name.first
        this.usuario.apellido = this.user.name.last
        this.usuario.run = this.user.id.value
        this.picValue = 'https://robohash.org/'+this.usuario.run
        this.usuario.imagen = this.picValue
        this.usuario.sede = this.user.location.city
        this.usuario.sede = this.user.location.city
      })
  }

  listaUsuarios: Usuario[] = [];
  buscador: Usuario[] = [];
  usuarioIniciado : usuarioIniciado [] = [];
  
  listarUsuarios(){
    this.listaUsuarios = this.UsuarioService.GetAll()
  }

  listadoUsuarios = this.listarUsuarios;

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
    this.apiService.addUsuario(this.usuario).subscribe(() => {
      // Aquí puedes realizar acciones adicionales si es necesario después de agregar el jugador
      //ALERTA AQUÍ
      console.log('Usuario añadido con éxito');
  });
    this.UsuarioService.addUsuarioIniciado(correo.value,  rut.value,  nombre.value,  imagen.value,  carrera.value,  sede.value,  docente);
    this.mensaje("Estudiante registrado con éxito!");
    this.router.navigate(['home']);
  }

  addEstudiante2(correo: any, contrasena: any, rut: any, nombre: any, imagen: any, carrera: any, sede: any, docente: any) {
    this.UsuarioService.addUsuario(correo.value, contrasena.value, rut.value, nombre.value, imagen.value, carrera.value, sede.value, docente);
    this.apiService.addUsuario(this.usuario).subscribe(() => {
  });
  }

  Registrar20() {
    for (let i = 0; i < 10; i++) {
      this.usuariosrandom.getRandomUser2().subscribe(
        (data) => {
          this.user = data.results[0] //console.log(this.user)
          this.usuario.correo = this.user.email
          this.usuario.contrasena = this.user.login.password
          this.usuario.nombre = this.user.name.first
          this.usuario.apellido = this.user.name.last
          this.usuario.run = this.user.id.value
          this.picValue = 'https://robohash.org/'+this.usuario.run
          this.usuario.imagen = this.picValue
          this.usuario.sede = this.user.location.city
          this.usuario.sede = this.user.location.city
          this.usuario.docente = false
          this.addEstudiante('correo', 'contrasena', 'rut', 'nombre', 'imagen', 'carrera', 'sede');
        })
      }
      for (let i = 0; i < 10; i++) {
        this.usuariosrandom.getRandomUser2().subscribe(
          (data) => {
            this.user = data.results[0] //console.log(this.user)
            this.usuario.correo = this.user.email
            this.usuario.contrasena = this.user.login.password
            this.usuario.nombre = this.user.name.first
            this.usuario.apellido = this.user.name.last
            this.usuario.run = this.user.id.value
            this.picValue = 'https://robohash.org/'+this.usuario.run
            this.usuario.imagen = this.picValue
            this.usuario.sede = this.user.location.city
            this.usuario.sede = this.user.location.city
            this.usuario.docente = true
            this.addEstudiante2('correo', 'contrasena', 'rut', 'nombre', 'imagen', 'carrera', 'sede', this.usuario.docente);
          })
        }
        this.mensaje('Se han importado 20 cuentas.')
  }

  
}
