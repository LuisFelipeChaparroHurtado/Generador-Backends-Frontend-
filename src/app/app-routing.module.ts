import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerDashComponent } from './modules/container/dash/container-dash/container-dash.component';
import { ContainerLandComponent } from './modules/container/land/container-land/container-land.component';
import { ErrComponent } from './modules/public/err/err.component';
import { ROUTES_DASHSCAPES } from './utilities/routes/dash-routes';
import { ROUTES_LANDSCAPES } from './utilities/routes/land-routes';
import { VigilanteGuard } from './vigilante.guard';

const routes: Routes = [
  { path: '', component: ContainerLandComponent, children: ROUTES_LANDSCAPES },
  {
    path: 'private',
    component: ContainerDashComponent,
    children: ROUTES_DASHSCAPES,
    canActivate: [VigilanteGuard],
  },

  { path: '**', component: ErrComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
