import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JugadorService } from 'src/app/services/api/jugador.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  
  jugador ={
    id: 0,
    nombre: 'Test',
    genero: 'Si'
  }

  constructor(
    private router : Router,
    private apiService: JugadorService
  ) { }

  
  ngOnInit() {
    
  }
  
  listar(){
    this.apiService.listaJugadores().subscribe((resp) =>{
      let aux = JSON.stringify(resp)
      this.jugador = JSON.parse(aux)
      console.log(this.jugador)
    })
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

  deleteJugador(){
    this.apiService.DeleteJugador(this.jugador).subscribe();
    this.router.navigate(['/apiList'])
  }

}
