import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RestService, parametros,  Permisos, ValidadoresService, PaginacionService, UtilidadesService } from '../../../../services/_export';
declare var swal: any;
@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent implements OnInit {

  /*
    Variables Globales en la vista.
  */

  
 
  permisos = new Permisos().access;
  solicitud = new parametros().prm_control_usuarios;
  flag: boolean = false;

  menus: any = [];
  menus_contenedores: any = [];
  menus_contenedores_filtro: any = [];
  nombre_menu: string = '';

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
    this.solicitud.accion_tipo = 'R'; // R: Read: Select en base de datos.
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP")); // Valor debe estar en el localstoge se guarda cuando el usuario se autentica.
    this.run();
  }

  run() {
    this.flag = true;
    this.rest.CRUD_menu(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log(resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

        if (resp_validada.estado) {
          // this.menus = resp.recordset;
          this.arreglo_menu_contenedores(resp.recordset);
          // this.setPage(1); //para iniciar la paginacion.
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

  arreglo_menu_contenedores(datos: any) {
    this.menus_contenedores = [];
    this.menus = [];
    for (const i in datos) {
      /* Todos los menus contenedores */
      if (datos[i].sw_contenedor == 1) {
        this.menus_contenedores.push(datos[i]);
      }

      /*este arreglo se mustra en el select option */
      // this.menus_contenedores_filtro =  this.menus_contenedores;

      if (datos[i].sw_contenedor == 0 && datos[i].id_padre == 0) {
        this.menus_contenedores.push(datos[i]);
      }
      /* Todos los menus que no son contenedores */
      if (datos[i].sw_contenedor == 0 && datos[i].id_padre == 1) {
        this.menus.push(datos[i]);
      }
    }
    for (const i in this.menus_contenedores) {
      this.menus_contenedores[i].menu = [];
      for (const j in datos) {
        if (this.menus_contenedores[i].id_menu == datos[j].id_padre) {
          this.menus_contenedores[i].menu.push(datos[j]);
        }
      }
    }
    this.solicitud.id_padre = 0;
    this.filtrar_por_contenedor();
  }

  filtrar_por_contenedor() {
    if (this.solicitud.id_padre != 0) {
      let index = this.menus_contenedores.findIndex(menus_contenedores => menus_contenedores.id_menu == this.solicitud.id_padre);
      this.menus = this.menus_contenedores[index].menu;
      this.allItems = this.menus;
    } else {
      this.menus = this.menus_contenedores;
      this.allItems = this.menus;
    }

  }

  //#region  METODOS CREAR, MODIFICAR, DETALLE

  crear() {
    const arreglo = {
      titulo: "CREAR MENU", estatus: "crear"
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nuevo-menu', parametros]);
  }

  modificar(datos: any) {
    const arreglo = {
      titulo: "MODIFICAR MENU", estatus: "modificar", datos: datos
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nuevo-menu', parametros]);
  }

  detalle() {
    const arreglo = {
      titulo: "DETALLE MENU", estatus: "detalle"
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nuevo-menu', parametros]);
  }

  //#endregion


  //#region  Metodos para eliminar

  eliminar_modal(datos: any) {
    this.solicitud.accion_tipo = 'E';
    this.nombre_menu = datos.nombre;
    this.solicitud.id_menu = datos.id_menu;

    swal({
      title: "Desea eliminar el registro? \n " + this.nombre_menu,
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
    this.rest.CRUD_menu(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log(resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

        if (resp_validada.estado) {
          // this.menus = resp.recordset;
          this.arreglo_menu_contenedores(resp.recordset);
          // this.setPage(1); //para iniciar la paginacion.
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
      return;
    }

    // get pager object from service
    this.pager = this._paginacion.getPager(this.allItems.length, page, 10);

    // get current page of items
    this.menus = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);

  }

  //#endregion

}
