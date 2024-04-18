import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ModalModule } from 'ngx-bootstrap/modal';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RestService } from './services/rest/rest.service';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

import { NgPipesModule } from 'ngx-pipes';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
// import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SILCComponent } from './views/silc/silc.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShareModule } from './share/share.module';
import { BotonNotificacionesComponent } from '../app/views/silc/FRAGMENTOS/boton-notificaciones/boton-notificaciones.component';
import { RestablecerContrasenaComponent } from './views/restablecer-contrasena/restablecer-contrasena.component';
import { NotifOrdenesComponent } from '../app/views/silc/NOTIFICACIONES/notif-ordenes/notif-ordenes.component';
import { NotifPedidosComponent } from '../app/views/silc/NOTIFICACIONES/notif-pedidos/notif-pedidos.component';
import { NotifMantenimientoComponent } from '../app/views/silc/NOTIFICACIONES/notif-mantenimiento/notif-mantenimiento.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    ModalModule.forRoot(),
    // BrowserModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    BrowserAnimationsModule,
    NgPipesModule,
    FormsModule,
    ShareModule
  ],
  declarations: [
    AppComponent,
    APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    SILCComponent,
    BotonNotificacionesComponent,
    RestablecerContrasenaComponent,
    NotifOrdenesComponent,
    NotifPedidosComponent,
    NotifMantenimientoComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },RestService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
