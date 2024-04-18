import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestService, parametros, Permisos, ValidadoresService, UtilidadesService } from '../../../../services/_export';
declare var swal: any;
@Component({
  selector: 'app-nuevo-estatus',
  templateUrl: './nuevo-estatus.component.html',
  styleUrls: ['./nuevo-estatus.component.scss']
})
export class NuevoEstatusComponent implements OnInit {
  /* Variables para los permisos, eliminar, editar, guardar */
  permisos = new Permisos().access;
  /* Objeto que se envia al webservice  */
  solicitud = new parametros().prm_estatus;
  flag: boolean = false;

  /*Variables del la vista */
  tipo_estatus_datos: any = [];
  private allItems: any[];
  tipo_de_estatus: any;
  titulo: string;
  estatus: string;
  btn_acciones = { btn_guardar: false, btn_limpiar: false }
  constructor(private router: Router, private route: ActivatedRoute, private rest: RestService,
    private _validadores: ValidadoresService, private _utilidades: UtilidadesService) { }

  ngOnInit() {
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
    this.solicitud.sw_activo = 1;
    this.solicitud.fecha_actualiza = new Date().toUTCString();
    this.solicitud.fecha_crea = new Date().toUTCString();
    

    this.solicitud.accion_tipo = 'R';
    this.solicitud.sw_activo = 1;

    this.run_tipo_estatus();

    this.route.params.subscribe(params => {
      if (params['data'] != null) {
        try {
          this.titulo = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).titulo;
          this.estatus = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).estatus;

          this.btn_acciones = this._validadores.BtnVisibles(this.estatus);

          if (this.estatus == 'crear') {
            this.solicitud.usuario_crea = parseInt(localStorage.getItem("USU"));
            this.solicitud.accion_tipo = 'C';
          } else if (this.estatus == 'modificar' || this.estatus == 'detalle') {
            this.solicitud.usuario_actualiza = parseInt(localStorage.getItem("USU"));
            this.solicitud = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).datos;
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
  run_tipo_estatus() {
    this.flag = true;

    this.rest.CRUD_tipo_estatus(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta;
        this.tipo_de_estatus = resp.recordset;
        //console.log('--->> '+this.catalogo)
        this.allItems = resp.recordset;
        this.arreglo_tipo_de_estatus(this.allItems);

        console.log(resp);
        this.flag = false;

      }, (error) => {
        this.flag = false;
        console.log(error);

      });
  }

  arreglo_tipo_de_estatus(datos: any) {
    //console.log('arreglo')
    for (const i in datos) {
      //console.log('for')
      //if (datos[i].sw_proveedor == 1) {

      this.tipo_estatus_datos.push(datos[i]);

      //}
    }
  }
  guardar(FRM) {
    this.solicitud.usuario_actualiza = parseInt(localStorage.getItem("USU"));
    this.solicitud.usuario_crea = parseInt(localStorage.getItem("USU"));
    this.flag = true;
    this.solicitud.sw_activo = (this.solicitud.sw_activo) ? 1 : 0;

    console.log(this.solicitud);

    this.rest.CRUD_estatus(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log(resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

        if (resp_validada.estado) {
          if (this.solicitud.accion_tipo == 'C') {
            //this.limpiar();
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

                  this.limpiar(FRM);
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

                  this.limpiar(FRM);
                }

              });
          }
          // this.router.navigate(['./silc/menus']);
        } else {
          swal('Ocurrio un Error', resp_validada.msg, "warning");
        }

        this.flag = false;

      }, (error) => {
        let respuesta = this._utilidades.manejo_status(error);
        swal(respuesta.titulo, respuesta.mensaje, "warning");
        console.log(error);
      });
  }

  cancelar() {
    history.back();
  }

  limpiar(FRM) {

    this.solicitud.nombre = '';
    this.solicitud.tipo_de_estatus = 0;
    this.solicitud.sw_activo = 0;
    FRM.reset();
  }
}
