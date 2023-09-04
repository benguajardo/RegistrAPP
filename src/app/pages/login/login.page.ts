import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private toastController: ToastController, private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
  }

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
        this.router.navigate(['home']); 
      } else if (usuarioDocente && usuarioDocente.contrasena === contrasena ) {
        this.router.navigate(['home']);
      } else {
        // Credenciales inválidas, mostrar mensaje de error
        this.mensaje("Credenciales inválidas. Intente nuevamente.");
      }
  }
}