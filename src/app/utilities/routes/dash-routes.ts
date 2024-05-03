import { Routes } from '@angular/router';
import { ErrComponent } from 'src/app/modules/private/err/err.component';

/**
 * ROUTES_DASHSCAPES defines the routing configuration for the dashboard interface.
 *
 * @constant {Routes} ROUTES_DASHSCAPES - The set of routes for the dashboard-related parts of the application.
 */
export const ROUTES_DASHSCAPES: Routes = [
  {
    // Route definition for the dashboard
    path: 'dash',
    loadChildren: () =>
      import('../../modules/private/private.module').then(
        (m) => m.PrivateModule
      ),
  },
  // Redirect to the 'dash' route if the path is empty
  { path: '', redirectTo: 'dash', pathMatch: 'full' },
  // Handle all other routes (e.g., unknown or invalid routes) by displaying the error component
  { path: '**', component: ErrComponent },
];
