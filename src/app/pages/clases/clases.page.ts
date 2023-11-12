import { Component, OnInit } from '@angular/core';
import { Clase } from './clases.model';
import { Router } from '@angular/router';
import { ClaseService } from 'src/app/services/clase.service';
import { usuarioIniciado } from '../profile/usuarios.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ApiService } from 'src/app/services/api/api.service';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {
  listaUsuarioIniciado : usuarioIniciado [] = []
  listaClases : any = [];

  constructor(private router: Router, private usuarioService : UsuarioService, private claseService: ClaseService,
    private apiService: ApiService, private firestore : FirestoreService) { }

  ngOnInit() {
    this.listar()
    
  }
  ionViewWillEnter() {
    this.listar()
    
  }
  listar() {
    this.firestore.getCollection('Clases').subscribe((Clases)=>{
      let aux = JSON.stringify(Clases)
      this.listaClases=JSON.parse(aux);
      console.log(this.listaClases[0])
    })
  }
}