import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RestService, parametros,  Permisos, ValidadoresService, UtilidadesService } from '../../../../services/_export';

declare var swal: any;

@Component({
  selector: 'app-form-licencias',
  templateUrl: './form-licencias.component.html',
  styleUrls: ['./form-licencias.component.scss']
})
export class FormLicenciasComponent implements OnInit {

  /* Variables de configuración de notificación*/
  
 
  /* Variables para los permisos, eliminar, editar, guardar */
  permisos = new Permisos().access;
  /* Objeto que se envia al webservice  */
  solicitud = new parametros().prm_control_usuarios;
  flag: boolean = false;

  /*Variables del la vista */
  tipo_de_personal: any;
  list_equipos: any[] = [];
  add_sistemas: any[] = [];
  sis_seleccioados: string[] = [];
  nombres_sistemas: string = '';
  filtrar_sistemas: string = '';
  datos: any = {};

  titulo: string;
  estatus: string;
  btn_acciones = { btn_guardar: false, btn_limpiar: false }

  constructor( private router: Router, private route: ActivatedRoute, private rest: RestService,
    private _validadores: ValidadoresService, private _utilidades: UtilidadesService) { }

  ngOnInit() {
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
    this.route.params.subscribe(params => {
      if (params['data'] != null) {
        try {
          this.datos = JSON.parse(decodeURIComponent(escape(window.atob(params['data']))));
          console.log('datos', this.datos);
          this.titulo = this.datos.titulo;
          this.estatus = this.datos.estatus;

          this.btn_acciones = this._validadores.BtnVisibles(this.estatus);
          this.equipos();

          if (this.estatus == 'crear') {
            this.solicitud.usuario_crea = parseInt(localStorage.getItem("USU"));
            this.solicitud.accion_tipo = 'C';
            this.solicitud.sw_activo = 1;
          } else if (this.estatus == 'modificar' || this.estatus == 'detalle') {
            // this.cargar_solicitud(this.datos.datos);
            if (this.estatus == 'modificar') {
              this.solicitud.usuario_actualiza = parseInt(localStorage.getItem("USU"));
              this.solicitud.accion_tipo = 'U';
            }
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

  cargar_solicitud(datos_solicitud: any) {
    this.solicitud.nombre = datos_solicitud.nombre;
    this.solicitud.descripcion = datos_solicitud.descripcion;
    this.solicitud.id_licencia = datos_solicitud.id_licencia;
    this.solicitud.sw_activo = datos_solicitud.sw_activo;
    this.solicitud.id_compania = datos_solicitud.id_compania;

    this.add_sistemas = datos_solicitud.sistemas.split(',');
    for (const j in this.add_sistemas) {
      for (const i in this.list_equipos) {
        if (this.list_equipos[i].id_clase == this.add_sistemas[j]) {
          this.list_equipos[i].seleccionado = true;
          this.sis_seleccioados.push(this.list_equipos[i].nombre);
        }
      }
    }
    this.nombres_sistemas = this.sis_seleccioados.toString();
    this.solicitud.sistemas = this.add_sistemas.toString();
  }

  equipos() {
    this.solicitud.accion_tipo = 'R';
    this.flag = true;
    this.rest.CRUD_clase_de_equipo(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log(resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

        if (resp_validada.estado) {
          this.list_equipos = resp.recordset;
          for (const i in this.list_equipos) {
            this.list_equipos[i].seleccionado = false;
          }

          if (this.estatus == 'modificar' || this.estatus == 'detalle') {
            this.cargar_solicitud(this.datos.datos);
          }

        } else {
          this.list_equipos = [];
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

  guardar(FRM) {
    this.solicitud.sistemas = this.add_sistemas.toString();
    this.solicitud.usuario_actualiza = parseInt(localStorage.getItem("USU"));
    this.solicitud.usuario_crea = parseInt(localStorage.getItem("USU"));
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
    this.flag = true;
    this.solicitud.sw_activo = (this.solicitud.sw_activo) ? 1 : 0;

    console.log(this.solicitud);

    this.rest.CRUD_licencias(this.solicitud)
      .then((respuesta) => {
        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log(resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

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
                  // this.limpiar(FRM);
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
                  // this.limpiar(FRM);
                }

              });
          }
        } else {
          let respuesta = this._utilidades.manejo_error(resp.number);
          if (respuesta != '') {
            swal('Ocurrio un Error', respuesta, 'success');
          } else {
            swal('Ocurrio un Error', resp_validada.msg, 'error');
          }
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
    Mdl_sistema.show();
  }

  seleccion_sistema(sistema: any, index: number) {
    this.sis_seleccioados.push(sistema.nombre);
    this.add_sistemas.push(sistema.id_clase);
    this.list_equipos[index].seleccionado = true;
  }

  deseleccion_sistema(sistema: any, index: number) {
    this.list_equipos[index].seleccionado = false;
    for (const i in this.sis_seleccioados) {
      if (this.sis_seleccioados[i] == sistema.nombre) {
        this.sis_seleccioados.splice(parseInt(i), 1);
      }
    }
    for (const i in this.add_sistemas) {
      if (this.add_sistemas[i] == sistema.id_clase) {
        this.add_sistemas.splice(parseInt(i), 1);
      }
    }
  }

  guardar_Mdl_sistema(Mdl_sistema: any) {
    this.nombres_sistemas = this.sis_seleccioados.toString();
    Mdl_sistema.hide();
  }

  cancelar_Mdl_sistema(Mdl_sistema: any) {
    Mdl_sistema.hide();
  }

  //#endregion

  limpiar(FRM) {
    // this.solicitud.nombre_rol = '';
    // this.solicitud.descripcion = '';
    // this.solicitud.sw_activo = 0;
    // this.solicitud.sw_crea = 0;
    // this.solicitud.sw_editar = 0;
    // this.solicitud.sw_eliminar = 0;
    // this.solicitud.sw_deshabilita = 0
    FRM.reset();
  }

  cancelar() {
    history.back();
  }
}
