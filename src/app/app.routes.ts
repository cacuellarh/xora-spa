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
      {
        path: 'detalles',
        loadComponent: () =>
          import(
            '../app/pages/plans/pages/plan-details/plan-details.component'
          ).then((p) => p.PlanDetailsComponent),
      },
    ],
  },
];
