import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Escanear código', url: '/scanner', icon: 'qr-code' },
    { title: 'Cerrar sesión', url: '/login', icon: 'log-out' },
  ];
  public labels = [];
  constructor() {}
}
