import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RestService, parametros, Permisos, ValidadoresService, UtilidadesService } from '../../../../services/_export';
declare var swal: any;

@Component({
  selector: 'app-nueva-orden-de-trabajo',
  templateUrl: './nueva-orden-de-trabajo.component.html',
  styleUrls: ['./nueva-orden-de-trabajo.component.scss']
})
export class NuevaOrdenDeTrabajoComponent implements OnInit {

  /* Variables de configuración de notificación*/



  /* Variables para los permisos, eliminar, editar, guardar */
  permisos = new Permisos().access;

  /* Objeto que se envia al webservice  */
  solicitud = new parametros().prm_deficiencias;
  flag: boolean = false;

  /*Variables del la vista */
  titulo: string;
  estatus: string;
  btn_acciones = { btn_guardar: false, btn_limpiar: false }

  partes: any[] = [];
  sistemas: any = [];
  deficiencias: any = [];
  lista_repuestos: any[] = [];
  deficiencias_detalle: any = {};
  filtrar_sistemas: string;
  sistema_nombre: string = "";
  sistema_seleccionado: any = { numero_administrativo: '', nombre_sistema: '', id_sistema: 0 };
  bk_sistema_seleccionado: any = { numero_administrativo: '', nombre_sistema: '', id_sistema: 0 };

  bl_cerrar_orden: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private rest: RestService,
    private _validadores: ValidadoresService, private _utilidades: UtilidadesService) { }

  ngOnInit() {
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
    this.route.params.subscribe(params => {
      if (params['data'] != null) {
        try {
          this.titulo = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).titulo;
          this.estatus = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).estatus;

          this.btn_acciones = this._validadores.BtnVisibles(this.estatus); /* valida que botones debe mostrar en pantalla */
          this.solicitud.accion_tipo = this._validadores.tipo_estatus(this.estatus); /* valida la accion que se debe ejecutar en la pantalla: Crear = C, modificar = U, detalle = '' */
          if (this.estatus == 'modificar' || this.estatus == 'detalle') { /* si es modificacion o  detalle se deben cargar los datos en los input */
            let ordenes_trabajo = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).datos;
            this.asignar_solicitud(ordenes_trabajo);
          } else {
            this.run_sistemas();
          }
        } catch (error) {
          alert("Ocurrio un error con los parametros del Router.");
          console.log(error);
        }
      }
      else {
        alert("Parametros nulos.");
      }
    });
    this.solicitud.token = JSON.parse(decodeURIComponent(escape(window.atob(localStorage._token))));
  }

  asignar_solicitud(datos: any) {
    this.sistema_nombre = datos.nombre_sistema;
    this.solicitud.descripcion = datos.descripcion;
    this.solicitud.id_orden = datos.id_orden;
    this.orden_by_id();
  }

  run_sistemas() {
    this.solicitud.accion_tipo = 'R'; // R: Read: Select en base de datos.
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP")); // Valor debe estar en el localstoge se guarda cuando el usuario se autentica.
    this.flag = true;
    this.rest.CRUD_sistemas(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log(resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

        if (resp_validada.estado) {
          this.sistemas = resp.recordset;
        } else {
          this.sistemas = [];
          swal('Ocurrio un Error', resp_validada.msg, 'error');
        }

        this.flag = false;

      }, (error) => {
        this.flag = false;
        let respuesta = this._utilidades.manejo_status(error);
        swal('Oops', 'Ocurrió un error', 'error');
        console.log(error);
      });
  }

  //#region modal sistemas

  abrir_Mdl_sistema(Mdl_sistema: any) {
    this.bk_sistema_seleccionado = this.sistema_seleccionado;
    Mdl_sistema.show();
  }

  guardar_Mdl_sistema(Mdl_sistema: any) {
    // this.sistema_nombre = this.sistemas.nombre +' ('+this.administrativos.nombre_modelo+')';
    Mdl_sistema.hide();

    this.flag = true;
    this.rest.GEN_deficiencias_by_id_sistemas(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log(resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

        if (resp_validada.estado) {
          this.deficiencias = resp.recordset;
          for (const key in this.deficiencias) {
            this.deficiencias[key].descripcion_ingresada = '';
            this.deficiencias[key].n_tarea = parseInt(key) + 1;
            this.deficiencias[key].seleccionada = false;
          }
        } else {
          this.deficiencias = [];
          swal('Ocurrio un Error', resp_validada.msg, 'error');
        }

        this.flag = false;

      }, (error) => {
        this.flag = false;
        let respuesta = this._utilidades.manejo_status(error);
        swal('Oops', 'Ocurrió un error', 'error');
        console.log(error);
      });
  }

  cancelar_Mdl_sistema(Mdl_sistema: any) {
    this.seleccion_sistema(this.bk_sistema_seleccionado);
    Mdl_sistema.hide();
  }

  seleccion_sistema(sistema: any) {
    if (sistema.id_sistema != 0) {
      this.sistema_seleccionado = sistema;
      this.sistema_nombre = sistema.nombre + ' (' + sistema.nombre_modelo + ')';
      this.solicitud.id_sistema = sistema.id_sistema;
    } else {
      this.sistema_seleccionado = { nombre: '', nombre_modelo: '', id_sistema: 0 };
      this.sistema_nombre = '';
      this.solicitud.id_sistema = 0;
    }
  }

  deseleccion_sistema() {
    this.sistema_seleccionado = { nombre: '', numero_serie: '', id_sistema: 0 };
    this.sistema_nombre = "";
    this.solicitud.id_sistema = 0;
    this.partes = [];
  }

  //#endregion

  deficiencia(datos: any, Mdl_deficiencias: any) {
    this.deficiencias_detalle = datos;
    Mdl_deficiencias.show();
  }
  cancelar_Mdl_deficiencias(Mdl_deficiencias) {
    Mdl_deficiencias.hide();
  }

  selecionar_deficiencia(datos: any, index: number) {
    this.deficiencias[index].seleccionada = true;
  }
  deselecionar_deficiencia(datos: any, index: number) {
    this.deficiencias[index].seleccionada = false;
  }

  repuestos(datos: any, Mdl_requisiciones: any) {
    this.solicitud.id_deficiencia = datos.id_deficiencia;
    this.flag = true;
    this.rest.GEN_requisiciones_by_id_deficiencia(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log(resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

        if (resp_validada.estado) {
          this.lista_repuestos = resp.recordset;
          for (const key in this.lista_repuestos) {
            this.lista_repuestos[key].seleccionada = true;
          }
        } else {
          this.lista_repuestos = [];
          swal('Ocurrio un Error', resp_validada.msg, 'error');
        }

        this.flag = false;
        Mdl_requisiciones.show();
      }, (error) => {
        this.flag = false;
        let respuesta = this._utilidades.manejo_status(error);
        swal('Oops', 'Ocurrió un error', 'error');
        console.log(error);
      });
  }
  cancelar_Mdl_requisiciones(Mdl_requisiciones: any) {
    Mdl_requisiciones.hide();
  }
  selecionar_requisicion(datos: any, index: number) {
    this.lista_repuestos[index].seleccionada = true;
  }
  deselecionar_requisicion(datos: any, index: number) {
    this.lista_repuestos[index].seleccionada = false;
  }

  guardar(frm) {
    this.solicitud.id_estatus = 6; // orden de trabajo abierta...
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
    this.solicitud.usuario_crea = parseInt(localStorage.getItem("USU"));
    this.solicitud.usuario_actualiza = parseInt(localStorage.getItem("USU"));
    this.solicitud.sw_activo = 1;
    this.solicitud.accion_tipo = 'C';
    this.solicitud.sw_procesada = 0;

    this.flag = true;
    // this.solicitud.accion_tipo = this._validadores.tipo_estatus(this.estatus);
    // this.solicitud.id_estatus = 1;

    console.log(this.solicitud);

    this.rest.CRUD_orden_de_trabajo(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log(resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).
        console.log('resp_validada', resp_validada)
        if (resp_validada.estado) {
          this.solicitud.id_orden = resp.recordset[0].id_orden;
          let count = 0;
          for (const i in this.deficiencias) {
            if (this.deficiencias[i].seleccionada) {
              count += 1;
            }
          }
          if (count > 0) {
            this.guardar_tareas_orden_de_trabajo(frm);
          }
        } else {
          swal('Ocurrio un Error', resp_validada.msg, 'error');
          this.flag = false;
        }

        // this.flag = false;

      }, (error) => {
        this.flag = false;
        let respuesta = this._utilidades.manejo_status(error);
        swal('Oops', 'Ocurrió un error', 'error');
        console.log(error);
      });
  }

  guardar_tareas_orden_de_trabajo(frm: any) {
    this.armar_matriz();
    this.rest.GEN_insert_tareas_orden_de_trabajo(this.solicitud)
      .then((respuesta) => {
        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log(resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

        if (resp_validada.estado) {
          swal({
            title: "Proceso exitoso!",
            text: "Se registraron los datos correctamente!   \n ¿Desea crear otro registro?",
            type: "success",
            showCancelButton: true,
            confirmButtonText: "No",
            cancelButtonText: "Si"
          },
            confirmed => {
              if (confirmed) {
                history.back();
              } else {
                this.limpiar(frm);
              }

            });
          swal('Proceso Exitoso', 'Se registraron los datos correctamente', 'success');
        } else {
          this.flag = false;
          swal('Ocurrio un Error', resp_validada.msg, 'error');
        }

        this.flag = false;
        frm.reset();
        this.deficiencias = [];
        this.lista_repuestos = [];
        this.deficiencias_detalle = {};
        this.solicitud.id_sistema = 0;
        this.sistema_nombre = '';
      }, (error) => {
        this.flag = false;
        let respuesta = this._utilidades.manejo_status(error);
        swal('Oops', 'Ocurrió un error', 'error');
        console.log(error);
      });
  }

  armar_matriz() {
    this.solicitud.tareas = [];
    for (const j in this.deficiencias) {
      if (this.deficiencias[j].seleccionada) {
        this.solicitud.tareas.push(
          {
            id_compania: parseInt(localStorage.getItem("COMP")),
            id_orden_trabajo: this.solicitud.id_orden,
            id_tarea: this.deficiencias[j].n_tarea,
            id_deficiencia: this.deficiencias[j].id_deficiencia,
            descripcion: this.deficiencias[j].descripcion_ingresada,
            usuario_crea: parseInt(localStorage.getItem("USU")),
            fecha_crea: 1,
            usuario_actualiza: parseInt(localStorage.getItem("USU")),
            fecha_actualiza: 1,
            sw_activo: 0
          })
      }
    }
    console.log(this.solicitud);
  }

  arreglo(arreglo, prop) {
    let newArray = [];
    let lookupObject = {};

    for (const i in arreglo) {
      lookupObject[arreglo[i][prop]] = arreglo[i];
    }

    for (const i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  }

  guardar_Mdl_requisiciones(w) {
    alert('en construcción');
  }

  limpiar(frm: any) {
    this.sistema_nombre = '';
    this.solicitud.id_tipo_deficiencia = 0;
    this.solicitud.id_compania = 0;
    this.solicitud.id_tipo_mantenimiento = 0;
    this.solicitud.descripcion = '';
    this.solicitud.id_sistema = 0;
    this.solicitud.id_posible_falla = 0;

    this.filtrar_sistemas = '';
    this.sistema_seleccionado = {};
    this.solicitud.requisiciones = [];
    this.deficiencias = [];
    frm.reset();
  }

  cancelar() {
    history.back();
  }

  cancelar_orden() {
    this.solicitud.id_estatus = 8; // orden de trabajo cancelada...
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP")); // esta quemado..
    this.solicitud.usuario_actualiza = parseInt(localStorage.getItem("USU")); // esta quemado..
    this.solicitud.sw_activo = 1; // esta quemado..
    this.solicitud.accion_tipo = 'U';
    this.solicitud.sw_procesada = 1;

    this.flag = true;

    console.log(this.solicitud);

    this.rest.CRUD_orden_de_trabajo(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log(resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).
        console.log('resp_validada', resp_validada)
        if (resp_validada.estado) {
          swal({
            title: "Proceso exitoso!",
            text: "Se Actualizaron los datos correctamente",
            type: "success",
            cancelButtonText: "Ok"
          },
            function (isConfirm) {
              if (isConfirm) {
                history.back();
              } else {
                this.limpiar();
              }
            });
        } else {
          swal('Ocurrio un Error', resp_validada.msg, 'error');
          this.flag = false;
        }

        // this.flag = false;

      }, (error) => {
        this.flag = false;
        let respuesta = this._utilidades.manejo_status(error);
        swal('Oops', 'Ocurrió un error', 'error');
        console.log(error);
      });
  }

  cerrar_orden() {
    this.solicitud.id_estatus = 7; // orden de trabajo cerrada...
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP")); // esta quemado..
    this.solicitud.usuario_actualiza = parseInt(localStorage.getItem("USU")); // esta quemado..
    this.solicitud.sw_activo = 1; // esta quemado..
    this.solicitud.accion_tipo = 'U';
    this.solicitud.sw_procesada = 1;

    this.flag = true;

    console.log(this.solicitud);

    this.rest.CRUD_orden_de_trabajo(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log(resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).
        console.log('resp_validada', resp_validada)
        if (resp_validada.estado) {
          swal({
            title: "Proceso exitoso!",
            text: "Se Actualizaron los datos correctamente",
            type: "success",
            cancelButtonText: "Ok"
          },
            function (isConfirm) {
              if (isConfirm) {
                history.back();
              } else {
                this.limpiar();
              }
            });
        } else {
          swal('Ocurrio un Error', resp_validada.msg, 'error');
          this.flag = false;
        }

        // this.flag = false;

      }, (error) => {
        this.flag = false;
        let respuesta = this._utilidades.manejo_status(error);
        swal('Oops', 'Ocurrió un error', 'error');
        console.log(error);
      });
  }

  orden_by_id() {
    this.flag = true;
    let cantidad_procesadas = 0;
    let cantidad_no_procesadas = 0;
    this.rest.GEN_orden_trabajo_by_Id(this.solicitud)
      .then((respuesta) => {
        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log('resp = ', resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

        if (resp_validada.estado) {
          this.deficiencias = resp.recordset;
          for (const key in this.deficiencias) {
            this.deficiencias[key].descripcion_ingresada = '';
            this.deficiencias[key].n_tarea = parseInt(key) + 1;
            this.deficiencias[key].seleccionada = false;
            // if(this.deficiencias[key].procesada == 1){
            //   this.deficiencias[key].procesada = true;
            // }
            if (this.deficiencias[key].procesada > 0) {
              cantidad_procesadas = cantidad_procesadas + 1;
            } else {
              cantidad_no_procesadas = cantidad_no_procesadas + 1;
            }
          }

          if (this.deficiencias.length == cantidad_procesadas) {
            this.bl_cerrar_orden = true;
          } else {
            this.bl_cerrar_orden = false;
          }

        } else {
          this.deficiencias = [];
          swal('Ocurrio un Error', resp_validada.msg, 'error');
        }

        this.flag = false;

      }, (error) => {
        this.flag = false;
        let respuesta = this._utilidades.manejo_status(error);
        swal('Oops', 'Ocurrió un error', 'error');
        console.log(error);
      });
  }

  procesa_deficiencia(datos: any) {
    console.log(datos);
    let cantidad_procesadas = 0;
    let cantidad_no_procesadas = 0;

    this.solicitud.sw_procesada = (datos.procesada == 1) ? 0 : 1;
    this.solicitud.id_deficiencia = datos.id_deficiencia;
    this.flag = true;
    this.rest.GEN_procesa_tarea_orden(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log(resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

        if (resp_validada.estado) {
          this.deficiencias = resp.recordset;
          for (const key in this.deficiencias) {
            this.deficiencias[key].descripcion_ingresada = '';
            this.deficiencias[key].n_tarea = parseInt(key) + 1;
            this.deficiencias[key].seleccionada = false;
            if (this.deficiencias[key].procesada > 0) {
              cantidad_procesadas = cantidad_procesadas + 1;
            } else {
              cantidad_no_procesadas = cantidad_no_procesadas + 1;
            }
          }

          if (this.deficiencias.length == cantidad_procesadas) {
            this.bl_cerrar_orden = true;
          } else {
            this.bl_cerrar_orden = false;
          }
        } else {
          // this.sistemas = [];
          swal('Ocurrio un Error', resp_validada.msg, 'error');
        }

        this.flag = false;

      }, (error) => {
        this.flag = false;
        let respuesta = this._utilidades.manejo_status(error);
        swal('Oops', 'Ocurrió un error', 'error');
        console.log(error);
      });
  }
}
