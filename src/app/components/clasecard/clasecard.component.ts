import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-clasecard',
  templateUrl: './clasecard.component.html',
  styleUrls: ['./clasecard.component.scss'],
})
export class ClasecardComponent  implements OnInit {

  @Input() nombre!:string;
  @Input() sigla!:string;
  @Input() seccion!:string;
  @Input() docente!:string;
  @Input() horaInicio!:string;
  @Input() horaTermino!:string;

  langs: string[] =[];
  
  constructor(private transService: TranslateService) {
    this.langs = this.transService.getLangs();
   }
  
  idioma = this.transService.currentLang;

  ngOnInit() {
    this.transService.currentLang;
    console.log("Idioma",this.idioma);
  }
  
  ngOnViewWillEnter(){
    this.transService.defaultLang;
  }


}
