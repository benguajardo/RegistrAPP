import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JugadorService } from 'src/app/services/api/jugador.service';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  listaJugadores: any = []

  constructor(
    private router : Router,
    private firestore : FirestoreService,
    private jugadoresApi: JugadorService
  ) { }

  ngOnInit() {
    // this.jugadoresApi.listaJugadores().subscribe((resp)=>{
    //   this.listaJugadores = resp
    // })
    this.firestore.getCollection('Usuarios').subscribe((usuarios)=>{
      this.listaJugadores=usuarios;
    })
  }

  add(){
    this.router.navigate(['/apiAdd'])
  }
  
  update(){
    this.router.navigate(['/apiUpdate'])
  }

}
