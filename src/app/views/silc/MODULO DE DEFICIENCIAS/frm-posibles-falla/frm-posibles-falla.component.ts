import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RestService, parametros,  Permisos, ValidadoresService, UtilidadesService } from '../../../../services/_export';
import { sistemas, tipo_deficiencia, posibles_fallas } from '../../../../mappings/model/_export_model';
declare var swal: any;

@Component({
  selector: 'app-frm-posibles-falla',
  templateUrl: './frm-posibles-falla.component.html',
  styleUrls: ['./frm-posibles-falla.component.scss']
})
export class FrmPosiblesFallaComponent implements OnInit {
  /* Variables de configuración de notificación*/
  
 
  /* Variables para los permisos, eliminar, editar, guardar */
  permisos = new Permisos().access;
  /* Objeto que se envia al webservice  */
  solicitud = new parametros().prm_deficiencias;
  solicitud_sistemas = new parametros().prm_control_sistemas;
  flag: boolean = false;

  /*Variables del la vista */
  titulo: string = '';
  estatus: string = '';

  filtrar_sistemas: string = '';
  sistemas: sistemas[];
  posible_falla: posibles_fallas;
  tipo_de_deficiencia: tipo_deficiencia[];
  bol_modificar: boolean = false;

  sistema_nombre: string = '';
  btn_acciones = { btn_guardar: false, btn_limpiar: false };
  sistema_seleccionado: any = { nombre: '', numero_serie: '', id_sistema: 0 };
  bk_sistema_seleccionado: any = { nombre: '', numero_serie: '', id_sistema: 0 };

  constructor( private router: Router, private route: ActivatedRoute, private rest: RestService,
    private _validadores: ValidadoresService, private _utilidades: UtilidadesService) { }

  ngOnInit() {
    this.solicitud_sistemas.id_compania = parseInt(localStorage.getItem("COMP"));
    this.route.params.subscribe(params => {
      if (params['data'] != null) {
        try {
          this.titulo = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).titulo;
          this.estatus = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).estatus;

          this.btn_acciones = this._validadores.BtnVisibles(this.estatus); /* valida que botones debe mostrar en pantalla */
          this.solicitud.accion_tipo = this._validadores.tipo_estatus(this.estatus); /* valida la accion que se debe ejecutar en la pantalla: Crear = C, modificar = U, detalle = '' */

          if (this.estatus == 'modificar' || this.estatus == 'detalle') { /* si es modificacion o  detalle se deben cargar los datos en los input */
            this.posible_falla = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).datos;
            this.asignar_solicitud(this.posible_falla);
            if (this.estatus == 'detalle') {
              this.bol_modificar = true;
            }
          }
          this.solicitud.token = JSON.parse(decodeURIComponent(escape(window.atob(localStorage._token))));
        } catch (error) {
          alert("Ocurrio un error con los parametros del Router.");
          console.log(error);
        }
      }
      else {
        alert("Vista frm-posibles-falla (Parametros nulos...)");
      }
    });
    this.run_sistemas();
  }

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

        this.run_tipo_de_deficiencia();

      }, (error) => {
        this.flag = false;
        let respuesta = this._utilidades.manejo_status(error);
        swal('Oops', 'Ocurrió un error', 'error');
        console.log(error);
      });
  }

  run_tipo_de_deficiencia() {
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
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

        this.flag = false;

      }, (error) => {
        this.flag = false;
        let respuesta = this._utilidades.manejo_status(error);
        swal('Oops', 'Ocurrió un error', 'error');
        console.log(error);
      });
  }

  abrir_Mdl_sistema(Mdl_sistema: any) {
    this.bk_sistema_seleccionado = this.sistema_seleccionado;
    Mdl_sistema.show();
  }

  guardar_Mdl_sistema(Mdl_sistema: any) {
    Mdl_sistema.hide();
    this.solicitud.sw_activo = 1;
  }

  cancelar_Mdl_sistema(Mdl_sistema: any) {
    this.seleccion_sistema(this.bk_sistema_seleccionado);
    Mdl_sistema.hide();
  }

  seleccion_sistema(sistema: any) {
    if (sistema.id_sistema != 0) {
      this.sistema_seleccionado = sistema;
      this.sistema_nombre = sistema.nombre /*+ ' (' + sistema.numero_serie + ')'*/;
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
  }

  asignar_solicitud(posible_falla: posibles_fallas) {
    console.log('posible_falla', posible_falla);
    this.solicitud.id_posible_falla = posible_falla.id_posible_falla;
    this.solicitud.sw_activo = posible_falla.sw_activo;
    this.sistema_nombre = posible_falla.nombre_equipo;
    this.solicitud.nombre = posible_falla.nombre;
    // this.solicitud.id_deficiencia = posible_falla.id_deficiencia;
    // this.solicitud.id_compania = posible_falla.id_compania;
    this.solicitud.id_tipo_deficiencia = posible_falla.id_tipo_deficiencia;
    // this.solicitud.id_tipo_mantenimiento = posible_falla.id_tipo_mantenimiento;
    // this.solicitud.fecha_deficiencia = posible_falla.fecha_deficiencia.toString().split('T')[0];
    this.solicitud.descripcion = posible_falla.descripcion;
    this.solicitud.id_sistema = posible_falla.id_sistema;

    this.sistema_seleccionado.nombre = posible_falla.nombre_sistema;
    // this.sistema_seleccionado.numero_serie = posible_falla.numero_serie;

    this.solicitud.codigo_falla = posible_falla.codigo_falla;
    this.solicitud.sw_codigo_falla = posible_falla.sw_codigo_falla;
  }

  guardar(frm: any) {
    this.flag = true;
    this.solicitud.accion_tipo = this._validadores.tipo_estatus(this.estatus);
    this.solicitud.sw_activo = (this.solicitud.sw_activo) ? 1 : 0;
    this.solicitud.sw_codigo_falla = (this.solicitud.codigo_falla != '') ? 1 : 0;

    this.rest.CRUD_posibles_fallas(this.solicitud)
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
          // this.router.navigate(['./silc/menus']);
        } else {
          swal('Ocurrio un Error', resp_validada.msg, 'error');
          this.flag = false;
        }

        this.flag = false;

      }, (error) => {
        this.flag = false;
        let respuesta = this._utilidades.manejo_status(error);
        swal('Oops', 'Ocurrió un error', 'error');
        console.log(error);
      });
  }

  cancelar() {
    history.back();
  }

  limpiar(frm: any) {
    this.sistema_nombre = '';
    this.solicitud.id_tipo_deficiencia = 0;
    this.solicitud.descripcion = '';
    this.solicitud.id_sistema = 0;
    this.sistema_seleccionado = {};
    this.solicitud.codigo_falla = '';
    this.solicitud.sw_codigo_falla = 0;
    frm.reset();
  }

}
