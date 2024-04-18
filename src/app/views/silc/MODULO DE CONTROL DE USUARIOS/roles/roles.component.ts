import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RestService, parametros, Permisos, ValidadoresService, PaginacionService, UtilidadesService } from '../../../../services/_export';
declare var swal: any;
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  /*
    Variables Globales en la vista.
  */



  permisos = new Permisos().access;
  solicitud = new parametros().prm_control_usuarios;
  flag: boolean = false;
  filtrar_nombre: string = '';
  roles: any = [];
  nombre_rol: string = '';

  // array of all items to be paged
  private allItems: any[];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  ArregloRespuesta: any[];

  constructor(private router: Router, private rest: RestService,
    private _validadores: ValidadoresService, private _paginacion: PaginacionService, private _utilidades: UtilidadesService) { }

  ngOnInit() {
    this.solicitud.accion_tipo = 'R'; // R: Read: Select en base de datos.
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP")); // Valor debe estar en el localstoge se guarda cuando el usuario se autentica.
    this.run();
  }

  run() {
    this.flag = true;
    this.rest.CRUD_roles(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log(resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

        if (resp_validada.estado) {
          if (this.solicitud.accion_tipo == 'U') {
            swal('Proceso Exitoso', 'Se Actualizaron los datos correctamente', 'success');
            this.solicitud.accion_tipo = 'R'; // R: Read: Select en base de datos.
            this.solicitud.sw_activo = (this.solicitud.sw_activo) ? 1 : 0;
            this.solicitud.sw_crea = (this.solicitud.sw_crea) ? 1 : 0;
            this.solicitud.sw_editar = (this.solicitud.sw_editar) ? 1 : 0;
            this.solicitud.sw_eliminar = (this.solicitud.sw_eliminar) ? 1 : 0;
            this.solicitud.sw_deshabilita = (this.solicitud.sw_deshabilita) ? 1 : 0;
            this.run();
          } else {

            this.allItems = resp.recordset;
            this.ArregloRespuesta = resp.recordset;

            this.setPage(1); //para iniciar la paginacion.
          }

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

  //#region  METODOS CREAR. MODIFICAR

  crear() {
    const arreglo = {
      titulo: "CREAR ROL", estatus: "crear"
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nuevo-rol', parametros]);
  }

  modificar(datos: any) {
    const arreglo = {
      titulo: "MODIFICAR ROL", estatus: "modificar", datos: datos
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nuevo-rol', parametros]);
  }

  switch(datos: any, valor: string) {
    this.solicitud = datos;
    this.solicitud.nombre_rol = datos.nombre;
    this.solicitud.accion_tipo = 'U';
    switch (valor) {
      case 'sw_crea':
        this.solicitud.sw_crea = (!datos.sw_crea) ? 1 : 0;
        break;
      case 'sw_editar':
        this.solicitud.sw_editar = (!datos.sw_editar) ? 1 : 0;
        break;
      case 'sw_eliminar':
        this.solicitud.sw_eliminar = (!datos.sw_eliminar) ? 1 : 0;
        break;
      case 'sw_deshabilita':
        this.solicitud.sw_deshabilita = (!datos.sw_deshabilita) ? 1 : 0;
        break;
      case 'sw_activo':
        this.solicitud.sw_activo = (!datos.sw_activo) ? 1 : 0;
        break;
      default:
        break;
    }
    this.run()
  }

  rol_menu(datos: any) {
    console.log(datos)
    const arreglo = {
      titulo: "MENÚ AUTORIZADO (" + datos.nombre + ")", estatus: "rol_menu", id_rol: datos.id_rol
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/menu-rol', parametros]);
  }

  //#endregion


  //#region  Metodos para eliminar

  eliminar_modal(datos: any) {
    this.solicitud.accion_tipo = 'E';
    this.nombre_rol = datos.nombre;
    this.solicitud.id_rol = datos.id_rol;
    this.solicitud.sw_activo = 0;


    swal({
      title: "Desea eliminar el registro? \n " + this.nombre_rol,
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
    this.rest.CRUD_roles(this.solicitud)
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

  //#endregion


  //#region metodos de funcionamientos

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      // return;
    }

    // get pager object from service
    this.pager = this._paginacion.getPager(this.allItems.length, page, 10);

    // get current page of items
    this.roles = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);

  }

  //#endregion

  filtrar($evet) {
    this.allItems = $evet;
    this.setPage(1);
  }
}
