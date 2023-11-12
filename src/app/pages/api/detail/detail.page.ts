import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IJugador } from 'src/app/interfaces/ijugador';
import { IUsuario } from 'src/app/interfaces/iusuario';
import { JugadorService } from 'src/app/services/api/jugador.service';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  
  usuario: IUsuario ={
    id: '',
    run: '2222',
    dv: "1",
    nombre: "dsasdads",
    apellido: "saddsas",
    docente: false,
    correo: "ni.canalesm@duocuc.cl",
    contrasena: "nico123",
    carrera: '',
    sede: '',
    imagen: ''
  }

  sede = {
    id: 9999,
    nombre: "test",
    direccion: "hola"
  }

  constructor(
    private router : Router,
    private firestore: FirestoreService,
    private apiService: JugadorService,
    private route : ActivatedRoute
  ) { }

  
  ngOnInit() {
    this.getJugador(this.getId())
  }

  ionViewWillEnter(){
    this.getJugador(this.getId())
  }

  listar(){
    this.apiService.listaJugadores().subscribe((resp) =>{
      let aux = JSON.stringify(resp)
      this.usuario = JSON.parse(aux)
      console.log(this.usuario)
    })
  }
// NO SE SI ESTÁ CORRECTO
  listarSede(){
    this.apiService.listaSede().subscribe((respSede) =>{
      let aux = JSON.stringify(respSede)
      this.usuario = JSON.parse(aux)
      console.log(this.usuario)
    })
  }

  getId(){
    let url = this.router.url
    let aux = url.split("/",3)
    let id = aux[2]
    return id
  }

  

  getJugador(id: string){
    const usuarioID = this.route.snapshot.paramMap.get('id');

    if (usuarioID){
      this.firestore.getUsuarioId('Usuarios',usuarioID).subscribe((usuario)=>{
        this.usuario = usuario || {} as IUsuario
      })
    }
  }

  deleteJugador(){
    
    this.apiService.DeleteJugador(this.usuario).subscribe();
    this.router.navigate(['/apiList'])
  }

}
