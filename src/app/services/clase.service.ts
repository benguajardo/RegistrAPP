import { Injectable } from '@angular/core';
import { Clase } from '../pages/clases/clases.model';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {
  clases : Clase [] = [
    {
      id: '1',
      nombreAsignatura: 'Programación de aplicaciones móviles',
      siglaAsignatura: 'PGY4121',
      seccion: '007D',
      fecha: '06/09/2023',
      horaInicio: '11:31',
      horaTermino: '12:50',
      sede: 'Puente Alto',
      sala: 'LC10',
      docente: 'Francisco Juillet'
    },
    {
      id: '2',
      nombreAsignatura: 'Calidad de software',
      siglaAsignatura: 'CSV 4111',
      seccion: '007D',
      fecha: '07/09/2023',
      horaInicio: '13:00',
      horaTermino: '14:20',
      sede: 'Puente Alto',
      sala: 'LC8',
      docente: 'Julio Tapia'
    }
  ];
  
  GetAll() {
    return[...this.clases]
  }

  addClase(nombreAsignatura: any, siglaAsignatura: any, seccion: any, fecha: any, horaInicio: any, horaTermino: any, sede: any, sala: any, docente: any) {
    this.clases.push({
      nombreAsignatura,siglaAsignatura, seccion, fecha, horaInicio, horaTermino, sede, sala,docente, id: this.clases.length + 1 + ""
    })
  }
  getClase(id: string){
    return {
      ...this.clases.find(aux => {
        return aux.id === id
      })
    }
  }
  deleteClase(id : string){
    this.clases = this.clases.filter(aux => {
      return aux.id !== id
    })
  }
}
