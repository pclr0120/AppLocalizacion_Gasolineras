import { Component, OnInit } from '@angular/core';
import { GoogleMap, GoogleMaps, Environment, GoogleMapsEvent, LatLng, MarkerOptions, Marker, Circle, GoogleMapOptions, LocationService, MyLocation } from '@ionic-native/google-maps/ngx';
import { Platform, Icon, NavController } from '@ionic/angular';
import { GasolineraService } from '../Servicios/gasolinera.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
@Component({
  selector: 'app-about',
  templateUrl: 'about.page.html',
  styleUrls: ['about.page.scss']
})
export class AboutPage implements OnInit {
  map: GoogleMap;
  latLng: LatLng
  Bandera: any;
  
  private MiUbicacion: LatLng;
  constructor(private platform: Platform,
     private g: GasolineraService, 
     private nav: NavController,
     private camera: Camera,
      private geolocation: Geolocation) {

  }
  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap();
  }
  MiUbica(){
    let lat1, lng1;
  
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      //console.log("hola:////////" + resp.coords.latitude);
      lat1 = resp.coords.latitude;
      lng1 = resp.coords.longitude;
      this.map.clear();
      this.MiUbicacion = new LatLng(lat1, lng1);
      let marker: Marker = this.map.addMarkerSync({
        title: 'Mi ubicacion',
        icon: 'blue',


        animation: 'DROP',
        position: this.MiUbicacion,
        draggable: true,
        zoom: 15,
        tilt: 0,
      });
      marker.showInfoWindow();
      this.map.moveCamera({
        target: this.MiUbicacion,
        zoom: 17,
        tilt: 60,
        bearing: 140
      }).then(() => {
       
      });
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe((data) => {
        this.g.PanUbicacion=this.MiUbicacion;
        //  console.log("Data:" + JSON.stringify(data));
        this.nav.navigateBack('Panorama');
        });
    
      
    }).catch((error) => {
      console.log('Error getting location', error);
    });
 
  }
  loadMap() {
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyBctALIjU9PZAU3-v9LxpJzx4gxhFBCwBo',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyBctALIjU9PZAU3-v9LxpJzx4gxhFBCwBo'
    });
 
  

    this.map = GoogleMaps.create('map_canvas', {
   


    });
    this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((data)=>{
      this.map.clear();
      
      this.MiUbicacion = new LatLng(data[0].lat, data[0].lng);
      this.g.gasolinearaRegistrar.CordenadaLat=data[0].lat;
      this.g.gasolinearaRegistrar.CordenadaLog=data[0].lng;
      this.Bandera=true;
      //console.log(JSON.stringify(data[0])+"/"+data[0].lat)
      let marker: Marker = this.map.addMarkerSync({
        title: 'Gasolinera ubicada puede continuar..',
        icon: 'blue',


        animation: 'DROP',
        position: this.MiUbicacion,
        draggable: true,
        zoom: 15,
        tilt: 0,
      });
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe((data) => {
        this.g.PanUbicacion=this.MiUbicacion;
        //  console.log("Data:" + JSON.stringify(data));
        this.nav.navigateBack('Panorama');
        });
      marker.showInfoWindow();
      this.map.moveCamera({
        target: this.MiUbicacion,
        zoom: 17,
        tilt: 60,
        bearing: 140
      }).then(() => {
       
      });
    });

    this.MiUbica();
  
    //console.log("hola1:" + this.g.gasolineraLista.length);
  
  }

  GetImagen(){
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;
   //  console.log("imagen:"+base64Image);
     
    }, (err) => {
     // Handle error
    });
  }
  Registrar() {
    if (this.Bandera) {
      this.g.comando = true;
      this.nav.navigateForward('/Registrar');
      this.Bandera = false;
    } else
      alert("Para continuar ubique la gasolinera en el mapa..");
  }
}
