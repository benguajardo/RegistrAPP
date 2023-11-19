import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth : AngularFireAuth,
              private router: Router,
              private toastController: ToastController,
              private firestore: AngularFirestore
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

  async register(correo: any, contrasena: any, rut: any, nombre: any, apellido: any, imagen: any, carrera: any, sede: any, docente: boolean) {
    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(correo, contrasena);
      const user = userCredential.user;

      if (user) {
        const uid = user.uid;
        await this.firestore.collection('Usuarios').doc(uid).set({
          email: user.email,
          docente: docente,
          nombre: nombre,
          apellido: apellido,
          rut: rut,
          imagen: imagen,
          carrera: carrera,
          sede: sede,
          
        });
        this.logout();
        this.router.navigate(['login']);
      }
    } catch (error) {
      console.error('Error en register: ', error);
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

  getCurrentUser() {
    return this.auth.currentUser;
  }
}
