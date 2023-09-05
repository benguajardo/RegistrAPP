import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuarios.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  usuario!: Usuario;

  constructor(private usuarioService: UsuarioService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(param => {
      const aux = param.get('id')
      if (aux){
        this.usuario = this.usuarioService.getUsuario(aux)
        console.log(this.usuario);
      }
    });
    
  }



}
