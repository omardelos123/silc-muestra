import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RestService, parametros,  Permisos, ValidadoresService, UtilidadesService } from '../../../../services/_export';
declare var swal: any;
@Component({
  selector: 'app-nueva-unidades',
  templateUrl: './nueva-unidades.component.html',
  styleUrls: ['./nueva-unidades.component.scss']
})
export class NuevaUnidadesComponent implements OnInit {

 /* Variables de configuración de notificación*/
 

 /* Variables para los permisos, eliminar, editar, guardar */
 permisos = new Permisos().access;
 /* Objeto que se envia al webservice  */
 solicitud = new parametros().prm_inventarios;

 /*Variables del la vista */
 flag: boolean = false;
 titulo: string;
 estatus: string;


 btn_acciones = { btn_guardar: false, btn_limpiar: false }
 constructor( private router: Router, private route: ActivatedRoute, private rest: RestService,
  private _validadores: ValidadoresService, private _utilidades: UtilidadesService) { }
  ngOnInit() {
    this.solicitud.sw_activo=1;
    this.solicitud.fecha_actualiza = new Date().toUTCString();
    this.solicitud.fecha_crea = new Date().toUTCString();
    this.route.params.subscribe(params => {
      if (params['data'] != null) {
        try {
          this.titulo = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).titulo;
          this.estatus = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).estatus;

          //this.BtnVisibles();
          this.btn_acciones = this._validadores.BtnVisibles(this.estatus);

          if (this.estatus == 'crear') {
            this.solicitud.accion_tipo = 'C';
            
          } else if (this.estatus == 'modificar') {
            this.solicitud.usuario_actualiza=parseInt(localStorage.getItem("USU"));
            this.solicitud = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).datos;
            this.solicitud.id_compania=parseInt(localStorage.getItem("COMP"));
            this.solicitud.accion_tipo = 'U';
            this.solicitud.sw_activo =  1 ;
            console.log(this.solicitud);
          } else if (this.estatus == 'detalle') {
              this.solicitud = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).datos;
              this.solicitud.id_compania=parseInt(localStorage.getItem("COMP"));
              this.solicitud.accion_tipo = 'U';
              console.log(this.solicitud);
          }
        } catch (error) {
          alert("hubo un error 1");
        }
      }
      else {
        alert("envio un valor null");
      }
    });
          this.solicitud.token = JSON.parse(decodeURIComponent(escape(window.atob(localStorage._token))));
  }

  guardar(FRM) {
    this.solicitud.usuario_actualiza=parseInt(localStorage.getItem("USU"));
    this.solicitud.usuario_crea=parseInt(localStorage.getItem("USU"));
    this.solicitud.id_compania=parseInt(localStorage.getItem("COMP"));
    if (this.estatus == 'crear' || this.estatus == 'modificar' ) 
     { 
       
      this.solicitud.sw_activo = (this.solicitud.sw_activo) ? 1 : 0;
      this.solicitud.sw_entrega = (this.solicitud.sw_entrega) ? 1 : 0;
      this.solicitud.sw_proveedor = (this.solicitud.sw_proveedor) ? 1 : 0;
      }
     
    // Se Puede colocar un metodo ara validar los datos que se envian.
    this.rest.CRUD_unidades(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log(respuesta);
        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).
        if (resp_validada.estado) {
          if (this.solicitud.accion_tipo == 'C') {
            swal({
              title: "Proceso exitoso!",
              text: "Se registraron los datos correctamente!   \n ¿Desea crear otro registro?",
              type: "success",
              showCancelButton: true,
              confirmButtonText: "No",
              cancelButtonText: "Si"
            },
              confirmed => {
                if (confirmed) {
                  history.back();
                } else {

                  this.limpiar(FRM);
                }

              });
          } else if (this.solicitud.accion_tipo == 'U') {
            swal({
              title: "Proceso exitoso!",
              text: "Se Actualizaron los datos correctamente",
              type: "success",
              cancelButtonText: "Ok"
            },
              function (isConfirm) {
                if (isConfirm) {
                  history.back();
                } else {

                  this.limpiar(FRM);
                }

              });
          }
          // this.router.navigate(['./silc/menus']);
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

  cancelar()
  {
    history.back();
  }

 
  limpiar(FRM) {
    
    this.solicitud.nombre = '';
    this.solicitud.descripcion = '';
    this.solicitud.inicial = '';
    this.solicitud.sw_entrega=0;
    this.solicitud.sw_proveedor=0;
    this.solicitud.sw_activo=0;
    FRM.reset();

  }
}
