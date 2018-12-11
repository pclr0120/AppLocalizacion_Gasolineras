import { Component, OnInit } from '@angular/core';
import { GasolineraService } from '../Servicios/gasolinera.service';
import { NavController } from '@ionic/angular';
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GoogleMap, GoogleMaps, Environment, GoogleMapsEvent, LatLng, MarkerOptions, Marker, Circle, GoogleMapOptions, LocationService, MyLocation } from '@ionic-native/google-maps/ngx';
import { Platform, Icon } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  private FRM: FormGroup;
  public map: GoogleMap;
  public imagenbandera: boolean = false;

  constructor(private g: GasolineraService,
    private photoLibrary: PhotoLibrary,
    private camera: Camera,
    private formBuilder: FormBuilder,
    private nav: NavController,
    private platform: Platform) {
    this.imagenbandera = false;

    this.FRM = this.formBuilder.group({
      // tslint:disable-next-line:max-line-length
      Marca: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.minLength(5), Validators.pattern(/^[0-9a-zA-Z]+$/)])],
      // tslint:disable-next-line:max-line-length
      Descripcion: ['', Validators.compose([Validators.required, Validators.maxLength(100), Validators.minLength(5)])],
      // tslint:disable-next-line:max-line-length
      Domicilio: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.minLength(5)])],
      // tslint:disable-next-line:max-line-length
      Telefono: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.minLength(5), Validators.pattern(/^[0-9]+$/)])],
      // tslint:disable-next-line:max-line-length
      Logo: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      // tslint:disable-next-line:max-line-length
      Disel: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.minLength(5), Validators.pattern(/^[0-9]+$/)])],
      // tslint:disable-next-line:max-line-length
      Gregular: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.minLength(5), Validators.pattern(/^[0-9]+$/)])],
      // tslint:disable-next-line:max-line-length
      Gpremium: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.minLength(5), Validators.pattern(/^[0-9]+$/)])],
      // tslint:disable-next-line:max-line-length
      Otros: ['', Validators.compose([Validators.maxLength(50), Validators.minLength(5), Validators.pattern(/^[0-9a-zA-Z]+$/)])],
    });
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
          lng: -108.923817,
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
       // console.log(JSON.stringify(data) + 'hola');
      });

      this.map.animateCamera({
        target: {
          lat: 25.954547,
          lng: -108.923817,
        },
      })
      // this.map.addMarker(markerOptions).then((marker: Marker) => {

      // });

    });
    setTimeout(() => {

      this.map.getMyLocation()
        .then((location: MyLocation) => {
          //console.log(JSON.stringify(location, null, 2));

          // Move the map camera to the location with animation

          this.map.animateCamera({
            target: location.latLng,
            zoom: 15,
            tilt: 30
          })
        });
    }, 2000);
  }
  Guardar() {

    this.g.Guardar();
    alert("Gasolinera Registrada correctamente..");
    this.nav.navigateForward('/tabs/(contact:contact)');

  }
  public hola: any;
  GetImagen() {
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }


    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.imagenbandera = true;
      // console.log("imagen:" + base64Image);
      this.g.gasolinearaRegistrar.Logo = base64Image;

    }, (err) => {
      // Handle error
    });
    // this.photoLibrary.requestAuthorization().then(() => {
    //   this.photoLibrary.getLibrary().subscribe(a=>{

    //     console.log(JSON.stringify(this.photoLibrary.getPhoto))


    //     for (const key in a) {
    //       if (a.hasOwnProperty(key)) {
    //         const element = a[key];
    //         console.log("hola"+element[0].photoURL);
    //         this.g.gasolinearaRegistrar.Logo=element[0].photoURL;
    //         console.log(JSON.stringify(this.photoLibrary.getPhoto(element[0].Id)));


    //       }
    //     }

    //   });
    // })
    // .catch(err => console.log('permissions weren\'t granted'));
  }
}
