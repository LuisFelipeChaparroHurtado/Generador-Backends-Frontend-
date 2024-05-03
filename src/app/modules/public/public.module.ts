import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { ErrComponent } from './err/err.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ContainerModule } from '../container/container.module';
import { MenuComponent } from './menu/menu.component';
import { GeneradorComponent } from './generador/generador.component';
import { ContenedorComponent } from './contenedor/contenedor.component';

@NgModule({
  declarations: [
    // Declaration of components for the private section of the app
    ErrComponent,
    LoginComponent,
    MenuComponent,
    GeneradorComponent,
    ContenedorComponent,
  ],
  imports: [
    // Importing necessary modules
    CommonModule,
    PublicRoutingModule,
    FormsModule,
    ToastrModule.forRoot(),
    ContainerModule,
  ],
})
// Exporting the PrivateModule for use in other parts of the app
export class PublicModule {}
