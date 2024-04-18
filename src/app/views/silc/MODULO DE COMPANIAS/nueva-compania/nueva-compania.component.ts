import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RestService, parametros, Permisos, ValidadoresService, UtilidadesService } from '../../../../services/_export';

declare var swal: any;

@Component({
  selector: 'app-nueva-compania',
  templateUrl: './nueva-compania.component.html',
  styleUrls: ['./nueva-compania.component.scss']
})
export class NuevaCompaniaComponent implements OnInit {

  /* Variables para los permisos, eliminar, editar, guardar */
  permisos = new Permisos().access;
  /* Objeto que se envia al webservice  */
  solicitud = new parametros().prm_companias;
  flag: boolean = false;
  distrito: any;
  pais: any;
  provincia: any;
  /*Variables del la vista */
  titulo: string;
  estatus: string;
  compañia: string
  ACCION: string;
  btn_acciones = { btn_guardar: false, btn_limpiar: false };
  correo: string = '';
  lista_de_correos: string[] = [];
  url_origin:string = '';

  constructor( private router: Router, private route: ActivatedRoute, private rest: RestService,
    private _validadores: ValidadoresService, private _utilidades: UtilidadesService) { }

  ngOnInit() {
    this.url_origin = window.location.origin;
    this.solicitud.accion_tipo = 'R';
    this.solicitud.sw_activo = 1;
    this.run_pais();
    this.solicitud.fecha_actualiza = new Date().toUTCString();
    this.solicitud.fecha_crea = new Date().toUTCString();
    this.route.params.subscribe(params => {
      if (params['data'] != null) {
        try {
          this.titulo = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).titulo;
          this.estatus = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).estatus;
          this.ACCION = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).ACCION;
          //this.BtnVisibles();
          this.btn_acciones = this._validadores.BtnVisibles(this.estatus);
          if (this.estatus == 'crear') {
            this.solicitud.usuario_crea = parseInt(localStorage.getItem("USU"));
            this.solicitud.accion_tipo = 'C';
          } else if (this.estatus == 'modificar') {
            this.solicitud.usuario_actualiza = parseInt(localStorage.getItem("USU"));
            this.solicitud = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).datos;
            this.lista_de_correos = this.solicitud.correo.split(',');
            this.solicitud.accion_tipo = 'U';
            console.log("U----->>" + parseInt(localStorage.getItem("USU")));
          } else if (this.estatus == 'detalle') {
            this.solicitud = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).datos;
            this.solicitud.accion_tipo = 'U';
            console.log(this.solicitud);
          }

        } catch (error) {
          alert("hubo un error 1");
        }
      }
      else {
        alert("envio un valor null");
      }
    });
    this.solicitud.token = JSON.parse(decodeURIComponent(escape(window.atob(localStorage._token))));

  }

  run_pais() {
    this.flag = true;

    this.rest.CRUD_pais(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta;
        this.pais = resp.recordset;

        console.log(resp);
        this.flag = false;
        this.solicitud.accion_tipo = 'R';
        this.solicitud.sw_activo = 1;
        this.run_provincia();
      }, (error) => {
        this.flag = false;
        console.log(error);

      });
  }

  run_provincia() {
    this.flag = true;

    this.rest.CRUD_provincia(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta;
        this.provincia = resp.recordset;

        this.run_distrito();
        console.log(resp);
        this.flag = false;
      }, (error) => {
        this.flag = false;
        console.log(error);

      });
  }

  run_distrito() {
    this.flag = true;

    this.rest.CRUD_distrito(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta;
        this.distrito = resp.recordset;

        console.log(resp);
        this.flag = false;

      }, (error) => {
        this.flag = false;
        console.log(error);

      });
  }

  agregarCorreo() {
    this.lista_de_correos.push(this.correo);
    this.correo = '';
    this.solicitud.correo = this.lista_de_correos.toString();
  }

  eliminar_correo(index: number) {
    this.lista_de_correos.splice(index, 1);
    this.solicitud.correo = this.lista_de_correos.toString();
  }

  guardar(FRM: any) {

    this.solicitud.accion_tipo = this.ACCION;
    this.solicitud.usuario_actualiza = parseInt(localStorage.getItem("USU"));
    this.solicitud.usuario_crea = parseInt(localStorage.getItem("USU"));
    if (this.estatus == 'crear') {
      this.solicitud.usuario_crea = parseInt(localStorage.getItem("USU"));
      this.solicitud.sw_activo = (this.solicitud.sw_activo) ? 1 : 0;

    }

    if (this.solicitud.correo != '') {
      this.rest.CRUD_compania(this.solicitud)
        .then((respuesta) => {

          let resp: any = respuesta; // toda la respuesta del servidor.
          console.log(resp);
          let nueva_compañia = resp.recordset[0].id_compania;
          let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).
          if (resp_validada.estado) {
            this.PROC_envio_credenciales(nueva_compañia, FRM);
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
    } else {
      alert('Los campos marcados con asterisco son obligatorios.')
    }

  }

  PROC_envio_credenciales(id_nueva_compañia: number, FRM: any) {
    let json_consulta_credenciales: any = {};
    json_consulta_credenciales.id_nueva_compañia = id_nueva_compañia;
    json_consulta_credenciales.token = this.solicitud.token;
    json_consulta_credenciales.correos = this.solicitud.correo;
    json_consulta_credenciales.url_origin = this.url_origin
    this.flag = true;
    this.rest.PROC_envio_credenciales(json_consulta_credenciales)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log(resp);

        if (this.solicitud.accion_tipo == 'C') {
          swal({
            title: "Proceso exitoso!",
            text: "Se registraron los datos correctamente! \n Se envio un correo con las credenciales de administrador. \n ¿Desea crear otro registro?",
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

        this.flag = false;

      }, (error) => {
        this.flag = false;
        let respuesta = this._utilidades.manejo_status(error);
        swal('Oops', 'Ocurrió un error', 'error');
        console.log(error);
      });
  }

  limpiar(FRM: any) {
    this.solicitud.codigo_postal = "";
    this.solicitud.correo = "";
    this.solicitud.descripcion = "";
    this.solicitud.direccion = "";
    this.solicitud.gerente = "";
    this.solicitud.id_compania = 0;
    this.solicitud.id_distrito = 0;
    this.solicitud.id_pais = 0;
    this.solicitud.id_provincia = 0;
    this.solicitud.impuesto = 0;
    this.solicitud.latitud = '';
    this.solicitud.longitud = '';
    this.solicitud.nombre = "";
    this.solicitud.nombre_pais = "";
    this.solicitud.nombre_provincia = "";
    this.solicitud.pagina_web = "";
    this.solicitud.sub_gerente = "";
    this.solicitud.telefono = "";
    // this.solicitud.usuario_actualiza = 0;
    // this.solicitud.usuario_crea = 0;
    FRM.reset();
    this.solicitud.sw_activo = 1;
  }

  cancelar() {
    history.back();
  }

}
