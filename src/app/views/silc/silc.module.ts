
import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// Popover Component
import { PopoverModule } from 'ngx-bootstrap/popover';

import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';

import { CollapseModule } from 'ngx-bootstrap/collapse';


import { NgPipesModule } from 'ngx-pipes';


import { SilcRoutingModule } from './silc-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { CompaniasComponent } from './MODULO DE COMPANIAS/companias/companias.component';
import { FrmCompaniasComponent } from './MODULO DE COMPANIAS/frm-companias/frm-companias.component';

/* Inicio componentes Javier */
import { RolesComponent } from './MODULO DE CONTROL DE USUARIOS/roles/roles.component';
import { NuevoRolComponent } from './MODULO DE CONTROL DE USUARIOS/nuevo-rol/nuevo-rol.component';
import { NuevoUsuarioComponent } from './MODULO DE CONTROL DE USUARIOS/nuevo-usuario/nuevo-usuario.component';
import { UsuariosComponent } from './MODULO DE CONTROL DE USUARIOS/usuarios/usuarios.component';
import { MenuRolComponent } from './MODULO DE CONTROL DE USUARIOS/menu-rol/menu-rol.component';
import { AlmacenComponent } from './MODULO DE INVENTARIO/almacen/almacen.component';
import { NuevoRegistroAlmacenComponent } from './MODULO DE INVENTARIO/nuevo-registro-almacen/nuevo-registro-almacen.component';
import { InformacionDeCatalogoComponent } from './MODULO DE INVENTARIO/informacion-de-catalogo/informacion-de-catalogo.component';
import { HistorialComponent } from './MODULO DE PEDIDOS/historial/historial.component';
import { ProveedorComponent } from './MODULO DE INVENTARIO/proveedor/proveedor.component';
import { NuevoProveedorComponent } from './MODULO DE INVENTARIO/nuevo-proveedor/nuevo-proveedor.component';
import { PedidosComponent } from './MODULO DE PEDIDOS/pedidos/pedidos.component';
import { NuevoRegistroPedidosComponent } from './MODULO DE PEDIDOS/nuevo-registro-pedidos/nuevo-registro-pedidos.component';
import { RecibirPedidosComponent } from './MODULO DE PEDIDOS/recibir-pedidos/recibir-pedidos.component';
//import { PruebasComponent } from './Pruebas/pruebas/pruebas.component';
import { NuevaCompaniaComponent } from './MODULO DE COMPANIAS/nueva-compania/nueva-compania.component';
import { SistemasComponent } from './MODULO DE CONTROL DE SISTEMAS/sistemas/sistemas.component';
import { NuevoSistemasComponent } from './MODULO DE CONTROL DE SISTEMAS/nuevo-sistemas/nuevo-sistemas.component';
import { DespachoComponent } from './MODULO DE CONTROL DE SISTEMAS/despacho/despacho.component';
import { NuevoDespachoComponent } from './MODULO DE CONTROL DE SISTEMAS/nuevo-despacho/nuevo-despacho.component';
import { ModelosComponent } from './MODULO DE CONTROL DE SISTEMAS/modelos/modelos.component';
import { NuevoModelosComponent } from './MODULO DE CONTROL DE SISTEMAS/nuevo-modelos/nuevo-modelos.component';
import { DestinosComponent } from './MODULO DE CONTROL DE SISTEMAS/destinos/destinos.component';
import { NuevoDestinosComponent } from './MODULO DE CONTROL DE SISTEMAS/nuevo-destinos/nuevo-destinos.component';
import { CombustiblesComponent } from './MODULO DE CONTROL DE SISTEMAS/combustibles/combustibles.component';
import { NuevoCombustiblesComponent } from './MODULO DE CONTROL DE SISTEMAS/nuevo-combustibles/nuevo-combustibles.component';
import { PersonalComponent } from './MODULO DE CONTROL DE SISTEMAS/personal/personal.component';
import { NuevoPersonalComponent } from './MODULO DE CONTROL DE SISTEMAS/nuevo-personal/nuevo-personal.component';
import { EquipoComponent } from './MODULO DE CONTROL DE SISTEMAS/equipo/equipo.component';
import { NuevoEquipoComponent } from './MODULO DE CONTROL DE SISTEMAS/nuevo-equipo/nuevo-equipo.component';
import { ServicioComponent } from './MODULO DE CONTROL DE SISTEMAS/servicio/servicio.component';
import { NuevoServicioComponent } from './MODULO DE CONTROL DE SISTEMAS/nuevo-servicio/nuevo-servicio.component';
import { TiposDeSistemasComponent } from './MODULO DE CONTROL DE SISTEMAS/tipos-de-sistemas/tipos-de-sistemas.component';
import { NuevoTipoDeSistemasComponent } from './MODULO DE CONTROL DE SISTEMAS/nuevo-tipo-de-sistemas/nuevo-tipo-de-sistemas.component';
import { TipoDePersonalComponent } from './MODULO DE CONTROL DE USUARIOS/tipo-de-personal/tipo-de-personal.component';
import { NuevoTipoDePersonalComponent } from './MODULO DE CONTROL DE USUARIOS/nuevo-tipo-de-personal/nuevo-tipo-de-personal.component';
//import { NuevoPedidoComponent } from './MODULO DE PEDIDOS/nuevo-pedido/nuevo-pedido.component';
import { DeficienciaComponent } from './MODULO DE DEFICIENCIAS/deficiencia/deficiencia.component';
import { NuevaDeficienciaComponent } from './MODULO DE DEFICIENCIAS/nueva-deficiencia/nueva-deficiencia.component';
import { TipoDeDeficienciaComponent } from './MODULO DE DEFICIENCIAS/tipo-de-deficiencia/tipo-de-deficiencia.component';
import { NuevoTipoDeDeficienciaComponent } from './MODULO DE DEFICIENCIAS/nuevo-tipo-de-deficiencia/nuevo-tipo-de-deficiencia.component';
import { TipoDeMantenimientoComponent } from './MODULO DE DEFICIENCIAS/tipo-de-mantenimiento/tipo-de-mantenimiento.component';
import { NuevoTipoDeMantenimientoComponent } from './MODULO DE DEFICIENCIAS/nuevo-tipo-de-mantenimiento/nuevo-tipo-de-mantenimiento.component';
import { OrdenDeTrabajoComponent } from './MODULO DE DEFICIENCIAS/orden-de-trabajo/orden-de-trabajo.component';
import { NuevaOrdenDeTrabajoComponent } from './MODULO DE DEFICIENCIAS/nueva-orden-de-trabajo/nueva-orden-de-trabajo.component';
import { TareasOrdenDeTrabajoComponent } from './MODULO DE DEFICIENCIAS/tareas-orden-de-trabajo/tareas-orden-de-trabajo.component';
import { NuevaTareasOrdenDeTrabajoComponent } from './MODULO DE DEFICIENCIAS/nueva-tareas-orden-de-trabajo/nueva-tareas-orden-de-trabajo.component';
import { EntregaDePartesComponent } from './MODULO DE DEFICIENCIAS/entrega-de-partes/entrega-de-partes.component';
import { NuevaEntregaDePartesComponent } from './MODULO DE DEFICIENCIAS/nueva-entrega-de-partes/nueva-entrega-de-partes.component';
import { PrioridadesComponent } from './MODULO DE DEFICIENCIAS/prioridades/prioridades.component';
import { NuevaPrioridadesComponent } from './MODULO DE DEFICIENCIAS/nueva-prioridades/nueva-prioridades.component';
import { RequisisionesComponent } from './MODULO DE DEFICIENCIAS/requisisiones/requisisiones.component';
import { NuevaRequisisionesComponent } from './MODULO DE DEFICIENCIAS/nueva-requisisiones/nueva-requisisiones.component';


import { PaisComponent } from './MODULO DE COMPANIAS/pais/pais.component';
import { NuevoPaisComponent } from './MODULO DE COMPANIAS/nuevo-pais/nuevo-pais.component';
import { ProvinciaComponent } from './MODULO DE COMPANIAS/provincia/provincia.component';
import { NuevaProvinciaComponent } from './MODULO DE COMPANIAS/nueva-provincia/nueva-provincia.component';
import { DistritoComponent } from './MODULO DE COMPANIAS/distrito/distrito.component';
import { NuevoDistritoComponent } from './MODULO DE COMPANIAS/nuevo-distrito/nuevo-distrito.component';
/* Fin componentes Javier */

// import { SpinnerComponent } from '../../controles/spinner/spinner.component';
import { MenusComponent } from './MODULO DE CONTROL DE USUARIOS/menus/menus.component';
import { NuevoMenuComponent } from './MODULO DE CONTROL DE USUARIOS/nuevo-menu/nuevo-menu.component';

import { ShareModule } from '../../share/share.module';
import { FabricantesComponent } from './MODULO DE CONTROL DE SISTEMAS/fabricantes/fabricantes.component';
import { FrmFabricantesComponent } from './MODULO DE CONTROL DE SISTEMAS/frm-fabricantes/frm-fabricantes.component';
import { TipoCombustibleComponent } from './MODULO DE CONTROL DE SISTEMAS/tipo-combustible/tipo-combustible.component';
import { FrmTipoCombustibleComponent } from './MODULO DE CONTROL DE SISTEMAS/frm-tipo-combustible/frm-tipo-combustible.component';
import { UnidadesComponent } from './MODULO DE INVENTARIO/unidades/unidades.component';
import { NuevaUnidadesComponent } from './MODULO DE INVENTARIO/nueva-unidades/nueva-unidades.component';
import { UbicacionComponent } from './MODULO DE INVENTARIO/ubicacion/ubicacion.component';
import { NuevaUbicacionComponent } from './MODULO DE INVENTARIO/nueva-ubicacion/nueva-ubicacion.component';
import { CatalogoComponent } from './MODULO DE INVENTARIO/catalogo/catalogo.component'

import { TipoDeEstatusComponent } from './ESTATUS/tipo-de-estatus/tipo-de-estatus.component';
import { NuevoTipoDeEstatusComponent } from './ESTATUS/nuevo-tipo-de-estatus/nuevo-tipo-de-estatus.component';
import { EstatusComponent } from './ESTATUS/estatus/estatus.component';
import { NuevoEstatusComponent } from './ESTATUS/nuevo-estatus/nuevo-estatus.component'
import { AlmacenCompaniaComponent } from './MODULO DE INVENTARIO/almacen-compania/almacen-compania.component';
import { NuevoAlmacenCompaniaComponent } from './MODULO DE INVENTARIO/nuevo-almacen-compania/nuevo-almacen-compania.component';
import { CatalogoDeCompaniaComponent } from './MODULO DE INVENTARIO/catalogo-de-compania/catalogo-de-compania.component';
import { NuevoCatalogoDeCompaniaComponent } from './MODULO DE INVENTARIO/nuevo-catalogo-de-compania/nuevo-catalogo-de-compania.component';
import { FormaDePagoComponent } from './MODULO DE COMPANIAS/forma-de-pago/forma-de-pago.component';
import { NuevaFormaDePagoComponent } from './MODULO DE COMPANIAS/nueva-forma-de-pago/nueva-forma-de-pago.component';
import { NPedidoComponent } from './MODULO DE PEDIDOS/n-pedido/n-pedido.component';
import { DashboardAdministradorComponent } from './DASHBOARD/dashboard-administrador/dashboard-administrador.component';


// import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PosiblesFallaComponent } from './MODULO DE DEFICIENCIAS/posibles-falla/posibles-falla.component';
import { FrmPosiblesFallaComponent } from './MODULO DE DEFICIENCIAS/frm-posibles-falla/frm-posibles-falla.component';
import { DashboardPedidosComponent } from './DASHBOARD/dashboard-pedidos/dashboard-pedidos.component';
import { DASHBOARDNUMEROSPARTEComponent } from './DASHBOARD/dashboard-numeros-parte/dashboard-numeros-parte.component';
import { DashboardDeficienciaComponent } from './DASHBOARD/dashboard-deficiencia/dashboard-deficiencia.component';
 
import { ReporteInventarioComponent } from './REPORTES/reporte-inventario/reporte-inventario.component';
import { LicenciasComponent } from './MODULO DE CONTROL DE USUARIOS/licencias/licencias.component';
import { FormLicenciasComponent } from './MODULO DE CONTROL DE USUARIOS/form-licencias/form-licencias.component';
import { ReporteSistemaComponent } from './REPORTES/reporte-sistema/reporte-sistema.component';
import { ReporteOperadorComponent } from './REPORTES/reporte-operador/reporte-operador.component';
import { ReporteMantenimientoComponent } from './REPORTES/reporte-mantenimiento/reporte-mantenimiento.component';
import { ReporteGastoEquipoComponent } from './REPORTES/reporte-gasto-equipo/reporte-gasto-equipo.component';

// import { ImportarCatalogoComponent } from './MODULO DE INVENTARIO/importar-catalogo/importar-catalogo.component'

//


import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CargarExcelFabricanteComponent } from './MODULO DE PROCESOS/cargar-excel-fabricante/cargar-excel-fabricante.component';
import { CargarExcelProveedorComponent } from './MODULO DE PROCESOS/cargar-excel-proveedor/cargar-excel-proveedor.component';
import { CargarExcelCatalogoComponent } from './MODULO DE PROCESOS/cargar-excel-catalogo/cargar-excel-catalogo.component';
import { CargarExcelInventarioComponent } from './MODULO DE PROCESOS/cargar-excel-inventario/cargar-excel-inventario.component';
// import { NotifMantenimientoComponent } from './NOTIFICACIONES/notif-mantenimiento/notif-mantenimiento.component';
import { CargarExcelPosibleFallaComponent } from './MODULO DE PROCESOS/cargar-excel-posible-falla/cargar-excel-posible-falla.component';
import { ChartsModule } from 'ng2-charts';
// import { NotifOrdenesComponent } from './NOTIFICACIONES/notif-ordenes/notif-ordenes.component';
// import { NotifPedidosComponent } from './NOTIFICACIONES/notif-pedidos/notif-pedidos.component';

@NgModule({
  declarations: [InicioComponent, CompaniasComponent, FrmCompaniasComponent, RolesComponent, NuevoRolComponent, NuevoUsuarioComponent, 
    UsuariosComponent, MenuRolComponent, AlmacenComponent, NuevoRegistroAlmacenComponent, InformacionDeCatalogoComponent, HistorialComponent, 
    ProveedorComponent, NuevoProveedorComponent, PedidosComponent, NuevoRegistroPedidosComponent, RecibirPedidosComponent, 
    NuevaCompaniaComponent, SistemasComponent, NuevoSistemasComponent, DespachoComponent, NuevoDespachoComponent, ModelosComponent, 
    NuevoModelosComponent, DestinosComponent, NuevoDestinosComponent, CombustiblesComponent, NuevoCombustiblesComponent, PersonalComponent, 
    NuevoPersonalComponent, EquipoComponent, NuevoEquipoComponent, ServicioComponent, NuevoServicioComponent, TiposDeSistemasComponent, 
    NuevoTipoDeSistemasComponent, TipoDePersonalComponent, NuevoTipoDePersonalComponent, DeficienciaComponent, NuevaDeficienciaComponent, 
    TipoDeDeficienciaComponent, NuevoTipoDeDeficienciaComponent, TipoDeMantenimientoComponent, NuevoTipoDeMantenimientoComponent, 
    OrdenDeTrabajoComponent, NuevaOrdenDeTrabajoComponent, TareasOrdenDeTrabajoComponent, NuevaTareasOrdenDeTrabajoComponent, 
    EntregaDePartesComponent, NuevaEntregaDePartesComponent, PrioridadesComponent, NuevaPrioridadesComponent, RequisisionesComponent, 
    NuevaRequisisionesComponent, PaisComponent, NuevoPaisComponent, ProvinciaComponent, NuevaProvinciaComponent, DistritoComponent, 
    NuevoDistritoComponent, MenusComponent, NuevoMenuComponent, FabricantesComponent, FrmFabricantesComponent, TipoCombustibleComponent, 
    FrmTipoCombustibleComponent, UnidadesComponent, NuevaUnidadesComponent, UbicacionComponent, NuevaUbicacionComponent, CatalogoComponent,
    TipoDeEstatusComponent, NuevoTipoDeEstatusComponent, EstatusComponent, NuevoEstatusComponent, AlmacenCompaniaComponent,
    NuevoAlmacenCompaniaComponent, NuevoAlmacenCompaniaComponent, 
    CatalogoDeCompaniaComponent, NuevoCatalogoDeCompaniaComponent, 
    FormaDePagoComponent, NuevaFormaDePagoComponent, NPedidoComponent, 
    DashboardAdministradorComponent, PosiblesFallaComponent, FrmPosiblesFallaComponent, 
    DashboardPedidosComponent, DASHBOARDNUMEROSPARTEComponent, DashboardDeficienciaComponent,
    ReporteInventarioComponent,
    LicenciasComponent,
    FormLicenciasComponent,
    ReporteSistemaComponent,
    ReporteOperadorComponent,
    ReporteMantenimientoComponent,
    ReporteGastoEquipoComponent,
    CargarExcelFabricanteComponent,
    CargarExcelProveedorComponent,
    CargarExcelCatalogoComponent,
    CargarExcelInventarioComponent,
    CargarExcelPosibleFallaComponent,
    // NotifMantenimientoComponent,
    // NotifOrdenesComponent,
    // NotifPedidosComponent
  ],
  imports: [HttpModule, FormsModule,
    SilcRoutingModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    PopoverModule.forRoot(),
    CollapseModule.forRoot(),
    NgPipesModule,
    // BrowserModule,
    CommonModule,ShareModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    ReactiveFormsModule,
    PaginationModule.forRoot()
  ]
})
export class SilcModule { }
