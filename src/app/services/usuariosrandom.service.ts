import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosrandomService {

  constructor(private HttpCient: HttpClient) { }
  
  getRandomUser(): Observable<any>{
    return this.HttpCient.get('https://randomuser.me/api');
  }
 
  getRandomUser2(): Observable<any>{
    return this.HttpCient.get('https://randomuser.me/api/?results=20');
  }
  
  
  

  
}