import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth : AngularFireAuth,
              private router: Router,
              private toastController: ToastController
    ) { }


    async mensaje(mensaje: string){
      const toast = await this.toastController.create({
        message: mensaje,
        duration: 2000,
        position: 'bottom'
      });
      toast.present()
    }
    
  async login(email: string, pass: string){
    try {
      const user = await this.auth.signInWithEmailAndPassword(email,pass);
      this.router.navigate(['/home']);
      this.mensaje("Bienvenido");
      console.log(user);
    } catch (error) {
      console.error('Error en login: ',error);  
      this.mensaje("Usuario inválido");
    }
  }

  async register(email: string, pass: string){
    try {
      const user = await this.auth.createUserWithEmailAndPassword(email,pass);
      console.log(user);
      this.login(email,pass);
      this.mensaje("Usuario registrado con éxito");
    } catch (error) {
      console.error('Error en registro:',error);
      this.mensaje("error");
    }
    
  }

  async logout(){
    try {
      await this.auth.signOut();
    } catch (error) {
      console.error('Error en LogOut',error);
    }
  }

  checkAuth(){
    return new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged((user) =>{
        resolve(user);
      }, (error) =>{
        reject(error);
      });
    });
  }
}
