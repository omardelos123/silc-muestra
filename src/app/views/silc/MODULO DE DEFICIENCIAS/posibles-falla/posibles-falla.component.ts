import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RestService, parametros,  Permisos, ValidadoresService, PaginacionService, UtilidadesService } from '../../../../services/_export';
import { posibles_fallas } from '../../../../mappings/model/_export_model';
declare var swal: any;

@Component({
  selector: 'app-posibles-falla',
  templateUrl: './posibles-falla.component.html',
  styleUrls: ['./posibles-falla.component.scss']
})
export class PosiblesFallaComponent implements OnInit {
  /*
    Variables Globales en la vista.
  */
  
 
  permisos = new Permisos().access;
  solicitud = new parametros().prm_deficiencias;
  flag: boolean = false;

  filtrar_sistemas: string = '';
  posibles_fallas: posibles_fallas[] = [];
  nombre_posible_falla: string = '';

  //#region Variables de paginacion
  private allItems: any[];
  pager: any = {};
  pagedItems: any[];
  //#endregion
 ArregloRespuesta: any[];

  constructor( private router: Router, private rest: RestService,
    private _validadores: ValidadoresService, private _paginacion: PaginacionService, private _utilidades: UtilidadesService) { }

  ngOnInit() {
    this.solicitud.accion_tipo = 'R';
    this.run();
  }

  run() {
    this.flag = true;
    this.solicitud.id_sistema = null;
    this.solicitud.id_tipo_deficiencia = null;
    this.rest.CRUD_posibles_fallas(this.solicitud)
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
      }
      );
  }

  crear() {
    const arreglo = {
      titulo: "CREAR POSIBLE FALLA", estatus: "crear"
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/frm-posibles-fallas', parametros]);
  }

  modificar(datos: any) {
    const arreglo = {
      titulo: "MODIFICAR POSIBLE FALLA", estatus: "modificar", datos: datos
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/frm-posibles-fallas', parametros]);
  }

  detalle(datos: any) {
    const arreglo = {
      titulo: "DETALLE USUARIO", estatus: "detalle", datos: datos
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/frm-posibles-fallas', parametros]);
  }

  eliminar_modal(datos: posibles_fallas) {
    this.solicitud.accion_tipo = 'D';
    this.nombre_posible_falla = datos.nombre;
    this.solicitud.id_posible_falla = datos.id_posible_falla;
    this.solicitud.sw_activo = 0; // para deshabilitar la posible falla, por eso ejecuta 'D'.

    swal({
      title: "Desea eliminar el registro? \n " + this.nombre_posible_falla,
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
    this.rest.CRUD_posibles_fallas(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log(resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

        if (resp_validada.estado) {

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
  //#region metodos de funcionamientos

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      // return;
    }

    // get pager object from service
    this.pager = this._paginacion.getPager(this.allItems.length, page, 10);

    // get current page of items
    this.posibles_fallas = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  //#endregion
  
 filtrar($evet) {
  this.allItems = $evet;
  this.setPage(1);
}
}
