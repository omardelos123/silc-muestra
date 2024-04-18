import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RestService, parametros,  Permisos, ValidadoresService, UtilidadesService } from '../../../../services/_export';
import { Alert } from 'selenium-webdriver';
declare var swal: any;
@Component({
  selector: 'app-nuevo-registro-almacen',
  templateUrl: './nuevo-registro-almacen.component.html',
  styleUrls: ['./nuevo-registro-almacen.component.scss']
})
export class NuevoRegistroAlmacenComponent implements OnInit {



  
 
  /* Variables para los permisos, eliminar, editar, guardar */
  permisos = new Permisos().access;
  /* Objeto que se envia al webservice  */
  solicitud = new parametros().prm_inventarios;
  /*Variables del la vista */
  flag: boolean = false;

  catalogo: any;
  proveedor: any;
  unidades: any;
  lista_provedores_numeroparte: any;


  partes_datos: any = [];
  proveedor_datos: any = [];
  ubicacion_datos: any = [];
  private allItems: any[];

  /*Variables del la vista */
  titulo: string;
  estatus: string;
  compañia: string
  ACCION: string;
  btn_acciones = { btn_guardar: false, btn_limpiar: false }
  constructor( private router: Router, private route: ActivatedRoute, private rest: RestService,
    private _validadores: ValidadoresService, private _utilidades: UtilidadesService) { }

  ngOnInit() {

    this.solicitud.accion_tipo = 'R';
    this.solicitud.sw_activo = 1;
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
    this.run_numerodepartes();

    this.solicitud.fecha_actualiza = new Date().toUTCString();
    this.solicitud.fecha_crea = new Date().toUTCString();
    this.route.params.subscribe(params => {
      if (params['data'] != null) {
        try {
          this.ACCION = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).ACCION
          this.titulo = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).titulo;
          this.estatus = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).estatus;
          this.btn_acciones = this._validadores.BtnVisibles(this.estatus);
          if (this.estatus == 'crear') {
            this.solicitud.usuario_crea = parseInt(localStorage.getItem("USU"));
            this.solicitud.accion_tipo = 'C';
          } else if (this.estatus == 'modificar') {
            this.solicitud.usuario_actualiza = parseInt(localStorage.getItem("USU"));
            this.solicitud = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).datos;
            this.solicitud.accion_tipo = 'U';
            console.log(this.solicitud);
          } else if (this.estatus == 'detalle') {
            this.solicitud = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).datos;

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
    //this.BtnVisibles();
  }

  run_numerodepartes() {
    this.flag = true;

    this.rest.CRUD_catalogo_de_repuesto(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta;
        this.catalogo = resp.recordset;
        console.log('--->> ' + this.catalogo)
        this.allItems = resp.recordset;
        this.arreglo_partes(this.allItems);

        this.solicitud.accion_tipo = 'R';
        this.solicitud.sw_activo = 1;
        this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
        this.run_ubicacion();

        console.log(resp);
        this.flag = false;

      }, (error) => {
        this.flag = false;
        console.log(error);

      });
  }
  run_proveedores1234() {
    this.flag = true;

    this.rest.CRUD_proveedores(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta;
        this.proveedor = resp.recordset;
        this.arreglo_proveedor(this.proveedor);
        console.log(resp);
        this.flag = false;
        this.solicitud.accion_tipo = 'R';
        this.solicitud.sw_activo = 1;
        this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
        this.run_ubicacion();
      }, (error) => {
        this.flag = false;
        console.log(error);

      });
  }

  run_proveedor() {

    this.flag = true;
    this.solicitud.id_parte = this.solicitud.id_parte
    //alert("  "+this.solicitud.id_parte);
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
    //this.run_numero_de_tareas();
    this.rest.GEN_lista_parte_proveedor(this.solicitud)
      .then((respuesta) => {
        let resp: any = respuesta;
        // alert("tareas "+this.lista_pedidos_deficiencia);
        this.lista_provedores_numeroparte = resp.recordset;
        // alert("tareas "+this.lista_pedidos_deficiencia);
        console.log(resp);
        this.flag = false;

      }, (error) => {
        this.flag = false;
        console.log(error);

      });
  }
  run_ubicacion() {
    this.flag = true;

    this.rest.CRUD_ubicacion(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta;
        this.proveedor = resp.recordset;
        this.arreglo_ubicacion(this.proveedor);
        console.log(resp);
        this.flag = false;
        this.run_proveedor();
      }, (error) => {
        this.flag = false;
        console.log(error);

      });
  }

  arreglo_partes(datos: any) {
    //console.log('arreglo')
    for (const i in datos) {
      //console.log('for')
      //if (datos[i].sw_proveedor == 1) {

      this.partes_datos.push(datos[i]);

      //}
    }
  }

  arreglo_proveedor(datos: any) {
    //console.log('arreglo')
    for (const i in datos) {
      //console.log('for')
      //if (datos[i].sw_proveedor == 1) {

      this.proveedor_datos.push(datos[i]);

      //}
    }
  }

  arreglo_ubicacion(datos: any) {
    //console.log('arreglo')
    for (const i in datos) {
      //console.log('for')
      //if (datos[i].sw_proveedor == 1) {

      this.ubicacion_datos.push(datos[i]);

      //}
    }
  }
  guardar(FRM) {
    this.solicitud.usuario_actualiza = parseInt(localStorage.getItem("USU"));
    this.solicitud.usuario_crea = parseInt(localStorage.getItem("USU"));
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
    this.solicitud.accion_tipo = this.ACCION;
    if (this.estatus == 'crear') {

      this.solicitud.sw_activo = (this.solicitud.sw_activo) ? 1 : 0;
      this.solicitud.sw_rfid = (this.solicitud.sw_rfid) ? 1 : 0;

      if (this.solicitud.sw_rfid == 0) {
        this.solicitud.cod_rfid = "";
      }
    }



    // Se Puede colocar un metodo ara validar los datos que se envian.
    this.rest.CRUD_almacen(this.solicitud)
      .then((respuesta) => {
        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log(respuesta);
        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).
        if (resp_validada.estado) {
          if (this.solicitud.accion_tipo == 'C') {
            // this.limpiar();
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
  cancelar() {
    history.back();
  }
  limpiar(FRM) {

    this.solicitud.id_parte = 0;
    this.solicitud.id_proveedor = 0;
    this.solicitud.id_ubicacion = 0;
    this.solicitud.descripcion = "";
    this.solicitud.cod_rfid = "";
    this.solicitud.sw_rfid = 0;
    this.solicitud.sw_activo = 0;
    FRM.reset();
  }
}
