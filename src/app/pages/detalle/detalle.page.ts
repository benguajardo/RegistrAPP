import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  Digimon : any;
  constructor( 
    private ActivatedRoute : ActivatedRoute,          
    private httpClient : HttpClient,
    private UsuarioService: UsuarioService ) { }

  ngOnInit() {
    const id = this.ActivatedRoute.snapshot.paramMap.get("id");
    this.httpClient.get<any>("https://www.digi-api.com/api/v1/digimon/"+id).subscribe(resultado =>{
      console.log(resultado)
      this.Digimon = resultado;
    });
  }

}
