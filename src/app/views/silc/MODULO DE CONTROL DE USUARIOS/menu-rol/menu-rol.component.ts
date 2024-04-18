import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RestService, parametros,  Permisos, ValidadoresService, PaginacionService, UtilidadesService } from '../../../../services/_export';
declare var swal: any;

@Component({
  selector: 'app-menu-rol',
  templateUrl: './menu-rol.component.html',
  styleUrls: ['./menu-rol.component.scss']
})
export class MenuRolComponent implements OnInit {

  /* Variables de configuración de notificación*/
  
 
  /* Variables para los permisos, eliminar, editar, guardar */
  permisos = new Permisos().access;
  /* Objeto que se envia al webservice  */
  solicitud = new parametros().prm_control_usuarios;
  flag: boolean = false;

  /*Variables del la vista */
  titulo: string;
  estatus: string;
  menus_roles: any = [];
  contenedores: any = [];
  menus: any = [];
  arr_permisos: any = [];
  filtrar_menu: number = 0;
  //#region Variables de paginacion
  // array of all items to be paged
  private allItems: any[];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  //#endregion
  menus_contenedores: any = [];
  paginaActual: number = 1;


  constructor( private router: Router, private route: ActivatedRoute, private rest: RestService,
    private _validadores: ValidadoresService, private _paginacion: PaginacionService, private _utilidades: UtilidadesService) { }

  ngOnInit() {
    this.solicitud.accion_tipo = 'R'; // R: Read: Select en base de datos.
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));// Valor debe estar en el localstoge se guarda cuando el usuario se autentica.


    this.route.params.subscribe(params => {
      if (params['data'] != null) {
        try {
          this.titulo = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).titulo;
          this.estatus = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).estatus;
          this.solicitud.id_rol = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).id_rol;
        } catch (error) {
          alert("Ocurrio un error con los parametros del Router.");
          console.log(error);
        }
      }
      else {
        alert("Parametros nulos.");
      }
    });
    this.solicitud.token = JSON.parse(decodeURIComponent(escape(window.atob(localStorage._token))));
    this.run();
  }

  run() {
    this.flag = true;
    this.rest.CRUD_permisos(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

        if (resp_validada.estado) {
          this.arr_permisos = resp.recordset;
          this.consulta_menus();
          this.allItems = resp.recordset;
          this.setPage(this.paginaActual); //para iniciar la paginacion.
        } else {
          this.allItems = [];
          this.setPage(this.paginaActual); //para iniciar la paginacion.
          swal('Ocurrio un Error', resp_validada.msg, 'error');
          this.flag = false;
        }

      }, (error) => {
        this.flag = false;
        let respuesta = this._utilidades.manejo_status(error);
        swal('Oops', 'Ocurrió un error', 'error');
        console.log(error);
      });
  }

  consulta_menus() {
    this.flag = true;
    this.rest.CRUD_menu(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

        if (resp_validada.estado) {
          this.menus = resp.recordset;
          this.menu_rol(this.menus);
        } else {
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

  menu_rol(datos: any) {
    this.menus_contenedores = [];

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

    for (const i in this.menus) {
      this.menus[i].sw_activo = 0;
      this.menus[i].id_rol = this.solicitud.id_rol;
      this.menus[i].sw_principal = 0;
    }

    for (const i in this.menus) {
      for (const j in this.arr_permisos) {
        if (this.menus[i].id_menu == this.arr_permisos[j].id_menu) {
          this.menus[i].sw_activo = this.arr_permisos[j].sw_activo;
          this.menus[i].id_rol = this.arr_permisos[j].id_rol;
          this.menus[i].sw_principal = this.arr_permisos[j].sw_principal;
        }
      }
    }

    for (const i in this.menus_contenedores) {
      this.menus_contenedores[i].menu = [];
      for (const j in this.menus) {
        if (this.menus_contenedores[i].id_menu == this.menus[j].id_padre) {
          this.menus_contenedores[i].menu.push(this.menus[j]);
        }
      }
    }
    // this.solicitud.id_padre = 0;
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
    this.setPage(this.paginaActual)

  }

  ejecutar_permisos(solicitud) {
    this.flag = true;
    this.rest.CRUD_permisos(solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log('CRUD_permisos', resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

        if (resp_validada.estado) {

          this.solicitud.accion_tipo = 'R';
          this.solicitud.sw_principal = (this.solicitud.sw_principal) ? 1 : 0;
          this.solicitud.sw_activo = (this.solicitud.sw_activo) ? 1 : 0;
          this.run();

          swal('Proceso Exitoso', 'Se elimino el registro', 'success');
        } else {
          // this.allItems = [];
          // this.setPage(this.pager.currentPage); //para iniciar la paginacion.
          swal('Ocurrio un Error', resp_validada.msg, 'error');
          this.flag = false;
        }

      }, (error) => {
        this.flag = false;
        let respuesta = this._utilidades.manejo_status(error);
        swal('Oops', 'Ocurrió un error', 'error');
        console.log(error);
      });
  }

  switch(datos: any, valor: string) {
    // console.log(datos)
    this.solicitud = datos;
    this.solicitud.token = JSON.parse(decodeURIComponent(escape(window.atob(localStorage._token))));
    this.solicitud.accion_tipo = 'F';
    switch (valor) {
      case 'sw_principal':
        this.solicitud.sw_principal = (!datos.sw_principal) ? 1 : 0;
        break;
      case 'sw_activo':
        this.solicitud.sw_activo = (!datos.sw_activo) ? 1 : 0;
        break;
      default:
        break;
    }
    console.log(this.solicitud)

    this.ejecutar_permisos(this.solicitud);
  }

  //#region metodos de funcionamientos

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.paginaActual = page;

    // get pager object from service
    this.pager = this._paginacion.getPager(this.allItems.length, page, 10);

    // get current page of items
    this.menus = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);

  }

  //#endregion

}
