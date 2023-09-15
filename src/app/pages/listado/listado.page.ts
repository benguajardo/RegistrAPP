import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MensajeService } from 'src/app/services/mensaje.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../profile/usuarios.model';


@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {

  listaUsuarios: Usuario[] = [];
  Digimones: any[]=[];
  personajes: any[]=[];

  paginaActual = 0;

  constructor(private router: Router, private usuarioService: UsuarioService,
              private httpClient :HttpClient, private mensajeService: MensajeService) { }

  ngOnInit() {
    this.cargarData();
    this.mensajeService.loading('Cargando','1500')
  }

  cargarData(){
    const url = `https://www.digi-api.com/api/v1/digimon?page=${this.paginaActual}`
      this.httpClient.get<any>(url).subscribe(resultado =>{
      this.Digimones = resultado.content;
      
    })

  }

  cargarMas(){
    this.paginaActual++;
    const url = `https://www.digi-api.com/api/v1/digimon?page=${this.paginaActual}`
      this.httpClient.get<any>(url).subscribe(resultado =>{
        this.Digimones = this.Digimones.concat(resultado.content);
    })
  }

  cargarSiguiente(){
    this.paginaActual++;
    this.cargarData()
  }

  cargarAnterior(){
    this.paginaActual--;
    this.cargarData()
  }

  validarPag(){
    var menor : any
    if(this.paginaActual <= 0){
      menor = true
    } else {
      menor = false
    }
    return menor
  }
 
}
