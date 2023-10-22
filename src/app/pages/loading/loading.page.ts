import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MensajeService } from 'src/app/services/mensaje.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})
export class LoadingPage implements OnInit {

  constructor( private router : Router, private mensajeService: MensajeService) { }

  ngOnInit() {
  setTimeout(() => {
    this.router.navigate(['/terms']);
  },2000);
  }

}
