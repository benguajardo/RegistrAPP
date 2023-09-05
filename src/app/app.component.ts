import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Perfil', url: '/profile', icon: 'person' },
    { title: 'Clases', url: '/clases', icon: 'book' },
    { title: 'Escanear código', url: '/scanner', icon: 'qr-code' },
    { title: 'Cerrar sesión', url: '/login', icon: 'log-out' },
    //PARA PROBAR NOMÁS
    { title: 'Listado', url: '/listado', icon: 'log-out' },
  ];

  public labels = [];
  
  constructor() {}



}
