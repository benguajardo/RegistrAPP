import { Component, OnInit } from '@angular/core';
import { Clase } from './clases.model';
import { Router } from '@angular/router';
import { ClaseService } from 'src/app/services/clase.service';
import { usuarioIniciado } from '../profile/usuarios.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ApiService } from 'src/app/services/api/api.service';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/firebase/auth.service';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {
  listaUsuarioIniciado : usuarioIniciado [] = []
  listaClases : any = [];
  langs: string[] =[];
  listaUsuarios: any;
  usuario : any;
  constructor(private router: Router, private usuarioService : UsuarioService, private claseService: ClaseService,
    private apiService: ApiService, private firestore : FirestoreService,
              private transService: TranslateService,
              private auth : AuthService) {
      this.langs = this.transService.getLangs();
     }

  ngOnInit() {
    this.obtenerDatosUsuario()
    this.listar()
  }
  
  ionViewWillEnter() {
    this.listar()
  }

  listar() {
    this.firestore.getClases('Clases').subscribe((Clases)=>{
      let aux = JSON.stringify(Clases)
      this.listaClases=JSON.parse(aux);
      console.log(this.listaClases[0])
    })
  }

  async obtenerDatosUsuario() {
    try {
      const usuario = await this.auth.getCurrentUser();
      if (usuario) {
        this.usuario = {
          uid: usuario.uid,
          email: usuario.email
        };
        this.listarUser(this.usuario.email)
      } else {
        console.error('No hay un usuario iniciado.');
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario: ', error);
    }
  }

  listarUser(email : string) {
    this.firestore.getCollection('Usuarios').subscribe((user)=>{
      let aux = JSON.stringify(user)
      this.listaUsuarios=JSON.parse(aux);
    })
  }
}