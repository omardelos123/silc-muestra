import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { parametros } from '../parametros';
import { ResponseOptions } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class RestService {

  apiUrl = new parametros().rest_server;
  private headers: any = {'Content-type': 'application/json'};

  constructor(public http: HttpClient, private options: ResponseOptions) {
    console.log('Hello RestProvider Provider');
  }

  //#region CRUD

  CRUD_compania(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_compania', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  CRUD_almacen(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_almacen', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  CRUD_roles(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_roles', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  CRUD_menu(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_menu', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  CRUD_usuarios(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_usuarios', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  CRUD_pais(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_pais', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  CRUD_provincia(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_provincia', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  CRUD_distrito(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_distrito', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  CRUD_tipo_de_personal(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_tipo_de_personal', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  CRUD_personal(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_personal', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  CRUD_servicios(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_servicios', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  CRUD_despachables(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_lista_sistemas_despachables_sin_despachar', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  CRUD_tipo_sistemas(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_tipo_sistemas', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  CRUD_destino(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_destino', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  CRUD_modelo(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_modelo', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  CRUD_permisos(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_permisos', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  CRUD_clase_de_equipo(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_clase_de_equipo', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  CRUD_fabricantes(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_fabricantes', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  CRUD_tipo_de_deficiencia(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_tipo_de_deficiencia', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  CRUD_tipo_de_mantenimiento(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_tipo_de_mantenimiento', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  CRUD_tipo_combustible(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_tipo_combustible', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  CRUD_sistemas(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_sistemas', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  CRUD_proveedores(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_proveedores', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
  CRUD_unidades(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_unidades', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
  CRUD_ubicacion(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_ubicacion', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
  CRUD_catalogo_de_repuesto(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_catalogo_de_repuesto', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  CRUD_prioridades(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_prioridades', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  CRUD_combustible(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_combustible', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  CRUD_despachos(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_despachos', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  CRUD_estatus(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_estatus', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  CRUD_tipo_estatus(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_tipo_estatus', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  CRUD_deficiencias(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_deficiencias', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  CRUD_almacen_compania(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_almacen_compania', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  CRUD_catalogo_de_compania(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_catalogo_de_compania', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  CRUD_forma_pago(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_forma_pago', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  //#endregion


  get_paises(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }


  //#region  GEN

  GEN_login_control_acceso(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_login_control_acceso', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  GEN_lista_pedidos_deficiencia(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_lista_pedidos_deficiencia', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });

  }

  GEN_lista_parte_proveedor(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_lista_parte_proveedor', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });

  }
  GEN_lista_proveedor_parte(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_lista_proveedor_parte', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });

  }
  CRUD_pedidos(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_pedidos', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  CRUD_detalle_pedidos(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_detalle_pedidos', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  GEN_detalle_pedidos(datos: any) {

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_detalle_pedidos', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  GEN_eliminar_pedido(datos: any) {

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_eliminar_pedido', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
  GEN_tarea(datos: any) {

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_tarea', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  CRUD_recibir_pedidos(datos: any) {

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_recibir_pedidos', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  GEN_recibir_pedidos(datos: any) {

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_recibir_pedidos', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  GEN_requisiciones(datos: any) {

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_requisiciones', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
  GEN_actualizar_detalle_pedidos(datos: any) {

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_actualizar_detalle_pedidos', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  GEN_eliminar_recibir_pedido(datos: any) {

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_eliminar_recibir_pedido', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  GEN_verificar_lista_inventario(datos: any) {

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_verificar_lista_inventario', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  GEN_Actualizar_pedido_inventario(datos: any) {

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_Actualizar_pedido_inventario', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  GEN_actualizar_pedido_sw_estado(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_actualizar_pedido_sw_estado', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  PROC_dashboard(datos: any) {
    console.log(this.headers);
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'PROC_dashboard', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  CRUD_historico_pedidos(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_historico_pedidos', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  GEN_entrada_historico(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_entrada_historico', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }


  GEN_movimiento_de_inventario(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_movimiento_de_inventario', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }


  GEN_administrativos_para_orden_t(datos) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_administrativos_para_orden_t', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  GEN_deficiencias_by_id_sistemas(datos) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_deficiencias_by_id_sistemas', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  GEN_requisiciones_by_id_deficiencia(datos) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_requisiciones_by_id_deficiencia', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  GEN_insert_tareas_orden_de_trabajo(datos) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_insert_tareas_orden_de_trabajo', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  CRUD_orden_de_trabajo(datos) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_orden_de_trabajo', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  CRUD_posibles_fallas(datos) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_posibles_fallas', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  GEN_prioridades_By_Id_tipo(datos) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_prioridades_By_Id_tipo', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  GEN_lista_parte_fabricante(datos) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_lista_parte_fabricante', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  GEN_detalles_pedidos(datos) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_detalles_pedidos', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  GEN_fabricantes(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_fabricantes',datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  GEN_validador_de_cantidad_autorizadas_y_minimos(datos) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_validador_de_cantidad_autorizadas_y_minimos', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  GEN_catalogo_de_compania(datos) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_catalogo_de_compania', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  GEN_catalogo_de_repuesto(datos) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_catalogo_de_repuesto', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
  //#endregion







  GEN_partes(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_partes',datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }




  //++++++++++


  GEN_DASHBOARD_PEDIDOS(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_DASHBOARD_PEDIDOS', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  GEN_DASHBOARD_NUMERO_PARTE(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_DASHBOARD_NUMERO_PARTE', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }


  PROC_punto_reorden(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'PROC_punto_reorden', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  PROC_notificacion_ordenes(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'PROC_notificacion_ordenes', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  } 

  PROC_notificacion_mantenimientos(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'PROC_notificacion_mantenimientos', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  GEN_orden_trabajo_by_Id(datos) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_orden_trabajo_by_Id', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  GEN_procesa_tarea_orden(datos) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_procesa_tarea_orden', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  GEN_DASHBOARD_DEFICIENCIAS_GRID_DATOS(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_DASHBOARD_DEFICIENCIAS_GRID_DATOS', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }


  GEN_DASHBOARD_DEFICIENCIAS_GRAFICOS(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_DASHBOARD_DEFICIENCIAS_GRAFICOS', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  REP_cotizacion_pedido(datos: any) {

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'REP_cotizacion_pedido', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  REP_orden_trabajo(datos: any) {

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'REP_orden_trabajo', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  REP_inventario(datos: any) {

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'REP_inventario', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  REP_sistema(datos: any) {

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'REP_sistema', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  REP_operador(datos: any) {

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'REP_operador', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  REP_mantenimiento_programado(datos: any) {

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'REP_mantenimiento_programado', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  REP_listado_inventario(datos: any) {

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'REP_listado_inventario', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  REP_gasto_equipo(datos: any) {

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'REP_gasto_equipo', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  GEN_detalles_pedido(datos) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_detalles_pedido', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  GEN_cambio_contrasena(datos) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_cambio_contrasena', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  REP_despacho(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'REP_despacho', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  GEN_obtener_img_usuario(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_obtener_img_usuario', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  GEN_valida_usuario(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_valida_usuario', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  GEN_valida_equipo(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_valida_equipo', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  CRUD_licencias(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'CRUD_licencias', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  PROC_envio_credenciales(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'PROC_envio_credenciales', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  GEN_cambio_contrasena_Activar(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'GEN_cambio_contrasena_Activar', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  PROC_cargar_fabricante(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'PROC_cargar_fabricante', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  PROC_cargar_proveedor(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'PROC_cargar_proveedor', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
  PROC_cargar_catalogo_compania(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'PROC_cargar_catalogo_compania', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
  PROC_cargar_catalogo_repuesto(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'PROC_cargar_catalogo_repuesto', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
  PROC_cargar_posible_falla(datos: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'PROC_cargar_posible_falla', datos, this.headers).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
}
