import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// Importa los componentes del módulo
import { ContainerDashComponent } from './dash/container-dash/container-dash.component';
import { HeaderDashComponent } from './dash/header-dash/header-dash.component';
import { TemplateHeaderComponent } from './dash/template-header/template-header.component';
import { TemplateTreeComponent } from './dash/template-tree/template-tree.component';
import { ContainerLandComponent } from './land/container-land/container-land.component';
import { HeaderLandComponent } from './land/header-land/header-land.component';
import { ContainerComponent } from '../private/container/container.component';

@NgModule({
  // Declare components that belong to this module
  declarations: [
    HeaderLandComponent,
    ContainerLandComponent,
    HeaderDashComponent,
    ContainerDashComponent,
    TemplateTreeComponent,
    TemplateHeaderComponent
  ],
  // Import necessary modules for component functionality
  imports: [CommonModule, RouterModule, FormsModule],
  // Export components that should be available outside this module
  exports: [
    HeaderLandComponent,
    ContainerLandComponent,
    TemplateTreeComponent,
    TemplateHeaderComponent
  ],
})
export class ContainerModule {}
