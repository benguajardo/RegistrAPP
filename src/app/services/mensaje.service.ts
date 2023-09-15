import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  mensajePersonalizadoBoton(icon: any, title: any, text:any, footer: any, boton : any){
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      heightAuto: false,
      footer: footer,
      confirmButtonText: boton ,
    })
  }
  mensajePersonalizadoTimer(icon: any, title: any, text:any, footer: any, timer : any){
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      heightAuto: false,
      footer: footer,
      timer: timer,
      showConfirmButton: false,
    })
  }

  avisoLogin(){
    Swal.fire({
      title: 'Sesión iniciada con éxito.',
      timer: 3000,
      heightAuto: false,
      showConfirmButton: false,
      position: 'top-end',
      timerProgressBar: true,
    })
  }

  //ARREGLAR
  loading(title: any, timer: any){
    Swal.fire({
      icon: 'info',
      title: title,
      timer: timer,
      heightAuto: false,
      showConfirmButton: false,
      position: 'center',
      timerProgressBar: true
    })
  }
  constructor() { }
}
