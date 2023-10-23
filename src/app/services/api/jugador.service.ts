import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IUsuario } from 'src/app/interfaces/iusuario';
import { IUsuarios } from 'src/app/interfaces/iusuarios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  constructor(private httpClient: HttpClient) { }

  // CRUD jugadores
  listaJugadores():Observable<IUsuarios>{
    return this.httpClient.get<IUsuarios>(`${'https://registrappjsonserver.onrender.com/'}Usuario`);
  }
  //Para agregar post
  AddJugador(jugador: IUsuario):Observable<IUsuario> {
    return this.httpClient.post<IUsuario>(`${'https://registrappjsonserver.onrender.com/'}Usuario`,jugador);
  }
  // Para obtener get
  getJugador(id: number){
    return this.httpClient.get<IUsuarios>(`${'https://registrappjsonserver.onrender.com/'}Usuario/?id=${id}`);
  }


  // Para actulizar put
  UpdateJugador(usuario: any):Observable<IUsuarios>{
    return this.httpClient.put<IUsuarios>(`${'https://registrappjsonserver.onrender.com/'}Usuario/${usuario.id}`,usuario);
  }
  // Para borrar delete
  DeleteJugador(usuario: any):Observable<IUsuarios>{
    return this.httpClient.delete<IUsuarios>(`${'https://registrappjsonserver.onrender.com/'}Usuario/${usuario.id}`);
  }

  // CRUD sede
  listaSede():Observable<IUsuarios>{
    return this.httpClient.get<IUsuarios>(`${'https://registrappjsonserver.onrender.com/'}Sede`);
  }
  
  //listaSede():Observable<IUsuarios>{
  //  return this.httpClient.get<IUsuarios>(`${environment.apiURL}Sede`);
  //}



}

