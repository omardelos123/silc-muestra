import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RestService, parametros, Permisos , ValidadoresService, PaginacionService, UtilidadesService } from '../../../../services/_export';
declare var swal: any;
@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.scss']
})
export class PaisComponent implements OnInit {
  permisos = new Permisos().access;
  flag: boolean = false;
  solicitud = new parametros().prm_companias;

  pais: any = [];
  nombre_pais: string = '';
  
  //#region Variables de paginacion
  // array of all items to be paged
  private allItems: any[];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  //#endregion

  filtrar_pais:string ='';
  longitud_pais: string = '';
  latitud_pais: string = '';
  sw_activo_pais:0;
 ArregloRespuesta: any[];

  constructor( private router: Router, private rest: RestService,
    private _validadores: ValidadoresService, private _paginacion: PaginacionService, private _utilidades: UtilidadesService) { }

  ngOnInit() {
    this.solicitud.accion_tipo = 'R';
    this.run_pais();
  }
  run_pais() {
    this.flag= true;
    this.rest.CRUD_pais(this.solicitud)
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
    this.rest.CRUD_pais(this.solicitud)
      .then((respuesta) => {
        let resp: any = respuesta;
        this.pais = resp.recordset;
      }, (error) => {
        swal('Ocurrio un error', 'Ocurrio un error al eliminar el registro', 'error');
        console.log(error);

      });
  }

  modificar_pais(datos: any) {
    const arreglo = {
      titulo: "MODIFICAR PAÍS", estatus: "modificar", datos: datos
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nuevo-pais', parametros]);
  }

  crear_pais() {
    const arreglo = {
      titulo: "CREAR PAÍS", estatus: "crear"
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nuevo-pais', parametros]);
  }
  
  detalle_pais(datos: any) {
    const arreglo = {
      titulo: "DETALLE PAÍS", estatus: "detalle", datos: datos
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nuevo-pais', parametros]);
  }

  eliminar_modal(datos: any) {
    this.solicitud.accion_tipo = 'D';
    this.nombre_pais = datos.nombre;
    this.solicitud.id_pais = datos.id_pais;
    this.solicitud.sw_activo = 0;

    swal({
      title: "Desea eliminar el registro? \n " + this.nombre_pais,
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
      this.pais = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  
    }
  
    //#endregion
    
 filtrar($evet) {
  this.allItems = $evet;
  this.setPage(1);
}
}
