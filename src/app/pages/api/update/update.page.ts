import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IJugador } from 'src/app/interfaces/ijugador';
import { JugadorService } from 'src/app/services/api/jugador.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  //TEST
  jugador ={
    id: 0,
    nombre: 'Test',
    genero: 'Si'
  }
  
  constructor(
    private apiService: JugadorService,
    private router : Router,
  ) { }

  ngOnInit() {
    console.log(this.getId())
  }

  getId(){
    let url = this.router.url
    let aux = url.split("/",3)
    let id = parseInt(aux[2])
    return id
  }

  ionViewWillEnter(){
    this.getJugador(this.getId())
  }

  getJugador(id: number){
    this.apiService.getJugador(id).subscribe((resp:any) => {
      this.jugador ={
        id: resp[0].id,
        nombre: resp[0].nombre,
        genero: resp[0].genero
      }
    })
  }

  updateJugador(){
    this.apiService.UpdateJugador(this.jugador).subscribe();
    this.router.navigate(['/apiList'])
  }
}
