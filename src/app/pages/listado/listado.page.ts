import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../profile/usuarios.model';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {

  listaUsuarios: Usuario[] = [];
  
  constructor(private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.listaUsuarios = this.usuarioService.GetAll()
  }

}
