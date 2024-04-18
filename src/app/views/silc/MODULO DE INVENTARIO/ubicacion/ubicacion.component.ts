import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RestService, parametros,  Permisos , ValidadoresService, PaginacionService, UtilidadesService } from '../../../../services/_export';
declare var swal: any;
@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.scss']
})
export class UbicacionComponent implements OnInit {
//#region Variables de paginacion
  // array of all items to be paged
  private allItems: any[];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  //#endregion

  
 
  permisos = new Permisos().access;
  flag: boolean = false;
  solicitud = new parametros().prm_inventarios;

  filtrar_ubicacion: string = '';
  ubicacion: any;
  nombre_ubicacion: string = '';
  ArregloRespuesta: any[];

  constructor( private router: Router, private rest: RestService,
    private _validadores: ValidadoresService, private _paginacion: PaginacionService, private _utilidades: UtilidadesService) { }

  ngOnInit() {
    this.solicitud.accion_tipo = 'R';
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
    this.run_ubicacion();

  }
  run_ubicacion() {
    this.flag= true;
    this.rest.CRUD_ubicacion(this.solicitud)
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

  eliminar() {
    this.rest.CRUD_ubicacion(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta;
        this.ubicacion = resp.recordset;

      }, (error) => {
        swal('Ocurrio un error', 'Ocurrio un error al eliminar el registro', 'error');
        console.log(error);

      });
  }

  modificar_ubicacion(datos: any) {
    const arreglo = {
      titulo: "MODIFICAR UBICACION", estatus: "modificar", datos: datos
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nueva-ubicacion', parametros]);
  }

  crear_ubicacion() {
    const arreglo = {
      titulo: "CREAR UBICACION", estatus: "crear"
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nueva-ubicacion', parametros]);
  }
  
  detalle_ubicacion(datos: any) {
    const arreglo = {
      titulo: "DETALLE UBICACION", estatus: "detalle", datos: datos
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nueva-ubicacion', parametros]);
  }

  eliminar_modal(datos: any) {
    this.solicitud.accion_tipo = 'D';
    this.nombre_ubicacion = datos.nombre;
    this.solicitud.id_ubicacion= datos.id_ubicacion;
    this.solicitud.sw_activo = 0;

    swal({
      title: "Desea eliminar el registro? \n " + this.nombre_ubicacion,
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
    this.ubicacion = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);

  }
  
  filtrar($evet) {
    this.allItems = $evet;
    this.setPage(1);
  }
}