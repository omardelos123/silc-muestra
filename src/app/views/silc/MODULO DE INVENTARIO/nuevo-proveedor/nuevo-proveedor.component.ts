import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RestService, parametros,  Permisos, ValidadoresService, UtilidadesService } from '../../../../services/_export';
declare var swal: any;
@Component({
  selector: 'app-nuevo-proveedor',
  templateUrl: './nuevo-proveedor.component.html',
  styleUrls: ['./nuevo-proveedor.component.scss']
})
export class NuevoProveedorComponent implements OnInit {/* Variables de configuración de notificación*/
  
 
  /* Variables para los permisos, eliminar, editar, guardar */
  permisos = new Permisos().access;
  /* Objeto que se envia al webservice  */
  solicitud = new parametros().prm_inventarios;
  /*Variables del la vista */
  flag: boolean = false;
  
  
  pais: any;
  provincia:any;
  distrito: any;
  forma_pagos: any;
  titulo: string;
  estatus: string;
  ACCION:string;
 
  btn_acciones = { btn_guardar: false, btn_limpiar: false }
    constructor( private router: Router, private route: ActivatedRoute, private rest: RestService,
      private _validadores: ValidadoresService, private _utilidades: UtilidadesService) { }
    ngOnInit() {
      this.solicitud.accion_tipo = 'R';
      this.solicitud.sw_activo =  1 ;
      this.run_pais();
     
      this.solicitud.fecha_actualiza = new Date().toUTCString();
      this.solicitud.fecha_crea = new Date().toUTCString();
      this.route.params.subscribe(params => {
        if (params['data'] != null) {
          try {
            this.ACCION = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).ACCION 
            
            this.titulo = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).titulo;
            this.estatus = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).estatus;
  
            this.btn_acciones = this._validadores.BtnVisibles(this.estatus);
  
            if (this.estatus == 'crear') {
              this.solicitud.usuario_crea=parseInt(localStorage.getItem("USU"));
              //this.solicitud.accion_tipo = this.ACCION ;
            } else if (this.estatus == 'modificar') {
              this.solicitud.usuario_actualiza=parseInt(localStorage.getItem("USU"));
              this.solicitud = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).datos;
              //this.solicitud.accion_tipo = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).ACCION ;
              this.solicitud.sw_activo =  1 ;
              this.solicitud.id_distrito =  this.solicitud.id_distrito ;
              console.log(this.solicitud);
            } else if (this.estatus == 'detalle') {
                this.solicitud = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).datos;
                //this.solicitud.accion_tipo = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).ACCION ;
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
    run_pais() {
      this.flag= true;
       
      this.rest.CRUD_pais(this.solicitud)
        .then((respuesta) => {
  
          let resp: any = respuesta;
          this.pais = resp.recordset;
          
          console.log(resp);
          this.flag = false;
          this.solicitud.accion_tipo = 'R';
          this.solicitud.sw_activo =  1 ;
          this.run_provincia();
        }, (error) => {
          this.flag = false;
          console.log(error);
  
        });
    }
    run_provincia() {
      this.flag= true;
       
      this.rest.CRUD_provincia(this.solicitud)
        .then((respuesta) => {
  
          let resp: any = respuesta;
          this.provincia = resp.recordset;
          
          this.run_distrito();
          console.log(resp);
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
  
          let resp: any = respuesta;
          this.distrito = resp.recordset;

          this.solicitud.accion_tipo = 'R';
          this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
          this.solicitud.sw_activo = 1;
          this.run_forma_pago();

          console.log(resp);
          this.flag = false;
         
        }, (error) => {
          this.flag = false;
          console.log(error);
  
        });
    }
    run_forma_pago() {
      this.flag= true;
       
      this.rest.CRUD_forma_pago(this.solicitud)
        .then((respuesta) => {
  
          let resp: any = respuesta;
          this.forma_pagos = resp.recordset;
          
          console.log(resp);
          this.flag = false;
         
        }, (error) => {
          this.flag = false;
          console.log(error);
  
        });
    }
    guardar(FRM) {
      this.solicitud.usuario_actualiza=parseInt(localStorage.getItem("USU"));
      this.solicitud.usuario_crea=parseInt(localStorage.getItem("USU"));
      this.solicitud.id_compania=parseInt(localStorage.getItem("COMP"));
      this.solicitud.accion_tipo = this.ACCION ;
      if (this.estatus == 'crear') 
        { 
    
        this.solicitud.sw_activo = (this.solicitud.sw_activo) ? 1 : 0;
        this.solicitud.sw_tipo_entrega = (this.solicitud.sw_tipo_entrega) ? 1 : 0;
        }
      
      // Se Puede colocar un metodo ara validar los datos que se envian.
      this.rest.CRUD_proveedores(this.solicitud)
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
      this.solicitud.nombre= '';
      this.solicitud.ruc= '';
      this.solicitud.domicilio= '';
      this.solicitud.nombre_contacto= '';
      this.solicitud.id_pais= 0;
      this.solicitud.id_provincia= 0;
      this.solicitud.id_distrito= 0;
      this.solicitud.telefono= '';
      this.solicitud.codigo_postal= '';
      this.solicitud.correo= '';
      this.solicitud.pagina_web= '';  
      this.solicitud.id_forma_pago= 0;   
      this.solicitud.sw_tipo_entrega= 0; 
      this.solicitud.sw_activo = 0;
      FRM.reset();
     
    }
  }