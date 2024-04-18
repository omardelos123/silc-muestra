import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RestService, parametros,  Permisos, ValidadoresService, PaginacionService, UtilidadesService } from '../../../../services/_export';
declare var swal: any;
@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  
 
  permisos = new Permisos().access;
  flag: boolean = false;
  solicitud = new parametros().prm_control_sistemas;

  filtrar_personal:string = '';
  personal: any;
  nombre_personal: string = '';
  apellido_personal: string = '';
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
    this.solicitud.id_compania= parseInt(localStorage.getItem("COMP"));
    this.run_personal();
  }

  run_personal() {
    this.flag= true;
    this.rest.CRUD_personal(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log(resp);
 
        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).
 
        if (resp_validada.estado) {
          this.allItems = resp.recordset;
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
    this.rest.CRUD_personal(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta;
        this.personal = resp.recordset;

       

      }, (error) => {
        swal('Ocurrio un error', 'Ocurrio un error al eliminar el registro', 'error');
        console.log(error);

      });
  }
  eliminar_modal(datos: any) {
    this.solicitud.accion_tipo = 'D';
    this.nombre_personal = datos.nombre;
    this.apellido_personal = datos.apellido;
    this.solicitud.id_personal = datos.id_personal;
    this.solicitud.sw_activo = 0;

    swal({
      title: "Desea eliminar el registro? \n " +  this.nombre_personal+" "+this.apellido_personal ,
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

modificar_personal(datos: any)
{
  const arreglo={
    titulo:"MODIFICAR PERSONAL",estatus:"modificar", datos: datos
  }
  const parametros=btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
  this.router.navigate(['./silc/nuevo-personal',parametros]);
}
crear_personal()
{
  const arreglo={
    titulo:"CREAR PERSONAL",estatus:"crear"
  }
  const parametros=btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
  this.router.navigate(['./silc/nuevo-personal',parametros]);
}
detalle_personal(datos: any)
{
  const arreglo={
    titulo:"DETALLE PERSONAL",estatus:"detalle", datos: datos
  }
  const parametros=btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
  this.router.navigate(['./silc/nuevo-personal',parametros]);
}
//#region metodos de funcionamientos

setPage(page: number) {
  if (page < 1 || page > this.pager.totalPages) {
    return;
  }

  // get pager object from service
  this.pager = this._paginacion.getPager(this.allItems.length, page, 10);

  // get current page of items
  this.personal = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);

}

//#endregion

}
