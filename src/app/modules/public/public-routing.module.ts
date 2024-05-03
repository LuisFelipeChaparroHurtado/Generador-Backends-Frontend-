import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenedorComponent } from './contenedor/contenedor.component';
import { ErrComponent } from './err/err.component';
import { GeneradorComponent } from './generador/generador.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';

// Define the routing configuration for the public module
const routes: Routes = [
  // Route for the LoginComponent
  { path: 'login', component: LoginComponent },
  // Route for the MenuComponent
  { path: 'menu', component: MenuComponent },
  {
    // Route for the ContenedorComponent, with child routes
    path: 'template',
    component: ContenedorComponent,
    children: [
      // Default child route redirects to the menu path
      { path: '', redirectTo: 'menu', pathMatch: 'full' },
      // Route for handling unknown child routes (errors)
      { path: '**', component: ErrComponent },
    ],
  },
  // Route for the GeneradorComponent
  { path: 'generador', component: GeneradorComponent },
  // { path: 'templateTree', component: TemplateTreeComponent },
  // Default route redirects to the login path
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // Catch-all route for handling unknown paths (errors)
  { path: '**', component: ErrComponent },
];

// NgModule declaration for the public routing module
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
