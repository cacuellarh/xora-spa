import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../app/pages/main/main.component').then((m) => m.MainComponent),
  },
  {
    path: 'politicas',
    loadComponent: () =>
      import('../app/pages/policies/policies.component').then(
        (m) => m.PoliciesComponent
      ),
  },
  {
    path: 'galeria',
    loadComponent: () =>
      import('../app/pages/galery/galery.component').then(
        (m) => m.GaleryComponent
      ),
  },
  {
    path: 'planes',
    loadComponent: () =>
      import('../app/pages/plans/plans.component').then(
        (m) => m.PlansComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../app/pages/plans/pages/plan-list/plan-list.component').then(
            (p) => p.PlanListComponent
          ),
      },
      // La antigua página de detalle sin nombre de plan: ahora cada plan tiene su URL.
      { path: 'detalles', redirectTo: '', pathMatch: 'full' },
      {
        path: ':slug',
        loadComponent: () =>
          import(
            '../app/pages/plans/pages/plan-details/plan-details.component'
          ).then((p) => p.PlanDetailsComponent),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
