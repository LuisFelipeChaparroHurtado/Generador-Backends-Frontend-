import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/admin.guard';
import { ConnectiondbGuard } from 'src/app/connectiondb.guard';
import { ConnectionFormGuard } from 'src/app/connectionForm.guard';
import { TemplateTreeComponent } from '../container/dash/template-tree/template-tree.component';
import { ContainerComponent } from './container/container.component';
import { CreateAdminUserComponent } from './create-admin-user/create-admin-user.component';
import { ErrComponent } from './err/err.component';
import { GeneratorComponent } from './generator/generator.component';
import { ListUserComponent } from './list-user/list-user.component';
import { MenuComponent } from './menu/menu.component';
import { ProfileComponent } from './profile/profile.component';
import { ProjectMenuComponent } from './project-menu/project-menu.component';
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

const routes: Routes = [
  // Route to the menu component
  { path: 'menu', component: MenuComponent },
  // Route to the profile component
  { path: 'profile', component: ProfileComponent },
  // Route to the update profile component with user ID as a parameter
  { path: 'updateUser/:idUser', component: UpdateProfileComponent },
  // Route to the list user component with AdminGuard
  { path: 'listUser', component: ListUserComponent, canActivate: [AdminGuard] },
  // Route to create admin user component with AdminGuard
  {
    path: 'createUser',
    component: CreateAdminUserComponent,
    canActivate: [AdminGuard],
  },
  // Route to update admin user component with AdminGuard
  {
    path: 'datauser/:idUser',
    component: UpdateAdminUserComponent,
    canActivate: [AdminGuard],
  },
  // Routes within the container component
  {
    path: 'template',
    component: ContainerComponent,
    children: [
      { path: 'projectMenu', component: ProjectMenuComponent },
      { path: 'server', component: TemplateServerComponent },
      { path: 'connectiondb', component: TemplateConnectionComponent },
      { path: 'vardatabase', component: TemplateVarDatabaseComponent },
      { path: 'controller/:codTable', component: TemplateControllerComponent },
      { path: 'dao/:codTable', component: TemplateDaoComponent },
      { path: 'models/:codTable', component: TemplateModelsComponent },
      { path: 'route/:codTable', component: TemplateRouteComponent },
      { path: 'index', component: TemplateIndexComponent },
      { path: '', redirectTo: 'menu', pathMatch: 'full' },
      { path: '**', component: ErrComponent },
    ],
    canActivate: [ConnectiondbGuard],
  },
  // Route for the connection component with ConnectionFormGuard
  {
    path: 'connection',
    component: MenuComponent,
    canActivate: [ConnectionFormGuard],
  },
  // Route to the generator component
  { path: 'generator', component: GeneratorComponent },
  // Route to the template tree component
  { path: 'templateTree', component: TemplateTreeComponent },
  // Default route redirects to menu
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  // Catch-all route for unknown paths
  { path: '**', component: ErrComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
