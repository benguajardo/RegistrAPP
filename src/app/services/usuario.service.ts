import { Injectable } from '@angular/core';
import { Usuario, estudiantePresente, usuarioIniciado } from '../pages/profile/usuarios.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuarioIniciado : usuarioIniciado[] = [];
  estudiantePresente : estudiantePresente[] = [];
  usuarios: Usuario[] = [
    {
      id: '1',
      correo: 'ni.canalesm@duocuc.cl',
      contrasena: 'nico123',
      rut: '20.829.058-4',
      nombre: 'Nicolás Canales',
      imagen: 'https://media.licdn.com/dms/image/C5603AQExyrZBcecs2A/profile-displayphoto-shrink_800_800/0/1517482337073?e=1699488000&v=beta&t=bdow3LUlu6jlieCNAlOuDvXvLh7WjwdtcPp6DH83w6U',
      carrera: 'Ingeniería en Informática',
      sede: 'Puente Alto',
      docente: false,
      presente: true
    },
    {
      id: '2',
      correo: 'jai.marin@duocuc.cl',
      contrasena: 'jairo123',
      rut: '21.383.203-4',
      nombre: 'Jairo Marín',
      imagen: 'https://media.licdn.com/dms/image/C5603AQExyrZBcecs2A/profile-displayphoto-shrink_800_800/0/1517482337073?e=1699488000&v=beta&t=bdow3LUlu6jlieCNAlOuDvXvLh7WjwdtcPp6DH83w6U',
      carrera: 'Ingeniería en Informática',
      sede: 'Puente Alto',
      docente: false,
      presente: false
    },
    {
      id: '3',
      correo: 'ben.guajardo@duocuc.cl',
      contrasena: 'benja123',
      rut: '21.009.181-5',
      nombre: 'Benjamín Guajardo',
      imagen: 'https://media.licdn.com/dms/image/C5603AQExyrZBcecs2A/profile-displayphoto-shrink_800_800/0/1517482337073?e=1699488000&v=beta&t=bdow3LUlu6jlieCNAlOuDvXvLh7WjwdtcPp6DH83w6U',
      carrera: 'Ingeniería en Informática',
      sede: 'Puente Alto',
      docente: false,
      presente: true
    },
    {
      id: '4',
      correo: 'ju.tapia@profesor.duoc.cl',
      contrasena: 'julio123',
      rut: '10.089.891-k',
      nombre: 'Julio Tapia',
      imagen: 'https://media.licdn.com/dms/image/C5603AQExyrZBcecs2A/profile-displayphoto-shrink_800_800/0/1517482337073?e=1699488000&v=beta&t=bdow3LUlu6jlieCNAlOuDvXvLh7WjwdtcPp6DH83w6U',
      carrera: 'Ingeniería en Informática',
      sede: 'Puente Alto',
      docente: true
    },
    {
      id: '5',
      correo: '1',
      contrasena: '1',
      rut: '111111',
      nombre: 'Test',
      imagen: 'https://media.licdn.com/dms/image/C5603AQExyrZBcecs2A/profile-displayphoto-shrink_800_800/0/1517482337073?e=1699488000&v=beta&t=bdow3LUlu6jlieCNAlOuDvXvLh7WjwdtcPp6DH83w6U',
      carrera: 'Ingeniería en Informática',
      sede: 'Puente Alto',
      docente: true
    },
    {
      id: '6',
      correo: '2',
      contrasena: '2',
      rut: '222222',
      nombre: 'Test',
      imagen: 'https://media.licdn.com/dms/image/C5603AQExyrZBcecs2A/profile-displayphoto-shrink_800_800/0/1517482337073?e=1699488000&v=beta&t=bdow3LUlu6jlieCNAlOuDvXvLh7WjwdtcPp6DH83w6U',
      carrera: 'Ingeniería en Informática',
      sede: 'Puente Alto',
      docente: false,
      presente: false
    }
    
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
      correo, contrasena, nombre, rut, imagen, carrera, sede, docente, id: this.usuarios.length + 1 + ""
    })
  }

  addUsuarioDocente(correo: any, contrasena: any, rut: any, nombre: any, imagen: any, docente: boolean=true) {
    this.usuarios.push({
      correo, contrasena, nombre, rut, imagen, docente, id: this.usuarios.length + 1 + ""
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

  addUsuarioIniciado(correo: any, rut: any, nombre: any, imagen: any, carrera: any, sede: any, docente: any) {
    this.usuarioIniciado.push({
      correo,  rut,  nombre,  imagen,  carrera,  sede,  docente, id:  "1"
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

  constructor(private router :Router) { }
  
}

