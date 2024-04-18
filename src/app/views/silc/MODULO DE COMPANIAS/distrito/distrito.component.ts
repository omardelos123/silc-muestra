import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RestService, parametros, Permisos , ValidadoresService, PaginacionService, UtilidadesService } from '../../../../services/_export';
declare var swal: any;
@Component({
  selector: 'app-distrito',
  templateUrl: './distrito.component.html',
  styleUrls: ['./distrito.component.scss']
})
export class DistritoComponent implements OnInit {

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
  pais: any;
  provincia:any;

  filtrar_distrito:string = '';
  distrito: any;
  nombre_distrito: string = '';
  longitud_distrito: string = '';
  latitud_distrito: string = '';
  sw_activo_distrito:0;

 ArregloRespuesta: any[];

 public provinciasFiltradas: any;


  constructor( private router: Router, private rest: RestService,
    private _validadores: ValidadoresService, private _paginacion: PaginacionService, private _utilidades: UtilidadesService) { }

  ngOnInit() {
    this.solicitud.accion_tipo = 'R';
    this.run_distrito();
    this.run_pais();
  }

  run_pais() {
    this.flag = true;

    this.rest.CRUD_pais(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta;
        this.pais = resp.recordset;

        console.log(resp);
        this.flag = false;
        this.run_provincia();
      }, (error) => {
        this.flag = false;
        console.log(error);

      });
  }



  selectPais(IdPais) {
    if(IdPais == 0){
      this.allItems = this.ArregloRespuesta;
      this.provinciasFiltradas = [];
      this.setPage(1);
      return;
    }

    //Todos los Distritos con pais seleccionado
    this.allItems = this.ArregloRespuesta.filter(dist => dist.id_pais == IdPais);

    //Todos las provincias con Pais seleccionado
    this.provinciasFiltradas = this.provincia.filter(prov => prov.id_pais == IdPais)

    this.setPage(1);
    console.debug("Registros encontrados: ", this.allItems) //
  }

  selectProvincia(IdProvincia){
    if(IdProvincia == 0){
      // this.allItems = this.ArregloRespuesta;
      
    //Todos los Distritos con pais seleccionado
      this.allItems = this.ArregloRespuesta.filter(dist => dist.id_pais == this.solicitud.id_pais);
      this.setPage(1);
      return;
    }
    console.debug(IdProvincia);

    //Tods los Distritos Con Provincia seleccionada
    this.allItems = this.allItems.filter(dist => dist.id_provincia == IdProvincia);
    this.setPage(1);
    console.debug("Registros encontrados: ", this.allItems) 

  }
  
  run_provincia() {
    this.flag= true;
     
    this.rest.CRUD_provincia(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta;
        this.provincia = resp.recordset;
        this.flag = false;
      }, (error) => {
        this.flag = false;
        console.log(error);

      });
  }

  run_distrito() {
    this.flag= true;
    this.rest.CRUD_distrito(this.solicitud)
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

  modificar_distrito(datos: any) {
    const arreglo = {
      titulo: "MODIFICAR DISTRITO", estatus: "modificar", datos: datos,ACCION:'U'
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nuevo-distrito', parametros]);
  }
  crear_distrito() {
    const arreglo = {
      titulo: "CREAR DISTRITO", estatus: "crear",ACCION:'C'
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nuevo-distrito', parametros]);
  }
  detalle_distrito(datos: any) {
    const arreglo = {
      titulo: "DETALLE DISTRITO", estatus: "detalle", datos: datos,ACCION:'U'
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nuevo-distrito', parametros]);
  }
  eliminar() {
    this.rest.CRUD_distrito(this.solicitud)
      .then((respuesta) => {
        let resp: any = respuesta;
        this.distrito= resp.recordset;
     }, (error) => {
        swal('Ocurrio un error', 'Ocurrio un error al eliminar el registro', 'error');
        console.log(error);

      });
  }
  eliminar_modal(datos: any) {
    this.solicitud.accion_tipo = 'D';
    this.nombre_distrito = datos.nombre;
    this.solicitud.id_distrito = datos.id_distrito;
    this.solicitud.sw_activo = 0;
    swal({
      title: "Desea eliminar el registro? \n " + this.nombre_distrito,
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
      this.distrito = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  
    }
  
    //#endregion
    
 filtrar($evet) {
  this.allItems = $evet;
  this.setPage(1);
}
}
