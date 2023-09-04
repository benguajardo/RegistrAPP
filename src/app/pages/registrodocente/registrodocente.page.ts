import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioDocente } from '../home/profile/usuarios.model';

@Component({
  selector: 'app-registrodocente',
  templateUrl: './registrodocente.page.html',
  styleUrls: ['./registrodocente.page.scss'],
})
export class RegistrodocentePage implements OnInit {

  esDocente: boolean | undefined;

  constructor(private UsuarioService: UsuarioService, private router: Router, private toastController:ToastController) { }

  ngOnInit() {
  }

  listaUsuarios: UsuarioDocente[] = [];
  buscador: UsuarioDocente[] = [];

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

  addDocente(correo: any, contrasena: any, rut: any, nombre: any, imagen: any, docente: boolean=true) {
    this.UsuarioService.addUsuarioDocente(correo.value, contrasena.value, rut.value, nombre.value, imagen.value, docente);
    // Aquí debería haber una validación que tome el correo y valide si está registrado ya.
    this.mensaje("Docente registrado con éxito!");
    this.router.navigate(['/login']);
  }
}
