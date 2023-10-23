import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IClase } from 'src/app/interfaces/iclase';
import { IClases } from 'src/app/interfaces/iclases';
import { IPresente } from 'src/app/interfaces/ipresente';
import { IPresentes } from 'src/app/interfaces/ipresentes';
import { IQrCode } from 'src/app/interfaces/iqr-code';
import { IQrCodes } from 'src/app/interfaces/iqr-codes';
import { IUsuario } from 'src/app/interfaces/iusuario';
import { IUsuarios } from 'src/app/interfaces/iusuarios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  
  constructor(private httpClient: HttpClient) { }
  apiURL= 'https://registrappjsonserver.onrender.com/'

  // CRUD usuarios
  listaUsuarios():Observable<IUsuarios>{
    return this.httpClient.get<IUsuarios>(`${this.apiURL}Usuario`);
  }
  //Para agregar post
  addUsuario(user: IUsuario):Observable<IUsuario> {
    return this.httpClient.post<IUsuarios>(`${this.apiURL}Usuario`,user);
  }
  // Para obtener get
  getUsuario(id: any){
    return this.httpClient.get<IUsuarios>(`${this.apiURL}Usuario/?id=${id}`);
  }
  // Para actulizar put
  updateUsuario(usuario: any):Observable<IUsuarios>{
    return this.httpClient.put<IUsuarios>(`${this.apiURL}Usuario/${usuario.id}`,usuario);
  }
  // Para borrar delete
  deleteUsuario(id: any):Observable<IUsuarios>{
    return this.httpClient.delete<IUsuarios>(`${this.apiURL}Usuario/${id}`);
  }

  getUsuarioPorCorreo(correo: string) {
    return this.httpClient.get<IUsuario[]>('apiURL/Usuarios').pipe(
      map((usuarios: any[]) => usuarios.find((usuario) => usuario.correo === correo && usuario.correo === correo))
    );
  }

  // CRUD clases
  listaClases():Observable<IClases>{
    return this.httpClient.get<IClases>(`${this.apiURL}Clase`);
  }
  //Para agregar post
  addClase(clase: IClase):Observable<IClase> {
    return this.httpClient.post<IClase>(`${this.apiURL}Clase`,clase);
  }
  // Para obtener get
  getClase(id: any){
    return this.httpClient.get<IClases>(`${this.apiURL}Clase/?id=${id}`);
  }
  // Para actulizar put
  updateClase(clase: any):Observable<IClases>{
    return this.httpClient.put<IClases>(`${this.apiURL}Clase/${clase.id}`,clase);
  }
  // Para borrar delete
  deleteClase(id: any):Observable<IClases>{
    return this.httpClient.delete<IClases>(`${this.apiURL}Clase/${id}`);
  }
  
  
  // CRUD QR
  listaQR():Observable<IQrCodes>{
    return this.httpClient.get<IQrCodes>(`${this.apiURL}CodigoQR`);
  }
  //Para agregar post
  addQR(qr: IQrCode):Observable<IQrCode> {
    return this.httpClient.post<IQrCode>(`${this.apiURL}CodigoQR`,qr);
  }
  // Para obtener get
  getQR(id: any){
    return this.httpClient.get<IQrCodes>(`${this.apiURL}CodigoQR/?id=${id}`);
  }
  // Para actulizar put
  updateQR(qr: any):Observable<IQrCodes>{
    return this.httpClient.put<IQrCodes>(`${this.apiURL}CodigoQR/${qr.id}`,qr);
  }
  // Para borrar delete
  deleteQR(id: any):Observable<IQrCodes>{
    return this.httpClient.delete<IQrCodes>(`${this.apiURL}CodigoQR/${id}`);
  }
  

  // CRUD QR
  listaPresentes():Observable<IPresentes>{
    return this.httpClient.get<IPresentes>(`${this.apiURL}estudiantePresente`);
  }
  //Para agregar post
  addPresente(ePresente: IPresente):Observable<IPresente> {
    return this.httpClient.post<IPresente>(`${this.apiURL}estudiantePresente`,ePresente);
  }
  // Para obtener get
  getPresente(id: any){
    return this.httpClient.get<IPresentes>(`${this.apiURL}estudiantePresente/?id=${id}`);
  }
  // Para actulizar put
  updatePresente(ePresente: any):Observable<IPresentes>{
    return this.httpClient.put<IPresentes>(`${this.apiURL}estudiantePresente/${ePresente.id}`,ePresente);
  }
  // Para borrar delete
  deletePresente(id: any):Observable<IPresentes>{
    return this.httpClient.delete<IPresentes>(`${this.apiURL}estudiantePresente/${id}`);
  }

}