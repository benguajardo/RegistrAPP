import { Component, OnInit, booleanAttribute } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../home/profile/usuarios.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  esDocente: boolean | undefined;

  constructor(private UsuarioService: UsuarioService, private router: Router, private toastController:ToastController) { }

  ngOnInit() {
  }

  listaUsuarios: Usuario[] = [];
  buscador: Usuario[] = [];

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
    // Aquí debería haber una validación que tome el correo y valide si está registrado ya.
    this.mensaje("Estudiante registrado con éxito!");
    this.router.navigate(['/login']);
  }

  addDocente(correo: any, contrasena: any, rut: any, nombre: any, imagen: any, carrera: any, sede: any, docente: boolean=true) {
    this.UsuarioService.addUsuario(correo.value, contrasena.value, rut.value, nombre.value, imagen.value, carrera.value, sede.value, docente);
    // Aquí debería haber una validación que tome el correo y valide si está registrado ya.
    this.mensaje("Docente registrado con éxito!");
    this.router.navigate(['/login']);
  }
}
