import { Component, OnInit } from '@angular/core';
import { GoogleMap, GoogleMaps, Environment, GoogleMapsEvent, LatLng, MarkerOptions, Marker, Circle, GoogleMapOptions, LocationService, MyLocation, CameraPosition } from '@ionic-native/google-maps/ngx';
import { Platform, Icon, NavController } from '@ionic/angular';
import { GasolineraService } from '../Servicios/gasolinera.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Gasolinera } from '../Modelo/gasolinera';

@Component({
  selector: 'app-contact',
  templateUrl: 'contact.page.html',
  styleUrls: ['contact.page.scss']
})
export class ContactPage implements OnInit {
  private map: GoogleMap;
  private MiUbicacion: LatLng;
  private metros: any;
  private GasolineraCercana: Gasolinera;
  private GasolinerasRango: Gasolinera[] = [];
  public Rango: any;

  constructor(private platform: Platform, private g: GasolineraService, private nav: NavController, private geolocation: Geolocation) {

  }
  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap();
  }
  MiUbica() {
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
    this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((data) => {
      this.map.clear();

      this.MiUbicacion = new LatLng(data[0].lat, data[0].lng);


      //console.log(JSON.stringify(data[0])+"/"+data[0].lat)
      let marker: Marker = this.map.addMarkerSync({
        title: 'Mi ubicacion..',
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
    });
    this.MiUbica();

    //console.log("hola1:" + this.g.gasoli∆neraLista.length);

  }


  actualizar() {
    //this.map.clear();
    let auxiliar = 100000000000000;
    //alert(this.g.gasolineraLista.length);
    if (this.g.gasolineraLista.length <= 0)
      alert("No hay Gasolinera cerca");

    for (let index = 0; index < this.g.gasolineraLista.length; index++) {

      const element = this.g.gasolineraLista[index];
      let userPosition: LatLng = new LatLng(Number(element.CordenadaLat), Number(element.CordenadaLog));


      let ub = this.getDistance(this.MiUbicacion, userPosition);
      // console.log(index + "/MEtros:" + ub);

      if (ub < auxiliar) {
        this.GasolineraCercana = element;
        auxiliar = ub;
        this.metros = auxiliar;
        console.log("El mas Cercano:" + JSON.stringify(this.GasolineraCercana));
      }


    }
    this.GasolineraMasCercana(this.GasolineraCercana);



  }

  GasolineraMasCercana(element) {

    // let markerOptions: MarkerOptions = {
    //   position: userPosition,
    //   icon: 'blue'
    // };
    if (this.MiUbicacion.lat > 0) {
      let userPosition: LatLng = new LatLng(Number(element.CordenadaLat), Number(element.CordenadaLog));
      let marker: Marker = this.map.addMarkerSync({
        title: element.Marca.toString(),
        snippet: 'Descripcion:' + element.Descripcion + ' ,Telefono:' + element.Telefono + ' ,Disel:$' + element.Disel + ', Gasolina regular:$' + element.Gregular + ' , Gasolina premium:$' + element.Gpremium,
        icon: {
          url: element.Logo,
          size: {
            width: 100,
            height: 100
          }
        },
        animation: 'DROP',
        position: userPosition,
        draggable: false
      });

      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe((data) => {
        console.log(JSON.stringify(data));
        this.MiUbicacion = data[0];

        this.g.PanUbicacion = this.MiUbicacion;
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
      marker.showInfoWindow();
      marker.on(GoogleMapsEvent.MARKER_DRAG_END).subscribe((data) => {
        //  console.log("Data:" + JSON.stringify(data));
      });
    }
    else
      alert("Primero señale su ubicacion..")


  }

  PorRango() {
    //console.log("entre");
    if (this.MiUbicacion.lat > 0) {
      for (let index = 0; index < this.g.gasolineraLista.length; index++) {

        const element = this.g.gasolineraLista[index];
        let userPosition: LatLng = new LatLng(Number(element.CordenadaLat), Number(element.CordenadaLog));


        let ub = this.getDistance(this.MiUbicacion, userPosition);
        // console.log(index + "/MEtros:" + ub);

        if (ub <= (this.Rango * 1000)) {
          this.GasolinerasRango.push(element);
          //  console.log(JSON.stringify(this.GasolinerasRango));

          this.GasolineraMasCercana(element);

        }


      }
    }
    else
      alert("Primero señale su ubicacion..")

  }

  rad(x) {
    return x * Math.PI / 180;
  };

  getDistance(p1, p2) {
    var R = 6378137;
    var dLat = this.rad(p2.lat - p1.lat);
    var dLong = this.rad(p2.lng - p1.lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.rad(p1.lat)) * Math.cos(this.rad(p2.lat)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return d; // returns the distance in meter
  };
}
