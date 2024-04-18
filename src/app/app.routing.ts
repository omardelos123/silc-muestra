import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { GuardGuard } from './services/guard.guard';
import { RestablecerContrasenaComponent } from './views/restablecer-contrasena/restablecer-contrasena.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    // path: 'restablecer-contrasena',
    path: 'restablecer-contrasena/:data',
    component: RestablecerContrasenaComponent,
    data: {
      title: 'Restablecer contrasena'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'SILC'
    },
    children: [
      {
        path: 'silc',
        loadChildren: './views/silc/silc.module#SilcModule', canActivateChild: [GuardGuard]
      },
      {
        path: 'inicio',
        loadChildren: './views/silc/silc.module#SilcModule', canActivateChild: [GuardGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
