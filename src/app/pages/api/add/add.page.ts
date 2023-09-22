import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IJugador } from 'src/app/interfaces/ijugador';
import { JugadorService } from 'src/app/services/api/jugador.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  //TEST
  jugador: IJugador ={
    nombre: 'Julio',
    genero: 'Tapia'
  }

  constructor(
    private apiService: JugadorService,
    private router : Router,
  ) { }

  ngOnInit() {
  }

  addJugador(){
    //Capturar longitud
    
    this.apiService.AddJugador(this.jugador).subscribe()
    this.router.navigate(['/apiList']);
  }
}
