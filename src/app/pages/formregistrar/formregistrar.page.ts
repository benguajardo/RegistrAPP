import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/firebase/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formregistrar',
  templateUrl: './formregistrar.page.html',
  styleUrls: ['./formregistrar.page.scss'],
})
export class FormregistrarPage implements OnInit {

  constructor(private router: Router,
    private toastController: ToastController,
    private authservice: AuthService) { }

  ngOnInit() {
  }


  async mensajeToast(mensaje: string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    })
    toast.present()
  }

  async registrarUsuario(correo: any, contrasena: any, rut: any, nombre: any, apellido: any, carrera: any, sede: any,) {
    if (contrasena.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Contraseña con pocos carácteres!",
        text: "Vuelva escribir la contraseña",
        heightAuto: false,
      });
      return;
    } else {
      Swal.fire({
        icon: "success",
        title: "Registrado con éxito!",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      const imagen = 'https://source.boringavatars.com/beam/120/'+nombre+rut+apellido
      await this.authservice.register(correo, contrasena, rut, nombre, apellido, imagen, carrera, sede, true);
      this.router.navigate(['/login']);
    }

  }
}
