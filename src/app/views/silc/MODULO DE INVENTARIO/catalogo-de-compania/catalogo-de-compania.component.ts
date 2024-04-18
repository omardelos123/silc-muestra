import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RestService, parametros,  Permisos, ValidadoresService, PaginacionService, ConexionSocketService, UtilidadesService } from '../../../../services/_export';
declare var swal: any;
@Component({
  selector: 'app-catalogo-de-compania',
  templateUrl: './catalogo-de-compania.component.html',
  styleUrls: ['./catalogo-de-compania.component.scss']
})
export class CatalogoDeCompaniaComponent implements OnInit {


  flag: boolean = false;
  //#region Variables de paginacion
  // array of all items to be paged
  private allItems: any[];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  //#endregion
  filtrar_catalogo_de_compania: string = '';
  
 
  permisos = new Permisos().access;

  solicitud = new parametros().prm_inventarios;

  catalogo: any;
  nombre_catalogo: string = '';
  usuario: number = 0;

  input_busqueda: string  = '';
  bool_busqueda_socket: boolean = false;
  private allItems_temp: any[];
  private total_page_temp: number;

  ArregloRespuesta: any[];


  constructor( private router: Router, private rest: RestService,
    private _validadores: ValidadoresService, private _paginacion: PaginacionService, private _SHOCKET: ConexionSocketService, private _utilidades: UtilidadesService) { }
  ngOnInit() {
    this.solicitud.accion_tipo = 'R';
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
    this.usuario = parseInt(localStorage.getItem("USU"));
    this.run_catalogo_de_compania();

  }

  run_catalogo_de_compania() {
    this.flag = true;
    this.rest.CRUD_catalogo_de_compania(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta;
        console.log(resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).
        console.log("Viendo respuesta de api"); console.log(resp);
        if (resp_validada.estado) {
          // this.menus = resp.recordset;
          this.allItems = resp.recordset;
          this.ArregloRespuesta = resp.recordset;
          this.allItems_temp = resp.recordset;
          this.setPage(1); //para iniciar la paginacion.
          this.total_page_temp = this.pager.totalPages;
        } else {
          this.allItems = [];
          this.setPage(1); //para iniciar la paginacion.
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
  modificar_catalogo(datos: any) {
    const arreglo = {
      titulo: "MODIFICAR CATALOGO DE PARTE", estatus: "modificar", datos: datos, ACCION: 'U'
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nuevo-catalogo-de-compania', parametros]);
  }
  crear_catalogo() {
    const arreglo = {
      titulo: "CREAR CATALOGO DE PARTE", estatus: "crear", ACCION: 'C'
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nuevo-catalogo-de-compania', parametros]);
  }
  detalle_catalogo(datos: any) {
    const arreglo = {
      titulo: "DETALLE CATALOGO DE PARTE", estatus: "detalle", datos: datos, ACCION: 'U'
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nuevo-catalogo-de-compania', parametros]);
  }
  eliminar() {
    this.rest.CRUD_catalogo_de_compania(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta;
        this.catalogo = resp.recordset;


      }, (error) => {
        swal('Ocurrio un error', 'Ocurrio un error al eliminar el registro', 'error');
        console.log(error);

      });
  }
  eliminar_modal(datos: any) {
    this.solicitud.accion_tipo = 'D';
    this.nombre_catalogo = datos.nombre_proveedor;
    this.solicitud.id_parte_compania = datos.id_parte_compania;
    this.solicitud.sw_activo = 0;
    swal({
      title: "Desea eliminar el registro? \n " + this.nombre_catalogo,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Si",
      cancelButtonText: "No",
      closeOnConfirm: false
    },
      confirmed => {
        if (confirmed) {
          swal("Registro eliminado!", "", "success");
          this.eliminar();
        }

      });
  }
  //#region metodos de funcionamientos

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      console.log("se retorna el setpage")
      // return;
    }

    // get pager object from service
    this.pager = this._paginacion.getPager(this.allItems.length, page, 10);

    // get current page of items
    this.catalogo = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);

  }

  //#endregion

  filtrar($evet) {
    this.allItems = $evet;
    this.setPage(1);
  }
  
}



