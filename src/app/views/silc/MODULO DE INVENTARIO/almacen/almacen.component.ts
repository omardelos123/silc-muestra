import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { RestService, parametros,  Permisos , ValidadoresService, PaginacionService, UtilidadesService } from '../../../../services/_export';
declare var swal: any;
@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styleUrls: ['./almacen.component.scss']
})
export class AlmacenComponent implements OnInit {
  flag: boolean = false;
  //#region Variables de paginacion
  // array of all items to be paged
  private allItems: any[];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  //#endregion

  
 
  permisos = new Permisos().access;
  solicitud = new parametros().prm_inventarios;

  filtrar_almacen_de_compania: string = '';
  filtrar_ubicacion_de_articulo: string = '';
  almacen: any;
  Id_almacen: string = '';
  nombre_almacen: string = '';
  ArregloRespuesta: any[];

  constructor( private router: Router, private rest: RestService,
    private _validadores: ValidadoresService, private _paginacion: PaginacionService, private _utilidades: UtilidadesService) { }
  ngOnInit() {
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
    this.solicitud.accion_tipo = 'R';
    this.solicitud.sw_activo = 1;
    this.run_almacen();
  }
 
  
  run_almacen() {
    this.rest.CRUD_almacen(this.solicitud)
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
    this.rest.CRUD_almacen(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta;
        this.almacen = resp.recordset;
            swal('Proceso Exitoso', 'Se Elimino el registro', 'success');

      }, (error) => {
        swal('Ocurrio un error', 'Ocurrio un error al eliminar el registro', 'error');
        console.log(error);

      });
  }

  modificar_almacen(datos: any) {
    const arreglo = {
      titulo: "MODIFICAR UBICACION DE ARTICULO", estatus: "modificar", datos: datos,ACCION:'U'
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nuevo_registro_de_almacen', parametros]);
  }

  crear_almacen() {
    const arreglo = {
      titulo: "CREAR UBICACION DE ARTICULO", estatus: "crear",ACCION:'C'
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nuevo_registro_de_almacen', parametros]);
  }

  detalle_almacen(datos: any) {
    const arreglo = {
      titulo: "DETALLE UBICACION DE ARTICULO", estatus: "detalle", datos: datos,ACCION:'U'
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nuevo_registro_de_almacen', parametros]);
  }

  eliminar_modal(datos: any) {
    this.solicitud.accion_tipo = 'D';
    this.nombre_almacen = datos.catalogo;
    this.solicitud.id_almacen = datos.id_almacen;
    this.solicitud.sw_activo = 0;

    swal({
      title: "Desea eliminar el registro? \n " + this.nombre_almacen,
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
    this.almacen = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);

  }

  //#endregion
  
  filtrar($evet) {
    this.allItems = $evet;
    this.setPage(1);
  }
}
