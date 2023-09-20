import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IJugador } from 'src/app/interfaces/ijugador';
import { IJugadores } from 'src/app/interfaces/ijugadores';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  constructor(private httpClient: HttpClient) { }

  listaJugadores():Observable<IJugadores>{
    return this.httpClient.get<IJugadores>(`${environment.apiURL}/jugadores`);
  }
  //Para agregar post
  AddJugador(jugador: IJugador):Observable<IJugador> {
    return this.httpClient.post<IJugador>(`${environment.apiURL}/jugadores`,jugador);
  }
  // Para obtener get
  getJugador(id: number){
    return this.httpClient.get<IJugadores>(`${environment.apiURL}/jugadores/?id=${id}`);
  }
  // Para actulizar put
  UpdateJugador(jugador: any):Observable<IJugadores>{
    return this.httpClient.put<IJugadores>(`${environment.apiURL}/jugadores/${jugador.id}`,jugador);
  }
  // Para borrar delete
  DeleteJugador(jugador: any):Observable<IJugadores>{
    return this.httpClient.delete<IJugadores>(`${environment.apiURL}/jugadores/${jugador.id}`);
  }
  



}

