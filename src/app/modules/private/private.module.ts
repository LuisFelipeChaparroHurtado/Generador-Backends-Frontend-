import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ContainerModule } from '../container/container.module';
import { ContainerComponent } from './container/container.component';
import { CreateAdminUserComponent } from './create-admin-user/create-admin-user.component';
import { ErrComponent } from './err/err.component';
import { GeneratorComponent } from './generator/generator.component';
import { ListUserComponent } from './list-user/list-user.component';
import { MenuComponent } from './menu/menu.component';
import { PrivateRoutingModule } from './private-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { TemplateConnectionComponent } from './template-connection/template-connection.component';
import { TemplateControllerComponent } from './template-controller/template-controller.component';
import { TemplateDaoComponent } from './template-dao/template-dao.component';
import { TemplateIndexComponent } from './template-index/template-index.component';
import { TemplateModelsComponent } from './template-models/template-models.component';
import { TemplateRouteComponent } from './template-route/template-route.component';
import { TemplateServerComponent } from './template-server/template-server.component';
import { TemplateVarDatabaseComponent } from './template-var-database/template-var-database.component';
import { UpdateAdminUserComponent } from './update-admin-user/update-admin-user.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

@NgModule({
  declarations: [
    // Declaration of components for the private section of the app
    ErrComponent,
    MenuComponent,
    ContainerComponent,
    GeneratorComponent,
    TemplateServerComponent,
    TemplateConnectionComponent,
    TemplateModelsComponent,
    TemplateVarDatabaseComponent,
    TemplateControllerComponent,
    TemplateDaoComponent,
    TemplateRouteComponent,
    TemplateIndexComponent,
    ProfileComponent,
    UpdateProfileComponent,
    ListUserComponent,
    UpdateAdminUserComponent,
    CreateAdminUserComponent,
  ],
  imports: [
    // Importing necessary modules
    CommonModule,
    PrivateRoutingModule,
    FormsModule,
    ToastrModule.forRoot(),
    ContainerModule,
  ],
})
// Exporting the PrivateModule for use in other parts of the app
export class PrivateModule {}
