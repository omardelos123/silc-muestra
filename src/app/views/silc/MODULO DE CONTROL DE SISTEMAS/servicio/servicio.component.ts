import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RestService, parametros,  Permisos, ValidadoresService, PaginacionService, UtilidadesService } from '../../../../services/_export';
declare var swal: any;
@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.scss']
})
export class ServicioComponent implements OnInit {
  
 
  permisos = new Permisos().access;
  flag: boolean = false;
  solicitud = new parametros().prm_control_sistemas;

  filtrar_servicios:string = '';
  servicios: any;
  nombre_servicios: string = '';

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
    this.run_servicios();

  }
  run_servicios() {
    this.flag= true;
    this.rest.CRUD_servicios(this.solicitud)
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
    this.rest.CRUD_servicios(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta;
        this.servicios = resp.recordset;

        // console.log(resp);
       

      }, (error) => {
        swal('Ocurrio un error', 'Ocurrio un error al eliminar el registro', 'error');
        console.log(error);

      });
  }

  modificar_servicio(datos: any) {
    const arreglo = {
      titulo: "MODIFICAR SERVICIO", estatus: "modificar", datos: datos
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nuevo-servicio', parametros]);
  }

  crear_servicio() {
    const arreglo = {
      titulo: "CREAR SERVICIO", estatus: "crear"
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nuevo-servicio', parametros]);
  }
  
  detalle_servicio(datos: any) {
    const arreglo = {
      titulo: "DETALLE SERVICIO", estatus: "detalle", datos: datos
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nuevo-servicio', parametros]);
  }

  eliminar_modal(datos: any) {
    this.solicitud.accion_tipo = 'D';
    this.nombre_servicios = datos.nombre;
    this.solicitud.id_servicio = datos.id_servicio;
    this.solicitud.sw_activo = 0;

    swal({
      title: "Desea eliminar el registro? \n " + this.nombre_servicios  ,
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
  this.servicios = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);

}

//#endregion

filtrar($evet) {
  this.allItems = $evet;
  this.setPage(1);
}
}
