import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PanoramaPage } from './panorama.page';
import {ComPanoramaComponent} from '../com-panorama/com-panorama.component';
const routes: Routes = [
  {
    path: '',
    component: PanoramaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PanoramaPage,ComPanoramaComponent]
})
export class PanoramaPageModule {}
