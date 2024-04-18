import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RestService, parametros,  Permisos, ValidadoresService, UtilidadesService } from '../../../../services/_export';
declare var swal: any;
@Component({
  selector: 'app-nuevo-sistemas',
  templateUrl: './nuevo-sistemas.component.html',
  styleUrls: ['./nuevo-sistemas.component.scss']
})
export class NuevoSistemasComponent implements OnInit {
  /* Variables de configuración de notificación*/
  
 
  /* Variables para los permisos, eliminar, editar, guardar */
  permisos = new Permisos().access;
  /* Objeto que se envia al webservice  */
  solicitud = new parametros().prm_control_sistemas;
  flag: boolean = false;
  
  /*Variables del la vista */
  tipo_sistemas: any = [];
  fabricantes: any = [];
  clase_de_equipo: any = [];
  modelo: any = [];
  destino: any = [];
  tipo_combustible: any = [];
  personal: any = [];
  titulo: string;
  estatus: string;
  compañia: string
  btn_acciones = { btn_guardar: false, btn_limpiar: false }

  constructor( private router: Router, private route: ActivatedRoute, private rest: RestService,
    private _validadores: ValidadoresService, private _utilidades: UtilidadesService) { }

  ngOnInit() {
    this.solicitud.accion_tipo = 'R'; // R: Read: Select en base de datos.
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP")); // Valor debe estar en el localstoge se guarda cuando el usuario se autentica.

    this.run_tipo_sistemas();
    // this.run_personal();
    this.route.params.subscribe(params => {
      if (params['data'] != null) {
        try {
          this.titulo = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).titulo;
          this.estatus = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).estatus;

          this.btn_acciones = this._validadores.BtnVisibles(this.estatus);

          if (this.estatus == 'crear') {
            this.solicitud.usuario_crea=parseInt(localStorage.getItem("USU"));
            this.solicitud.accion_tipo = 'C';
          } else if (this.estatus == 'modificar') {
            this.solicitud.usuario_actualiza=parseInt(localStorage.getItem("USU"));
            this.solicitud = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).datos;
            this.solicitud.accion_tipo = 'U';
            this.solicitud.sw_activo =  1 ;
            console.log(this.solicitud);
          } else if (this.estatus == 'detalle') {
              this.solicitud = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).datos;
              this.solicitud.accion_tipo = 'U';
              console.log(this.solicitud);
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

  //#region Metodos que se ejecutan al inciar la pantalla 

  run_tipo_sistemas() {
    this.flag = true;
    this.rest.CRUD_tipo_sistemas(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log('run_tipo_sistemas', resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

        if (resp_validada.estado) {
          this.tipo_sistemas = resp.recordset;
        } else {
          this.tipo_sistemas = [];
          // swal('Ocurrio un Error', resp_validada.msg, 'error');
        }

        this.run_fabricantes();

        // this.flag = false;

      }, (error) => {
        this.flag = false;
        let respuesta = this._utilidades.manejo_status(error);
        swal('Oops', 'Ocurrió un error', 'error');
        console.log(error);
      });
  }

  run_fabricantes() {
    this.solicitud.accion_tipo = 'R';
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));

    this.rest.CRUD_fabricantes(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log('run_fabricantes', resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

        if (resp_validada.estado) {
          this.fabricantes = resp.recordset;
        } else {
          this.fabricantes = [];
          // swal('Ocurrio un Error', resp_validada.msg, 'error');
        }
        this.run_clase_de_equipo();

        // this.flag = false;

      }, (error) => {
        this.flag = false;
        let respuesta = this._utilidades.manejo_status(error);
        swal('Oops', 'Ocurrió un error', 'error');
        console.log(error);
      });
  }

  run_clase_de_equipo() {
    this.solicitud.accion_tipo = 'R';
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));

    this.rest.CRUD_clase_de_equipo(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log('run_clase_de_equipo', resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

        if (resp_validada.estado) {
          this.clase_de_equipo = resp.recordset;
        } else {
          this.clase_de_equipo = [];
          // swal('Ocurrio un Error', resp_validada.msg, 'error');
        }

        this.run_modelo();
        // this.flag = false;

      }, (error) => {
        this.flag = false;
        let respuesta = this._utilidades.manejo_status(error);
        swal('Oops', 'Ocurrió un error', 'error');
        console.log(error);
      });
  }

  run_modelo() {
    this.solicitud.accion_tipo = 'R';
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));

    this.rest.CRUD_modelo(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log('run_modelo', resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

        if (resp_validada.estado) {
          this.modelo = resp.recordset;
        } else {
          this.modelo = [];
          // swal('Ocurrio un Error', resp_validada.msg, 'error');
        }

        this.run_destino();
        // this.flag = false;

      }, (error) => {
        this.flag = false;
        let respuesta = this._utilidades.manejo_status(error);
        swal('Oops', 'Ocurrió un error', 'error');
        console.log(error);
      });
  }

  run_destino() {
    this.solicitud.accion_tipo = 'R';
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));

    this.rest.CRUD_destino(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log('run_destino', resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

        if (resp_validada.estado) {
          this.destino = resp.recordset;
        } else {
          this.destino = [];
          // swal('Ocurrio un Error', resp_validada.msg, 'error');
        }

        this.run_tipo_combustible();
        // this.flag = false;

      }, (error) => {
        this.flag = false;
        let respuesta = this._utilidades.manejo_status(error);
        swal('Oops', 'Ocurrió un error', 'error');
        console.log(error);
      });
  }

  run_tipo_combustible() {
    this.solicitud.accion_tipo = 'R';
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));

    this.rest.CRUD_tipo_combustible(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log('run_tipo_combustible', resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

        if (resp_validada.estado) {
          this.tipo_combustible = resp.recordset;
        } else {
          this.tipo_combustible = [];
          // swal('Ocurrio un Error', resp_validada.msg, 'error');
        }

        this.run_personal();
        // this.flag = false;

      }, (error) => {
        this.flag = false;
        let respuesta = this._utilidades.manejo_status(error);
        swal('Oops', 'Ocurrió un error', 'error');
        console.log(error);
      });
  }

  run_personal() {
    this.solicitud.accion_tipo = 'R';
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));

    this.rest.CRUD_personal(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log('run_personal', resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

        if (resp_validada.estado) {
          this.personal = resp.recordset;
        } else {
          this.personal = [];
          // swal('Ocurrio un Error', resp_validada.msg, 'error');
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


  guardar(FRM) {
     
    this.solicitud.usuario_actualiza=parseInt(localStorage.getItem("USU"));
    this.solicitud.usuario_crea=parseInt(localStorage.getItem("USU"));
    this.solicitud.id_compania=parseInt(localStorage.getItem("COMP"));
    
    if (this.estatus == 'crear') {
     
      this.solicitud.accion_tipo = 'C';
    } else if (this.estatus == 'modificar') {
      this.solicitud.accion_tipo = 'U';
    }
    this.flag = true;
    this.solicitud.sw_activo = (this.solicitud.sw_activo) ? 1 : 0;
    this.solicitud.sw_despachable = (this.solicitud.sw_despachable) ? 1 : 0;
    this.solicitud.sw_garantia = (this.solicitud.sw_garantia) ? 1 : 0;
    this.solicitud.sw_km = (this.solicitud.sw_km) ? 1 : 0;
    this.solicitud.sw_millas = (this.solicitud.sw_millas) ? 1 : 0;
    this.solicitud.sw_horas = (this.solicitud.sw_horas) ? 1 : 0;

    console.log(this.solicitud);

    this.rest.CRUD_sistemas(this.solicitud)
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
          swal('Ocurrio un Error', resp_validada.msg, 'error');
        }

        this.flag = false;

      }, (error) => {
        let respuesta = this._utilidades.manejo_status(error);
        swal('Oops', 'Ocurrió un error', 'error');
        console.log(error);
      });

  }

  limpiar(FRM) {
    this.solicitud.id_tipo_sistema=  0;
    this.solicitud.id_fabricante=  0;
    this.solicitud.id_clase=  0;
    this.solicitud.id_modelo=  0;
    this.solicitud.numero_serie=  '0';
    this.solicitud.numero_placa =  0;
    this.solicitud.ano_fabricacion=  '';
    this.solicitud.valor=  0;
    this.solicitud.sw_despachable=  0;
    this.solicitud.id_destino=  0;
    this.solicitud.sw_garantia=  0;
    this.solicitud.fecha_expiracion=  '';
    this.solicitud.lectura=  '';
    this.solicitud.id_tipo_de_combustible=  0;
    this.solicitud.id_operador_principal=  0;
    this.solicitud.id_supervisor_responsable=  0;
    this.solicitud.sw_activo = 0;
 
    FRM.reset();
  }

  cancelar() {
    history.back();
  }

}
