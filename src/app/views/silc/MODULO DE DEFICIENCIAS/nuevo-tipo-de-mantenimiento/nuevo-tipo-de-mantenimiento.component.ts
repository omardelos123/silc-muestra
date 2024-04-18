import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RestService, parametros,  Permisos, ValidadoresService, UtilidadesService } from '../../../../services/_export';
declare var swal: any;

@Component({
  selector: 'app-nuevo-tipo-de-mantenimiento',
  templateUrl: './nuevo-tipo-de-mantenimiento.component.html',
  styleUrls: ['./nuevo-tipo-de-mantenimiento.component.scss']
})
export class NuevoTipoDeMantenimientoComponent implements OnInit {

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

  constructor( private router: Router, private route: ActivatedRoute, private rest: RestService,
    private _validadores: ValidadoresService, private _utilidades: UtilidadesService) { }

  ngOnInit() {
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
    this.route.params.subscribe(params => {
      if (params['data'] != null) {
        try {
          this.titulo = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).titulo;
          this.estatus = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).estatus;

          // this.BtnVisibles();
          this.btn_acciones = this._validadores.BtnVisibles(this.estatus);

          if (this.estatus == 'crear') {
            this.solicitud.accion_tipo = 'C';
          } else if (this.estatus == 'modificar' || this.estatus == 'detalle') {
            this.solicitud = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).datos;
            if (this.estatus == 'modificar') {
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

  guardar() {
    this.flag = true;
    this.solicitud.sw_activo = (this.solicitud.sw_activo) ? 1 : 0;

    console.log(this.solicitud);

    this.rest.CRUD_tipo_de_mantenimiento(this.solicitud)
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
                  this.limpiar();
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

                  this.limpiar();
                }

              });
          }
          // this.router.navigate(['./silc/menus']);
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

  limpiar() {
    this.solicitud.nombre = '';
    this.solicitud.sw_activo = 0;
  }

  cancelar() {
    history.back();
  }

}
