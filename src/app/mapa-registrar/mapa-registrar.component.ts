import { Component, OnInit } from '@angular/core';
import { GoogleMap, GoogleMaps, Environment, GoogleMapsEvent, LatLng, MarkerOptions, Marker, Circle, GoogleMapOptions, LocationService, MyLocation } from '@ionic-native/google-maps/ngx';
import { Platform, Icon } from '@ionic/angular';

@Component({
  selector: 'app-mapa-registrar',
  templateUrl: './mapa-registrar.component.html',
  styleUrls: ['./mapa-registrar.component.scss']
})
export class MapaRegistrarComponent implements OnInit {

  map: GoogleMap;

  constructor(private platform: Platform) {

  }
  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap();
  }

  loadMap() {
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyBctALIjU9PZAU3-v9LxpJzx4gxhFBCwBo',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyBctALIjU9PZAU3-v9LxpJzx4gxhFBCwBo'
    });



    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: 25.954547,
          lng:  -108.923817,
        },
        zoom: 15,
        tilt: 30
      }

      
    });

    this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((params: any[]) => {

      this.map.clear();
      let latLng: LatLng = params[0];
      let userPosition: LatLng = new LatLng(latLng[0], latLng[1]);
    

      let markerOptions: MarkerOptions = {
        position: userPosition,
        icon: 'blue'
      };
      let marker: Marker = this.map.addMarkerSync({
        title: 'hola',
        icon: 'blue',
        animation: 'DROP',
        position: latLng,
        draggable: true
      });

      marker.on(GoogleMapsEvent.MARKER_DRAG_END).subscribe((data) => {
        console.log(JSON.stringify(data) + 'hola');
      });
        
      this.map.animateCamera({
        target: {
          lat: 25.954547,
          lng:  -108.923817,
        },
      })




     







      // this.map.addMarker(markerOptions).then((marker: Marker) => {

      // });

    });
   setTimeout(() => {

    this.map.getMyLocation()
    .then((location: MyLocation) => {
      console.log(JSON.stringify(location, null, 2));

      // Move the map camera to the location with animation
  
      this.map.animateCamera({
        target: location.latLng,
        zoom: 15,
        tilt: 30
      })});
        }, 2000);
  }
}

