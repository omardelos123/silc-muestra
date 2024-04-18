import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RestService, parametros,  Permisos, ValidadoresService, UtilidadesService } from '../../../../services/_export';
declare var swal: any;
@Component({
  selector: 'app-nuevo-menu',
  templateUrl: './nuevo-menu.component.html',
  styleUrls: ['./nuevo-menu.component.scss']
})
export class NuevoMenuComponent implements OnInit {
  /* Variables de configuración de notificación*/
  
 
  /* Variables para los permisos, eliminar, editar, guardar */
  permisos = new Permisos().access;
  /* Objeto que se envia al webservice  */
  solicitud = new parametros().prm_control_usuarios;
  flag: boolean = false;

  /*Variables del la vista */
  menus: any = [];
  menus_contenedores: any = [];
  titulo: string;
  estatus: string;
  compañia: string
  btn_acciones = { btn_guardar: false, btn_limpiar: false }

  constructor( private router: Router, private route: ActivatedRoute, private rest: RestService,
    private _validadores: ValidadoresService, private _utilidades: UtilidadesService) { }

  ngOnInit() {
    this.solicitud.id_menu = 0;
    this.solicitud.accion_tipo = 'R'; // R: Read: Select en base de datos.
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP")); // Valor debe estar en el localstoge se guarda cuando el usuario se autentica.
    this.run();

    this.route.params.subscribe(params => {
      if (params['data'] != null) {
        try {
          this.titulo = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).titulo;
          this.estatus = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).estatus;

          this.btn_acciones = this._validadores.BtnVisibles(this.estatus);

          if (this.estatus == 'crear') {
            this.solicitud.usuario_crea = parseInt(localStorage.getItem("USU"));
            this.solicitud.accion_tipo = 'C';
          } else if (this.estatus == 'modificar') {
            this.solicitud.usuario_actualiza = parseInt(localStorage.getItem("USU"));
            this.solicitud = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).datos;
            this.solicitud.nombre_menu = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).datos.nombre;
            this.solicitud.accion_tipo = 'U';
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

  run() {
    this.flag = true;
    this.rest.CRUD_menu(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log(resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

        if (resp_validada.estado) {
          this.menus = resp.recordset;
          this.arreglo_menu_contenedores(this.menus);
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

  arreglo_menu_contenedores(datos: any) {
    for (const i in datos) {
      if (datos[i].sw_contenedor == 1) {
        this.menus_contenedores.push(datos[i]);
      }
    }
  }

  /*
    El valor frmMenu que recibe el metodo es la variable del formulario (form) en el html, es para resetear el formulario.
    Ese valor tambien se recibe en el metodo limpiar de igual manera para resetear el formulario.
  */
  guardar(FRM) {
    this.solicitud.usuario_actualiza = parseInt(localStorage.getItem("USU"));
    this.solicitud.usuario_crea = parseInt(localStorage.getItem("USU"));
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
    this.flag = true;
    this.solicitud.sw_activo = (this.solicitud.sw_activo) ? 1 : 0;
    this.solicitud.sw_contenedor = (this.solicitud.sw_contenedor) ? 1 : 0;
    this.solicitud.sw_mostrar = (this.solicitud.sw_mostrar) ? 1 : 0;
    this.solicitud.link = this.solicitud.link.trim(); // le quito los espacios de izquierda y derecha

    console.log(this.solicitud);

    this.rest.CRUD_menu(this.solicitud)
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
        this.flag = false;
        let respuesta = this._utilidades.manejo_status(error);
        swal('Oops', 'Ocurrió un error', 'error');
        console.log(error);
      });
  }

  limpiar(FRM) {
    this.solicitud.nombre_menu = "";
    this.solicitud.link = "";
    this.solicitud.sw_contenedor = 0;
    this.solicitud.id_padre = 0;
    this.solicitud.descripcion = "";
    this.solicitud.sw_activo = 0;
    this.solicitud.sw_mostrar = 0;
    FRM.reset();
  }

  cancelar() {
    history.back();
  }

}
