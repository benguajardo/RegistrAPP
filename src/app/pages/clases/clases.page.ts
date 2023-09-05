import { Component, OnInit } from '@angular/core';
import { Clase } from './clases.model';
import { Router } from '@angular/router';
import { ClaseService } from 'src/app/services/clase.service';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {
  listaClases : Clase[] = [];
  constructor(private router: Router, private claseService: ClaseService) { }

  ngOnInit() {
    this.listaClases = this.claseService.GetAll()
  }

}
