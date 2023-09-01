import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private UsuarioService: UsuarioService, private router: Router, private toastController:ToastController) { }

  ngOnInit() {
  }

  async mensajeToast(mensaje: string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
    toast.present()
  }
  
  addUsuario(correo: any, contrasena: any, rut: any, nombre: any, imagen: any, docente: any, carrera: any, sede: any){
    this.UsuarioService.addUsuario(correo.value, contrasena.value, rut.value, nombre.value, imagen.value, docente.value, carrera.value, sede.value);
    //Aquí debería haber una validación que tome el correo y valide si está registrado ya.
    //Si está registrado tira error, si no, crea la cuenta correctamente.
    this.mensajeToast("Usuario creado con éxito!");
    this.router.navigate(['/login'])
  }

}
