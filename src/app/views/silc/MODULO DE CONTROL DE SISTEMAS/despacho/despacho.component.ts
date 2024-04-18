import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RestService, parametros,  Permisos, ValidadoresService, PaginacionService, UtilidadesService } from '../../../../services/_export';
declare var swal: any;

@Component({
  selector: 'app-despacho',
  templateUrl: './despacho.component.html',
  styleUrls: ['./despacho.component.scss']
})
export class DespachoComponent implements OnInit {/*
  Variables Globales en la vista.
*/

permisos = new Permisos().access;
solicitud = new parametros().prm_control_sistemas;
flag: boolean = false;

despachos: any = [];
nombre_sistema: string = '';
destino_despacho: string = '';
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
  this.solicitud.id_compania =parseInt(localStorage.getItem("COMP"));
  this.run();
}

run() {
  this.flag = true;
  this.rest.CRUD_despachos(this.solicitud)
    .then((respuesta) => {

      let resp: any = respuesta; // toda la respuesta del servidor.
      console.log(resp);

      let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

      if (resp_validada.estado) {
        // this.menus = resp.recordset;
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

//#region  METODOS CREAR, MODIFICAR, DETALLE

crear() {
  const arreglo = {
    titulo: "CREAR DESPACHO", estatus: "crear"
  }
  const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
  this.router.navigate(['./silc/nuevo-despacho', parametros]);
}

modificar(datos: any) {
  const arreglo = {
    titulo: "MODIFICAR DESPACHO", estatus: "modificar", datos: datos
  }
  const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
  this.router.navigate(['./silc/nuevo-despacho', parametros]);
}

detalle(datos: any) {
  const arreglo = {
    titulo: "DETALLE DE DESPACHO", estatus: "detalle", datos: datos
  }
  const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
  this.router.navigate(['./silc/nuevo-despacho', parametros]);
}

recibir(datos: any) {
  const arreglo = {
    titulo: "RECIBIR DESPACHO", estatus: "recibir", datos: datos
  }
  const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
  this.router.navigate(['./silc/nuevo-despacho', parametros]);
}

//#endregion

//#region  Metodos para eliminar

eliminar_modal(datos: any) {
  this.solicitud.accion_tipo = 'D';
  this.nombre_sistema = datos.nombre_sistema;
  this.destino_despacho = datos.nombre_destino;
  this.solicitud.id_despacho = datos.id_despacho;
  this.solicitud.sw_activo = 0;

  swal({
    title: "Desea eliminar el registro? \n " + datos.nombre_sistema,
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

eliminar() {
  this.flag = true;
  this.rest.CRUD_despachos(this.solicitud)
    .then((respuesta) => {

      let resp: any = respuesta; // toda la respuesta del servidor.
      console.log(resp);

      let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

      if (resp_validada.estado) {
        swal('Proceso Exitoso', 'Se elimino el registro', 'success');
        
        this.allItems = resp.recordset;
        this.setPage(this.pager.currentPage); //para iniciar la paginacion.
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

//#endregion

estatus() {
  alert('Función no prograda!')
}


//#region metodos de funcionamientos

setPage(page: number) {
  if (page < 1 || page > this.pager.totalPages) {
    // return;
  }

  // get pager object from service
  this.pager = this._paginacion.getPager(this.allItems.length, page, 10);

  // get current page of items
  this.despachos = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);

}

//#endregion
filtrar($evet) {
  this.allItems = $evet;
  this.setPage(1);
}
}
