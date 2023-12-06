import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { MensajeService } from 'src/app/services/mensaje.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})
export class LoadingPage implements OnInit {

  langs: string[] =[];
  loginForm: FormGroup // validar formulario
  user: any   //    capturar todo del usuario random
  emailValue?: string //Para capturar el correo del usuario random
  passValue?: string  //Para capturar la contraseña del usuario random
  listaUsuarios: any = [];

  constructor( private router : Router, 
    private mensajeService: MensajeService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private firestore: FirestoreService,
    private transService: TranslateService,
    private usuarioService: UsuarioService
    ) { 
      {this.langs = this.transService.getLangs();
        this.loginForm = this.formBuilder.group({
          email: ['', [Validators.required]],
          password: ['', [Validators.required, Validators.minLength(1)]]
        })
    }
  }
  
  ngOnInit() {
    this.passValue = '';
    this.emailValue = '';
    this.authService.checkAuth().then((user) => {
      if (user) {
        this.router.navigate(['home']);
      } else {
        setTimeout(() => {
          this.router.navigate(['/terms']);
        }, 2000);
      }
    });
  }

}
