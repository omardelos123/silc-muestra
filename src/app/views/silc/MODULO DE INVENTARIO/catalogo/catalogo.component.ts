import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RestService, parametros,  Permisos, ValidadoresService, PaginacionService, UtilidadesService } from '../../../../services/_export';


declare var swal: any;
@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {
  
 
  permisos = new Permisos().access;
  flag: boolean = false;
  solicitud = new parametros().prm_inventarios;

  filtrar_listado_de_inventario: string = '';
  catalogo: any[];
  nombre_catalogo: string = '';
  ArregloRespuesta: any[];

  //#region Variables de paginacion
  // array of all items to be paged
  private allItems: any[];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  //#endregion
  constructor( private router: Router, private rest: RestService,
    private _validadores: ValidadoresService, private _paginacion: PaginacionService, private _utilidades: UtilidadesService) { }
  ngOnInit() {
    this.solicitud.accion_tipo = 'R';
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
    this.run_catalogo_de_repuesto();


  }
  run_catalogo_de_repuesto() {
    this.flag = true;
    this.rest.CRUD_catalogo_de_repuesto(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

        if (resp_validada.estado) {
          this.ArregloRespuesta = resp.recordset;
          this.catalogo = resp.recordset;
          this.allItems = this.catalogo;
          this.setPage(1);

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
  modificar_catalogo(datos: any) {
    const arreglo = {
      titulo: "MODIFICAR LISTADO DE INVENTARIO", estatus: "modificar", datos: datos, ACCION: 'U'
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/informacion_del_catalogo', parametros]);
  }
  crear_catalogo() {
    const arreglo = {
      titulo: "CREAR LISTADO DE INVENTARIO", estatus: "crear", ACCION: 'C', estatus_crear: 1
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/informacion_del_catalogo', parametros]);
  }
  detalle_catalogo(datos: any) {
    const arreglo = {
      titulo: "DETALLE LISTADO DE INVENTARIO", estatus: "detalle", datos: datos, ACCION: 'U'
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/informacion_del_catalogo', parametros]);
  }
  eliminar() {
    this.rest.CRUD_catalogo_de_repuesto(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta;
        this.catalogo = resp.recordset;

        // console.log(resp);


      }, (error) => {
        swal('Ocurrio un error', 'Ocurrio un error al eliminar el registro', 'error');
        console.log(error);

      });
  }
  eliminar_modal(datos: any) {
    this.solicitud.accion_tipo = 'D';
    this.nombre_catalogo = datos.nombre_proveedor;
    this.solicitud.id_parte = datos.id_parte;
    this.solicitud.sw_activo = 0;
    swal({
      title: "Desea eliminar el registro? \n " + this.nombre_catalogo + " \n con número de parte " + datos.nombre,
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

  setPage(page: number) {
    console.log(page+'- '+ this.pager.totalPages)
    if (page < 1 || page > this.pager.totalPages) {
      // return;
    }
    // get pager object from service
    this.pager = this._paginacion.getPager(this.allItems.length, page, 10);

    // get current page of items
    this.catalogo = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  filtrar($evet) {
    this.allItems = $evet;
    this.setPage(1);
  }
}

