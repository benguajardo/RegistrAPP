import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {
  
  langs: string[] =[];


  constructor(
    private transService: TranslateService
  ) { 
    this.langs = this.transService.getLangs();
  }

  ngOnInit() {}

  aceptaTerminos: boolean = false; // Valor inicial del checkbox

}
