import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { GasolineraService } from '../Servicios/gasolinera.service';
import { NavController } from '@ionic/angular';
import { Gasolinera } from '../Modelo/gasolinera';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  constructor(private storage: Storage, private router: Router, private g: GasolineraService, private nav: NavController) {
   
  }


  async cerrar() {
    await this.storage.set('tutorialComplete', false);
   // this.router.navigateByUrl('tabs');
  }

  Registrar() {
    this.g.comando = true;
    this.nav.navigateForward('/Registrar');
  }
  Update(d) {

    this.g.comando = true;
    this.g.gasolinearaRegistrar = d;
    this.nav.navigateForward('/Registrar');
  }
}
