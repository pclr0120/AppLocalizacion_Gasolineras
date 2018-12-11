import { Component, OnInit, Input } from '@angular/core';
import { GoogleMap, GoogleMaps, Environment, GoogleMapsEvent, LatLng, MarkerOptions, Marker, Circle, GoogleMapOptions, LocationService, MyLocation, StreetViewPanorama } from '@ionic-native/google-maps/ngx';
import { GasolineraService } from '../Servicios/gasolinera.service';
@Component({
  selector: 'app-com-panorama',
  templateUrl: './com-panorama.component.html',
  styleUrls: ['./com-panorama.component.scss']
})
export class ComPanoramaComponent implements OnInit {
  @Input() ubicacionn: LatLng;
  panorama: StreetViewPanorama;
  bandera: boolean = false;
  constructor() { }

  ngOnInit() {
    try {
      this.bandera = false;
      this.panorama = GoogleMaps.createPanorama('pano_canvas1', {
        camera: {
          target: { lat: 42.345573, lng: -71.098326 }
        }
      });

      this.panorama.setPosition({
        target: { lat: this.ubicacionn.lat, lng: this.ubicacionn.lng }
      });
    } catch (error) {
      this.bandera = true;
      alert("Esta ubicacion no esta disponible Stree")
    }

    console.log("holabandera:" + this.bandera);


  }

}
