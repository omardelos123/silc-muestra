import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RestService, parametros,  Permisos, ValidadoresService, PaginacionService, UtilidadesService } from '../../../../services/_export';
declare var swal: any;
@Component({
  selector: 'app-tipo-de-personal',
  templateUrl: './tipo-de-personal.component.html',
  styleUrls: ['./tipo-de-personal.component.scss']
})
export class TipoDePersonalComponent implements OnInit {
  
 
  permisos = new Permisos().access;
  flag: boolean = false;
  solicitud = new parametros().prm_control_sistemas;

  filtrar_tipo_personal:string = '';
  tipo_de_personal: any;
  nombre_tipo_de_personal: string = '';

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
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
    this.run_tipo_personal();
  }

  eliminar() {
    this.rest.CRUD_tipo_de_personal(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta;
       
        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

        if (resp_validada.estado) {
          
          this.allItems = resp.recordset;
         this.ArregloRespuesta = resp.recordset;

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
  run_tipo_personal() {
    this.flag = true;
    this.rest.CRUD_tipo_de_personal(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta;
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
  eliminar_modal(datos: any) {
    this.solicitud.accion_tipo = 'D';
    this.nombre_tipo_de_personal = datos.nombre;
    this.solicitud.id_tipo_personal = datos.id_tipo_personal;
    this.solicitud.sw_activo = 0;
    swal({
      title: "Desea eliminar el registro? \n " + this.nombre_tipo_de_personal,
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


  modificar_tipo_de_personal(datos: any) {
    const arreglo = {
      titulo: "MODIFICAR TIPO DE PERSONAL", estatus: "modificar", datos: datos
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nuevo-tipo-de-personal', parametros]);
  }
  crear_tipo_de_personal() {
    const arreglo = {
      titulo: "CREAR TIPO DE PERSONAL", estatus: "crear"
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nuevo-tipo-de-personal', parametros]);
  }
  detalle_tipo_de_personal(datos: any) {
    const arreglo = {
      titulo: "DETALLE TIPO DE PERSONAL", estatus: "detalle", datos: datos
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nuevo-tipo-de-personal', parametros]);
  }
  //#region metodos de funcionamientos

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      // return;
    }

    // get pager object from service
    this.pager = this._paginacion.getPager(this.allItems.length, page, 10);

    // get current page of items
    this.tipo_de_personal = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);

  }

  //#endregion

  filtrar($evet) {
    this.allItems = $evet;
    this.setPage(1);
  }
}
