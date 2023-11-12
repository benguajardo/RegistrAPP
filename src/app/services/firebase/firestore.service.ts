import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IClase } from 'src/app/interfaces/iclase';
import { IClases } from 'src/app/interfaces/iclases';
import { IPresente } from 'src/app/interfaces/ipresente';
import { IPresentes } from 'src/app/interfaces/ipresentes';
import { IQrCode } from 'src/app/interfaces/iqr-code';
import { IQrCodes } from 'src/app/interfaces/iqr-codes';
import { IUsuario } from 'src/app/interfaces/iusuario';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore : AngularFirestore) { }
  // crud user 
  getCollection(nombreColeccion:string){
    return this.firestore.collection<IUsuario>(nombreColeccion).valueChanges({idField: 'id'});
  }
  createDocument(nombreColeccion:string, data: IUsuario){
    return this.firestore.collection<IUsuario>(nombreColeccion).add(data);
  }
  updateDocument(nombreColeccion:string,documentId: string, data: IUsuario){
    return this.firestore.collection<IUsuario>(nombreColeccion).doc(documentId).update(data);
  }
  deleteDocument(nombreColeccion:string,documentId: string){
    return this.firestore.collection<IUsuario>(nombreColeccion).doc(documentId).delete();
  }
  getUsuarioId(nombreColeccion:string,documentId: string){
    return this.firestore.collection<IUsuario>(nombreColeccion).doc(documentId).valueChanges();
  }

  // crud clases
  getClases(nombreColeccion:string){
    return this.firestore.collection<IClases>(nombreColeccion).valueChanges({idField: 'id'});
  }
  createClase(nombreColeccion:string, data: IClase){
    return this.firestore.collection<IClase>(nombreColeccion).add(data);
  }
  updateClase(nombreColeccion:string,ClaseId: string, data: IClase){
    return this.firestore.collection<IClases>(nombreColeccion).doc(ClaseId).update(data);
  }
  deleteClase(nombreColeccion:string,ClaseId: string){
    return this.firestore.collection<IClases>(nombreColeccion).doc(ClaseId).delete();
  }
  getClaseId(nombreColeccion:string, ClaseId: any){
    return this.firestore.collection<IClases>(nombreColeccion).doc(ClaseId).valueChanges();
  }
  
  // crud QR
  getQR(nombreColeccion:string){
    return this.firestore.collection<IQrCodes>(nombreColeccion).valueChanges({idField: 'id'});
  }
  createQR(nombreColeccion:string, data: IQrCodes){
    return this.firestore.collection<IQrCodes>(nombreColeccion).add(data);
  }
  updateQR(nombreColeccion:string,QRId: string, data: IQrCodes){
    return this.firestore.collection<IQrCodes>(nombreColeccion).doc(QRId).update(data);
  }
  deleteQR(nombreColeccion:string,QRId: string){
    return this.firestore.collection<IQrCodes>(nombreColeccion).doc(QRId).delete();
  }
  getQRId(nombreColeccion:string, QRId: string){
    return this.firestore.collection<IQrCodes>(nombreColeccion).doc(QRId).valueChanges();
  }

  getPresente(nombreColeccion:string){
    return this.firestore.collection<IPresentes>(nombreColeccion).valueChanges({idField: 'id'});
  }
  createPresente(nombreColeccion:string, data: IPresente){
    return this.firestore.collection<IPresente>(nombreColeccion).add(data);
  }
  updatePresente(nombreColeccion:string,PresenteId: string, data: IPresentes){
    return this.firestore.collection<IPresentes>(nombreColeccion).doc(PresenteId).update(data);
  }
  deletePresente(nombreColeccion:string,PresenteId: string){
    return this.firestore.collection<IPresentes>(nombreColeccion).doc(PresenteId).delete();
  }
  getPresenteId(nombreColeccion:string, PresenteId: string){
    return this.firestore.collection<IPresentes>(nombreColeccion).doc(PresenteId).valueChanges();
  }
  
}
