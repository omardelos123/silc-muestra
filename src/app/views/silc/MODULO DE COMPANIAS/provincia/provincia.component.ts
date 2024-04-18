import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RestService, parametros, Permisos , ValidadoresService, PaginacionService, UtilidadesService } from '../../../../services/_export';

declare var swal: any;
@Component({
  selector: 'app-provincia',
  templateUrl: './provincia.component.html',
  styleUrls: ['./provincia.component.scss']
})
export class ProvinciaComponent implements OnInit {

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
  solicitud = new parametros().prm_companias;
  filtrar_provincia: string = '';
  pais: any;
  provincia: any;
  nombre_provincia: string = '';
  longitud_provincia: string = '';
  latitud_provincia: string = '';
  sw_activo_provincia: 0;
  ArregloRespuesta: any[];

  constructor(private router: Router, private rest: RestService,
    private _validadores: ValidadoresService, private _paginacion: PaginacionService, private _utilidades: UtilidadesService) { }

  ngOnInit() {
    this.solicitud.accion_tipo = 'R';
    this.run_provincia();
    this.run_pais();
  }


  selectPais(IdPais) {
    if(IdPais == 0){
      this.allItems = this.ArregloRespuesta;
      this.setPage(1);
      return;
    }

    this.allItems = this.ArregloRespuesta.filter(prov => prov.id_pais = IdPais);
    this.setPage(1);
    console.debug("Registros encontrados: ", this.allItems) //
  }

  run_pais() {
    this.flag = true;

    this.rest.CRUD_pais(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta;
        this.pais = resp.recordset;

        console.log(resp);
        this.flag = false;
      }, (error) => {
        this.flag = false;
        console.log(error);

      });
  }
  run_provincia() {
    this.flag = true;
    this.rest.CRUD_provincia(this.solicitud)
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
    this.rest.CRUD_provincia(this.solicitud)
      .then((respuesta) => {
        let resp: any = respuesta;

        this.provincia= resp.recordset;
     }, (error) => {
        swal('Ocurrio un error', 'Ocurrio un error al eliminar el registro', 'error');


      });
  }

  modificar_provincia(datos: any) {
    const arreglo = {
      titulo: "MODIFICAR PROVINCIA", estatus: "modificar", datos: datos
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nueva-provincia', parametros]);
  }

  crear_provincia() {
    const arreglo = {
      titulo: "CREAR PROVINCIA", estatus: "crear"
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nueva-provincia', parametros]);
  }

  detalle_provincia(datos: any) {
    const arreglo = {
      titulo: "DETALLE PROVINCIA", estatus: "detalle", datos: datos
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nueva-provincia', parametros]);
  }

  eliminar_modal(datos: any) {
    this.solicitud.accion_tipo = 'D';
    this.nombre_provincia = datos.nombre;
    this.solicitud.id_provincia = datos.id_provincia;
    this.solicitud.sw_activo = 0;
    swal({
      title: "Desea eliminar el registro? \n " + this.nombre_provincia,
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
    this.provincia = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);

  }

  //#endregion

  filtrar($evet) {
    this.allItems = $evet;
    this.setPage(1);
  }
}
