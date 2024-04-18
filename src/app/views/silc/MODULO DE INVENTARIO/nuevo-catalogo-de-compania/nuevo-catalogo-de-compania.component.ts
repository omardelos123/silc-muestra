import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RestService, parametros,  Permisos, ValidadoresService, UtilidadesService } from '../../../../services/_export';
declare var swal: any;
@Component({
  selector: 'app-nuevo-catalogo-de-compania',
  templateUrl: './nuevo-catalogo-de-compania.component.html',
  styleUrls: ['./nuevo-catalogo-de-compania.component.scss']
})
export class NuevoCatalogoDeCompaniaComponent implements OnInit {

  
 
  /* Variables para los permisos, eliminar, editar, guardar */
  permisos = new Permisos().access;
  /* Objeto que se envia al webservice  */
  solicitud = new parametros().prm_inventarios;
  /*Variables del la vista */
  flag: boolean = false;

  catalogo: any;
  proveedor: any;
  unidades: any;


  sw_entrega_datos: any = [];
  sw_proveedor_datos: any = [];
  proveedor_datos: any = [];
  private allItems: any[];

  //anexo de variables fabricante
  fabricante: any;
  fabricante_datos: any = [];

  titulo: string;
  estatus: string;
  ACCION: string;

  id_unidad_entrega: Int16Array;
  id_unidad_proveedor: Int16Array;

  btn_acciones = { btn_guardar: false, btn_limpiar: false }
  constructor( private router: Router, private route: ActivatedRoute, private rest: RestService,
    private _validadores: ValidadoresService, private _utilidades: UtilidadesService) { }

  ngOnInit() {
    this.solicitud.accion_tipo = 'R';
    this.solicitud.sw_activo = 1;
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
    this.run();

    this.solicitud.fecha_actualiza = new Date().toUTCString();
    this.solicitud.fecha_crea = new Date().toUTCString();
    this.route.params.subscribe(params => {
      if (params['data'] != null) {
        try {
          this.ACCION = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).ACCION

          this.titulo = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).titulo;
          this.estatus = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).estatus;

          //this.BtnVisibles();
          this.btn_acciones = this._validadores.BtnVisibles(this.estatus);
          if (this.estatus == 'crear') {
            this.solicitud.usuario_crea = parseInt(localStorage.getItem("USU"));
            //this.solicitud.accion_tipo = this.ACCION ;
          } else if (this.estatus == 'modificar') {
            this.solicitud.usuario_actualiza = parseInt(localStorage.getItem("USU"));
            this.solicitud = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).datos;
            //this.solicitud.accion_tipo = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).ACCION ;
            this.solicitud.sw_activo = 1;
            this.solicitud.id_distrito = this.solicitud.id_distrito;
            console.log(this.solicitud);
          } else if (this.estatus == 'detalle') {
            this.solicitud = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).datos;
            //this.solicitud.accion_tipo = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).ACCION ;
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
  run() {
    this.flag = true;

    this.rest.CRUD_unidades(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta;
        this.catalogo = resp.recordset;
        //console.log('--->> '+this.catalogo)
        this.allItems = resp.recordset;
        this.arreglo_sw_proveedor(this.allItems);
        this.arreglo_sw_entrega(this.allItems);
        this.solicitud.accion_tipo = 'R';
        this.solicitud.sw_activo = 1;
        this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
        this.run_proveedores();
        console.log(resp);
        this.flag = false;

      }, (error) => {
        this.flag = false;
        console.log(error);

      });
  }
  arreglo_sw_entrega(datos: any) {
    for (const a in datos) {
      if (datos[a].sw_entrega == 1) {
        this.sw_entrega_datos.push(datos[a]);
      }
    }
  }
  arreglo_sw_proveedor(datos: any) {
    console.log('arreglo')
    for (const i in datos) {
      console.log('for')
      if (datos[i].sw_proveedor == 1) {

        this.sw_proveedor_datos.push(datos[i]);

      }
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
  run_proveedores() {
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
        // this.run2();
        this.run_fabricante();

      }, (error) => {
        this.flag = false;
        console.log(error);

      });
  }

  arreglo_fabricante(datos: any) {
    for (const i in datos) {
      this.fabricante_datos.push(datos[i]);
    }
  }
  run_fabricante() {
    this.flag = true;

    this.rest.CRUD_fabricantes(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta;
        this.fabricante = resp.recordset;
        this.arreglo_fabricante(this.fabricante);
        console.log("*** Viendo test de fabricante ***");
        console.log(resp);
        this.flag = false;
        this.solicitud.accion_tipo = 'R';
        this.solicitud.sw_activo = 1;
        this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
      }, (error) => {
        this.flag = false;
        console.log(error);

      });
  }

  run_unidades() {
    this.flag = true;

    this.rest.CRUD_unidades(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta;
        this.unidades = resp.recordset;

        // this.run();
        console.log(resp);
        this.flag = false;
      }, (error) => {
        this.flag = false;
        console.log(error);

      });
  }
  guardar(FRM) {
    this.solicitud.usuario_actualiza = parseInt(localStorage.getItem("USU"));
    this.solicitud.usuario_crea = parseInt(localStorage.getItem("USU"));
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
    this.solicitud.accion_tipo = this.ACCION;
    
    if (this.estatus == 'crear') {
      //this.solicitud.accion_tipo = 'C';

      this.solicitud.sw_activo = (this.solicitud.sw_activo) ? 1 : 0;
      this.solicitud.sw_reparable = (this.solicitud.sw_reparable) ? 1 : 0;
      this.solicitud.sw_esencial = (this.solicitud.sw_esencial) ? 1 : 0;
    }else if(this.estatus == 'modificar') {
      this.solicitud.sw_activo = (this.solicitud.sw_activo) ? 1 : 0;
      this.solicitud.sw_reparable = (this.solicitud.sw_reparable) ? 1 : 0;
      this.solicitud.sw_esencial = (this.solicitud.sw_esencial) ? 1 : 0;
    }

    // Se Puede colocar un metodo ara validar los datos que se envian.
    console.log(this.solicitud)
    this.rest.CRUD_catalogo_de_compania(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log(respuesta);
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
  cancelar() {
    history.back();
  }


  limpiar(FRM) {

    this.solicitud.id_proveedor = 0;
    this.solicitud.nombre = '';
    this.solicitud.descripcion = '';
    this.solicitud.precio_unitario = 0;
    this.solicitud.unidad_entrega = 0
    this.solicitud.unidad_proveedor = 0
    this.solicitud.sw_reparable = 0;
    this.solicitud.sw_esencial = 0;
    this.solicitud.sw_activo = 0;
    FRM.reset();

  }
}