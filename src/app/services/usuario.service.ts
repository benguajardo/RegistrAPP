import { Injectable } from '@angular/core';
import { Usuario, usuarioIniciado } from '../pages/profile/usuarios.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuarioIniciado : usuarioIniciado[] = [];
  usuarios: Usuario[] = [
    {
      id: '1',
      correo: 'ni.canalesm@duocuc.cl',
      contrasena: 'nico123',
      rut: '20.829.058-4',
      nombre: 'Nicolás Canales',
      imagen: 'data:image/jpeg;base64,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',
      carrera: 'Ingeniería en Informática',
      sede: 'Puente Alto',
      docente: false
    },
    {
      id: '2',
      correo: 'jai.marin@duocuc.cl',
      contrasena: 'jairo123',
      rut: '21.383.203-4',
      nombre: 'Jairo Marín',
      imagen: 'data:image/jpeg;base64,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',
      carrera: 'Ingeniería en Informática',
      sede: 'Puente Alto',
      docente: false
    },
    {
      id: '3',
      correo: 'ben.guajardo@duocuc.cl',
      contrasena: 'benja123',
      rut: '21.009.181-5',
      nombre: 'Benjamín Guajardo',
      imagen: 'data:image/jpeg;base64,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',
      carrera: 'Ingeniería en Informática',
      sede: 'Puente Alto',
      docente: false
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

 
  constructor() { }
  
}

