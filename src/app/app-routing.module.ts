import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';
import { TutorialGuard } from './guards/tutorial.guard';
const routes: Routes = [
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
   { path: '', loadChildren: './tabs/tabs.module#TabsPageModule'},
  { path: 'Registrar', loadChildren: './registrar/registrar.module#RegistrarPageModule' },
  { path: 'Panorama', loadChildren: './panorama/panorama.module#PanoramaPageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes), IonicStorageModule.forRoot() ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
