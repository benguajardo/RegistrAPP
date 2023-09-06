import { Component, Input, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {}

}
