import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IUsuario } from 'src/app/interfaces/iusuario';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore : AngularFirestore) { }

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
  
}
