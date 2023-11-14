import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

  langs: string[] =[];
  idioma!: string;

  constructor(
    private transService: TranslateService
    ) {
      this.langs = this.transService.getLangs();
     }

  ngOnInit() {
  }
  
  changeLangs(event:any){
    this.transService.use(event.detail.value);
  }
}
