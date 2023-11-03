import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUsuario } from 'src/app/interfaces/iusuario';
import { JugadorService } from 'src/app/services/api/jugador.service';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  //TEST
  usuario: IUsuario ={
    id: '2222',
    run: '2222',
    dv: "1",
    nombre: "dsasdads",
    apellido: "saddsas",
    docente: false,
    correo: "ni.canalesm@duocuc.cl",
    contrasena: "nico123",
    carrera: "1",
    sede: "1",
    imagen:"",

  }

  constructor(
    // private apiService: JugadorService,
    private firestore: FirestoreService,
    private router : Router,
  ) { }

  ngOnInit() {
  }

  addJugador(){
    //Capturar longitud
    
    //this.apiService.AddJugador(this.usuario).subscribe()
    this.firestore.createDocument('Usuarios',this.usuario)
    this.router.navigate(['/apiList']);
  }
}
