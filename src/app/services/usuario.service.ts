import { Injectable } from '@angular/core';
import { Usuario, estudiantePresente, usuarioIniciado } from '../pages/profile/usuarios.model';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuarioIniciado : usuarioIniciado[] = [];
  estudiantePresente : estudiantePresente[] = [];
  usuarios: Usuario[] = [
    // {
    //   id: '1',
    //   correo: 'ni.canalesm@duocuc.cl',
    //   contrasena: 'nico123',
    //   rut: 'Nicolás Canales',
    //   nombre: '20.829.058-4',
    //   imagen: 'https://media.licdn.com/dms/image/C5603AQExyrZBcecs2A/profile-displayphoto-shrink_800_800/0/1517482337073?e=1699488000&v=beta&t=bdow3LUlu6jlieCNAlOuDvXvLh7WjwdtcPp6DH83w6U',
    //   carrera: 'Ingeniería en Informática',
    //   sede: 'Puente Alto',
    //   docente: false,
    //   presente: true
    // },
    // {
    //   id: '2',
    //   correo: 'jai.marin@duocuc.cl',
    //   contrasena: 'jairo123',
    //   rut: 'Jairo Marín',
    //   nombre: '21.383.203-4',
    //   imagen: 'https://media.licdn.com/dms/image/C5603AQExyrZBcecs2A/profile-displayphoto-shrink_800_800/0/1517482337073?e=1699488000&v=beta&t=bdow3LUlu6jlieCNAlOuDvXvLh7WjwdtcPp6DH83w6U',
    //   carrera: 'Ingeniería en Informática',
    //   sede: 'Puente Alto',
    //   docente: false,
    //   presente: false
    // },
    // {
    //   id: '3',
    //   correo: 'ben.guajardo@duocuc.cl',
    //   contrasena: 'benja123',
    //   rut: 'Benjamín Guajardo',
    //   nombre: '21.009.181-5',
    //   imagen: 'https://media.licdn.com/dms/image/C5603AQExyrZBcecs2A/profile-displayphoto-shrink_800_800/0/1517482337073?e=1699488000&v=beta&t=bdow3LUlu6jlieCNAlOuDvXvLh7WjwdtcPp6DH83w6U',
    //   carrera: 'Ingeniería en Informática',
    //   sede: 'Puente Alto',
    //   docente: false,
    //   presente: true
    // },
    // {
    //   id: '4',
    //   correo: 'ju.tapia@profesor.duoc.cl',
    //   contrasena: 'julio123',
    //   rut: 'Julio Tapia',
    //   nombre: '10.089.891-k',
    //   imagen: 'https://media.licdn.com/dms/image/C5603AQExyrZBcecs2A/profile-displayphoto-shrink_800_800/0/1517482337073?e=1699488000&v=beta&t=bdow3LUlu6jlieCNAlOuDvXvLh7WjwdtcPp6DH83w6U',
    //   carrera: 'Ingeniería en Informática',
    //   sede: 'Puente Alto',
    //   docente: true
    // },
    // {
    //   id: '5',
    //   correo: '1',
    //   contrasena: '1',
    //   rut: 'Test1',
    //   nombre: '11111',
    //   imagen: 'https://media.licdn.com/dms/image/C5603AQExyrZBcecs2A/profile-displayphoto-shrink_800_800/0/1517482337073?e=1699488000&v=beta&t=bdow3LUlu6jlieCNAlOuDvXvLh7WjwdtcPp6DH83w6U',
    //   carrera: 'Ingeniería en Informática',
    //   sede: 'Puente Alto',
    //   docente: true
    // },
    // {
    //   id: '6',
    //   correo: '2',
    //   contrasena: '2',
    //   rut: 'Test2',
    //   nombre: '22222',
    //   imagen: 'https://media.licdn.com/dms/image/C5603AQExyrZBcecs2A/profile-displayphoto-shrink_800_800/0/1517482337073?e=1699488000&v=beta&t=bdow3LUlu6jlieCNAlOuDvXvLh7WjwdtcPp6DH83w6U',
    //   carrera: 'Ingeniería en Informática',
    //   sede: 'Puente Alto',
    //   docente: false,
    //   presente: false
    // }
    
  ]

  GetAll() {
    return[...this.usuarios]
  }
  
  //Metodo que devulve un usuario por el id buscado
  getUsuario(id: string){
    return {
      ...this.usuarios.find(aux => {
        return aux.id === id
      })
    }
  }

  //Metodo para agregar usuarios  
  addUsuario(correo: any, contrasena: any, rut: any, nombre: any, imagen: any, carrera: any, sede: any, docente: boolean=false) {
    this.usuarios.push({
      correo, contrasena,  rut, nombre, imagen, carrera, sede, docente, id: this.usuarios.length + 1 + ""
    })
  }

  addUsuarioDocente(correo: any, contrasena: any, rut: any, nombre: any, imagen: any, docente: boolean=true) {
    this.usuarios.push({
      correo, contrasena, rut,nombre, imagen, docente, id: this.usuarios.length + 1 + ""
    })
  }

  //Metodo para eliminar usuario por el id.
  deleteUsuario(id : string){
    this.usuarios = this.usuarios.filter(aux => {
      return aux.id !== id
    })
  }

  // Método para obtener usuario por email
  getUser(correo: string) {
    return this.usuarios.find(aux => aux.correo === correo) || null;
  }

  addUsuarioIniciado(correo: any, rut: any, nombre: any,apellido: any, imagen: any, carrera: any, sede: any, docente: any) {
    this.usuarioIniciado.push({
      correo,  rut,  nombre, apellido ,  imagen,  carrera,  sede,  docente, id:  "1"
    })
  }

  deleteUsuarioIniciado(){
    this.usuarioIniciado = [];
  }

  GetUsuarioIniciado() {
    return[...this.usuarioIniciado]
  }

  comprobarLogin(query: string){
    if(this.usuarioIniciado.length != 1){
      this.router.navigate([query])
    }
  }

  addEstudiantePresente(idClase: any, rutEstudiante: any, horaLlegada: any){
    this.estudiantePresente.push({
      idClase , rutEstudiante, presente: true, horaLlegada, idPresente: this.estudiantePresente.length + 1 +""
    })
  }
  GetEstudiantePresente() {
    return[...this.estudiantePresente]
  }
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser$: Observable<any>
  constructor(private router :Router) {
    this.currentUserSubject = new BehaviorSubject <any>(null);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }
  obtenerUsuario(user:any){
    this.currentUserSubject.next(user || null);
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  obtenerUsuarioObservable(): Observable<any>{
    return this.currentUser$;
  }

  setUid(uid : string){
    // agrega el UID al susario actual
    const currentUser = this.currentUserSubject.value;
    const updatedUser = { ...currentUser, uid: uid };
    this.currentUserSubject.next(updatedUser);
  }
}

