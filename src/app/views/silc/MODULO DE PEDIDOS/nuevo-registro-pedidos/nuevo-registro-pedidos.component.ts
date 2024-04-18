import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RestService, parametros,  Permisos, ValidadoresService } from '../../../../services/_export';

@Component({
  selector: 'app-nuevo-registro-pedidos',
  templateUrl: './nuevo-registro-pedidos.component.html',
  styleUrls: ['./nuevo-registro-pedidos.component.scss']
})
export class NuevoRegistroPedidosComponent implements OnInit { flag: boolean = false;

  private fieldArray: Array<any> = [];
  private newAttribute: any = {};


  addFieldValue() {
    this.fieldArray.push(this.newAttribute)
    this.newAttribute = {};
}

deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
}





  /* Variables de configuración de notificación*/
  
 
  /* Variables para los permisos, eliminar, editar, guardar */
  permisos = new Permisos().access;
  /* Objeto que se envia al webservice  */
  solicitud = new parametros().prm_pedidos;
 
  /*Variables del la vista */
  titulo: string;
  estatus: string;
  pedido: any;
  proveedor: any;
  catalogo: any;
  lista_pedidos_deficiencia: any;
  unidades: any;

  btn_acciones = { btn_guardar: false, btn_limpiar: false }
  constructor( private router: Router, private route: ActivatedRoute, private rest: RestService,
   private _validadores: ValidadoresService) { }

  ngOnInit() {
    
    this.solicitud.fecha_actualiza = new Date().toUTCString();
    this.solicitud.fecha_crea = new Date().toUTCString();
    this.solicitud.accion_tipo = 'P';
    this.NumeroPedido();


    this.route.params.subscribe(params => {
      if (params['data'] != null) {
        try {
          this.titulo = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).titulo;
          this.estatus = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).estatus;
           
           

          if (this.estatus == 'crear') {
            this.solicitud.usuario_crea=parseInt(localStorage.getItem("USU"));
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

  async NumeroPedido() {
    this.flag= true;
     
    await this.rest.CRUD_pedidos(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta;
        this.pedido = resp.recordset[0].maxima;
        
        this.solicitud.accion_tipo = 'R';
        this.solicitud.sw_activo =  1 ;
        this.solicitud.id_compania =  parseInt(localStorage.getItem("COMP"));
        this.run_proveedores();

        console.log(resp);
        this.flag = false;
      }, (error) => {
        this.flag = false;
        console.log(error);

      });
  }
  ejemplo(){
   // alert(this.solicitud.numero_parte_nombre)
    
  }

  async run_numero_de_tareas() {
    this.flag= true;
    this.solicitud.id_parte=this.solicitud.numero_parte_nombre
    this.solicitud.id_compania =  parseInt(localStorage.getItem("COMP"));
    //this.run_numero_de_tareas();
    await this.rest.GEN_lista_pedidos_deficiencia(this.solicitud)
      .then((respuesta) => {
        let resp: any = respuesta;
        this.lista_pedidos_deficiencia = resp.recordset;
      
        console.log(resp);
        this.flag = false;
         
      }, (error) => {
        this.flag = false;
        console.log(error);

      });
  }



  async run_proveedores() {
    this.flag= true;
     
    await this.rest.CRUD_proveedores(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta;
        this.proveedor = resp.recordset;
        
        this.solicitud.accion_tipo = 'R';
        this.solicitud.sw_activo =  1 ;
        this.solicitud.id_compania =  parseInt(localStorage.getItem("COMP"));
        this.run_catalogo_de_compañia();
        console.log(resp);
        this.flag = false;
         
      }, (error) => {
        this.flag = false;
        console.log(error);

      });
  }

  async run_catalogo_de_compañia() {
    this.flag= true;
     
    await this.rest.CRUD_catalogo_de_compania(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta;
        this.catalogo = resp.recordset;
        
        this.solicitud.accion_tipo = 'R';
        this.solicitud.sw_activo =  1 ;
        this.solicitud.id_compania =  parseInt(localStorage.getItem("COMP"));
        this.run_unidades();

        console.log(resp);
        this.flag = false;
         
      }, (error) => {
        this.flag = false;
        console.log(error);

      });
  }

  async run_unidades() {
    this.flag= true;
     
    await this.rest.CRUD_unidades(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta;
        this.unidades = resp.recordset;
        
        console.log(resp);
        this.flag = false;
         
      }, (error) => {
        this.flag = false;
        console.log(error);

      });
  }
} 
