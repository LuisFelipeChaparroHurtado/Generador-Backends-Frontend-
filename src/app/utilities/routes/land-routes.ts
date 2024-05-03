import { Routes } from '@angular/router';

/**
 * ROUTES_LANDSCAPES defines the routing configuration for the landscape (public-facing) interface.
 *
 * @constant {Routes} ROUTES_LANDSCAPES - The set of routes for the landscape part of the application.
 */
export const ROUTES_LANDSCAPES: Routes = [
  {
    // Route definition for the 'land' path
    path: 'land',
    loadChildren: () =>
      // Lazy load the 'PublicModule' when accessing the 'land' path
      import('../../modules/public/public.module').then((m) => m.PublicModule),
  },
  // Redirect to the 'land' route if the path is empty
  { path: '', redirectTo: 'land', pathMatch: 'full' },
];
