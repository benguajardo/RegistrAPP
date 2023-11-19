import { Component, OnInit, Inject } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {


  map: mapboxgl.Map | undefined;
  style = 'mapbox://styles/mapbox/streets-v11';
  //POSICIÓN DE DUOC UC PUENTE ALTO Y NECESARIA PARA LA ASISTENCIA.
  //COMPARAR CON LA ACTUAL
  lat = 0;
  lng = 0;

  constructor(@Inject(DOCUMENT) private document: Document) { 
    setInterval(() => {
      this.getLocation();
    }, 10000);
  }

  ngOnInit() {
    this.getLocation().then(() => {
      this.loadMapbox();
    });
    
  }

  
  private loadMapbox() {
    const mapboxScript = this.document.createElement('script');
    mapboxScript.src = 'https://api.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.js';
    mapboxScript.onload = () => this.initializeMap();
    this.document.head.appendChild(mapboxScript);
  }

  private initializeMap() {
    
    (mapboxgl as any).accessToken = 'pk.eyJ1Ijoibmljb2NhbmFsZXM1IiwiYSI6ImNscDFzcm52ZzBrcXMybHA1M3dzMmw1YWUifQ.tmgpGZWrYk6Wa-QmC8k-Eg';
    this.map = new mapboxgl.Map({
      container: 'mapa-box',
      style: this.style,
      zoom: 16.6,
      center: [this.lng, this.lat]
    });
  
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy:true
      },
      trackUserLocation: true
    })
    );
  
    new mapboxgl.Marker().setLngLat([this.lng, this.lat]).addTo(this.map);
    }

  async getLocation() {
    try {
      const coordenadas = await Geolocation.getCurrentPosition();
      this.lat = coordenadas.coords.latitude;
      this.lng = coordenadas.coords.longitude;
      console.log('lat: ',this.lat, 'lng',this.lng)
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
    }
  }

calcularDistancia(latitud1: number, longitud1: number, latitud2: number, longitud2: number): number {
    const radioTierra = 6371000; // Radio de la Tierra en metros
  
    // Convertir las latitudes y longitudes de grados a radianes
    const latitudRad1 = (latitud1 * Math.PI) / 180;
    const longitudRad1 = (longitud1 * Math.PI) / 180;
    const latitudRad2 = (latitud2 * Math.PI) / 180;
    const longitudRad2 = (longitud2 * Math.PI) / 180;
  
    // Calcular las diferencias de latitud y longitud
    const dLat = latitudRad2 - latitudRad1;
    const dLon = longitudRad2 - longitudRad1;
  
    // Calcular la distancia haversine
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(latitudRad1) * Math.cos(latitudRad2) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distancia = radioTierra * c;
  
    return distancia;
  }
  
  func(){
    const latitudPunto1 = 40.7128; // Latitud del primer punto
    const longitudPunto1 = -74.0060; // Longitud del primer punto
    const latitudPunto2 = 40.7128; // Latitud del segundo punto
    const longitudPunto2 = -74.0050; // Longitud del segundo punto
    
    const distancia = this.calcularDistancia(latitudPunto1, longitudPunto1, latitudPunto2, longitudPunto2);
    console.log('Distancia entre los puntos:', distancia, 'metros');
    
  }
  // Ejemplo de uso

}

