import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent  implements OnInit {

  @Input() mostrarFecha: boolean = true;

  @Input() titulo!:string;
  @Input() fecha!:string;
  @Input() descripcion!:string;

  constructor() { }

  ngOnInit() {}
  
}
