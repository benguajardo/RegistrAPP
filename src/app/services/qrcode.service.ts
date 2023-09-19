import { Injectable } from '@angular/core';
import { Qrcode } from '../pages/clases/scanner/qrcode.model';

@Injectable({
  providedIn: 'root'
})
export class QrcodeService {

  constructor() { }
  qrcodes : Qrcode [] = [];

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
