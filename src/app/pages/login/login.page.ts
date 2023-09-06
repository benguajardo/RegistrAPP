import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { usuarioIniciado } from '../profile/usuarios.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private toastController: ToastController, private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit() {
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