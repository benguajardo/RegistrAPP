import { Component, OnInit } from '@angular/core';
import { usuarioIniciado } from './usuarios.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
<<<<<<< HEAD
import { AuthService } from 'src/app/services/firebase/auth.service';
=======
>>>>>>> ce97312c135241df40a66a30d2eee47e24a352d8

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  
  constructor(private usuarioService: UsuarioService, 
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController, 
    private toastController : ToastController,
    private router : Router,
<<<<<<< HEAD
    private auth: AuthService,
=======
>>>>>>> ce97312c135241df40a66a30d2eee47e24a352d8
    private transService: TranslateService){
      this.langs = this.transService.getLangs();
    }
    
  listaUsuarioIniciado : usuarioIniciado [] = [];
  langs: string[] =[];
<<<<<<< HEAD

=======
  
>>>>>>> ce97312c135241df40a66a30d2eee47e24a352d8
  ngOnInit() {
  }

  ionViewWillEnter() {
  }
  async mensajeToast(mensaje: string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'  
    });
    toast.present()
  }

  async cerrarSesion() {
    const alerta = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Estás segur@ que desea cerrar sesión?',
      buttons: [
        {
          text: 'Cerrar sesión',
          handler: () => {
              this.usuarioService.deleteUsuarioIniciado();
              this.router.navigate(['/login']);
              this.mensajeToast("Sesión cerrada!");
            
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            this.mensajeToast("Acción cancelada!");
          }
        }
      ]
    });
    await alerta.present();
    let resultado = await alerta.onDidDismiss();
  }

  async logout(){
    try {
      await this.auth.logout();
      this.router.navigate(['/login'])
    } catch (error) {
      console.error('Error en logout:', Error);
    }
  }

}
