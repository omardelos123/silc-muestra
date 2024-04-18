import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RestService, parametros, Permisos, ValidadoresService, PaginacionService, UtilidadesService } from '../../../../services/_export';
// import { isFunction } from 'ngx-pipes/src/pipes/helpers/helpers';

declare var swal: any;
@Component({
  selector: 'app-companias',
  templateUrl: './companias.component.html',
  styleUrls: ['./companias.component.scss']
})
export class CompaniasComponent implements OnInit {
  permisos = new Permisos().access;
  flag: boolean = false;
  solicitud = new parametros().prm_companias;

  filtrar_proveedor:string = '';
  companias: any;
  nombre_compania: string = '';
  filtrar_compania: string = '';


  //#region Variables de paginacion
  // array of all items to be paged
  private allItems: any[];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  //#endregion
 ArregloRespuesta: any[];

  constructor( private router: Router, private rest: RestService,
    private _validadores: ValidadoresService, private _paginacion: PaginacionService, private _utilidades: UtilidadesService) { }

  ngOnInit() {

    this.solicitud.accion_tipo = 'R';
    this.run_compania();
  }


  run_compania() {
    this.flag = true;
    this.rest.CRUD_compania(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log(resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

        if (resp_validada.estado) {
          this.allItems = resp.recordset;
        this.ArregloRespuesta = resp.recordset;

          this.setPage(1); //para iniciar la paginacion.
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

  eliminar() {
    this.rest.CRUD_compania(this.solicitud)
      .then((respuesta) => {
        let resp: any = respuesta;
        this.companias = resp.recordset;
      }, (error) => {
        swal('Ocurrio un error', 'Ocurrio un error al eliminar el registro', 'error');
        console.log(error);

      });
  }

  modificar_compania(datos: any) {
    const arreglo = {
      titulo: "MODIFICAR COMPAÑIA", estatus: "modificar", datos: datos, ACCION: 'U'
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nueva-compania', parametros]);
  }

  crear_compania() {
    const arreglo = {
      titulo: "CREAR COMPAÑIA", estatus: "crear", ACCION: 'C'
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nueva-compania', parametros]);
  }

  detalle_compania(datos: any) {
    const arreglo = {
      titulo: "DETALLE COMPAÑIA", estatus: "detalle", datos: datos, ACCION: 'U'
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nueva-compania', parametros]);
  }

  eliminar_modal(datos: any) {
    this.solicitud.accion_tipo = 'D';
    this.nombre_compania = datos.nombre;
    this.solicitud.id_compania = datos.id_compania;
    this.solicitud.sw_activo = 0;
    swal({
      title: "Desea eliminar el registro? \n " + this.nombre_compania,
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
      // return;
    }

    // get pager object from service
    this.pager = this._paginacion.getPager(this.allItems.length, page, 10);

    // get current page of items
    this.companias = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);

  }

  //#endregion

  filtrar($evet) {
    this.allItems = $evet;
    this.setPage(1);
  }
}

