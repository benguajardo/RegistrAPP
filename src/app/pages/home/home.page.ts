import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { usuarioIniciado } from '../profile/usuarios.model';
import { Router } from '@angular/router';
import { MensajeService } from 'src/app/services/mensaje.service';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  langs: string[] =[];
  idioma!: string;

  constructor(private usuarioService : UsuarioService,
              private router :Router,
              private mensajeService: MensajeService,
              private auth: AuthService,
              private transService: TranslateService
              ) {
                this.langs = this.transService.getLangs();
               }
  listaUsuarioIniciado : usuarioIniciado [] = []
  
  ngOnInit() {
  }

  ionViewWillEnter() {
  }

  async logout(){
    try {
      await this.auth.logout();
      this.router.navigate(['/login'])
    } catch (error) {
      console.error('Error en logout:', Error);
    }
  }

  changeLangs(event:any){
    this.transService.use(event.detail.value);
  }


}
