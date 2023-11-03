import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IJugador } from 'src/app/interfaces/ijugador';
import { IUsuario } from 'src/app/interfaces/iusuario';
import { JugadorService } from 'src/app/services/api/jugador.service';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  //TEST
  usuario: IUsuario ={
    id: '2222',
    run: '2222',
    dv: "1",
    nombre: "dsasdads",
    apellido: "saddsas",
    docente: false,
    correo: "ni.canalesm@duocuc.cl",
    contrasena: "nico123",
    carrera: "1",
    sede: "1",
    imagen:"",

  }
  
  constructor(
    private apiService: JugadorService,
    private route: ActivatedRoute,
    private router : Router,
    private firestore: FirestoreService,
  ) { }

  ngOnInit() {
    console.log(this.getId())
  }

  getId(){
    let url = this.router.url
    let aux = url.split("/",3)
    let id = aux[2]
    return id
  }

  ionViewWillEnter(){
    this.getJugador(this.getId())
  }

  getJugador(id: string){
    // this.apiService.getJugador(id).subscribe((resp:any) => {
    //   this.usuario ={
    //     id: resp[0].id,
    //     nombre: resp[0].nombre,
    //     genero: resp[0].genero
    //   }
    // })
    const usuarioID = this.route.snapshot.paramMap.get('id');

    if (usuarioID){
      this.firestore.getUsuarioId('Usuarios',usuarioID).subscribe((usuario)=>{
        this.usuario = usuario || {} as IUsuario
      })
    }
  }

  updateJugador(){
    // this.apiService.UpdateJugador(this.jugador).subscribe();
    // this.router.navigate(['/apiList'])
    const usuarioID = this.route.snapshot.paramMap.get('id');
    this.firestore.updateDocument('Usuarios',usuarioID,this.usuario);
  }
}
