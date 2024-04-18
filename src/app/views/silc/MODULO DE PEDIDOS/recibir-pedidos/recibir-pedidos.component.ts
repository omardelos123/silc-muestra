import { Component, OnInit, ɵConsole, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RestService, parametros,  Permisos, ValidadoresService, UtilidadesService } from '../../../../services/_export';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Alert } from 'selenium-webdriver';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';
import { ModalsComponent } from '../../../notifications/modals.component';

declare var swal: any;
@Component({
  selector: 'app-recibir-pedidos',
  templateUrl: './recibir-pedidos.component.html',
  styleUrls: ['./recibir-pedidos.component.scss']


})
export class RecibirPedidosComponent implements OnInit {
  @ViewChild('RECIBIR_Modal', { static: true }) RECIBIR_Modal_1;
  flag: boolean = false;
  /* Variables de configuración de notificación*/
  
 
  /* Variables para los permisos, eliminar, editar, guardar */
  permisos = new Permisos().access;
  /* Objeto que se envia al webservice  */
  solicitud = new parametros().prm_pedidos;
  solicitud_envio_matriz = new parametros().prm_pedidos;

  solicitud_historico = new parametros().prm_historico_pedidos;

  public fieldArray: Array<any> = [];
  // private fieldArray_modal: Array<any> = [];

  controlDescripcion: boolean = false;

  private newAttribute = {
    linea: 0, id_parte: 0, cantidad: 0, faltante: 0, estatus: '', precio_unitario: 0, id_fabricante: 0
  };

  private newAttribute_modal = {
    linea: 0, numero_de_serie: "", descripcion: "", estado: "", bl_controlDescripcion: true
  };
  contador_suma_pedidos: number = 0;
  estado_de_el_pedido: any;
  precio_unitario_modal_global: number = 0;
  Numero_de_parte_existente: number = 0;
  eliminar_recibir_pedido: any;
  faltante_actualizar: number = 0;
  faltante_conteo: number = 0;
  cantidad_de_numero_serie_activo: number = 0;
  numero_de_pedido_modal: any;
  numero_de_linea_modal: any;
  cantidad_requeridas_modal: any;
  numero_de_parte_modal: any;
  matriz: Array<any> = [];
  titulo: string;
  estatus: string;
  id_pedidos: any;
  proveedor: any;
  estatus_pedido: any;
  descripcion_modal: any;
  detalle_datos_recibir_pedidos: any[] = [];
  detalle_fillarray: any;
  detalle_fillarray_modal: any;
  listas_partes: any;
  actualizar_detalle_pedidos: any;
  actualizar_detalle_pedidos_inventario: any;
  detalle_historico_pedidos: any;
  id_proveedor_json = 0;
  btn_acciones = { btn_guardar: false, btn_limpiar: false }
  nombre_modal: string = '';
  proveedor_modal: string = '';
  cantida_requerida_modal: any;
  faltante_requerida_modal: any;
  estado_requerida_modal: any;
  RECIBIR_Modal: any;
  precio_unitario_modal: 0;
  estatus_modal: string = '';
  estatus_bool_readonly: boolean;
  entrada_historico: any;
  nombre_estatus: any;
  constructor( private router: Router, private route: ActivatedRoute, private rest: RestService,
    private _validadores: ValidadoresService, private _utilidades: UtilidadesService) {
  }
  ngOnInit() {

    this.route.params.subscribe(params => {
      if (params['data'] != null) {
        try {
          this.titulo = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).titulo;
          this.estatus = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).estatus;

          this.btn_acciones = this._validadores.BtnVisibles(this.estatus);

          if (this.estatus == 'recibir') {
            this.run_proveedores();
            this.solicitud = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).datos;
            this.id_pedidos = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).datos.id_pedido;
            this.id_proveedor_json = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).datos.id_proveedor;
            this.nombre_estatus = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).datos.nombre_estatus;
            // this.solicitud.id_fabricante= JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).datos.id_fabricante;
            //  console.log(" RECIwwwww   "+JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).datos.id_fabricante);

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
        this.run_estatus();


        this.flag = false;

      }, (error) => {
        this.flag = false;
        console.log(error);

      });
  }

  async run_estatus() {
    this.flag = true;
    this.solicitud.accion_tipo = 'R';
    this.solicitud.sw_activo = 1;
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
    await this.rest.CRUD_estatus(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta;
        this.estatus_pedido = resp.recordset;
        this.run_partes();


        console.log(resp);
        this.flag = false;

      }, (error) => {
        this.flag = false;
        console.log(error);

      });
  }






  async run_fabricante_numeroparte() {
    console.log("########## ", this.solicitud.id_fabricante);

    if (this.solicitud.id_fabricante != 0) {

      this.flag = true;
      if (this.estatus == 'crear') {
        this.solicitud.usuario_crea = parseInt(localStorage.getItem("USU"));
        //dependiendo el tipo  de accion aignamos el proveedor
        this.solicitud.id_fabricante = this.solicitud.id_fabricante
        this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
      }
      if (this.estatus == 'modificar') {
        this.solicitud.usuario_actualiza = parseInt(localStorage.getItem("USU"));
        //dependiendo el tipo  de accion aignamos el proveedor
        this.solicitud.id_fabricante = this.solicitud.id_fabricante
        this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));

      }


      //this.run_numero_de_tareas();
      await this.rest.GEN_lista_parte_fabricante(this.solicitud)
        .then((respuesta) => {
          let resp: any = respuesta;
          //asignando el manejo de envio si hay numeros de parte
          //  this.lista_proveedor_parte = resp.recordset;
          // console.log("lista proveedor parte ", JSON.stringify(this.lista_proveedor_parte));


          this.flag = false;
        }, (error) => {
          this.flag = false;
          console.log(error);

        });

    }
  }

  async datos_detalle() {
    this.flag = true;
    this.fieldArray = new Array;
    this.solicitud.accion_tipo = 'R';
    this.solicitud.sw_activo = 1;
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
    this.solicitud.id_pedido = this.id_pedidos;

    await this.rest.CRUD_detalle_pedidos(this.solicitud)
      .then((respuesta) => {
        let resp: any = respuesta;
        this.detalle_fillarray = resp.recordset;

        //console.log("Detalle fill array.... ", this.detalle_fillarray);
        for (var i = 0; i < this.detalle_fillarray.length; i++) {

          this.newAttribute = {
            linea: this.detalle_fillarray[i].linea
            , id_parte: this.detalle_fillarray[i].id_parte
            , cantidad: this.detalle_fillarray[i].cantidad
            , faltante: this.detalle_fillarray[i].faltante
            , estatus: this.detalle_fillarray[i].estatus
            , precio_unitario: this.detalle_fillarray[i].precio_unitario
            , id_fabricante: this.detalle_fillarray[i].id_fabricante

          };
          this.fieldArray.push(this.newAttribute);
        }
        console.log("<<<<----->>>>>  ", this.fieldArray);



        //this.solicitud.id_compania=1;
        //this.solicitud.id_fabricante=
        //this.run_fabricante_numeroparte();

        this.flag = false;
      }, (error) => {
        this.flag = false;
        console.log(error);
      });

  }


  async run_partes() {
    //this.run_numero_de_tareas();
    await this.rest.GEN_partes(this.solicitud)
      .then((respuesta) => {
        let resp: any = respuesta;
        //asignando el manejo de envio si hay numeros de parte
        this.listas_partes = resp.recordset;
        console.log("lista parte ", JSON.stringify(this.listas_partes));

        this.datos_detalle();
        this.flag = false;
      }, (error) => {
        this.flag = false;
        console.log(error);

      });

  }

  async recibir_datos_modal_base_datos(id_parte_data: any, linea_data: any) {

    this.flag = true;
    this.solicitud.accion_tipo = 'R';
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
    this.solicitud.id_pedido = this.id_pedidos;
    this.solicitud.id_parte = id_parte_data;
    this.solicitud.linea_detalle_pedido = linea_data;
    this.solicitud.cantidad = this.cantidad_requeridas_modal;
    //console.log(" numero de parte ----->>>> ", this.solicitud.linea)
    //console.log("   ", this.solicitud.id_compania, "   ", this.solicitud.id_pedido, "   ", this.solicitud.id_parte, "   ", this.solicitud.linea, "     cant ", this.solicitud.cantidad);
    await this.rest.CRUD_recibir_pedidos(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta;
        this.detalle_datos_recibir_pedidos = resp.recordset;
        console.log("base de datos ", this.detalle_datos_recibir_pedidos);
        if (this.detalle_datos_recibir_pedidos.length == 0) {
          //alert("aqui forrrrrr");
          // this.btn_acciones.btn_guardar = true;
          for (var i = 0; i < this.cantidad_requeridas_modal; i++) {
            this.newAttribute_modal = {
              linea: i + 1
              , numero_de_serie: ""
              , descripcion: ""
              , estado: "N"
              , bl_controlDescripcion: true
            };
            console.log("Detalle fill array.... ", this.newAttribute_modal);
            this.detalle_datos_recibir_pedidos.push(this.newAttribute_modal);
            console.log("detalle_datos_recibir_pedidos", this.detalle_datos_recibir_pedidos[i]);
          }

        }
        else {
          // alert("aqui");
          //this.btn_acciones.btn_guardar = false;
          for (var i = 0; i < this.cantidad_requeridas_modal; i++) {
            if (this.detalle_datos_recibir_pedidos[i].estado == 'N') {
              this.detalle_datos_recibir_pedidos[i].bl_controlDescripcion = true;
            }
            else {
              this.detalle_datos_recibir_pedidos[i].bl_controlDescripcion = false;
            }
          }
        }



        this.flag = false;
      }, (error) => {
        this.flag = false;
        console.log(error);
      });
  }

  recibir_datos_modal(datos: any) {

    //this.detalle_datos_recibir_pedidos = new Array;


    this.cantidad_requeridas_modal = this.detalle_fillarray[datos].cantidad;
    this.numero_de_parte_modal = this.detalle_fillarray[datos].id_parte;
    this.numero_de_pedido_modal = this.detalle_fillarray[datos].id_pedido;
    this.numero_de_linea_modal = this.detalle_fillarray[datos].linea;
    this.faltante_requerida_modal = this.detalle_fillarray[datos].faltante;
    this.estado_requerida_modal = this.detalle_fillarray[datos].estado;
    this.precio_unitario_modal = this.detalle_fillarray[datos].precio_unitario;
    this.estatus_modal = this.detalle_fillarray[datos].estatus;
    console.log("nombre de la modal....", "  ", this.cantidad_requeridas_modal, "   ", this.faltante_requerida_modal, "   ", this.estado_requerida_modal);

    console.log("---->>>>linea modal", this.numero_de_linea_modal);

    if (this.estatus_modal == 'Parcial' || this.estatus_modal == 'No asignadas') {
      this.estatus_bool_readonly = false;
    }
    else {
      this.estatus_bool_readonly = true;
    }


    this.recibir_datos_modal_base_datos(this.numero_de_parte_modal, this.numero_de_linea_modal);
    //this.detalle_fillarray_modal = this.cantidad_requeridas_modal;



  }

  async eliminar_datos_recibir_pedidos_base_datos() {

    this.solicitud.id_pedido = this.numero_de_pedido_modal;
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
    this.solicitud.id_parte = this.numero_de_parte_modal;
    this.solicitud.linea_detalle_pedido = this.numero_de_linea_modal

    await this.rest.GEN_eliminar_recibir_pedido(this.solicitud)
      .then((respuesta) => {
        let resp: any = respuesta;
        this.eliminar_recibir_pedido = resp.recordset;
        console.log("eliminar----->>>>>> ", this.eliminar_recibir_pedido);
        this.guardar_recibir_pedidos_modal();

      }, (error) => {

        console.log(error);

      });
  }

  cancelar() {
    history.back();
  }

  guardar_recibir_pedidos_modal() {

    swal({
      title: "Esta seguro que desea recibir el pedido ? ",
      type: "warning",


      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Si",
      cancelButtonText: "No",
      closeOnConfirm: false
    },
      confirmed => {
        if (confirmed) {


          this.matriz = new Array();
          this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
          this.solicitud.id_pedido = this.numero_de_pedido_modal;
          this.solicitud.id_proveedor = this.solicitud.id_proveedor;
          this.solicitud.sw_activo = 1;
          this.solicitud.accion_tipo = 'C'
          this.flag = true;
          this.cantidad_de_numero_serie_activo = 0;
          for (const j in this.detalle_datos_recibir_pedidos) {
            if (this.detalle_datos_recibir_pedidos[j].numero_de_serie != '') {
              this.cantidad_de_numero_serie_activo = this.cantidad_de_numero_serie_activo + 1;
              this.matriz.push(
                [this.solicitud.id_compania
                  , this.solicitud.id_pedido
                  , this.solicitud.id_parte
                  , this.detalle_datos_recibir_pedidos[j].linea
                  , this.solicitud.linea_detalle_pedido
                  , this.cantidad_requeridas_modal
                  , this.detalle_datos_recibir_pedidos[j].numero_de_serie
                  , this.detalle_datos_recibir_pedidos[j].descripcion
                  , this.detalle_datos_recibir_pedidos[j].estado
                  , this.solicitud.usuario_crea
                  , this.solicitud.fecha_crea
                  , this.solicitud.usuario_actualiza
                  , this.solicitud.fecha_actualiza
                ]);

            } else {
              this.matriz.push(
                [this.solicitud.id_compania
                  , this.solicitud.id_pedido
                  , this.solicitud.id_parte
                  , this.detalle_datos_recibir_pedidos[j].linea
                  , this.solicitud.linea_detalle_pedido
                  , this.cantidad_requeridas_modal
                  , ''
                  , ''
                  , this.detalle_datos_recibir_pedidos[j].estado
                  , this.solicitud.usuario_crea
                  , this.solicitud.fecha_crea
                  , this.solicitud.usuario_actualiza
                  , this.solicitud.fecha_actualiza
                ]);
            }
            //console.log("matrix----> Cantidad ingresadas ", this.cantidad_de_numero_serie_activo);

            this.solicitud_envio_matriz.matriz = this.matriz;
            console.log("matrix----> DATOS ", this.solicitud_envio_matriz);
          }
          //aqui recibimos loa pedidos en recibir pedidos

          this.GEN_recibir_pedidos();

          /*this.rest.GEN_recibir_pedidos(this.solicitud_envio_matriz)
            .then((respuesta) => {
              let resp: any = respuesta;
              //console.log(" respuesta .... ", respuesta);
              let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).
              if (resp_validada.estado) {
                if (this.solicitud.accion_tipo == 'C') {

                  this.solicitud.linea = this.numero_de_linea_modal
                  this.faltante_actualizar = (this.cantidad_requeridas_modal - this.cantidad_de_numero_serie_activo);
                  this.solicitud.faltante = this.faltante_actualizar
                  //console.log("faltante actualizar_detalle_pedidos xxxxxxxx ", this.faltante_actualizar, "    ", this.cantidad_requeridas_modal, "    ", this.cantidad_de_numero_serie_activo);

                  if (this.faltante_actualizar == 0) {
                    this.solicitud.estatus = 'Completo';
                    this.faltante_conteo = this.cantidad_requeridas_modal;

                  }
                  if (this.faltante_actualizar > 0 && this.faltante_actualizar < this.cantidad_requeridas_modal) {
                    this.solicitud.estatus = 'Parcial';
                    this.faltante_conteo = this.cantidad_de_numero_serie_activo;
                  }
                  if (this.faltante_actualizar == this.cantidad_requeridas_modal) {
                    this.solicitud.estatus = 'No asignadas';
                    this.faltante_conteo = 0;
                  }
                  // alert("       ------>>>" + this.faltante_conteo + "     ------>>>>" + this.faltante_actualizar)

                  //aqui actualizamos los datos detalle pedidos
                  this.rest.GEN_actualizar_detalle_pedidos(this.solicitud)
                    .then((respuesta) => {
                      let resp: any = respuesta;
                      this.actualizar_detalle_pedidos = resp.recordset;
                      console.log("actualizar_detalle_pedidos ", this.actualizar_detalle_pedidos);

                      this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
                      this.solicitud.id_proveedor = this.solicitud.id_proveedor;
                      this.solicitud.nombre = this.nombre_modal;
                      this.solicitud.cant_disponible = this.faltante_conteo;
                      this.solicitud.id_pedido = this.numero_de_pedido_modal;;
                      this.solicitud.id_parte = this.numero_de_parte_modal;
                      this.solicitud.fila = this.numero_de_linea_modal;
                      console.log("XXXXXXXXXXX  " + "" + this.solicitud.id_parte + "       " + this.solicitud.cant_disponible + "  ", this.solicitud.id_pedido, "  ", this.solicitud.nombre, " ", this.faltante_conteo + " -------------<<<<----->>>>>>>>>");
                      //aqui actualizamos los datos de pedidos en el inventa""rio
                      this.rest.GEN_Actualizar_pedido_inventario(this.solicitud)
                        .then((respuesta) => {
                          let resp: any = respuesta;
                          this.actualizar_detalle_pedidos_inventario = resp.recordset;
                          console.log("actualizar_detalle_pedidos_inventario ", this.actualizar_detalle_pedidos_inventario);
                          this.solicitud.accion_tipo = 'R';
                          this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
                          this.solicitud.id_pedido = this.numero_de_pedido_modal;;
                          this.solicitud.id_parte = this.numero_de_parte_modal;
                          this.solicitud.fila = this.numero_de_linea_modal;



                          console.log("datos pedidos--->> ", this.solicitud.accion_tipo+"   "+this.solicitud.id_compania+" "+this.solicitud.id_pedido+"  "+this.solicitud.id_parte+"  "+this.solicitud.id_parte);

                          this.rest.GEN_entrada_historico(this.solicitud)
                            .then((respuesta) => {
                              let resp: any = respuesta;
                              this.entrada_historico = resp.recordset;
                              // yyyy
                              console.log("historico entrada r", this.entrada_historico);
                              console.log("historico lengt r", this.entrada_historico.length);
                              //console.log("historico entrada ", this.entrada_historico[0].entrada);
                              // console.log("historico historico disponible ", this.entrada_historico[0].historico_cant_disponible);

                              if (this.entrada_historico.length ==1) {
                                //aqui actualizamos los datos historico pedidos
                                this.solicitud_historico.accion_tipo = 'C';
                                this.solicitud_historico.id_compania = parseInt(localStorage.getItem("COMP"));
                                this.solicitud_historico.id_pedido = this.numero_de_pedido_modal;
                                this.solicitud_historico.id_parte = this.numero_de_parte_modal;
                                this.solicitud_historico.sw_recibida = 1;
                                this.solicitud_historico.entrada = (this.cantidad_de_numero_serie_activo);
                                this.solicitud_historico.precio = this.precio_unitario_modal;
                                this.solicitud_historico.usuario_crea = parseInt(localStorage.getItem("USU"));
                                this.solicitud_historico.usuario_actualiza = parseInt(localStorage.getItem("USU"));
                                this.solicitud_historico.sw_activo = 1;
                                this.solicitud_historico.fila = this.numero_de_linea_modal
                                this.solicitud_historico.historico_cant_disponible = (this.entrada_historico[0].cant_disponible)


                                this.rest.CRUD_historico_pedidos(this.solicitud_historico)
                                  .then((respuesta) => {
                                    let resp: any = respuesta;
                                    this.detalle_historico_pedidos = resp.recordset;
                                    console.log("CRUD_historico_pedidos ", this.detalle_historico_pedidos);

                                    this.RECIBIR_Modal_1.hide()
                                    this.datos_detalle();

                                  }, (error) => {

                                    console.log(error);

                                  });
                              }
                              else {
                                this.solicitud.accion_tipo = 'W';
                                this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
                                this.solicitud.id_pedido = this.numero_de_pedido_modal;;
                                this.solicitud.id_parte = this.numero_de_parte_modal;
                                this.solicitud.fila = this.numero_de_linea_modal;

                                this.rest.GEN_entrada_historico(this.solicitud)
                                  .then((respuesta) => {
                                    let resp: any = respuesta;
                                    this.entrada_historico = resp.recordset;
                                    // yyyy
                                    console.log("historico entrada w", this.entrada_historico);
                                    console.log("historico lengt w", this.entrada_historico.length);
                                    console.log("this.cantidad_de_numero_serie_activo ", this.cantidad_de_numero_serie_activo);

                                    this.contador_suma_pedidos = 0;

                                    for (var i = 0; i < this.entrada_historico.length; i++) {
                                      this.contador_suma_pedidos = this.contador_suma_pedidos + this.entrada_historico[i].suma_total_pedidos
                                      console.log("this.entrada_historico[J].suma_total_pedidos XXXXXXXXX------->>>>>>>>>>>>>>> ", this.contador_suma_pedidos);

                                    }


                                    //aqui actualizamos los datos historico pedidos
                                    this.solicitud_historico.accion_tipo = 'C';
                                    this.solicitud_historico.id_compania = parseInt(localStorage.getItem("COMP"));
                                    this.solicitud_historico.id_pedido = this.numero_de_pedido_modal;
                                    this.solicitud_historico.id_parte = this.numero_de_parte_modal;
                                    this.solicitud_historico.sw_recibida = 1;
                                    this.solicitud_historico.entrada = (this.cantidad_de_numero_serie_activo - this.contador_suma_pedidos);
                                    this.solicitud_historico.precio = this.precio_unitario_modal;
                                    this.solicitud_historico.usuario_crea = parseInt(localStorage.getItem("USU"));
                                    this.solicitud_historico.usuario_actualiza = parseInt(localStorage.getItem("USU"));
                                    this.solicitud_historico.sw_activo = 1;
                                    this.solicitud_historico.fila = this.numero_de_linea_modal
                                    console.log("entrada historico ----->>>   "+this.entrada_historico[0]);
                                    this.solicitud_historico.historico_cant_disponible = ((this.entrada_historico[0].cant_disponible))//+(this.cantidad_de_numero_serie_activo - this.entrada_historico[0].suma_total_pedidos)) )

                                    this.rest.CRUD_historico_pedidos(this.solicitud_historico)
                                      .then((respuesta) => {
                                        let resp: any = respuesta;
                                        this.detalle_historico_pedidos = resp.recordset;
                                        console.log("CRUD_historico_pedidos ", this.detalle_historico_pedidos);

                                        this.RECIBIR_Modal_1.hide()
                                        this.datos_detalle();

                                      }, (error) => {

                                        console.log(error);

                                      });


                                  }, (error) => {

                                    console.log(error);

                                  });


                              }





                            }, (error) => {

                              console.log(error);

                            });
                        }, (error) => {

                          console.log(error);

                        });
                      this.flag = false;
                    }, (error) => {
                      this.flag = false;
                      console.log(error);

                    });
                  swal({

                    title: "Proceso exitoso!",
                    text: "Se Actualizaron los datos correctamente",
                    type: "success",
                    cancelButtonText: "Ok",
                    showCancelButton: false,

                  },
                    function (isConfirm) {
                      if (isConfirm) {


                        //this.router.navigate(['./silc/menus']);
                      } else {
                        //this.guardar_detalle_pedido();
                        // this.limpiar(FRM);
                      }

                    });

                }

              } else {
                swal('Ocurrio un Error', resp_validada.msg, 'error');
              }

              this.flag = false;

            }, (error) => {
              this.flag = false;
            swal('Ocurrio un Error', 'Respuesta de error de HTTP ("' + error.name + '").', 'error');
              console.log(error);

            });*/


        }

        else {
          this.RECIBIR_Modal_1.hide()

        }

      });

  }

  async GEN_recibir_pedidos() {

    await this.rest.GEN_recibir_pedidos(this.solicitud_envio_matriz)
      .then((respuesta) => {
        let resp: any = respuesta;
        //console.log(" respuesta .... ", respuesta);
        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).
        if (resp_validada.estado) {
          if (this.solicitud.accion_tipo == 'C') {

            this.solicitud.linea = this.numero_de_linea_modal
            this.faltante_actualizar = (this.cantidad_requeridas_modal - this.cantidad_de_numero_serie_activo);
            this.solicitud.faltante = this.faltante_actualizar
            //console.log("faltante actualizar_detalle_pedidos xxxxxxxx ", this.faltante_actualizar, "    ", this.cantidad_requeridas_modal, "    ", this.cantidad_de_numero_serie_activo);

            if (this.faltante_actualizar == 0) {
              this.solicitud.estatus = 'Completo';
              this.faltante_conteo = this.cantidad_requeridas_modal;

            }
            if (this.faltante_actualizar > 0 && this.faltante_actualizar < this.cantidad_requeridas_modal) {
              this.solicitud.estatus = 'Parcial';
              this.faltante_conteo = this.cantidad_de_numero_serie_activo;
            }
            if (this.faltante_actualizar == this.cantidad_requeridas_modal) {
              this.solicitud.estatus = 'No asignadas';
              this.faltante_conteo = 0;
            }
            // alert("       ------>>>" + this.faltante_conteo + "     ------>>>>" + this.faltante_actualizar)

            //aqui actualizamos los datos detalle pedidos
            this.GEN_actualizar_detalle_pedidos();

            /*this.rest.GEN_actualizar_detalle_pedidos(this.solicitud)
              .then((respuesta) => {
                let resp: any = respuesta;
                this.actualizar_detalle_pedidos = resp.recordset;
                console.log("actualizar_detalle_pedidos ", this.actualizar_detalle_pedidos);

                this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
                this.solicitud.id_proveedor = this.solicitud.id_proveedor;
                this.solicitud.nombre = this.nombre_modal;
                this.solicitud.cant_disponible = this.faltante_conteo;
                this.solicitud.id_pedido = this.numero_de_pedido_modal;;
                this.solicitud.id_parte = this.numero_de_parte_modal;
                this.solicitud.fila = this.numero_de_linea_modal;
                console.log("XXXXXXXXXXX  " + "" + this.solicitud.id_parte + "       " + this.solicitud.cant_disponible + "  ", this.solicitud.id_pedido, "  ", this.solicitud.nombre, " ", this.faltante_conteo + " -------------<<<<----->>>>>>>>>");
                //aqui actualizamos los datos de pedidos en el inventa""rio
                this.rest.GEN_Actualizar_pedido_inventario(this.solicitud)
                  .then((respuesta) => {
                    let resp: any = respuesta;
                    this.actualizar_detalle_pedidos_inventario = resp.recordset;
                    console.log("actualizar_detalle_pedidos_inventario ", this.actualizar_detalle_pedidos_inventario);
                    this.solicitud.accion_tipo = 'R';
                    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
                    this.solicitud.id_pedido = this.numero_de_pedido_modal;;
                    this.solicitud.id_parte = this.numero_de_parte_modal;
                    this.solicitud.fila = this.numero_de_linea_modal;



                    console.log("datos pedidos--->> ", this.solicitud.accion_tipo + "   " + this.solicitud.id_compania + " " + this.solicitud.id_pedido + "  " + this.solicitud.id_parte + "  " + this.solicitud.id_parte);

                    this.rest.GEN_entrada_historico(this.solicitud)
                      .then((respuesta) => {
                        let resp: any = respuesta;
                        this.entrada_historico = resp.recordset;
                        // yyyy
                        console.log("historico entrada r", this.entrada_historico);
                        console.log("historico lengt r", this.entrada_historico.length);
                        //console.log("historico entrada ", this.entrada_historico[0].entrada);
                        // console.log("historico historico disponible ", this.entrada_historico[0].historico_cant_disponible);

                        if (this.entrada_historico.length == 1) {
                          //aqui actualizamos los datos historico pedidos
                          this.solicitud_historico.accion_tipo = 'C';
                          this.solicitud_historico.id_compania = parseInt(localStorage.getItem("COMP"));
                          this.solicitud_historico.id_pedido = this.numero_de_pedido_modal;
                          this.solicitud_historico.id_parte = this.numero_de_parte_modal;
                          this.solicitud_historico.sw_recibida = 1;
                          this.solicitud_historico.entrada = (this.cantidad_de_numero_serie_activo);
                          this.solicitud_historico.precio = this.precio_unitario_modal;
                          this.solicitud_historico.usuario_crea = parseInt(localStorage.getItem("USU"));
                          this.solicitud_historico.usuario_actualiza = parseInt(localStorage.getItem("USU"));
                          this.solicitud_historico.sw_activo = 1;
                          this.solicitud_historico.fila = this.numero_de_linea_modal
                          this.solicitud_historico.historico_cant_disponible = (this.entrada_historico[0].cant_disponible)


                          this.rest.CRUD_historico_pedidos(this.solicitud_historico)
                            .then((respuesta) => {
                              let resp: any = respuesta;
                              this.detalle_historico_pedidos = resp.recordset;
                              console.log("CRUD_historico_pedidos ", this.detalle_historico_pedidos);

                              this.RECIBIR_Modal_1.hide()
                              this.datos_detalle();

                            }, (error) => {

                              console.log(error);

                            });
                        }
                        else {
                          this.solicitud.accion_tipo = 'W';
                          this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
                          this.solicitud.id_pedido = this.numero_de_pedido_modal;;
                          this.solicitud.id_parte = this.numero_de_parte_modal;
                          this.solicitud.fila = this.numero_de_linea_modal;

                          this.rest.GEN_entrada_historico(this.solicitud)
                            .then((respuesta) => {
                              let resp: any = respuesta;
                              this.entrada_historico = resp.recordset;
                              // yyyy
                              console.log("historico entrada w", this.entrada_historico);
                              console.log("historico lengt w", this.entrada_historico.length);
                              console.log("this.cantidad_de_numero_serie_activo ", this.cantidad_de_numero_serie_activo);

                              this.contador_suma_pedidos = 0;

                              for (var i = 0; i < this.entrada_historico.length; i++) {
                                this.contador_suma_pedidos = this.contador_suma_pedidos + this.entrada_historico[i].suma_total_pedidos
                                console.log("this.entrada_historico[J].suma_total_pedidos XXXXXXXXX------->>>>>>>>>>>>>>> ", this.contador_suma_pedidos);

                              }


                              //aqui actualizamos los datos historico pedidos
                              this.solicitud_historico.accion_tipo = 'C';
                              this.solicitud_historico.id_compania = parseInt(localStorage.getItem("COMP"));
                              this.solicitud_historico.id_pedido = this.numero_de_pedido_modal;
                              this.solicitud_historico.id_parte = this.numero_de_parte_modal;
                              this.solicitud_historico.sw_recibida = 1;
                              this.solicitud_historico.entrada = (this.cantidad_de_numero_serie_activo - this.contador_suma_pedidos);
                              this.solicitud_historico.precio = this.precio_unitario_modal;
                              this.solicitud_historico.usuario_crea = parseInt(localStorage.getItem("USU"));
                              this.solicitud_historico.usuario_actualiza = parseInt(localStorage.getItem("USU"));
                              this.solicitud_historico.sw_activo = 1;
                              this.solicitud_historico.fila = this.numero_de_linea_modal
                              console.log("entrada historico ----->>>   " + this.entrada_historico[0]);
                              this.solicitud_historico.historico_cant_disponible = ((this.entrada_historico[0].cant_disponible))//+(this.cantidad_de_numero_serie_activo - this.entrada_historico[0].suma_total_pedidos)) )

                              this.rest.CRUD_historico_pedidos(this.solicitud_historico)
                                .then((respuesta) => {
                                  let resp: any = respuesta;
                                  this.detalle_historico_pedidos = resp.recordset;
                                  console.log("CRUD_historico_pedidos ", this.detalle_historico_pedidos);

                                  this.RECIBIR_Modal_1.hide()
                                  this.datos_detalle();

                                }, (error) => {

                                  console.log(error);

                                });


                            }, (error) => {

                              console.log(error);

                            });


                        }





                      }, (error) => {

                        console.log(error);

                      });
                  }, (error) => {

                    console.log(error);

                  });
                this.flag = false;
              }, (error) => {
                this.flag = false;
                console.log(error);

              });*/


            swal({

              title: "Proceso exitoso!",
              text: "Se Actualizaron los datos correctamente",
              type: "success",
              cancelButtonText: "Ok",
              showCancelButton: false,

            },
              function (isConfirm) {
                if (isConfirm) {


                  //this.router.navigate(['./silc/menus']);
                } else {
                  //this.guardar_detalle_pedido();
                  // this.limpiar(FRM);
                }

              });

          }

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

  async GEN_actualizar_detalle_pedidos() {

    await this.rest.GEN_actualizar_detalle_pedidos(this.solicitud)
      .then((respuesta) => {
        let resp: any = respuesta;
        this.actualizar_detalle_pedidos = resp.recordset;
        console.log("actualizar_detalle_pedidos ", this.actualizar_detalle_pedidos);

        this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
        this.solicitud.id_proveedor = this.solicitud.id_proveedor;
        this.solicitud.nombre = this.nombre_modal;
        this.solicitud.cant_disponible = this.faltante_conteo;
        this.solicitud.id_pedido = this.numero_de_pedido_modal;;
        this.solicitud.id_parte = this.numero_de_parte_modal;
        this.solicitud.fila = this.numero_de_linea_modal;
        console.log("XXXXXXXXXXX  " + "" + this.solicitud.id_parte + "       " + this.solicitud.cant_disponible + "  ", this.solicitud.id_pedido, "  ", this.solicitud.nombre, " ", this.faltante_conteo + " -------------<<<<----->>>>>>>>>");


        //aqui actualizamos los datos de pedidos en el inventa""rio
        this.GEN_Actualizar_pedido_inventario();

        /*this.rest.GEN_Actualizar_pedido_inventario(this.solicitud)
          .then((respuesta) => {
            let resp: any = respuesta;
            this.actualizar_detalle_pedidos_inventario = resp.recordset;
            console.log("actualizar_detalle_pedidos_inventario ", this.actualizar_detalle_pedidos_inventario);
            this.solicitud.accion_tipo = 'R';
            this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
            this.solicitud.id_pedido = this.numero_de_pedido_modal;;
            this.solicitud.id_parte = this.numero_de_parte_modal;
            this.solicitud.fila = this.numero_de_linea_modal;



            console.log("datos pedidos--->> ", this.solicitud.accion_tipo + "   " + this.solicitud.id_compania + " " + this.solicitud.id_pedido + "  " + this.solicitud.id_parte + "  " + this.solicitud.id_parte);

            this.rest.GEN_entrada_historico(this.solicitud)
              .then((respuesta) => {
                let resp: any = respuesta;
                this.entrada_historico = resp.recordset;
                // yyyy
                console.log("historico entrada r", this.entrada_historico);
                console.log("historico lengt r", this.entrada_historico.length);
                //console.log("historico entrada ", this.entrada_historico[0].entrada);
                // console.log("historico historico disponible ", this.entrada_historico[0].historico_cant_disponible);

                if (this.entrada_historico.length == 1) {
                  //aqui actualizamos los datos historico pedidos
                  this.solicitud_historico.accion_tipo = 'C';
                  this.solicitud_historico.id_compania = parseInt(localStorage.getItem("COMP"));
                  this.solicitud_historico.id_pedido = this.numero_de_pedido_modal;
                  this.solicitud_historico.id_parte = this.numero_de_parte_modal;
                  this.solicitud_historico.sw_recibida = 1;
                  this.solicitud_historico.entrada = (this.cantidad_de_numero_serie_activo);
                  this.solicitud_historico.precio = this.precio_unitario_modal;
                  this.solicitud_historico.usuario_crea = parseInt(localStorage.getItem("USU"));
                  this.solicitud_historico.usuario_actualiza = parseInt(localStorage.getItem("USU"));
                  this.solicitud_historico.sw_activo = 1;
                  this.solicitud_historico.fila = this.numero_de_linea_modal
                  this.solicitud_historico.historico_cant_disponible = (this.entrada_historico[0].cant_disponible)


                  this.rest.CRUD_historico_pedidos(this.solicitud_historico)
                    .then((respuesta) => {
                      let resp: any = respuesta;
                      this.detalle_historico_pedidos = resp.recordset;
                      console.log("CRUD_historico_pedidos ", this.detalle_historico_pedidos);

                      this.RECIBIR_Modal_1.hide()
                      this.datos_detalle();

                    }, (error) => {

                      console.log(error);

                    });
                }
                else {
                  this.solicitud.accion_tipo = 'W';
                  this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
                  this.solicitud.id_pedido = this.numero_de_pedido_modal;;
                  this.solicitud.id_parte = this.numero_de_parte_modal;
                  this.solicitud.fila = this.numero_de_linea_modal;

                  this.rest.GEN_entrada_historico(this.solicitud)
                    .then((respuesta) => {
                      let resp: any = respuesta;
                      this.entrada_historico = resp.recordset;
                      // yyyy
                      console.log("historico entrada w", this.entrada_historico);
                      console.log("historico lengt w", this.entrada_historico.length);
                      console.log("this.cantidad_de_numero_serie_activo ", this.cantidad_de_numero_serie_activo);

                      this.contador_suma_pedidos = 0;

                      for (var i = 0; i < this.entrada_historico.length; i++) {
                        this.contador_suma_pedidos = this.contador_suma_pedidos + this.entrada_historico[i].suma_total_pedidos
                        console.log("this.entrada_historico[J].suma_total_pedidos XXXXXXXXX------->>>>>>>>>>>>>>> ", this.contador_suma_pedidos);

                      }


                      //aqui actualizamos los datos historico pedidos
                      this.solicitud_historico.accion_tipo = 'C';
                      this.solicitud_historico.id_compania = parseInt(localStorage.getItem("COMP"));
                      this.solicitud_historico.id_pedido = this.numero_de_pedido_modal;
                      this.solicitud_historico.id_parte = this.numero_de_parte_modal;
                      this.solicitud_historico.sw_recibida = 1;
                      this.solicitud_historico.entrada = (this.cantidad_de_numero_serie_activo - this.contador_suma_pedidos);
                      this.solicitud_historico.precio = this.precio_unitario_modal;
                      this.solicitud_historico.usuario_crea = parseInt(localStorage.getItem("USU"));
                      this.solicitud_historico.usuario_actualiza = parseInt(localStorage.getItem("USU"));
                      this.solicitud_historico.sw_activo = 1;
                      this.solicitud_historico.fila = this.numero_de_linea_modal
                      console.log("entrada historico ----->>>   " + this.entrada_historico[0]);
                      this.solicitud_historico.historico_cant_disponible = ((this.entrada_historico[0].cant_disponible))//+(this.cantidad_de_numero_serie_activo - this.entrada_historico[0].suma_total_pedidos)) )

                      this.rest.CRUD_historico_pedidos(this.solicitud_historico)
                        .then((respuesta) => {
                          let resp: any = respuesta;
                          this.detalle_historico_pedidos = resp.recordset;
                          console.log("CRUD_historico_pedidos ", this.detalle_historico_pedidos);

                          this.RECIBIR_Modal_1.hide()
                          this.datos_detalle();

                        }, (error) => {

                          console.log(error);

                        });


                    }, (error) => {

                      console.log(error);

                    });


                }





              }, (error) => {

                console.log(error);

              });
          }, (error) => {

            console.log(error);

          });*/



        this.flag = false;
      }, (error) => {
        this.flag = false;
        console.log(error);

      });

  }

  async GEN_Actualizar_pedido_inventario() {

    await this.rest.GEN_Actualizar_pedido_inventario(this.solicitud)
      .then((respuesta) => {
        let resp: any = respuesta;
        this.actualizar_detalle_pedidos_inventario = resp.recordset;
        console.log("actualizar_detalle_pedidos_inventario ", this.actualizar_detalle_pedidos_inventario);
        this.solicitud.accion_tipo = 'R';
        this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
        this.solicitud.id_pedido = this.numero_de_pedido_modal;;
        this.solicitud.id_parte = this.numero_de_parte_modal;
        this.solicitud.fila = this.numero_de_linea_modal;



        console.log("datos pedidos--->> ", this.solicitud.accion_tipo + "   " + this.solicitud.id_compania + " " + this.solicitud.id_pedido + "  " + this.solicitud.id_parte + "  " + this.solicitud.id_parte);

        this.GEN_entrada_historico();

        /*this.rest.GEN_entrada_historico(this.solicitud)
          .then((respuesta) => {
            let resp: any = respuesta;
            this.entrada_historico = resp.recordset;
            // yyyy
            console.log("historico entrada r", this.entrada_historico);
            console.log("historico lengt r", this.entrada_historico.length);
            //console.log("historico entrada ", this.entrada_historico[0].entrada);
            // console.log("historico historico disponible ", this.entrada_historico[0].historico_cant_disponible);

            if (this.entrada_historico.length == 1) {
              //aqui actualizamos los datos historico pedidos
              this.solicitud_historico.accion_tipo = 'C';
              this.solicitud_historico.id_compania = parseInt(localStorage.getItem("COMP"));
              this.solicitud_historico.id_pedido = this.numero_de_pedido_modal;
              this.solicitud_historico.id_parte = this.numero_de_parte_modal;
              this.solicitud_historico.sw_recibida = 1;
              this.solicitud_historico.entrada = (this.cantidad_de_numero_serie_activo);
              this.solicitud_historico.precio = this.precio_unitario_modal;
              this.solicitud_historico.usuario_crea = parseInt(localStorage.getItem("USU"));
              this.solicitud_historico.usuario_actualiza = parseInt(localStorage.getItem("USU"));
              this.solicitud_historico.sw_activo = 1;
              this.solicitud_historico.fila = this.numero_de_linea_modal
              this.solicitud_historico.historico_cant_disponible = (this.entrada_historico[0].cant_disponible)


              this.rest.CRUD_historico_pedidos(this.solicitud_historico)
                .then((respuesta) => {
                  let resp: any = respuesta;
                  this.detalle_historico_pedidos = resp.recordset;
                  console.log("CRUD_historico_pedidos ", this.detalle_historico_pedidos);

                  this.RECIBIR_Modal_1.hide()
                  this.datos_detalle();

                }, (error) => {

                  console.log(error);

                });
            }
            else {
              this.solicitud.accion_tipo = 'W';
              this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
              this.solicitud.id_pedido = this.numero_de_pedido_modal;;
              this.solicitud.id_parte = this.numero_de_parte_modal;
              this.solicitud.fila = this.numero_de_linea_modal;

              this.rest.GEN_entrada_historico(this.solicitud)
                .then((respuesta) => {
                  let resp: any = respuesta;
                  this.entrada_historico = resp.recordset;
                  // yyyy
                  console.log("historico entrada w", this.entrada_historico);
                  console.log("historico lengt w", this.entrada_historico.length);
                  console.log("this.cantidad_de_numero_serie_activo ", this.cantidad_de_numero_serie_activo);

                  this.contador_suma_pedidos = 0;

                  for (var i = 0; i < this.entrada_historico.length; i++) {
                    this.contador_suma_pedidos = this.contador_suma_pedidos + this.entrada_historico[i].suma_total_pedidos
                    console.log("this.entrada_historico[J].suma_total_pedidos XXXXXXXXX------->>>>>>>>>>>>>>> ", this.contador_suma_pedidos);

                  }


                  //aqui actualizamos los datos historico pedidos
                  this.solicitud_historico.accion_tipo = 'C';
                  this.solicitud_historico.id_compania = parseInt(localStorage.getItem("COMP"));
                  this.solicitud_historico.id_pedido = this.numero_de_pedido_modal;
                  this.solicitud_historico.id_parte = this.numero_de_parte_modal;
                  this.solicitud_historico.sw_recibida = 1;
                  this.solicitud_historico.entrada = (this.cantidad_de_numero_serie_activo - this.contador_suma_pedidos);
                  this.solicitud_historico.precio = this.precio_unitario_modal;
                  this.solicitud_historico.usuario_crea = parseInt(localStorage.getItem("USU"));
                  this.solicitud_historico.usuario_actualiza = parseInt(localStorage.getItem("USU"));
                  this.solicitud_historico.sw_activo = 1;
                  this.solicitud_historico.fila = this.numero_de_linea_modal
                  console.log("entrada historico ----->>>   " + this.entrada_historico[0]);
                  this.solicitud_historico.historico_cant_disponible = ((this.entrada_historico[0].cant_disponible))//+(this.cantidad_de_numero_serie_activo - this.entrada_historico[0].suma_total_pedidos)) )

                  this.rest.CRUD_historico_pedidos(this.solicitud_historico)
                    .then((respuesta) => {
                      let resp: any = respuesta;
                      this.detalle_historico_pedidos = resp.recordset;
                      console.log("CRUD_historico_pedidos ", this.detalle_historico_pedidos);

                      this.RECIBIR_Modal_1.hide()
                      this.datos_detalle();

                    }, (error) => {

                      console.log(error);

                    });


                }, (error) => {

                  console.log(error);

                });


            }

          }, (error) => {

            console.log(error);

          });*/

      }, (error) => {

        console.log(error);

      });

  }

  async GEN_entrada_historico() {

    await this.rest.GEN_entrada_historico(this.solicitud)
      .then((respuesta) => {
        let resp: any = respuesta;
        this.entrada_historico = resp.recordset;
        // yyyy
        console.log("historico entrada r", this.entrada_historico);
        console.log("historico lengt r", this.entrada_historico.length);
        //console.log("historico entrada ", this.entrada_historico[0].entrada);
        // console.log("historico historico disponible ", this.entrada_historico[0].historico_cant_disponible);

        if (this.entrada_historico.length == 1) {
          //aqui actualizamos los datos historico pedidos
          this.solicitud_historico.accion_tipo = 'C';
          this.solicitud_historico.id_compania = parseInt(localStorage.getItem("COMP"));
          this.solicitud_historico.id_pedido = this.numero_de_pedido_modal;
          this.solicitud_historico.id_parte = this.numero_de_parte_modal;
          this.solicitud_historico.sw_recibida = 1;
          this.solicitud_historico.entrada = (this.cantidad_de_numero_serie_activo);
          this.solicitud_historico.precio = this.precio_unitario_modal;
          this.solicitud_historico.usuario_crea = parseInt(localStorage.getItem("USU"));
          this.solicitud_historico.usuario_actualiza = parseInt(localStorage.getItem("USU"));
          this.solicitud_historico.sw_activo = 1;
          this.solicitud_historico.fila = this.numero_de_linea_modal
          this.solicitud_historico.historico_cant_disponible = (this.entrada_historico[0].cant_disponible)


          this.CRUD_historico_pedidos();

          /* this.rest.CRUD_historico_pedidos(this.solicitud_historico)
             .then((respuesta) => {
               let resp: any = respuesta;
               this.detalle_historico_pedidos = resp.recordset;
               console.log("CRUD_historico_pedidos ", this.detalle_historico_pedidos);
 
               this.RECIBIR_Modal_1.hide()
               this.datos_detalle();
 
             }, (error) => {
 
               console.log(error);
 
             });*/
        }
        else {
          this.solicitud.accion_tipo = 'W';
          this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
          this.solicitud.id_pedido = this.numero_de_pedido_modal;;
          this.solicitud.id_parte = this.numero_de_parte_modal;
          this.solicitud.fila = this.numero_de_linea_modal;

          this.GEN_entrada_historico_2();

          /*this.rest.GEN_entrada_historico(this.solicitud)
            .then((respuesta) => {
              let resp: any = respuesta;
              this.entrada_historico = resp.recordset;
              // yyyy
              console.log("historico entrada w", this.entrada_historico);
              console.log("historico lengt w", this.entrada_historico.length);
              console.log("this.cantidad_de_numero_serie_activo ", this.cantidad_de_numero_serie_activo);

              this.contador_suma_pedidos = 0;

              for (var i = 0; i < this.entrada_historico.length; i++) {
                this.contador_suma_pedidos = this.contador_suma_pedidos + this.entrada_historico[i].suma_total_pedidos
                console.log("this.entrada_historico[J].suma_total_pedidos XXXXXXXXX------->>>>>>>>>>>>>>> ", this.contador_suma_pedidos);

              }


              //aqui actualizamos los datos historico pedidos
              this.solicitud_historico.accion_tipo = 'C';
              this.solicitud_historico.id_compania = parseInt(localStorage.getItem("COMP"));
              this.solicitud_historico.id_pedido = this.numero_de_pedido_modal;
              this.solicitud_historico.id_parte = this.numero_de_parte_modal;
              this.solicitud_historico.sw_recibida = 1;
              this.solicitud_historico.entrada = (this.cantidad_de_numero_serie_activo - this.contador_suma_pedidos);
              this.solicitud_historico.precio = this.precio_unitario_modal;
              this.solicitud_historico.usuario_crea = parseInt(localStorage.getItem("USU"));
              this.solicitud_historico.usuario_actualiza = parseInt(localStorage.getItem("USU"));
              this.solicitud_historico.sw_activo = 1;
              this.solicitud_historico.fila = this.numero_de_linea_modal
              console.log("entrada historico ----->>>   " + this.entrada_historico[0]);
              this.solicitud_historico.historico_cant_disponible = ((this.entrada_historico[0].cant_disponible))//+(this.cantidad_de_numero_serie_activo - this.entrada_historico[0].suma_total_pedidos)) )

              this.rest.CRUD_historico_pedidos(this.solicitud_historico)
                .then((respuesta) => {
                  let resp: any = respuesta;
                  this.detalle_historico_pedidos = resp.recordset;
                  console.log("CRUD_historico_pedidos ", this.detalle_historico_pedidos);

                  this.RECIBIR_Modal_1.hide()
                  this.datos_detalle();

                }, (error) => {

                  console.log(error);

                });


            }, (error) => {

              console.log(error);

            });*/


        }

      }, (error) => {

        console.log(error);

      });

  }

  async CRUD_historico_pedidos() {

    await this.rest.CRUD_historico_pedidos(this.solicitud_historico)
      .then((respuesta) => {
        let resp: any = respuesta;
        this.detalle_historico_pedidos = resp.recordset;
        console.log("CRUD_historico_pedidos ", this.detalle_historico_pedidos);

        this.RECIBIR_Modal_1.hide()
        this.datos_detalle();

      }, (error) => {

        console.log(error);

      });

  }

  async GEN_entrada_historico_2() {

    await this.rest.GEN_entrada_historico(this.solicitud)
      .then((respuesta) => {
        let resp: any = respuesta;
        this.entrada_historico = resp.recordset;
        // yyyy
        console.log("historico entrada w", this.entrada_historico);
        console.log("historico lengt w", this.entrada_historico.length);
        console.log("this.cantidad_de_numero_serie_activo ", this.cantidad_de_numero_serie_activo);

        this.contador_suma_pedidos = 0;

        for (var i = 0; i < this.entrada_historico.length; i++) {
          this.contador_suma_pedidos = this.contador_suma_pedidos + this.entrada_historico[i].suma_total_pedidos
          console.log("this.entrada_historico[J].suma_total_pedidos XXXXXXXXX------->>>>>>>>>>>>>>> ", this.contador_suma_pedidos);

        }


        //aqui actualizamos los datos historico pedidos
        this.solicitud_historico.accion_tipo = 'C';
        this.solicitud_historico.id_compania = parseInt(localStorage.getItem("COMP"));
        this.solicitud_historico.id_pedido = this.numero_de_pedido_modal;
        this.solicitud_historico.id_parte = this.numero_de_parte_modal;
        this.solicitud_historico.sw_recibida = 1;
        this.solicitud_historico.entrada = (this.cantidad_de_numero_serie_activo - this.contador_suma_pedidos);
        this.solicitud_historico.precio = this.precio_unitario_modal;
        this.solicitud_historico.usuario_crea = parseInt(localStorage.getItem("USU"));
        this.solicitud_historico.usuario_actualiza = parseInt(localStorage.getItem("USU"));
        this.solicitud_historico.sw_activo = 1;
        this.solicitud_historico.fila = this.numero_de_linea_modal
        console.log("entrada historico ----->>>   " + this.entrada_historico[0]);
        this.solicitud_historico.historico_cant_disponible = ((this.entrada_historico[0].cant_disponible))//+(this.cantidad_de_numero_serie_activo - this.entrada_historico[0].suma_total_pedidos)) )

        this.CRUD_historico_pedidos();

        /*this.rest.CRUD_historico_pedidos(this.solicitud_historico)
          .then((respuesta) => {
            let resp: any = respuesta;
            this.detalle_historico_pedidos = resp.recordset;
            console.log("CRUD_historico_pedidos ", this.detalle_historico_pedidos);

            this.RECIBIR_Modal_1.hide()
            this.datos_detalle();

          }, (error) => {

            console.log(error);

          });*/


      }, (error) => {

        console.log(error);

      });

  }

  activador_checkbutton_estado(ev: String, index: number) {
    if (ev == "N") {
      // this.controlDescripcion = true;
      this.detalle_datos_recibir_pedidos[index].bl_controlDescripcion = true;
    }
    else {
      //this.controlDescripcion = false;
      this.detalle_datos_recibir_pedidos[index].bl_controlDescripcion = false;
    }

    //alert('change value ' + this.controlDescripcion)
  }


  async LEVANTANDO_MODAL(datos: any) {
    console.log("datosssss-----    ", this.detalle_fillarray[datos])
    // for (const i in this.lista_proveedor_parte) {

    //   console.log("this.lista_proveedor_parte: " + JSON.stringify(this.lista_proveedor_parte));

    //   console.log("this.lista_proveedor_parte[i].id_fabricante: " + this.lista_proveedor_parte[i].manejo_de_envio);

    //   if (this.lista_proveedor_parte[i].id_parte == this.detalle_fillarray[datos].id_parte) {

    //     this.nombre_modal = this.lista_proveedor_parte[i].nombre_parte;
    //     this.solicitud.id_parte = this.lista_proveedor_parte[i].id_parte
    //     this.solicitud.id_fabricante = this.lista_proveedor_parte[i].id_fabricante
    //     //console.log("nombre de la modal....", this.nombre_modal);
    //   }

    // }

    this.nombre_modal = this.detalle_fillarray[datos].nombre_parte;
    this.proveedor_modal = this.detalle_fillarray[datos].nombre_proveedor;
    this.descripcion_modal = this.detalle_fillarray[datos].descripcion;
    //alert(" descripcion fill array  ."+ this.detalle_fillarray[datos].descripcion);


    // this.fieldArray[datos]


    this.solicitud.id_parte = this.detalle_fillarray[datos].id_parte  //wwwwwww
    this.solicitud.id_fabricante = this.detalle_fillarray[datos].id_fabricante

    // alert(" this.solicitud.id_fabricante."+ this.solicitud.id_fabricante);
    //console.log("    ",datos)

    this.precio_unitario_modal_global = this.detalle_fillarray[datos].precio_unitario;


    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
    this.solicitud.id_proveedor = 1;
    this.solicitud.nombre = this.nombre_modal;


    await this.rest.GEN_verificar_lista_inventario(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta;

        this.Numero_de_parte_existente = resp.recordset;
        if (this.Numero_de_parte_existente == 0) {
          swal({
            title: "El número de parte " + this.nombre_modal + " no existe \n " + "en la lista de inventario " + " \n ¿Desea crearlo?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Si",
            cancelButtonText: "No",
            closeOnConfirm: false
          },
            confirmed => {
              // alert(""+this.precio_unitario_modal_global);
              if (confirmed) {
                swal("Creando numero de parte!", "", "success");
                // alert("parte  " + this.solicitud.id_parte);
                const arreglo = {
                  titulo: "CREAR LISTADO DE INVENTARIO", estatus: "crear", ACCION: 'C', proveedor_crear: this.solicitud.id_proveedor, numero_de_parte_crear: this.nombre_modal, precio_unitario_crear: this.precio_unitario_modal_global, estatus_crear: 0, id_parte_crear: this.solicitud.id_parte, id_fabricante_crear: this.solicitud.id_fabricante, descripcion_crear: this.descripcion_modal

                }
                // alert("this.solicitud.id_fabricante     "+this.solicitud.id_fabricante)
                const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
                this.router.navigate(['./silc/informacion_del_catalogo', parametros]);
              }
              else {

              }

            });
        }
        else {
          this.recibir_datos_modal(datos);
          this.RECIBIR_Modal_1.show();
        }



        console.log(resp);
        this.flag = false;

      }, (error) => {
        this.flag = false;
        console.log(error);

      });

  }

}
