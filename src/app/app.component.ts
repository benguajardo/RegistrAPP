import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  idioma!: string;
  
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Perfil', url: '/profile', icon: 'person' },
    { title: 'Clases', url: '/clases', icon: 'book' },
    { title: 'Configuración', url: '/config', icon: 'settings' },
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
    private menuController: MenuController,
    private transService: TranslateService
  ) {
    this.transService.setDefaultLang('es');
    this.transService.addLangs(['de','en']);

    this.idioma = this.transService.currentLang;

    const browserLang = this.transService.getBrowserLang();

    if (browserLang) {
      this.transService.use(browserLang.match(/de|en/) ? browserLang : 'es');
    } else {
      this.transService.use('es');
    }

  }

  mostrarMenu(){
    const pages = ['home', 'clases','profile','asistencia','scanner','crearclase','config']
    console.log(this.idioma)
    return pages.includes(this.router.url.substring(1));
  }

}
