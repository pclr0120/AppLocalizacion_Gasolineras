import { Component, OnInit, Input } from '@angular/core';
import { GoogleMap, GoogleMaps, Environment, GoogleMapsEvent, LatLng, MarkerOptions, Marker, Circle, GoogleMapOptions, LocationService, MyLocation, StreetViewPanorama } from '@ionic-native/google-maps/ngx';
import { GasolineraService } from '../Servicios/gasolinera.service';


@Component({
  selector: 'app-panorama',
  templateUrl: './panorama.page.html',
  styleUrls: ['./panorama.page.scss'],
})
export class PanoramaPage implements OnInit {

  
  constructor(private pan: GasolineraService) {
  
   }

  ngOnInit() {
 
    

  }
 
  



}
