import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RestService, parametros,  Permisos, ValidadoresService, UtilidadesService } from '../../../../services/_export';
import { deficiencia, requisisiones, posibles_fallas, prioridades, tipo_deficiencia, tipo_mantenimiento } from '../../../../mappings/model/modulo_deficiencias';
declare var swal: any;

@Component({
  selector: 'app-nueva-deficiencia',
  templateUrl: './nueva-deficiencia.component.html',
  styleUrls: ['./nueva-deficiencia.component.scss']
})
export class NuevaDeficienciaComponent implements OnInit {

  /* Variables de configuración de notificación*/
  
 

  /* Variables para los permisos, eliminar, editar, guardar */
  permisos = new Permisos().access;

  /* Objeto que se envia al webservice  */
  solicitud = new parametros().prm_deficiencias;
  solicitud_sistemas = new parametros().prm_control_sistemas;
  solicitud_inventarios = new parametros().prm_inventarios;
  defeciencias: deficiencia;
  flag: boolean = false;

  /* Variables de sistemas */
  sistemas: any[] = [];
  filtrar_sistemas: string;
  sistema_nombre: string = "";
  sistema_seleccionado: any = { nombre: '', numero_serie: '', id_sistema: 0 };
  bk_sistema_seleccionado: any = { nombre: '', numero_serie: '', id_sistema: 0 };

  /* Variables de posibles fallas */
  posibles_fallas: posibles_fallas[];
  filtrar_posible_falla: string = '';
  filtrar_falla: string = '';
  falla_nombre: string = '';
  // falla_seleccionada: any = { nombre: '', descripcion: '', id_posible_falla: 0 };
  falla_seleccionada: posibles_fallas = new posibles_fallas();
  // bk_falla_seleccionado: any = { nombre: '', descripcion: '', id_posible_falla: 0 };
  bk_falla_seleccionado: posibles_fallas = new posibles_fallas();

  /* Varaiables de requisiciones */
  partes: requisisiones[] = [];
  bk_partes: number[] = [];
  requisisiones: any[] = [];
  bk_partes_seleccionadas: requisisiones[] = [];
  del_partes_seleccionadas: requisisiones[] = [];

  /* Variables de prioridades */
  list_prioridades: prioridades[];

  /* Variables del la vista */
  titulo: string = '';
  tipo_de_deficiencia: tipo_deficiencia[];
  tipo_de_mantenimiento: tipo_mantenimiento[];
  estatus: string = '';
  btn_acciones = { btn_guardar: false, btn_limpiar: false }

  constructor( private router: Router, private route: ActivatedRoute, private rest: RestService,
    private _validadores: ValidadoresService, private _utilidades: UtilidadesService) { }

  ngOnInit() {
    this.falla_seleccionada.nombre = '';
    this.solicitud.id_prioridad = 0;
    console.log(this.falla_seleccionada)
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
    this.solicitud_inventarios.id_compania = parseInt(localStorage.getItem("COMP"));
    this.solicitud_sistemas.id_compania = parseInt(localStorage.getItem("COMP"));
    this.run_sistemas();
    this.route.params.subscribe(params => {
      if (params['data'] != null) {
        try {
          this.titulo = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).titulo;
          this.estatus = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).estatus;

          this.btn_acciones = this._validadores.BtnVisibles(this.estatus); /* valida que botones debe mostrar en pantalla */
          this.solicitud.accion_tipo = this._validadores.tipo_estatus(this.estatus); /* valida la accion que se debe ejecutar en la pantalla: Crear = C, modificar = U, detalle = '' */
          if (this.estatus == 'modificar' || this.estatus == 'detalle') { /* si es modificacion o  detalle se deben cargar los datos en los input */
            this.defeciencias = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).datos;
            this.asignar_solicitud(this.defeciencias);
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

  asignar_solicitud(deficiencia: deficiencia) {

    this.sistema_nombre = deficiencia.nombre_sistema + ' (' + deficiencia.numero_serie + ')';
    this.solicitud.id_deficiencia = deficiencia.id_deficiencia;
    this.solicitud.id_compania = deficiencia.id_compania;
    this.solicitud.id_tipo_deficiencia = deficiencia.id_tipo_deficiencia;
    this.solicitud.id_tipo_mantenimiento = deficiencia.id_tipo_mantenimiento;
    this.solicitud.fecha_deficiencia = deficiencia.fecha_deficiencia.toString().split('T')[0];
    this.solicitud.descripcion = deficiencia.descripcion;
    this.solicitud.id_sistema = deficiencia.id_sistema;
    this.solicitud.id_posible_falla = deficiencia.id_posible_falla;

    this.falla_nombre = deficiencia.nombre_posible_falla;

    this.sistema_seleccionado.nombre = deficiencia.nombre_sistema;
    this.sistema_seleccionado.numero_serie = deficiencia.numero_serie;
    this.sistema_seleccionado.id_sistema = deficiencia.id_sistema;

    this.falla_seleccionada.id_posible_falla = deficiencia.id_posible_falla;
    this.falla_seleccionada.nombre = deficiencia.nombre_posible_falla;
  }

  //#region Consultas al iniciar la vista

  run_sistemas() {
    this.solicitud_sistemas.accion_tipo = 'R';
    this.solicitud_sistemas.id_compania = parseInt(localStorage.getItem("COMP"));
    this.flag = true;
    this.rest.CRUD_sistemas(this.solicitud_sistemas)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log('run_sistemas', resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

        if (resp_validada.estado) {
          this.sistemas = resp.recordset;
        } else {
          this.sistemas = [];
          swal('Ocurrio un Error', resp_validada.msg, 'error');
        }

        // this.flag = false;
        this.run_tipo_de_deficiencia()

      }, (error) => {
        this.flag = false;
        let respuesta = this._utilidades.manejo_status(error);
        swal('Oops', 'Ocurrió un error', 'error');
        console.log(error);
      });
  }

  run_tipo_de_deficiencia() {
    this.solicitud.accion_tipo = 'R';
    this.flag = true;
    this.rest.CRUD_tipo_de_deficiencia(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log('run_sistemas', resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

        if (resp_validada.estado) {
          this.tipo_de_deficiencia = resp.recordset;
        } else {
          this.tipo_de_deficiencia = [];
          swal('Ocurrio un Error', resp_validada.msg, 'error');
        }

        // this.flag = false;
        this.run_tipo_de_mantenimiento();

      }, (error) => {
        this.flag = false;
        let respuesta = this._utilidades.manejo_status(error);
        swal('Oops', 'Ocurrió un error', 'error');
        console.log(error);
      });
  }

  run_tipo_de_mantenimiento() {
    this.flag = true;
    this.rest.CRUD_tipo_de_mantenimiento(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log(resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

        if (resp_validada.estado) {
          this.tipo_de_mantenimiento = resp.recordset;
          if (this.estatus == 'modificar' || this.estatus == 'detalle') {
            this.prioridades();
          } else {
            this.flag = false;
          }
        } else {
          this.tipo_de_mantenimiento = [];
          swal('Ocurrio un Error', resp_validada.msg, 'error');
        }

        // this.flag = false;

      }, (error) => {
        this.flag = false;
        let respuesta = this._utilidades.manejo_status(error);
        swal('Oops', 'Ocurrió un error', 'error');
        console.log(error);
      });
  }

  //#endregion


  //#region Partes y requiciciones

  run_catalogo_de_compania(Mdl_requi: any) {
    this.flag = true;
    this.solicitud_inventarios.accion_tipo = 'R';
    if (this._validadores.tipo_estatus(this.estatus) == 'C') {
      this.solicitud_inventarios.id_deficiencia = null;
    } else {
      this.solicitud_inventarios.id_deficiencia = this.solicitud.id_deficiencia;
    }
    //GEN_catalogo_de_repuesto
    this.rest.GEN_catalogo_de_repuesto(this.solicitud_inventarios)
      .then((respuesta) => {

        let resp: any = respuesta;
        console.log('GEN_catalogo_de_repuesto', resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

        if (resp_validada.estado) {
          this.partes = resp.recordset;
          for (const i in this.partes) {
            this.partes[i].requerida = false;
          }

          for (const i in this.partes) {
            for (const j in this.bk_partes_seleccionadas) {
              if (this.partes[i].id_parte == this.bk_partes_seleccionadas[j].id_parte) {
                this.partes[i].requerida = true;
                this.partes[i].cantidad = this.bk_partes_seleccionadas[j].cantidad;
                this.partes[i].id_prioridad = this.bk_partes_seleccionadas[j].id_prioridad;
              }
            }
            if (this.partes[i].agreagada > 0) {
              this.partes[i].requerida = true;
              this.partes[i].cantidad = this.partes[i].cantidad;
              this.partes[i].id_prioridad = this.partes[i].id_prioridad;
            }
          }

          if (Mdl_requi != null) {
            Mdl_requi.show();
          }

        } else {
          this.partes = [];
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

  //#endregion


  //#region modal sistemas

  abrir_Mdl_sistema(Mdl_sistema: any) {
    this.bk_sistema_seleccionado = this.sistema_seleccionado;
    Mdl_sistema.show();
  }

  guardar_Mdl_sistema(Mdl_sistema: any) {
    Mdl_sistema.hide();
  }

  cancelar_Mdl_sistema(Mdl_sistema: any) {
    console.log(this.bk_sistema_seleccionado)
    this.seleccion_sistema(this.bk_sistema_seleccionado);
    Mdl_sistema.hide();
  }

  seleccion_sistema(sistema: any) {
    if (sistema.id_sistema != 0) {
      this.sistema_seleccionado = sistema;
      this.sistema_nombre = sistema.nombre + ' (' + sistema.numero_serie + ')';
      this.solicitud.id_sistema = sistema.id_sistema;
    } else {
      this.sistema_seleccionado = { nombre: '', numero_serie: '', id_sistema: 0 };
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


  //#region modal REQUICICIONES

  seleccion_parte(index: number) {
    this.partes[index].requerida = !this.partes[index].requerida;
    this.bk_partes_seleccionadas.push(this.partes[index]);
  }

  deseleccion_parte(index: number, id_parte: number) {
    let indice = 0;
    this.partes[index].requerida = !this.partes[index].requerida
    this.partes[index].cantidad = 0;
    this.partes[index].id_prioridad = 0;
    for (const i in this.bk_partes_seleccionadas) {
      if (this.bk_partes_seleccionadas[i].id_parte == id_parte) {
        indice = parseInt(i);
      }
    }
    this.bk_partes_seleccionadas.splice(indice, 1);

    this.del_partes_seleccionadas.push(this.partes[index]);
    console.log(this.del_partes_seleccionadas);
  }

  guardar_Mdl_requi(Mdl_requi: any) {
    Mdl_requi.hide();
  }

  cancelar_Mdl_requi(Mdl_requi: any) {
    console.log(this.partes);
    console.log(this.bk_partes);
    // this.partes = this.bk_partes;
    Mdl_requi.hide();
  }

  //#endregion


  //#region modal POSIBLE FALLA

  seleccion_falla(posible_falla: posibles_fallas) {
    console.log(posible_falla);
      this.falla_nombre = posible_falla.nombre;
      this.falla_seleccionada = posible_falla;
      this.solicitud.id_posible_falla = posible_falla.id_posible_falla;
    // if (posible_falla.id_posible_falla != 0) {
    // } else {
    //   this.falla_seleccionada = posible_falla;
    //   this.solicitud.id_posible_falla = 0;
    // }
  }

  guardar_Mdl_p_falla(Mdl_p_falla: any) {
    Mdl_p_falla.hide();
  }

  cancelar_Mdl_p_falla(Mdl_p_falla: any) {
    this.seleccion_falla(this.bk_falla_seleccionado);
    Mdl_p_falla.hide();
  }

  deseleccion_p_falla() {
    this.falla_nombre = '';
    this.solicitud.id_posible_falla = 0;
  }

  //#endregion

  prioridades() {
    this.flag = true;
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
    this.rest.GEN_prioridades_By_Id_tipo(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log(resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

        if (resp_validada.estado) {
          console.log('resp_validada.recordset', resp_validada.recordset);
          this.list_prioridades = resp.recordset;
          if (this.estatus == 'modificar' || this.estatus == 'detalle') {
            this.run_catalogo_de_compania(null);
          } else {
            this.flag = false;
          }
        } else {
          this.flag = false;
          this.list_prioridades = [];
          swal('Ocurrio un Error', resp_validada.msg, 'error');
        }

        // this.flag = false;

      }, (error) => {
        this.flag = false;
        let respuesta = this._utilidades.manejo_status(error);
        swal('Oops', 'Ocurrió un error', 'error');
        console.log(error);
      }
      );
  }

  run_posibles_fallas(Mdl_fallas: any) {
    this.flag = true;
    this.solicitud.accion_tipo = 'R';
    this.rest.CRUD_posibles_fallas(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log(resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

        if (resp_validada.estado) {
          console.log('resp_validada.recordset', resp_validada.recordset);
          this.posibles_fallas = resp.recordset;

          this.bk_falla_seleccionado = this.falla_seleccionada;
          Mdl_fallas.show();
        } else {
          this.posibles_fallas = [];
          swal('Ocurrio un Error', resp_validada.msg, 'error');
        }

        this.flag = false;

      }, (error) => {
        this.flag = false;
        let respuesta = this._utilidades.manejo_status(error);
        swal('Oops', 'Ocurrió un error', 'error');
        console.log(error);
      }
      );
  }

  //#region FOMRULARIO
  guardar(frm: any) {
    this.armar_matriz();

    this.flag = true;
    this.solicitud.accion_tipo = this._validadores.tipo_estatus(this.estatus);
    this.solicitud.id_estatus = 4 /* ESTATUS 4 DIFERIDA */;

    console.log(this.solicitud);

    this.rest.CRUD_deficiencias(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log(resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).
        console.log('resp_validada', resp_validada)
        if (resp_validada.estado) {
          if (this.solicitud.accion_tipo == 'C') {

            this.solicitud.id_deficiencia = resp.recordset[0].id_deficiencia;
            this.guardar_requisiciones(frm);
          } else if (this.solicitud.accion_tipo == 'U') {
            this.guardar_requisiciones(frm);
            swal('Proceso Exitoso', 'Se Actualizaron los datos correctamente', 'success');
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

  guardar_requisiciones(frm: any) {
    this.solicitud.accion_tipo = this._validadores.tipo_estatus(this.estatus);

    this.rest.GEN_requisiciones(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log(resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).
        console.log('resp_validada', resp_validada)
        if (resp_validada.estado) {
          if (this.solicitud.accion_tipo == 'C') {
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

          } else if (this.solicitud.accion_tipo == 'U') {
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

                  this.limpiar(frm);
                }

              });
            this.flag = false;
          }
        } else {
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

  armar_matriz() {
    let fecha = new Date().toUTCString();
    for (const j in this.partes) {
      if (this.partes[j].requerida) {
        this.solicitud.requisiciones.push(
          {
            id_compania: parseInt(localStorage.getItem("COMP")),
            id_requisicion: 0,
            id_deficiencia: 0,
            id_parte: this.partes[j].id_parte,
            id_prioridad: this.partes[j].id_prioridad,
            cantidad: this.partes[j].cantidad,
            sw_solicitada: 0,
            usurario_crea: parseInt(localStorage.getItem("USU")),
            fecha_crea: 1,
            usuario_actualiza: parseInt(localStorage.getItem("USU")),
            fecha_actualiza: 1,
            sw_activo: 0,
          })
      }
    }
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
    this.bk_partes_seleccionadas = null;
    this.falla_seleccionada = null;
    this.bk_falla_seleccionado = null;
    this.solicitud.requisiciones = [];

    this.flag = false;
    frm.reset();
  }

  cancelar() {
    history.back();
  }
  //#endregion

}
