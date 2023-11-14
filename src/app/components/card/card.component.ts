import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent  implements OnInit {

  @Input() nombre!:string;
  @Input() rut!:string;
  @Input() correo!:string;
  @Input() imagen!:string;
  @Input() sede!:string;

  langs: string[] =[];

  constructor(private transService: TranslateService) {
    this.langs = this.transService.getLangs();
   }

  ngOnInit() {}
  
}
