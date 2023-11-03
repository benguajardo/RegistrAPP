import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
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
    { title: 'listado', url: '/listado', icon: 'book' },
    { title: 'listado', url: '/apiHome', icon: 'book' },
  ];
  
  public apiPages = [
    { title: 'Home', url: '/apiHome', icon: 'home' },
    { title: 'Perfil', url: '/profile', icon: 'person' },
    { title: 'List', url: '/apiList', icon: 'person' },
    { title: 'Add', url: '/apiAdd', icon: 'book' },
    { title: 'Detail', url: '/apiDetail', icon: 'book' },
    { title: 'Delete', url: '/apiDelete', icon: 'book' },
    { title: 'Update', url: '/apiUpdate', icon: 'book' },
  ];
  
  public labels = [];
  constructor(
    private router : Router,
    private menuController: MenuController
  ) {}

  mostrarMenu(){
    return this.router.url !== '/login';
  }

  mostrarMenuApi(){
    const aux = ['apiHome', 'apiAdd', 'apiList', 'apiDelete', 'apiUpdate', 'apiDetail']
    return aux.includes(this.router.url.substring(1)); //Eliminamos el "/"0
    //return this.router.url == '/apiHome';
  }
  
}
