import { Injectable } from '@angular/core';
import { Qrcode } from '../pages/clases/scanner/qrcode.model';

@Injectable({
  providedIn: 'root'
})
export class QrcodeService {

  constructor() { }
  qrcodes : Qrcode [] = [
    {
      id: '1',
      idclase: '1',
      qrcode: 'https://i.pinimg.com/originals/60/c1/4a/60c14a43fb4745795b3b358868517e79.png'
    },
    {
      id: '666666',
      idclase: '6666666',
      qrcode: 'https://i.pinimg.com/originals/60/c1/4a/60c14a43fb4745795b3b358868517e79.png'
    }
  ];

  GetAll() {
    return[...this.qrcodes]
  }

  getClase(id: string){
    return {
      ...this.qrcodes.find(aux => {
        return aux.id === id
      })
    }
  }
  
  addClase(idclase: any, qrcode: any) {
    this.qrcodes.push({
      idclase,qrcode, id: this.qrcodes.length + 1 + ""
    })
  }

  deleteClase(id : string){
    this.qrcodes = this.qrcodes.filter(aux => {
      return aux.id !== id
    })
  }


}
