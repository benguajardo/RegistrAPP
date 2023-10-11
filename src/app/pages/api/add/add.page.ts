import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUsuario } from 'src/app/interfaces/iusuario';
import { JugadorService } from 'src/app/services/api/jugador.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  //TEST
  usuario: IUsuario ={
    run: '2222',
    dv: "1",
    nombre: "dsasdads",
    apellido: "saddsas",
    docente: false,
    correo: "ni.canalesm@duocuc.cl",
    contraseña: "nico123",
    carrera: 1,
    sede: 1
  }

  constructor(
    private apiService: JugadorService,
    private router : Router,
  ) { }

  ngOnInit() {
  }

  addJugador(){
    //Capturar longitud
    
    this.apiService.AddJugador(this.usuario).subscribe()
    this.router.navigate(['/apiList']);
  }
}
