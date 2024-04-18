import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RestService, parametros,  Permisos, ValidadoresService, UtilidadesService } from '../../../../services/_export';
import { pedidos } from '../../../../mappings/model/modulo_pedidos';
import { proveedores } from '../../../../mappings/model/_export_model';
import { AlertModule } from 'ngx-bootstrap/alert/public_api';
//import { AnyNaptrRecord } from 'dns';
//import { runInThisContext } from 'vm';
declare var swal: any;
declare var jsPDF: any;
@Component({
  selector: 'app-n-pedido',
  templateUrl: './n-pedido.component.html',
  styleUrls: ['./n-pedido.component.scss']
})
export class NPedidoComponent implements OnInit {

  DownloadReport() {
    let doc = new jsPDF();
    doc.text("hello", 50, 50);
    doc.save('table.pdf');
  }

  @ViewChild('DETALLE_Modal', { static: true }) DETALLE_Modal_1;
  flag: boolean = false;
  id_proveedor_arreglo: any = [];
  data_dett: Array<any> = [];
  matrix: Array<any> = [];
  private matriz: number[][] = new Array();
  public fieldArray: Array<any> = [];
  private newAttribute = {
    fila: 1, cantidad: 0, id_parte: 0, id_unidad: 0, id_deficiencia: 0, nombre_deficiencia: '', preciounitario: 0, total: 0, deficiencias: [],
    id_proveedor: 0, nombre_proveedor: '', id_fabricante: 0, nombre_fabricante: '', id_numero_parte: 0, nombre_parte: '', nombre_unidad: '', manejo_de_envio: 0, descuento: 0
  };
  Javitest: any = { preciounitario: 0, id_proveedor: 0, nombre_proveedor: '', id_fabricante: 0, nombre_fabricante: '', id_numero_parte: 0, nombre_parte: '', id_unidad: 0, nombre_unidad: '', manejo_de_envio: '', id_deficiencia: 0, nombre_deficiencia: '' };

  //arreglo que contiene datos del pedido

  // private newAttribute: any = {};

  numLinea: number;
  //detalle modal
  //proveedor_datos_modal: string;
  //fabricante_datos_modal: string;
  //manejo_de_envio_datos_modal: string;
  //numero_de_parte_datos_modal: string;
  //unidad_datos_modal: string;
  //precio_unitario_datos_modal: string;
  //fin detalle modal

  /* Variables de configuración de notificación*/
  
 
  /* Variables para los permisos, eliminar, editar, guardar */
  permisos = new Permisos().access;
  /* Objeto que se envia al webservice  */
  solicitud = new parametros().prm_pedidos;
  solicitud_envio_matriz = new parametros().prm_pedidos;

  /*Variables del la vista */
  Contador_guardar: number = 0;
  estado_de_el_pedido: number = 0;
  respuesta_pedidos: any;
  fabricantes: any;
  partes: any;
  sw_proveedor_datos: any = [];
  det_tarea: any = [];
  titulo: string;
  estatus: string;
  estatus_pedido: any;
  id_pedidos: any;
  nombre_estatus: any;
  proveedor: any;
  catalogo: any;
  tipo_de_deficiencias: any;
  detalle_fillarray: any;
  detalle_tareas: any;
  lista_pedidos_deficiencia: any;
  lista_proveedor_parte: any;
  lista_fabricante_parte: any
  unidades: any;
  autorizadas_y_minimos: any;
  sub_total: number = 0;
  gran_total: number = 0;
  gran_total_de_manejo_de_envio: number = 0;
  impuesto: number = 0;
  manejo_de_envio: number = 0;
  id_proveedor_json = 0;
  sw_estado_json = 0;
  descuento: number = 0;
  cantidad_de_lineas_detalle: number = 0;
  btn_acciones = { btn_guardar: false, btn_limpiar: false }

  constructor( private router: Router, private route: ActivatedRoute, private rest: RestService,
    private _validadores: ValidadoresService, private _utilidades: UtilidadesService) {
  }

  ngOnInit() {
    var hoy = new Date();
    console.log("fecha---->>", hoy.toLocaleDateString().toString());
    this.solicitud.fecha_actualiza = new Date().toUTCString();
    this.solicitud.fecha_crea = new Date().toUTCString();



    this.route.params.subscribe(params => {
      if (params['data'] != null) {
        try {


          this.titulo = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).titulo;
          this.estatus = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).estatus;

          this.btn_acciones = this._validadores.BtnVisibles(this.estatus);

          if (this.estatus == 'crear') {
            this.solicitud.usuario_crea = parseInt(localStorage.getItem("USU"));
            this.nombre_estatus = 'En espera'
            // this.solicitud.accion_tipo = 'C';
            this.estado_de_el_pedido = 1;
            this.addFieldValue();
            this.NumeroPedido();
          } else if (this.estatus == 'modificar') {
            this.solicitud.usuario_actualiza = parseInt(localStorage.getItem("USU"));
            this.run_proveedores();

            this.solicitud = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).datos;
            this.solicitud.token = JSON.parse(decodeURIComponent(escape(window.atob(localStorage._token))));
            this.id_pedidos = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).datos.id_pedido;
            this.nombre_estatus = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).datos.nombre_estatus;
            this.sub_total = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).datos.sub_total;
            this.gran_total = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).datos.gran_total;
            this.id_proveedor_json = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).datos.id_proveedor;
            this.sw_estado_json = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).datos.sw_estado;
            // alert("("+this.nombre_estatus+")") 
            if (this.sw_estado_json == 1) {
              this.btn_acciones.btn_guardar = false;
              this.estado_de_el_pedido = 0;
            }
            else {
              this.estado_de_el_pedido = 1;
            }
            console.log("  wwwwwwwwwwwwwwwwww-----------------<<<" + this.sw_estado_json);
            this.solicitud.fecha_pedido = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).datos.fecha_pedido.toString().split('T')[0];
            console.log(this.solicitud);

          } else if (this.estatus == 'detalle') {
            this.solicitud = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).datos;
            this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
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
    this.solicitud_envio_matriz.token = JSON.parse(decodeURIComponent(escape(window.atob(localStorage._token))));
    this.solicitud.token = JSON.parse(decodeURIComponent(escape(window.atob(localStorage._token))));
    console.log("enviando token------>" + this.solicitud.token);
  }
  addFieldValue() {
    this.newAttribute = {
      fila: 0, cantidad: 0, id_parte: 0, id_deficiencia: 0, nombre_deficiencia: '', preciounitario: 0, total: 0, deficiencias: [],
      id_proveedor: 0, nombre_proveedor: '', id_fabricante: 0, nombre_fabricante: '', id_numero_parte: 0,
      nombre_parte: '', id_unidad: 0, nombre_unidad: '', manejo_de_envio: 0, descuento: 0
    };

    this.fieldArray.push(this.newAttribute);
    this.fieldArray = this._utilidades.recorrer_fila_arreglo(this.fieldArray);
    console.log(this.fieldArray);
  }
  addFieldModal() {
    this.Javitest = {
      preciounitario: 0, id_proveedor: 0, nombre_proveedor: ''
      , id_fabricante: 0, nombre_fabricante: '', id_numero_parte: 0, nombre_parte: ''
      , id_unidad: 0, nombre_unidad: '', manejo_de_envio: 0, id_deficiencia: 0, nombre_deficiencia: ''
    };


  }
  deleteFieldValue_1(index) {
    //console.log(" primero---> ",index)
    this.fieldArray.splice(index, 1);
    // console.log(" segundo---> ",this.fieldArray)
    this.fieldArray = this._utilidades.recorrer_fila_arreglo(this.fieldArray);
    this.actualizar_subtotal(index);
  }
  deleteFieldValue_2(index) {
    //console.log(" primero---> ",index)
    this.fieldArray.splice(index, 1);
    //console.log(" segundo---> ",this.fieldArray)
    this.fieldArray = this._utilidades.recorrer_fila_arreglo(this.fieldArray);
    this.actualizar_subtotal(index - 1);
  }

  async NumeroPedido() {
    this.flag = true;
    this.solicitud.accion_tipo = 'P';
    await this.rest.CRUD_pedidos(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta;
        this.id_pedidos = resp.recordset[0].maxima;


        this.run_proveedores();

        console.log(resp);
        this.flag = false;
      }, (error) => {
        this.flag = false;
        console.log(error);

      });
  }

  async run_proveedores() {
    this.flag = true;
    this.solicitud.accion_tipo = 'R';
    this.solicitud.sw_activo = 1;
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));

    await this.rest.CRUD_proveedores(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta;
        this.proveedor = resp.recordset;
        // this.run_estatus();
        this.run_fabricantes();

        this.flag = false;

      }, (error) => {
        this.flag = false;
        console.log(error);

      });
  }

  async run_estatus1() {
    this.flag = true;
    this.solicitud.accion_tipo = 'R';
    this.solicitud.sw_activo = 1;
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));

    await this.rest.CRUD_estatus(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta;
        this.estatus_pedido = resp.recordset;

        //this.run_proveedor_numeroparte();
        this.run_fabricantes();
        console.log(resp);
        this.flag = false;

      }, (error) => {
        this.flag = false;
        console.log(error);

      });
  }

  async run_fabricante_numeroparte(estado: boolean) {
    //alert(""+this.Javitest.id_fabricante)
    if (this.Javitest.id_fabricante != 0) {

      // alert('this.Javitest.id_fabricante: ' + this.Javitest.id_fabricante)
      this.flag = true;
      this.solicitud.id_fabricante = this.Javitest.id_fabricante
      this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));

      await this.rest.GEN_lista_parte_fabricante(this.solicitud)
        .then((respuesta) => {
          let resp: any = respuesta;
          //asignando el manejo de envio si hay numeros de parte
          this.lista_fabricante_parte = resp.recordset;
          console.log("lista fabricante parte ", this.lista_fabricante_parte);
          if (estado == true) {
            this.DETALLE_Modal_1.show();
          }
          if (resp.recordset.length != 0) {
            //this.manejo_de_envio = resp.recordset[0].manejo_de_envio
            // this.solicitud.manejo_envio = this.manejo_de_envio
            this.Javitest.nombre_unidad = resp.recordset[0].nombre_unidad;
            this.run_unidades();

          } else {
            //console.log("No hay numero de parte para este proveedor");
            // this.solicitud.manejo_envio = 0.00;
            swal({
              title: "Verificando numero de parte!",
              text: "Para este fabricante ! \n ¿No existe numero de parte?",
              type: "warning",
              //showCancelButton: true,
              cancelButtonText: "Ok",

            },
              confirmed => {


              });
          }

          this.flag = false;
        }, (error) => {
          this.flag = false;
          console.log(error);

        });

    }
  }

  async run_proveedor_numeroparte() {
    if (this.Javitest.id_proveedor != 0) {

      this.flag = true;

      this.solicitud.id_proveedor = this.Javitest.id_proveedor
      this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));

      //this.run_numero_de_tareas();
      await this.rest.GEN_lista_proveedor_parte(this.solicitud)
        .then((respuesta) => {
          let resp: any = respuesta;
          //asignando el manejo de envio si hay numeros de parte
          this.lista_proveedor_parte = resp.recordset;
          console.log("lista proveedor parte ", this.lista_proveedor_parte);
          if (resp.recordset.length != 0) {
            this.manejo_de_envio = resp.recordset[0].manejo_de_envio
            this.Javitest.manejo_de_envio = this.manejo_de_envio
            // this.solicitud.manejo_envio = this.manejo_de_envio
            // this.run_unidades();

          } else {
            //console.log("No hay numero de parte para este proveedor");
            this.solicitud.manejo_envio = 0.00;

          }

          this.flag = false;
        }, (error) => {
          this.flag = false;
          console.log(error);

        });

    }
  }
  // ejecuta_parte(field: any, index: number) {
  ejecuta_parte() {

    for (const i in this.lista_fabricante_parte) {
      if (this.lista_fabricante_parte[i].id_parte == this.Javitest.id_parte) {
        this.solicitud.id_parte = this.lista_fabricante_parte[i].id_parte;
        //alert(" ejecutar parte")
        this.Javitest.id_numero_parte = this.lista_fabricante_parte[i].id_parte;
        this.Javitest.id_unidad = this.lista_fabricante_parte[i].id_unidad;
        this.Javitest.nombre_unidad = this.lista_fabricante_parte[i].nombre_unidad;
        //alert(""+this.Javitest.nombre_unidad +"   "+this.lista_fabricante_parte[i].nombre_unidad);
        //this.fieldArray[this.numLinea].preciounitario = this.lista_proveedor_parte[i].precio_unitario_base;
        this.Javitest.preciounitario = this.lista_fabricante_parte[i].preciounitario
        //this.fieldArray[this.numLinea].id_unidad = this.lista_proveedor_parte[i].unidad_proveedores;
        this.Javitest.nombre_parte = this.lista_fabricante_parte[i].nombre_parte;
        // alert("  "+this.Javitest.nombre_parte)
        //console.log("unidades selecionadas ------>>>>  ", this.Javitest.nombre_unidad);
      }


    }
    // for (const i in this.lista_proveedor_parte) {
    //   if (this.lista_proveedor_parte[i].id_parte == field.id_parte) {
    //     this.fieldArray[index].preciounitario = this.lista_proveedor_parte[i].precio_unitario_base;
    //     this.fieldArray[index].id_unidad = this.lista_proveedor_parte[i].unidad_proveedores;
    //     this.Javitest.nombre_unidad = this.lista_proveedor_parte[i].nombre_unidad;

    //     this.Javitest.nombre_parte = this.lista_proveedor_parte[i].nombre_parte;
    //     console.log("unidades selecionadas ------>>>>  ", this.Javitest.nombre_unidad);
    //   }


    // }

    //this.actualizar_subtotal(this.numLinea);


    //###########################################################################################################################
    //this.run_numero_de_tareas(index);
    // this.solicitud.id_parte = this.fieldArray[this.numLinea].id_parte;
    this.solicitud.accion_tipo = 'R1';
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
    this.tareas(this.numLinea);

  }
  Guardar_datos_modal() {
    this.fieldArray[this.numLinea].nombre_proveedor = this.Javitest.nombre_proveedor
    this.fieldArray[this.numLinea].nombre_fabricante = this.Javitest.nombre_fabricante
    this.fieldArray[this.numLinea].manejo_de_envio = this.Javitest.manejo_de_envio
    this.fieldArray[this.numLinea].nombre_parte = this.Javitest.nombre_parte
    //this.fieldArray[this.numLinea].id_nombre_parte = this.Javitest.id_nombre_parte
    // alert(" "+this.fieldArray[this.numLinea].nombre_parte+" "+ this.Javitest.nombre_parte);
    this.fieldArray[this.numLinea].nombre_unidad = this.Javitest.nombre_unidad
    this.fieldArray[this.numLinea].preciounitario = this.Javitest.preciounitario
    // console.log("datos---->>  "+this.Javitest)
    this.fieldArray[this.numLinea].nombre_deficiencia = this.Javitest.nombre_deficiencia

    this.DETALLE_Modal_1.hide();
  }

  //actualiza cuando se cambia cantidad
  Recorrido_manejo_de_envio() {

    //alert("manejo de envio")

    const test = this.fieldArray.map(function (x) {
      return x.id_proveedor;
    });

    const result = test.filter(proveedor => proveedor == this.fieldArray[this.numLinea].id_proveedor);

    if (result.length == 1) {

      console.log("this.fieldArray[this.numLinea].manejo_de_envio : " + this.fieldArray[this.numLinea].manejo_de_envio);
      console.log("this.sub_total antes : " + this.sub_total);

      this.sub_total = this.sub_total + this.fieldArray[this.numLinea].manejo_de_envio;

      console.log(" this.sub_total despues : " + this.sub_total);

    } else {

      console.log("Proveedor ya existe...");

    }

  }
  //*******************************************************************************************************************************+*** */

  actualizar_subtotal(index: number) {

    this.fieldArray[index].total = ((this.fieldArray[index].cantidad * this.fieldArray[index].preciounitario) - this.fieldArray[index].descuento);

    this.sub_total = this._utilidades.sumar_total_arreglo(this.fieldArray);

    this.gran_total_de_manejo_de_envio = this._utilidades.sumar_total_final_arreglo(this.fieldArray);
    //alert(""+ this.gran_total_de_manejo_de_envio);
    console.log("--------->>>>>>>>----------->>>>>>>>>>>>xxxxxxxxx ", this.Javitest);
    this.actualizar_otros_detalles();





  }

  //actualiza los datos del gran total cuando se modifica manejo de envios otros descuentos impuesto
  actualizar_otros_detalles() {
    this.gran_total_de_manejo_de_envio = this._utilidades.sumar_total_final_arreglo(this.fieldArray);
    // calculos anteriores
    //this.impuesto = ((this.sub_total) - this.solicitud.descuento) * (this.solicitud.itbms / 100);
    //this.gran_total = (((this.sub_total) - this.solicitud.descuento) + this.impuesto);
    // fin calculos anteriores
    this.impuesto = ((this.sub_total)) * (this.solicitud.itbms / 100);
    this.gran_total = (((this.sub_total + this.impuesto)) + this.gran_total_de_manejo_de_envio);
  }

  // recorrido_actualizar_detalle() {
  //this.sub_total = this._utilidades.sumar_total_arreglo(this.fieldArray);
  //this.actualizar_otros_detalles();
  // }

  async run_numero_de_tareas1(index: number) {
    this.flag = true;
    //alert("tareas "+this.solicitud.id_parte);
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
    //this.run_numero_de_tareas();
    await this.rest.GEN_lista_pedidos_deficiencia(this.solicitud)
      .then((respuesta) => {
        let resp: any = respuesta;
        console.log(resp)
        //alert("tareas "+this.lista_pedidos_deficiencia);
        this.fieldArray[index].deficiencias = [];
        for (const i in resp.recordset) {
          this.fieldArray[index].deficiencias.push(resp.recordset[i]);
        }
        console.log(this.fieldArray);
        // this.lista_pedidos_deficiencia = resp.recordset;

        console.log(resp);
        this.flag = false;

      }, (error) => {
        this.flag = false;
        console.log(error);

      });
  }

  async run_unidades() {
    this.flag = true;
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
    this.solicitud.accion_tipo = 'R';
    this.solicitud.sw_activo = 1;

    await this.rest.CRUD_unidades(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta;
        this.unidades = resp.recordset;
        this.arreglo_sw_proveedor(this.unidades);

        console.log(" UNIDADES------>>>>>>> ", resp);
        //###################################################################################
        //  this.datos_detalle();//AQUI LLAMO AL DETALLE DE EL PEDIDO
        //##################################################################
        this.run_proveedor_numeroparte();

        this.flag = false;

      }, (error) => {
        this.flag = false;
        console.log(error);

      });
  }

  arreglo_sw_proveedor(datos: any) {
    console.log('arreglo')
    this.sw_proveedor_datos = new Array;
    for (const i in datos) {
      console.log('for')
      if (datos[i].sw_proveedor == 1) {

        this.sw_proveedor_datos.push(datos[i]);

      }
    }
  }

  async datos_pedido() {

    this.solicitud.usuario_actualiza = parseInt(localStorage.getItem("USU"));
    this.solicitud.usuario_crea = parseInt(localStorage.getItem("USU"));
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));

    if (this.estatus == 'crear') {

      this.solicitud.accion_tipo = 'C'

      this.solicitud.id_pedido = this.id_pedidos;
      this.solicitud.id_proveedor = this.solicitud.id_proveedor;
      this.solicitud.id_estatus = this.solicitud.id_estatus;
      this.solicitud.nombre_estatus = this.nombre_estatus;
      this.solicitud.fecha_pedido = this.solicitud.fecha_pedido;
      this.solicitud.sub_total = this.sub_total;
      this.solicitud.manejo_envio = this.solicitud.manejo_envio;
      this.solicitud.descuento = this.solicitud.descuento;
      this.solicitud.itbms = this.solicitud.itbms;
      this.solicitud.gran_total = this.gran_total;
    }
    if (this.estatus == 'modificar') {

      this.solicitud.accion_tipo = 'U'

      this.solicitud.id_pedido = this.id_pedidos;
      this.solicitud.id_proveedor = this.solicitud.id_proveedor;
      this.solicitud.id_estatus = this.solicitud.id_estatus;
      this.solicitud.nombre_estatus = this.nombre_estatus;
      this.solicitud.fecha_pedido = this.solicitud.fecha_pedido;
      this.solicitud.sub_total = this.sub_total;
      this.solicitud.manejo_envio = this.solicitud.manejo_envio;
      this.solicitud.descuento = this.solicitud.descuento;
      this.solicitud.itbms = this.solicitud.itbms;
      this.solicitud.gran_total = this.gran_total;

    }

    await this.rest.CRUD_pedidos(this.solicitud)
      .then((respuesta) => {
        let resp: any = respuesta;

        console.log(respuesta);
        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).
        if (resp_validada.estado) {
          if (this.solicitud.accion_tipo == 'C') {
            this.datos_detalle_pedido();

          } else if (this.solicitud.accion_tipo == 'U') {
            this.datos_detalle_pedido();
          }
          // this.router.navigate(['./silc/menus']);
        } else {
          swal('Ocurrio un Error', resp_validada.msg, 'error');
        }

        this.flag = false;

      }, (error) => {
        this.flag = false;
            swal('Ocurrio un Error', 'Respuesta de error de HTTP ("' + error.name + '").', 'error');
        console.log(error);

      });

    //fin pedidos

  }

  async datos_detalle_pedido() {
    this.solicitud.usuario_actualiza = parseInt(localStorage.getItem("USU"));
    this.solicitud.usuario_crea = parseInt(localStorage.getItem("USU"));
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
    var hoy = new Date();
    this.matriz = new Array();

    this.solicitud.id_pedido = this.id_pedidos;
    this.solicitud.id_proveedor = this.solicitud.id_proveedor;

    this.solicitud.sw_activo = 1;
    this.solicitud.accion_tipo = 'C'
    this.flag = true;
    for (const j in this.fieldArray) {
      //console.log(" recorrido....  ", this.fieldArray[j].id_unidad);
      this.matriz.push(
        [this.solicitud.id_compania
          , this.solicitud.id_pedido
          , this.fieldArray[j].fila
          , this.fieldArray[j].cantidad
          , parseInt(this.fieldArray[j].id_proveedor, 10)
          , this.fieldArray[j].nombre_proveedor
          , parseInt(this.fieldArray[j].id_fabricante, 10)
          , this.fieldArray[j].nombre_fabricante
          , this.fieldArray[j].manejo_de_envio
          , parseInt(this.fieldArray[j].id_parte, 10)
          , this.fieldArray[j].nombre_parte
          , this.fieldArray[j].id_unidad
          , this.fieldArray[j].nombre_unidad
          , parseInt(this.fieldArray[j].id_deficiencia, 10)
          , this.fieldArray[j].nombre_deficiencia
          , this.fieldArray[j].preciounitario
          , Math.round(this.fieldArray[j].total * 100) / 100
          , this.fieldArray[j].descuento
          , this.solicitud.usuario_crea
          , null//hoy.toLocaleDateString().toString()//this.solicitud.fecha_crea//hoy.toISOString().toString()
          , this.solicitud.usuario_actualiza
          , null//hoy.toLocaleDateString().toString()//this.solicitud.fecha_actualiza//hoy.toISOString().toString()
          , this.solicitud.sw_activo
        ]);
      console.log("matrix----> ", this.solicitud_envio_matriz);

      this.solicitud_envio_matriz.matriz = this.matriz;
    }


    await this.rest.GEN_detalles_pedido(this.solicitud_envio_matriz)
      .then((respuesta) => {
        let resp: any = respuesta;
        console.log(" respuesta .... ", respuesta);
        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).
        if (resp_validada.estado) {
          if (this.solicitud.accion_tipo == 'C') {
            swal({
              title: "Proceso exitoso!",
              text: "Se registraron los datos correctamente! \n ¿Desea crear otro registro?",
              type: "success",
              showCancelButton: true,
              confirmButtonText: "No",
              cancelButtonText: "Si"
            },
              confirmed => {
                if (confirmed) {
                  history.back();
                } else {

                  // this.limpiar(FRM);
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
                  //this.guardar_detalle_pedido();
                  // this.limpiar(FRM);
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
            swal('Ocurrio un Error', 'Respuesta de error de HTTP ("' + error.name + '").', 'error');
        console.log(error);

      });

  }

  async datos_detalle() {

    this.flag = true;
    this.solicitud.accion_tipo = 'R';
    this.solicitud.sw_activo = 1;
    //this.solicitud.id_compania = 1;
    this.solicitud.id_pedido = this.id_pedidos;
    // alert("detalle pedidos "+this.solicitud.id_pedido)
    await this.rest.CRUD_detalle_pedidos(this.solicitud)
      .then((respuesta) => {
        let resp: any = respuesta;
        this.detalle_fillarray = resp.recordset;

        console.log("Detalle fill array.... ", this.detalle_fillarray);
        this.solicitud.accion_tipo = 'R2';
        this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
        this.solicitud.id_pedido = this.id_pedidos;
        this.tareas_editar();



        //console.log("<<<<----->>>>>  ", this.fieldArray);
        this.flag = false;
      }, (error) => {
        this.flag = false;
        console.log(error);
      });

  }

  arreglo_detalle() {
    //  console.log('this.detalle_tareas', this.detalle_tareas);
    for (var i = 0; i < this.detalle_fillarray.length; i++) {
      this.detalle_fillarray[i].deficiencias = [];
      this.solicitud.id_parte = this.detalle_fillarray[i].id_parte
      //this.run_numero_de_tareas(i);
      //#########################################################################################################################

      //console.log(" numero de tareas  ", i);
      this.newAttribute = {
        fila: this.detalle_fillarray[i].linea
        , cantidad: this.detalle_fillarray[i].cantidad
        , id_parte: this.detalle_fillarray[i].id_parte
        , id_unidad: this.detalle_fillarray[i].id_unidad
        , id_deficiencia: this.detalle_fillarray[i].id_tarea
        , nombre_deficiencia: this.detalle_fillarray[i].nombre_tarea
        , preciounitario: this.detalle_fillarray[i].precio_unitario
        , total: this.detalle_fillarray[i].total, deficiencias: []
        , id_proveedor: this.detalle_fillarray[i].id_proveedor
        , nombre_proveedor: this.detalle_fillarray[i].nombre_proveedor
        , id_fabricante: this.detalle_fillarray[i].id_fabricante
        , nombre_fabricante: this.detalle_fillarray[i].nombre_fabricante
        , id_numero_parte: this.detalle_fillarray[i].id_parte
        , nombre_parte: this.detalle_fillarray[i].nombre_parte
        , nombre_unidad: this.detalle_fillarray[i].nombre_unidad
        , manejo_de_envio: this.detalle_fillarray[i].manejo_de_envio
        , descuento: this.detalle_fillarray[i].descuento
      };

      this.fieldArray.push(this.newAttribute);
    }

    //console.log('this.fieldArray', this.fieldArray);
    // console.log('this.detalle_tareas', this.detalle_tareas);

    for (const i in this.fieldArray) {
      for (const j in this.detalle_tareas) {
        if (this.fieldArray[i].id_parte == this.detalle_tareas[j].id_parte) {
          this.fieldArray[i].deficiencias.push(this.detalle_tareas[j]);
        }
      }
    }
  }

  async tipos_de_deficiencia() {

    this.flag = true;
    await this.rest.CRUD_tipo_de_deficiencia(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        this.tipo_de_deficiencias = resp.recordset;
        console.log(resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

        if (resp_validada.estado) {
          // this.menus = resp.recordset;

        } else {

          swal('Ocurrio un Error', resp_validada.msg, 'error');
        }

        this.flag = false;

      }, (error) => {
        this.flag = false;
        swal('Ocurrio un Error', 'Respuesta de error de HTTP ("' + error.name + '").', 'error');
        console.log(error);
      });


    for (const i in this.fieldArray) {
      this.fieldArray[i].deficiencias = this.tipos_de_deficiencia;
    }

  }

  async tareas(index: number) {

    // console.log("Datos tarea   ", this.solicitud.accion_tipo, "      ", this.solicitud.id_compania, "    ", this.solicitud.id_parte);
    await this.rest.GEN_tarea(this.solicitud)
      .then((respuesta) => {
        let resp: any = respuesta;
        this.detalle_tareas = resp.recordset;
        console.log(resp)
        //alert("tareas "+this.lista_pedidos_deficiencia);
        this.fieldArray[index].deficiencias = [];
        for (const i in resp.recordset) {
          this.fieldArray[index].deficiencias.push(resp.recordset[i]);
        }


        console.log(resp);

      }, (error) => {
        this.flag = false;
        console.log(error);
      });

  }

  async tareas_editar() {

    //console.log("Datos tarea   ", this.solicitud.accion_tipo, "      ", this.solicitud.id_compania, "    ", this.solicitud.id_pedido);
    await this.rest.GEN_tarea(this.solicitud)
      .then((respuesta) => {
        let respuesta_detalle_pedidos: any = respuesta;

        this.detalle_tareas = respuesta_detalle_pedidos.recordset;
        // this.det_tarea = respuesta_detalle_pedidos.recordset;
        //console.log("Editar tareas fill...", this.det_tarea);
        // this.lista_pedidos_deficiencia = resp.recordset;

        this.arreglo_detalle();
        this.flag = false;

        this.flag = false;
      }, (error) => {
        this.flag = false;
        console.log(error);
      });
  }

  guardar(FRM) {
    this.solicitud.usuario_actualiza = parseInt(localStorage.getItem("USU"));
    this.solicitud.usuario_crea = parseInt(localStorage.getItem("USU"));
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));

    for (const i in this.fieldArray) {

      if (this.fieldArray[i].cantidad == 0) {

        this.Contador_guardar = this.Contador_guardar + 1;
        //alert("    " + this.fieldArray[i].cantidad+"  fila "+this.fieldArray[i].fila)
        swal({
          title: "Error!",
          text: "Debe asignar una cantidad mayor que cero. ",
          type: "warning",
          cancelButtonText: "Ok"
        },
          function (isConfirm) {
            if (isConfirm) {
              // history.back();

            }
            else {

            }

          });
      }
    }
    if (this.Contador_guardar == 0) {
      if (this.estatus == 'crear') {
        this.solicitud.usuario_crea = parseInt(localStorage.getItem("USU"));
        this.solicitud.accion_tipo = 'C'
        this.datos_pedido();
      }
      if (this.estatus == 'modificar') {
        this.solicitud.usuario_actualiza = parseInt(localStorage.getItem("USU"));
        this.solicitud.accion_tipo = 'U'
        this.datos_eliminar_pedidos_detalle_pedidos();
      }
    }

  }

  async datos_eliminar_pedidos_detalle_pedidos() {

    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
    this.solicitud.id_pedido = this.id_pedidos;

    await this.rest.GEN_eliminar_pedido(this.solicitud)
      .then((respuesta) => {
        let resp: any = respuesta;
        this.datos_pedido();

      }, (error) => {
        this.flag = false;
        console.log(error);
      });

  }
  cancelar() {
    history.back();
  }
  cancelar_modal() {
    //this.fieldArray[this.numLinea].nombre_proveedor = ""
    //this.fieldArray[this.numLinea].nombre_fabricante = ""
    //this.fieldArray[this.numLinea].manejo_de_envio = 0.00
    //this.fieldArray[this.numLinea].nombre_parte = ""
    //this.fieldArray[this.numLinea].nombre_unidad = ""
    //this.fieldArray[this.numLinea].preciounitario = 0.00
    //this.fieldArray[this.numLinea].nombre_deficiencia = ""
  }
  crear_detalle(index: number) {

    this.numLinea = index;
    this.Javitest = this.fieldArray[index];

    console.log(" proveedor " + this.Javitest.id_proveedor);
    console.log(" fabricante " + this.Javitest.id_fabricante);
    console.log(" numero parte " + this.Javitest.id_numero_parte);
    console.log(" fill  " + this.Javitest);
    if (this.Javitest.id_fabricante > 0) {

      this.run_fabricante_numeroparte(true)
    }
    else {
      this.DETALLE_Modal_1.show();
    }


  }
  seleccionar_proveedor() {
    // alert('this.Javitest.id_proveedor: ' + this.Javitest.id_proveedor)
    for (const i in this.proveedor) {
      //console.log('this.proveedor[i].id_proveedor' + this.proveedor[i].id_proveedor)
      //console.log('this.Javitest.id_proveedor' + this.Javitest.id_proveedor)
      if (this.proveedor[i].id_proveedor == this.Javitest.id_proveedor) {

        this.Javitest.nombre_proveedor = this.proveedor[i].nombre;
        //console.log('this.proveedor[i].nombre_proveedor' + this.proveedor[i].nombre)
        //console.log('this.Javitest.nombre_proveedor' + this.Javitest.nombre_proveedor)
        //this.run_fabricante_numeroparte() ;
      }
    }

  }

  seleccionar_fabricante() {

    for (const i in this.fabricantes) {
      //console.log('this.proveedor[i].id_proveedor' + this.proveedor[i].id_proveedor)
      //console.log('this.Javitest.id_proveedor' + this.Javitest.id_proveedor)
      if (this.fabricantes[i].id_fabricante == this.Javitest.id_fabricante) {

        this.Javitest.nombre_fabricante = this.fabricantes[i].nombre;
        this.Javitest.id_fabricante = this.fabricantes[i].id_fabricante;
        this.run_fabricante_numeroparte(false);
        //  alert(" this.Javitest.id_fabricante   "+this.Javitest.id_fabricante)
        //console.log('this.proveedor[i].nombre_proveedor' + this.proveedor[i].nombre)
        //console.log('this.Javitest.nombre_proveedor' + this.Javitest.nombre_proveedor)
      }
    }

  }

  seleccionar_deficiencia() {
    //console.log( " DEFICIENCIASSS    ", this.detalle_tareas)
    for (const i in this.detalle_tareas) {

      if (this.detalle_tareas[i].id_deficiencia == this.Javitest.id_deficiencia) {

        this.Javitest.nombre_deficiencia = this.detalle_tareas[i].nombre;

      }
    }

  }

  async validar_autorizadas_minimas(index: number) {
    if (this.fieldArray[index].cantidad < 0) {
      swal({
        title: "Verificando autorizadas y minimas",
        text: "las cantidad no puede ser menor que 1 ",
        type: "warning",
        // showCancelButton: true,
        cancelButtonText: "Ok",

      },
        confirmed => {
          this.fieldArray[index].cantidad = 0

        });

    }
    else if (this.fieldArray[index].cantidad > 0 && this.fieldArray[index].total == 0.00) {
      swal({
        title: "Verificando autorizadas y minimas",
        text: "las cantidad no puede cambiar debe selecionar datos del detalle  \n",
        type: "warning",
        // showCancelButton: true,
        cancelButtonText: "Ok",

      },
        confirmed => {
          this.fieldArray[index].cantidad = 0
          this.actualizar_subtotal(index);
        });
    }
    else {
      this.solicitud.id_proveedor = this.fieldArray[index].id_proveedor;
      this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
      this.solicitud.id_parte = this.fieldArray[index].id_parte;

      await this.rest.GEN_validador_de_cantidad_autorizadas_y_minimos(this.solicitud)
        .then((respuesta) => {

          let resp: any = respuesta;
          this.autorizadas_y_minimos = resp.recordset;
          // alert("autorizadas -----<<" + this.autorizadas_y_minimos.length);
          if (this.autorizadas_y_minimos.length > 0) {
            //evaluando  autorizadas
            if (this.fieldArray[index].cantidad >= this.autorizadas_y_minimos[0].cant_autorizada) {
              swal({
                title: "Verificando autorizadas",
                text: "las cantidad no puede ser mayor que las autorizadas  \n" + "Autorizadas : " + this.autorizadas_y_minimos[0].cant_autorizada,
                type: "warning",
                // showCancelButton: true,
                cancelButtonText: "Ok",

              },
                confirmed => {
                  this.fieldArray[index].cantidad = this.autorizadas_y_minimos[0].cant_autorizada
                  this.actualizar_subtotal(index);
                });

            }
            //evaluando los minimos
            if (this.fieldArray[index].cantidad <= this.autorizadas_y_minimos[0].min_permitida) {

              swal({
                title: "Verificando minimas",
                text: "las cantidad no puede ser menor que las minimas  \n" + "Minimas : " + this.autorizadas_y_minimos[0].min_permitida,
                type: "warning",
                // showCancelButton: true,
                cancelButtonText: "Ok",

              },
                confirmed => {
                  this.fieldArray[index].cantidad = this.autorizadas_y_minimos[0].min_permitida
                  this.actualizar_subtotal(index);
                });

            }
          }
        }, (error) => {
          this.flag = false;
          console.log(error);

        });

    }
  }

  limpiar(FRM) {

    this.solicitud.id_proveedor = 0;
    this.solicitud.fecha_pedido = '';
    this.solicitud.id_estatus = 0;
    this.fieldArray = new Array;
    this.addFieldValue();
    this.sub_total = 0;
    this.solicitud.manejo_envio = 0;
    this.solicitud.descuento = 0;
    this.solicitud.itbms = 0;
    this.solicitud.gran_total = 0;
    FRM.reset();

  }

  async run_fabricantes() {
    this.flag = true;
    console.log(this.solicitud)
    // this.solicitud.id_=1;
    await this.rest.GEN_fabricantes(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta;
        this.fabricantes = resp.recordset;

        // this.run();
        this.datos_detalle();
        console.log(resp);
        this.flag = false;
      }, (error) => {
        this.flag = false;
        console.log(error);

      });
  }




  enviar_pedido() {
    var i: number = 0
    for (const id_recorrido in this.fieldArray) {
      //buscamos los id proveedor repetidos
      const result = this.id_proveedor_arreglo.filter(proveedor => proveedor == this.fieldArray[id_recorrido].id_proveedor);
      //console.log(" result2 : " + result.length);
      if (result.length == 0) {
        //id repetidos los metemos en un arreglo
        this.id_proveedor_arreglo[i] = this.fieldArray[id_recorrido].id_proveedor;
        i = i + 1;
      }
    }
    //luego recorremos el arreglo ya almacenado dentro del fillarray
    for (const a in this.id_proveedor_arreglo) {
      //insertamos los datos por id_proveedor en el arreglo 
      for (const j in this.fieldArray) {
        if (this.fieldArray[j].id_proveedor == this.id_proveedor_arreglo[a]) {
          this.data_dett.push(
            [this.solicitud.id_pedido
              , this.fieldArray[j].fila
              , this.fieldArray[j].id_numero_parte
              , this.fieldArray[j].id_proveedor
              , this.fieldArray[j].nombre_proveedor
              , this.fieldArray[j].nombre_fabricante
              , this.fieldArray[j].manejo_de_envio
              , this.fieldArray[j].nombre_parte
              , this.fieldArray[j].nombre_unidad
              , this.fieldArray[j].nombre_deficiencia
              , this.fieldArray[j].preciounitario
              , Math.round(this.fieldArray[j].total * 100) / 100
            ]);
        }

      }
      console.log("a    ", a);
      console.log("data_dett", this.data_dett);

      this.data_dett = new Array;
    }


    console.log("result", this.id_proveedor_arreglo);
    this.id_proveedor_arreglo.length = 0;

  }
}
