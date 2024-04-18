import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// IMPORTAR COMPONENTES.
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


import { MenusComponent } from './MODULO DE CONTROL DE USUARIOS/menus/menus.component';
import { NuevoMenuComponent } from './MODULO DE CONTROL DE USUARIOS/nuevo-menu/nuevo-menu.component';

/* Fin componentes Javier */

import { PaisComponent } from './MODULO DE COMPANIAS/pais/pais.component';
import { NuevoPaisComponent } from './MODULO DE COMPANIAS/nuevo-pais/nuevo-pais.component';
import { ProvinciaComponent } from './MODULO DE COMPANIAS/provincia/provincia.component';
import { NuevaProvinciaComponent } from './MODULO DE COMPANIAS/nueva-provincia/nueva-provincia.component';
import { DistritoComponent } from './MODULO DE COMPANIAS/distrito/distrito.component';
import { NuevoDistritoComponent } from './MODULO DE COMPANIAS/nuevo-distrito/nuevo-distrito.component';


import { FabricantesComponent } from './MODULO DE CONTROL DE SISTEMAS/fabricantes/fabricantes.component';
import { FrmFabricantesComponent } from './MODULO DE CONTROL DE SISTEMAS/frm-fabricantes/frm-fabricantes.component';
import { TipoCombustibleComponent } from './MODULO DE CONTROL DE SISTEMAS/tipo-combustible/tipo-combustible.component';
import { FrmTipoCombustibleComponent } from './MODULO DE CONTROL DE SISTEMAS/frm-tipo-combustible/frm-tipo-combustible.component';

import { UnidadesComponent } from './MODULO DE INVENTARIO/unidades/unidades.component';
import { NuevaUnidadesComponent } from './MODULO DE INVENTARIO/nueva-unidades/nueva-unidades.component'

import { UbicacionComponent } from './MODULO DE INVENTARIO/ubicacion/ubicacion.component';
import { NuevaUbicacionComponent } from './MODULO DE INVENTARIO/nueva-ubicacion/nueva-ubicacion.component'
import { CatalogoComponent } from './MODULO DE INVENTARIO/catalogo/catalogo.component';
import { TipoDeEstatusComponent } from './ESTATUS/tipo-de-estatus/tipo-de-estatus.component';
import { NuevoTipoDeEstatusComponent } from './ESTATUS/nuevo-tipo-de-estatus/nuevo-tipo-de-estatus.component';
import { EstatusComponent } from './ESTATUS/estatus/estatus.component';
import { NuevoEstatusComponent } from './ESTATUS/nuevo-estatus/nuevo-estatus.component'
import { AlmacenCompaniaComponent } from './MODULO DE INVENTARIO/almacen-compania/almacen-compania.component';
import { NuevoAlmacenCompaniaComponent } from './MODULO DE INVENTARIO/nuevo-almacen-compania/nuevo-almacen-compania.component';
import { CatalogoDeCompaniaComponent } from './MODULO DE INVENTARIO/catalogo-de-compania/catalogo-de-compania.component';
import { NuevoCatalogoDeCompaniaComponent } from './MODULO DE INVENTARIO/nuevo-catalogo-de-compania/nuevo-catalogo-de-compania.component'
import { FormaDePagoComponent } from './MODULO DE COMPANIAS/forma-de-pago/forma-de-pago.component';
import { NuevaFormaDePagoComponent } from './MODULO DE COMPANIAS/nueva-forma-de-pago/nueva-forma-de-pago.component';
import { NPedidoComponent } from './MODULO DE PEDIDOS/n-pedido/n-pedido.component';
import { DashboardAdministradorComponent } from './DASHBOARD/dashboard-administrador/dashboard-administrador.component';
import { PosiblesFallaComponent } from './MODULO DE DEFICIENCIAS/posibles-falla/posibles-falla.component'
import { FrmPosiblesFallaComponent } from './MODULO DE DEFICIENCIAS/frm-posibles-falla/frm-posibles-falla.component'




import { DashboardPedidosComponent } from './DASHBOARD/dashboard-pedidos/dashboard-pedidos.component';
import { DASHBOARDNUMEROSPARTEComponent } from './DASHBOARD/dashboard-numeros-parte/dashboard-numeros-parte.component';
import { DashboardDeficienciaComponent } from './DASHBOARD/dashboard-deficiencia/dashboard-deficiencia.component';

import { ReporteInventarioComponent } from './REPORTES/reporte-inventario/reporte-inventario.component';
import { ReporteSistemaComponent } from './REPORTES/reporte-sistema/reporte-sistema.component';
import { ReporteOperadorComponent } from './REPORTES/reporte-operador/reporte-operador.component';
import { ReporteMantenimientoComponent } from './REPORTES/reporte-mantenimiento/reporte-mantenimiento.component';
import { ReporteGastoEquipoComponent } from './REPORTES/reporte-gasto-equipo/reporte-gasto-equipo.component';




import { LicenciasComponent } from './MODULO DE CONTROL DE USUARIOS/licencias/licencias.component';
import { FormLicenciasComponent } from './MODULO DE CONTROL DE USUARIOS/form-licencias/form-licencias.component';

import { CargarExcelFabricanteComponent } from './MODULO DE PROCESOS/cargar-excel-fabricante/cargar-excel-fabricante.component';
import { CargarExcelProveedorComponent } from './MODULO DE PROCESOS/cargar-excel-proveedor/cargar-excel-proveedor.component';
import { CargarExcelCatalogoComponent } from './MODULO DE PROCESOS/cargar-excel-catalogo/cargar-excel-catalogo.component';
import { CargarExcelInventarioComponent } from './MODULO DE PROCESOS/cargar-excel-inventario/cargar-excel-inventario.component';
import { CargarExcelPosibleFallaComponent } from './MODULO DE PROCESOS/cargar-excel-posible-falla/cargar-excel-posible-falla.component';


const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent,
    data: {
      title: 'Inicio'
    }
  },
  {
    path: 'companias',
    component: CompaniasComponent,
    data: {
      title: 'Compañías'
    },
  },
  {
    path: 'nueva-compania/:data',
    component: NuevaCompaniaComponent,
    data: {
      title: 'Formulario de Compañías'
    }
  },
  {
    path: 'almacen-compania',
    component: AlmacenCompaniaComponent,
    data: {
      title: 'Alamacen compañía'
    },
  },
  {
    path: 'nuevo-almacen-compania/:data',
    component: NuevoAlmacenCompaniaComponent,
    data: {
      title: 'Almacen compañía'
    }
  },
  {
    path: 'catalogo-de-compania',
    component: CatalogoDeCompaniaComponent,
    data: {
      title: 'Catalogo de compañía'
    }
    ,
    
  },
  {
  
    path: 'nuevo-catalogo-de-compania/:data',
    component: NuevoCatalogoDeCompaniaComponent,
    data: {
      title: 'Catalogo de compañía'
    }
  },
  {
  
    path: 'forma-de-pago',
    component: FormaDePagoComponent,
    data: {
      title: 'Forma de pago'
    }
  },
  {
  
    path: 'nueva-forma-de-pago/:data',
    component: NuevaFormaDePagoComponent,
    data: {
      title: 'Forma de pago'
    }
  }
  ,
  // Javier
  {
    path: 'roles',
    component: RolesComponent,
    data: {
      title: 'Roles'
    }
  },
  {
    path: 'menu-rol/:data',
    component: MenuRolComponent,
    data: {
      title: 'Menú por Rol'
    }
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    data: {
      title: 'Usuarios'
    }
  },
  {
    path: 'nuevo-usuarios/:data',
    component: NuevoUsuarioComponent,
    data: {
      title: 'Formulario de Usuarios'
    }
  },
  {
    path: 'nuevo-rol/:data',
    component: NuevoRolComponent,
    data: {
      title: 'Formulario de rol'
    }
  },
  {
    path: 'almacen',
    component: AlmacenComponent,
    data: {
      title: 'Ubicacion de artículo'
    }
  },
  {
    path: 'nuevo_registro_de_almacen/:data',
    component: NuevoRegistroAlmacenComponent,
    data: {
      title: 'Formulario ubicacion de artículo'
    }
  },
  {
    path: 'historial',
    component: HistorialComponent,
    data: {
      title: 'Historial'
    }
  },
  {
    path: 'proveedores',
    component: ProveedorComponent,
    data: {
      title: 'Proveedores'
    }
  },
  {
    path: 'nuevo-proveedor/:data',
    component: NuevoProveedorComponent,
    data: {
      title: 'Formulario de Proveedor'
    }
  },
  {
    path: 'pedidos',
    component: PedidosComponent,
    data: {
      title: 'Pedidos'
    }
  },
  {
    path: 'nuevo-registro-pedidos/:data',
    component: NuevoRegistroPedidosComponent,
    data: {
      title: 'Formulario de Pedido'
    }
  },
  {
    path: 'n-pedido/:data',
    component: NPedidoComponent ,
    data: {
      title: 'Pedidos'
    }
  },
  {
    path: 'recibir-pedidos/:data',
    component: RecibirPedidosComponent,
    data: {
      title: 'Recibir pedidos'
    }
  }
  ,
  {
    path: 'sistemas',
    component: SistemasComponent,
    data: {
      title: 'Sistemas'
    }
  }
  ,
  {
    path: 'personal',
    component: PersonalComponent,
    data: {
      title: 'Personal'
    }
  }
  ,
  {
    path: 'nuevo-personal/:data',
    component: NuevoPersonalComponent,
    data: {
      title: 'Formulario de Personal'
    }
  }
  ,
  {
    path: 'tipo-de-personal',
    component: TipoDePersonalComponent,
    data: {
      title: 'Tipo de personal'
    }
  }
  ,
  {
    path: 'nuevo-tipo-de-personal/:data',
    component: NuevoTipoDePersonalComponent,
    data: {
      title: 'Formulario Tipo de personal'
    }
  }
  ,
  {
    path: 'nuevo-sistemas/:data',
    component: NuevoSistemasComponent,
    data: {
      title: 'Formulario de Sistema'
    }
  }
  ,
  {
    path: 'tipo-de-sistemas',
    component: TiposDeSistemasComponent,
    data: {
      title: 'Tipo de sistemas'
    }
  }
  ,
  {
    path: 'nuevo-tipo-de-sistemas/:data',
    component: NuevoTipoDeSistemasComponent,
    data: {
      title: 'Formulario Tipo de sistemas'
    }
  }
  ,
  {
    path: 'servicio',
    component: ServicioComponent,
    data: {
      title: 'Servicio'
    }
  }
  ,
  {
    path: 'nuevo-servicio/:data',
    component: NuevoServicioComponent,
    data: {
      title: 'Formulario de Servicio'
    }
  }
  ,
  {
    path: 'equipo',
    component: EquipoComponent,
    data: {
      title: 'Equipo'
    }
  }
  ,
  {
    path: 'nuevo-equipo/:data',
    component: NuevoEquipoComponent,
    data: {
      title: 'Formulario de Equipo'
    }
  }
  ,
  {
    path: 'modelos',
    component: ModelosComponent,
    data: {
      title: 'Modelos'
    }
  }
  ,
  {
    path: 'nuevo-modelos/:data',
    component: NuevoModelosComponent,
    data: {
      title: 'Formulario de Modelos'
    }
  }

  ,
  {
    path: 'combustibles',
    component: CombustiblesComponent,
    data: {
      title: 'Combustibles'
    }
  }
  ,
  {
    path: 'nuevo-combustibles/:data',
    component: NuevoCombustiblesComponent,
    data: {
      title: 'Formulario de Combustibles'
    }
  }
  ,
  {
    path: 'destinos',
    component: DestinosComponent,
    data: {
      title: 'Destinos'
    }
  }
  ,
  {
    path: 'nuevo-destinos/:data',
    component: NuevoDestinosComponent,
    data: {
      title: 'Formulario de Destinos'
    }
  }
  ,
  {
    path: 'despacho',
    component: DespachoComponent,
    data: {
      title: 'Despacho'
    }
  }
  ,
  {
    path: 'nuevo-despacho/:data',
    component: NuevoDespachoComponent,
    data: {
      title: 'Formulario de Despacho'
    }
  }
  ,
  {
    path: 'deficiencia',
    component: DeficienciaComponent,
    data: {
      title: 'Deficiencia'
    }
  }
  ,
  {
    path: 'nueva-deficiencia/:data',
    component: NuevaDeficienciaComponent,
    data: {
      title: 'Formulario de Deficiencia'
    }
  }
  ,
  {
    path: 'tipo-de-deficiencia',
    component: TipoDeDeficienciaComponent,
    data: {
      title: 'Tipo de deficiencia'
    }
  }
  ,
  {
    path: 'nuevo-tipo-de-deficiencia/:data',
    component: NuevoTipoDeDeficienciaComponent,
    data: {
      title: 'Formulario Tipo de Deficiencia'
    }
  }
  ,
  {
    path: 'tipo-de-mantenimiento',
    component: TipoDeMantenimientoComponent,
    data: {
      title: 'Tipo de mantenimiento'
    }
  }
  ,
  {
    path: 'nuevo-tipo-de-mantenimiento/:data',
    component: NuevoTipoDeMantenimientoComponent,
    data: {
      title: 'Formulario de Mantenimiento'
    }
  }
  ,
  {
    path: 'orden-de-trabajo',
    component: OrdenDeTrabajoComponent,
    data: {
      title: 'Orden de trabajo'
    }
  }
  ,
  {
    path: 'nueva-orden-de-trabajo/:data',
    component: NuevaOrdenDeTrabajoComponent,
    data: {
      title: 'Formulario Orden de trabajo'
    }
  }
  ,
  {
    path: 'tareas-orden-de-trabajo',
    component: TareasOrdenDeTrabajoComponent,
    data: {
      title: 'Tareas orden de trabajo'
    }
  }
  ,
  {
    path: 'nueva-tareas-orden-de-trabajo/:data',
    component: NuevaTareasOrdenDeTrabajoComponent,
    data: {
      title: 'Formulario Tareas orden de trabajo'
    }
  }
  ,
  {
    path: 'entrega-de-partes',
    component: EntregaDePartesComponent,
    data: {
      title: 'Entrega de partes'
    }
  }
  ,
  {
    path: 'nueva-entrega-de-partes/:data',
    component: NuevaEntregaDePartesComponent,
    data: {
      title: 'Formulario Entrega de partes'
    }
  }
  ,
  {
    path: 'prioridades',
    component: PrioridadesComponent,
    data: {
      title: 'Prioridades'
    }
  }
  ,
  {
    path: 'nueva-prioridades/:data',
    component: NuevaPrioridadesComponent,
    data: {
      title: 'Formulario de Prioridades'
    }
  }
  ,
  {
    path: 'requisisiones',
    component: RequisisionesComponent,
    data: {
      title: 'Requisisiones'
    }
  }
  ,
  {
    path: 'nueva-requisisiones/:data',
    component: NuevaRequisisionesComponent,
    data: {
      title: 'Formulario de Requisisiones'
    }
  }
  ,
  {
    path: 'estatus',
    component: EstatusComponent,
    data: {
      title: 'Estatus'
    }
  }
  ,
  {
    path: 'nuevo-estatus/:data',
    component: NuevoEstatusComponent,
    data: {
      title: 'Formulario de Estados'
    }
  }
  ,
  {
    path: 'tipo-de-estatus',
    component: TipoDeEstatusComponent,
    data: {
      title: 'Tipo de estatus'
    }
  }
  ,
  {
    path: 'nuevo-tipo-de-estatus/:data',
    component: NuevoTipoDeEstatusComponent,
    data: {
      title: 'Formulario Tipo de estatus'
    }
  },
  {
    path: 'pais',
    component: PaisComponent,
    data: {
      title: 'País'
    }
  }
  ,
  {
    path: 'nuevo-pais/:data',
    component: NuevoPaisComponent,
    data: {
      title: 'Formulario Formulario de País'
    }
  }
  ,
  {
    path: 'provincia',
    component: ProvinciaComponent,
    data: {
      title: 'Provincia'
    }
  }
  ,
  {
    path: 'nueva-provincia/:data',
    component: NuevaProvinciaComponent,
    data: {
      title: 'Formulario de Provincia'
    }
  }
  ,
  {
    path: 'distrito',
    component: DistritoComponent,
    data: {
      title: 'Distrito'
    }
  }
  ,
  {
    path: 'nuevo-distrito/:data',
    component: NuevoDistritoComponent,
    data: {
      title: 'Formulario de Distrito'
    }
  },
  {
    path: 'menus',
    component: MenusComponent,
    data: {
      title: 'Menú'
    }
  },
  {
    path: 'nuevo-menu/:data',
    component: NuevoMenuComponent,
    data: {
      title: 'Formulario de Menú'
    }
  },
  {
    path: 'fabricantes',
    component: FabricantesComponent,
    data: {
      title: 'Fabricantes'
    }
  },
  {
    path: 'frm-fabricantes/:data',
    component: FrmFabricantesComponent,
    data: {
      title: 'Formulario Fabricantes'
    }
  },
  {
    path: 'tipocombustible',
    component: TipoCombustibleComponent,
    data: {
      title: 'Tipo de Combustible'
    }
  },
  {
    path: 'frm-tipo-combustible/:data',
    component: FrmTipoCombustibleComponent,
    data: {
      title: 'Formulario tipo de combustible'
    }

  }
  ,
  {
    path: 'unidades',
    component: UnidadesComponent,
    data: {
      title: 'Unidades'
    }
  }
  ,
  {
    path: 'nueva-unidades/:data',
    component: NuevaUnidadesComponent,
    data: {
      title: 'Formulario de Unidades'
    }
  }
  ,
  {
    path: 'ubicacion',
    component: UbicacionComponent,
    data: {
      title: 'Ubicacion'
    }
  }
  ,
  {
    path: 'nueva-ubicacion/:data',
    component: NuevaUbicacionComponent,
    data: {
      title: 'Formulario de Ubicacion'
    }
  }
  ,
  {
    path: 'catalogo',
    component: CatalogoComponent,
    data: {
      title: 'Lista de inventario'
    }
  }
  ,
  {
    path: 'informacion_del_catalogo/:data',
    component: InformacionDeCatalogoComponent,
    data: {
      title: 'Crear listado de inventario'
    }
  },
  {
    path: 'Dashboard-Adm',
    component: DashboardAdministradorComponent,
    data: {
      title: 'Pantalla Gerencial Administrador'
    }
    
  },
  {
    path: 'Dashboard-Pedidos',
    component: DashboardPedidosComponent,
    data: {
      title: 'Pantalla Gerencial de Pedidos'
    }
    
  }
  ,
  {
    path: 'Dashboard-Numero-Partes',
    component: DASHBOARDNUMEROSPARTEComponent ,
    data: {
      title: 'Pantalla Gerencial Numero-Partes'
    }
    
  }
  ,
  {
    path: 'Dashboard-Deficiencias',
    component: DashboardDeficienciaComponent ,
    data: {
      title: 'Pantalla Gerencial de las Deficiencias'
    }
    
  }
  ,
  {
    path: 'posibles-fallas',
    component: PosiblesFallaComponent,
    data: {
      title: 'Posibles Fallas'
    }
  },
  {
    path: 'frm-posibles-fallas/:data',
    component: FrmPosiblesFallaComponent,
    data: {
      title: 'Formulario de Posibles Fallas'
    }
  },
  {
    path: 'reporte-inventario',
    component: ReporteInventarioComponent,
    data: {
      title: 'Reporte de Inventario'
    }
  },
  {
    path: 'licencias',
    component: LicenciasComponent,
    data: {
      title: 'Licencias'
    }
  },
  {
    path: 'form-licencias/:data',
    component: FormLicenciasComponent,
    data: {
      title: 'Formulario de licencias'
    }
  },
  {
    path: 'reporte-sistema',
    component: ReporteSistemaComponent,
    data: {
      title: 'Reporte de Sistema'
    }
  },{
    path: 'reporte-operador',
    component: ReporteOperadorComponent,
    data: {
      title: 'Reporte de Operador'
    }
  },{
    path: 'reporte-mantenimiento',
    component: ReporteMantenimientoComponent,
    data: {
      title: 'Reporte de Mantenimiento'
    }
  },{
    path: 'reporte-gasto-equipo',
    component: ReporteGastoEquipoComponent,
    data: {
      title: 'Gasto por equipo'
    }
  },{
    path: 'cargar-excel-fabricante',
    component: CargarExcelFabricanteComponent,
    data: {
      title: 'Cargar Fabricante'
    }
  },{
    path: 'cargar-excel-proveedor',
    component: CargarExcelProveedorComponent,
    data: {
      title: 'Cargar Proveedor'
    }
  },{
    path: 'cargar-excel-catalogo',
    component: CargarExcelCatalogoComponent,
    data: {
      title: 'Cargar Catalogo de Compañia'
    }
  },{
    path: 'cargar-excel-inventario',
    component: CargarExcelInventarioComponent,
    data: {
      title: 'Cargar Inventario'
    }
  }
  ,{
    path: 'cargar-excel-posible-falla',
    component: CargarExcelPosibleFallaComponent,
    data: {
      title: 'Cargar Posible Falla'
    }
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SilcRoutingModule { }
