import { Injectable } from '@angular/core';
import { Gasolinera } from '../Modelo/gasolinera';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { LatLng } from '@ionic-native/google-maps/ngx';
@Injectable({
  providedIn: 'root'
})
export class GasolineraService {

  public gasolineraLista: Gasolinera[] = [];
  public gasolinearaRegistrar: Gasolinera;
  public comando: Boolean = true;
  public PanUbicacion: LatLng ;

  constructor(
    private store: Storage,
    public http: HttpClient) {

    this.gasolinearaRegistrar = new Gasolinera();
    this.store = new Storage({
      name: 'Gasolinera',
      storeName: '_Gasolinera',
      driverOrder: ['sqlite', 'indexeddb', 'localstorage']
    });
    this.Get();
  }
  load() {
    this.store.get('TODO').then(data => {
      // tslint:disable-next-line:triple-equals
      if (data == undefined || data == null) {
        // this.save();
      }
      // tslint:disable-next-line:one-line
      else {
        Object.assign(this.gasolineraLista, data);
        //  alert(JSON.stringify(data));
      }
    });
  }
  Get() {
    //http://localhost:3000/gasolineras
    this.http.get("http://192.168.43.210:3000/gasolineras").subscribe(res => {
      console.log("temp:" + JSON.stringify(res));
     for (const key in res) {
       if (res.hasOwnProperty(key)) {
         const element = res[key];
         this.gasolineraLista.push(element);
         
       }
     }
    },
      err => {
        console.log("temp2:" + JSON.stringify(err));
        alert('Error' + JSON.stringify(err));
        //  loading.dismiss();
        //  alert("error en el envio..:" + JSON.stringify(err));

      });
   }
  Guardar() {
    this.gasolineraLista.push(this.gasolinearaRegistrar);
    this.store.set('TODO', this.gasolineraLista);
    this.load();
    this.gasolineraLista.filter((data) => {
      // tslint:disable-next-line:triple-equals
      if (data.ID == this.gasolinearaRegistrar.ID) {
        data = this.gasolinearaRegistrar;
      }
    });
    this.store.set('TODO', this.gasolineraLista);
    console.log(JSON.stringify(this.gasolinearaRegistrar));
    this.http.post("http://192.168.43.210:3000/gasolinera/gas", this.gasolinearaRegistrar).subscribe(res => {
      console.log("temp:" + JSON.stringify(res));
      this.gasolinearaRegistrar = new Gasolinera();
    },
      err => {
        console.log("temp2:" + JSON.stringify(err));
        alert('Error' + JSON.stringify(err));
        //  loading.dismiss();
        //  alert("error en el envio..:" + JSON.stringify(err));

      });





  }
}
