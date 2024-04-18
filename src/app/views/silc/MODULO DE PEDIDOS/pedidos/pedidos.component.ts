import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RestService, parametros,  Permisos, ValidadoresService, PaginacionService, PDFserviceService  } from '../../../../services/_export';
declare var swal: any;

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { autoTable as AutoTable } from 'jspdf-autotable';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  cantidad_caracteres: Number = 0;
  cantidad_caracteres_impuesto: Number = 0;
  cantidad_caracteres_manejo_envio: Number = 0;
  cantidad_caracteres_resta_impuesto: Number = 0;
  cantidad_caracteres_resta_manejo_envio: Number = 0;

  private itemsDB: any[];
  id_proveedor_arreglo: any = [];
  data_dett: Array<any> = [];
  datos_recibir_pedidos: any;
  flag: boolean = false;
  //#region Variables de paginacion
  // array of all items to be paged
  private allItems: any[];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  //#endregion

  pedidos_inventario: string = '';
  
 
  permisos = new Permisos().access;
  solicitud = new parametros().prm_pedidos;

  solicitud_envio_matriz = new parametros().prm_pedidos;
  estatus_modal: string = '';
  pedidos: any;
  NUMERO_PEDIDO: any;

 ArregloRespuesta: any[];

  constructor( private router: Router, private rest: RestService,
    private _validadores: ValidadoresService, private _paginacion: PaginacionService, private PDF: PDFserviceService) { }


  ngOnInit() {
    this.solicitud.accion_tipo = 'R';
    this.solicitud.sw_activo = 1;
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
    this.solicitud.token = JSON.parse(decodeURIComponent(escape(window.atob(localStorage._token))));
    this.solicitud_envio_matriz.token = JSON.parse(decodeURIComponent(escape(window.atob(localStorage._token))));
    this.run_pedidos();
  }

  async detalle_pedidos() {
    this.solicitud.accion_tipo = 'R';
    this.solicitud.id_pedido = this.NUMERO_PEDIDO;
    this.solicitud.sw_activo = 1;
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
    this.solicitud.token = JSON.parse(decodeURIComponent(escape(window.atob(localStorage._token))));

    await this.rest.CRUD_detalle_pedidos(this.solicitud)
      .then((respuesta) => {

        let respdetalle: any = respuesta; // toda la respuesta del servidor.
        this.datos_recibir_pedidos = respdetalle.recordset;
        let resp_validada = this._validadores.respuesta_api(respdetalle); // la respuesta validada (si ocurrio erro o no).
        //this.solicitud.fecha_pedido = this.solicitud.fecha_pedido.toString().split('T')[0];
        console.log("xxx-----", this.datos_recibir_pedidos);

      }, (error) => {

        swal('Ocurrio un Error', 'Respuesta de error de HTTP ("' + error.name + '").', 'error');
        console.log(error);

      });
  }

  async run_pedidos() {

    await this.rest.CRUD_pedidos(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).
        //this.solicitud.fecha_pedido = this.solicitud.fecha_pedido.toString().split('T')[0];

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
        swal('Ocurrio un Error', 'Respuesta de error de HTTP ("' + error.name + '").', 'error');
        console.log(error);

      });

  }
  crear() {
    const arreglo = {
      titulo: "CREAR PEDIDO", estatus: "crear", estado: "EN ESPERA"
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/n-pedido', parametros]);
  }
  modificar_pedido(datos: any) {
    const arreglo = {
      titulo: "MODIFICAR PEDIDO", estatus: "modificar", datos: datos
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/n-pedido', parametros]);
  }
  recibir(datos: any) {

    if (datos.nombre_estatus == 'Cancelado') {


      swal("Ya el pedido #" + datos.id_pedido + " ha sido cancelado \n " + "", "", "success");
    }
    else {

      if (datos.sw_estado == 1) {
        swal("El pedido esta siendo recibido", "", "success");
        const arreglo = {
          titulo: "RECIBIR PEDIDO", estatus: "recibir", datos: datos
        }
        const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
        this.router.navigate(['./silc/recibir-pedidos', parametros]);
      } else {
        swal({
          title: "Al recibir este pedido no podrá modificarlo \n " + "Numero de pedido:" + datos.id_pedido + " \n Desea continuar...",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Si",
          cancelButtonText: "No",
          closeOnConfirm: false
        },
          confirmed => {
            if (confirmed) {
              this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
              this.solicitud.id_pedido = datos.id_pedido;

              this.rest.GEN_actualizar_pedido_sw_estado(this.solicitud)
                .then((respuesta) => {

                  let resp: any = respuesta; // toda la respuesta del servidor.

                  let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).
                  if (resp_validada.estado) {

                    this.solicitud.accion_tipo = 'D';
                    this.solicitud.id_proveedor = 1;
                    this.solicitud.sw_activo = 0;
                    this.solicitud.nombre_estatus = 'Recibido';
                    this.solicitud.id_pedido = datos.id_pedido;
                    this.cambiando_estatus();


                    swal("Recibiendo pedido", "", "success");
                    const arreglo = {
                      titulo: "RECIBIR PEDIDO", estatus: "recibir", datos: datos
                    }
                    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
                    this.router.navigate(['./silc/recibir-pedidos', parametros]);
                  } else {
                    swal('Ocurrio un Error', resp_validada.msg, 'error');
                  }

                }, (error) => {

                  swal('Ocurrio un Error', 'Respuesta de error de HTTP ("' + error.name + '").', 'error');
                  console.log(error);

                });

            }

          });
      }



    }

  }
  //#region metodos de funcionamientos

  enviar_pedido(datos: any) {


  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      // return;
    }

    // get pager object from service
    this.pager = this._paginacion.getPager(this.allItems.length, page, 10);

    // get current page of items
    this.pedidos = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);

  }

  filtrar($evet) {
    this.allItems = $evet;
    this.setPage(1);
  }

  //#endregion


  cancelar_pedido(datos: any) {

    if (datos.nombre_estatus == 'Cancelado') {

      swal("Ya el pedido #" + datos.id_pedido + " ha sido cancelado \n " + "", "", "success");
    }
    else if (datos.nombre_estatus == 'Recibido') {

      swal("Ya el pedido #" + datos.id_pedido + " esta siendo recibido \n " + "", "", "success");
    }
    else {
      swal({
        title: "Desea eliminar el pedido ? \n " + "Numero de pedido: " + this.solicitud.id_pedido,
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
            this.solicitud.accion_tipo = 'D';
            this.solicitud.id_proveedor = 1;
            this.solicitud.sw_activo = 0;
            this.solicitud.nombre_estatus = 'Cancelado';
            this.solicitud.id_pedido = datos.id_pedido;
            this.cambiando_estatus();
          }

        });

    }



  }

  async cambiando_estatus() {

    await this.rest.CRUD_pedidos(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.


        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).
        this.solicitud.fecha_pedido = this.solicitud.fecha_pedido.toString().split('T')[0];

        console.log("xxx-----", this.solicitud.fecha_pedido);
        if (resp_validada.estado) {
          // this.menus = resp.recordset;
          this.allItems = resp.recordset;
          this.setPage(1); //para iniciar la paginacion.
        } else {
          this.allItems = [];
          this.setPage(1); //para iniciar la paginacion.
          swal('Ocurrio un Error', resp_validada.msg, 'error');
        }
        this.flag = false;
      }, (error) => {
        this.flag = false;
        swal('Ocurrio un Error', 'Respuesta de error de HTTP ("' + error.name + '").', 'error');
        console.log(error);

      });
  }

  saveData(datos: any) {

    this.itemsDB = datos;
    this.NUMERO_PEDIDO = datos.id_pedido
    console.log("matrix----> ", this.solicitud_envio_matriz);

    this.solicitud_envio_matriz.itemsDB = this.itemsDB;

  }

  async imprimir_cotizacion() {
    this.solicitud.id_pedido = this.NUMERO_PEDIDO;
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));

    await this.rest.REP_cotizacion_pedido(this.solicitud).then((respuesta) => {

      let resp1: any = respuesta; // toda la respuesta del servidor.

      let resp_validada = this._validadores.respuesta_api(resp1);
      // la respuesta validada (si ocurrio erro o no).
      //this.solicitud.fecha_pedido = this.solicitud.fecha_pedido.toString().split('T')[0];
      //console.log("xxx-----", this.solicitud.fecha_pedido);
      console.log("this  ", resp1);
      if (resp_validada.estado) {
        // this.menus = resp.recordset;
        this.allItems = resp1.recordset;
        this.cotizacion();
        console.log("this.allItems ", this.allItems);
      } else {
        this.allItems = [];

        swal('Ocurrio un Error', resp_validada.msg, 'error');
      }
      this.flag = false;
    }, (error) => {
      this.flag = false;
      swal('Ocurrio un Error', 'Respuesta de error de HTTP ("' + error.name + '").', 'error');
      console.log(error);

    });

  }

  cotizacion() {
    //recorriendo arreglo e imprimir cotizaciones
    var i: number = 0

    //buscamos los id proveedor repetidos
    for (const id_recorrido in this.allItems) {
      const result = this.id_proveedor_arreglo.filter(proveedor => proveedor == this.allItems[id_recorrido].id_proveedor);
      //console.log(" result2 : " + result.length);
      if (result.length == 0) {
        //id repetidos los metemos en un arreglo
        this.id_proveedor_arreglo[i] = this.allItems[id_recorrido].id_proveedor;
        i = i + 1;

      }
    }

    //luego recorremos el arreglo ya almacenado dentro del fillarray
    for (const a in this.id_proveedor_arreglo) {
      //insertamos los datos por id_proveedor en el arreglo 
      for (const j in this.allItems) {

        if (this.allItems[j].id_proveedor == this.id_proveedor_arreglo[a]) {

          // console.log("this.id_proveedor_arreglo[a]: ", this.id_proveedor_arreglo[a]);
          console.log("this.allItems[j].id_proveedor: ", this.allItems[j].id_proveedor);

          // this.jsonCot.id_pedido = this.allItems[j].id_pedido,
          // this.jsonCot.id_proveedor = this.allItems[j].id_proveedor,
          // this.jsonCot.nombre_proveedor = this.allItems[j].nombre_proveedor,
          // this.jsonCot.direccion_proveedor = this.allItems[j].direccion_proveedor,
          // this.jsonCot.telefono_proveedor = this.allItems[j].telefono_proveedor,
          // this.jsonCot.correo_proveedor = this.allItems[j].correo_proveedor,
          // this.jsonCot.contacto_proveedor = this.allItems[j].contacto_proveedor,
          // this.jsonCot.nombre_compania = this.allItems[j].nombre_compania,
          // this.jsonCot.direccion_compania = this.allItems[j].direccion_compania,
          // this.jsonCot.telefono_compania = this.allItems[j].telefono_compania,
          // this.jsonCot.correo_compania = this.allItems[j].correo_compania,
          // this.jsonCot.contacto_compania = this.allItems[j].contacto_compania,
          // this.jsonCot.numero_pedido = this.allItems[j].numero_pedido,
          // this.jsonCot.cantidad_pedido = this.allItems[j].cantidad_pedido,
          // this.jsonCot.nombre_fabricante = this.allItems[j].nombre_fabricante,
          // this.jsonCot.nombre_parte = this.allItems[j].nombre_parte,
          // this.jsonCot.total_linea = this.allItems[j].total_linea,
          // this.jsonCot.manejo_de_envio = this.allItems[j].manejo_de_envio,
          // this.jsonCot.precio = this.allItems[j].precio,
          // this.jsonCot.impuesto = this.allItems[j].impuesto

          // console.log("this.jsonCot: ", this.jsonCot);
          // this.data_dett.push(
          //   [
          //     this.jsonCot
          //   ]);
          //   this.data_dett =
          // [  
          //   [
          //     this.allItems[j]
          //   ],
          // ];
          this.data_dett.push(
            [
              this.allItems[j]
            ]);

          // console.log("j: ", j);
          // console.log("this.allItems: ", this.allItems[j]);

          //console.log("data_dett: " + j, this.data_dett);
          // this.data_dett.push(
          //   [
          //     this.allItems[j].id_pedido,
          //     this.allItems[j].id_proveedor,
          //     this.allItems[j].nombre_proveedor,
          //     this.allItems[j].direccion_proveedor,
          //     this.allItems[j].telefono_proveedor,
          //     this.allItems[j].correo_proveedor,
          //     this.allItems[j].contacto_proveedor,
          //     this.allItems[j].nombre_compania,
          //     this.allItems[j].direccion_compania,
          //     this.allItems[j].telefono_compania,
          //     this.allItems[j].correo_compania,
          //     this.allItems[j].contacto_compania,
          //     this.allItems[j].numero_pedido,
          //     this.allItems[j].cantidad_pedido,
          //     this.allItems[j].nombre_fabricante,
          //     this.allItems[j].nombre_parte,
          //     Math.round(this.allItems[j].total_linea * 100) / 100,
          //     this.allItems[j].manejo_de_envio,
          //     this.allItems[j].impuesto
          //   ]);
        }

        // this.pdfCotizacion(this.data_dett, Number(a));
        // console.log("data_dett", this.data_dett);
      }

      //this.pdfCotizacion(this.data_dett, Number(a));
      this.PDF.generarPDFpedido(this.data_dett, Number(a));
      ////////////////////////////////////////
      //////////SERVICIO              ////////
      ////////////////////////////////////////

      //console.log("a    ", a);
      console.log("data_dett", this.data_dett);

      this.data_dett = new Array;

    }

    // console.log("result", this.id_proveedor_arreglo);
    this.id_proveedor_arreglo.length = 0;

  }
//#region pdf
  pdfCotizacion(datos: Array<any> = [], i: number) {

    let doc = new jsPDF();

    let imgBase64 = 'data:image/jpeg;base64,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';
    // const url = './assets/galeria/JEnkinsLara.jpg';

    // imgBase64 = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
    //              + url);
    console.log("imgBase64", imgBase64)

    doc.addImage(imgBase64, 'JPEG', 12, 2, 35, 35)

    //seccion de arriba (parte superior derecha)
    doc.text(150, 20, 'PEDIDO # ' + datos[0][0].id_pedido);
    //Rectangulo folio fiscal
    doc.setDrawColor(0);
    doc.setTextColor(255, 255, 255);
    // doc.setFillColor(234, 234, 234); //color gris
    doc.setFillColor(0, 102, 204);//color azul (0, 0, 255) o celeste
    // doc.roundedRect(12, 35, 190, 15, 1, 1, 'F');
    // doc.rect(12, 35, 190, 15, 1, 1, 'FD');
    doc.rect(12, 35, 190, 15, 'F')

    doc.setFontSize(12);


    doc.text(14, 40, 'Fecha:');

    //corte de fecha para mostrarla en el reporte
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();
    console.info("fecha: " + curr_date + "/" + curr_month + "/" + curr_year)
    doc.text(40, 40, curr_date + "/" + curr_month + "/" + curr_year);
    doc.text(14, 46, 'Pedido #:');
    doc.text(40, 46, datos[0][0].id_pedido + ' - ' + (i + 1));

    doc.setDrawColor(0);
    // doc.setFillColor(234, 234, 234);
    doc.setFillColor(0, 102, 204);
    doc.setTextColor(255, 255, 255);

    // doc.setFillColor(0, 102, 204);//color azul (0, 0, 255) o celeste
    doc.rect(12, 60, 75, 10, 'F');

    // doc.roundedRect(12, 60, 75, 10, 1, 1, 'F');

    doc.text(14, 67, 'Datos Proveedor:');

    doc.setTextColor(0, 0, 0);

    doc.text(14, 76, 'Nombre:');
    doc.text(35, 76, datos[0][0].nombre_proveedor);
    doc.text(14, 82, 'Direccion:');
    doc.text(35, 82, datos[0][0].direccion_proveedor);
    doc.text(14, 89, 'Telefono:');
    doc.text(35, 89, datos[0][0].telefono_proveedor);
    doc.text(14, 96, 'Email:');
    doc.text(35, 96, datos[0][0].correo_proveedor);
    doc.text(14, 104, 'Contacto:');
    doc.text(35, 104, datos[0][0].contacto_proveedor);

    doc.setDrawColor(0);
    // doc.setFillColor(234, 234, 234);
    doc.setFillColor(0, 102, 204);
    doc.setTextColor(255, 255, 255);

    // doc.setFillColor(0, 102, 204);//color azul (0, 0, 255) o celeste
    doc.rect(126, 60, 75, 10, 'F');
    // doc.roundedRect(126, 60, 75, 10, 1, 1, 'F');

    doc.text(128, 67, 'Datos de la Empresa:');

    doc.setTextColor(0, 0, 0);
    doc.text(128, 76, 'Nombre:');
    doc.text(149, 76, datos[0][0].nombre_compania);
    doc.text(128, 82, 'Direccion:');
    doc.text(149, 82, datos[0][0].direccion_compania);
    doc.text(128, 89, 'Telefono:');
    doc.text(149, 89, datos[0][0].telefono_compania);
    doc.text(128, 96, 'Email:');
    doc.text(149, 96, datos[0][0].correo_compania);
    doc.text(128, 104, 'Contacto:');
    doc.text(149, 104, datos[0][0].contacto_compania);

    //seccion del contenido 
    // let head = [['Cantidad', 'Precio', 'Fabricante', 'Pieza', 'Total']];
    const head = [
      { 'title': 'Cantidad', 'dataKey': 'cantidad' },
      { 'title': 'Precio', 'dataKey': 'precio' },
      { 'title': 'Fabricante', 'dataKey': 'fabricante' },
      { 'title': 'Pieza', 'dataKey': 'pieza' },
      { 'title': 'Descuento', 'dataKey': 'descuento' },
      { 'title': 'Total', 'dataKey': 'total' }
    ]

    let data = [];


    //   let data = [
    //     [1, 'Finland', 7.632, 'Helsinki', 1.00],
    //     [2, 'Norway', 7.594, 'Oslo', 1.00],
    //     [3, 'Denmark', 7.555, 'Copenhagen', 1.00],
    //     [4, 'Iceland', 7.495, 'Reykjavík', 1.00],
    //     [5, 'Switzerland', 	7.487, 'Bern', 1.00],
    //     [9, 'Sweden', 7.314, 'Stockholm', 1.00],
    //     [73, 'Belarus', 5.483, 'Minsk', 1.00],
    //     [73, 'Belarus', 5.483, 'Minsk', 1.00],
    //     [73, 'Belarus', 5.483, 'Minsk', 1.00],
    //     [73, 'Belarus', 5.483, 'Minsk', 1.00],
    //     [73, 'Belarus', 5.483, 'Minsk', 1.00]
    // ];

    let subTotal: number = 0;
    let total: number = 0;
    let impuesto: number = 0;
    let manejoEnvio: number = 0;

    // console.log("datos[0].nombre_proveedor: ", datos[0][0].nombre_proveedor);

    // console.log("datos que se vana iterar: ", datos);



    for (const j in datos) {

      // console.log("datos[j][z].cantidad_pedido: ", datos[j][0].cantidad_pedido);
      // console.log("j: ", j);
      // for (const z in datos) {

      // data.push(
      //   [
      //     {
      //       cantidad: datos[j][0].cantidad_pedido,
      //       precio: datos[j][0].precio,
      //       fabricante: datos[j][0].nombre_fabricante,
      //       pieza: datos[j][0].nombre_parte,
      //       total: Math.round(datos[j][0].total_linea * 100) / 100
      //     }
      //   ]);

      data.push({
        cantidad: datos[j][0].cantidad_pedido,
        precio: datos[j][0].precio,
        fabricante: datos[j][0].nombre_fabricante.trim(),
        pieza: datos[j][0].nombre_parte,
        descuento: datos[j][0].descuento,
        total: Math.round(datos[j][0].total_linea * 100) / 100,
      })

      //  data =
      //   [
      //     [
      //       datos[j][0].cantidad_pedido,
      //       datos[j][0].precio,
      //       datos[j][0].nombre_fabricante,
      //       datos[j][0].nombre_parte,
      //       Math.round(datos[j][0].total_linea * 100) / 100
      //     ], 
      //   ];
      // Array.prototype.push.apply(data, data2);

      // data.push(
      //   [
      //     [
      //       1,
      //       'Finland',
      //       7.632,
      //       'Helsinki',
      //       1.00
      //     ]

      //   ]
      // ); 

      // data = [
      //   [
      //     datos[j][0].cantidad_pedido,
      //     datos[j][0].precio,
      //     datos[j][0].nombre_fabricante,
      //     datos[j][0].nombre_parte,
      //     Math.round(datos[j][0].total_linea * 100) / 100
      //   ]

      // ];

      subTotal = subTotal + Math.round(datos[j][0].total_linea * 100) / 100;

      // }  

      // console.log("data: ", data);

    }

    console.log("data que va en la cotizacion: ", data);

    // doc.autoTable(colum, data, {
    //     theme: 'striped',
    //     startY: margen_superior,
    //     margin: { horizontal: margen_izquierdo },
    //     styles: { cellPadding: 1, overflow: 'linebreak' },
    //     headerStyles: { rowHeight: 5, fontSize: 10, fontStyle: tipo_letra, halign: 'center', fillColor: [tema1[0], tema1[1], tema1[2]], textColor: [texto1[0], texto1[1], texto1[2]] },
    //     bodyStyles: { rowHeight: 5, fontSize: 9, fontStyle: tipo_letra, textColor: 0 },
    //     pageBreak: 'avoid' ,
    //     columnStyles: columnStyle,
    //     addPageContent: header,
    //   });
    doc.autoTable(head, data, {
      theme: 'striped',
      tableLineWidth: 0.75,
      // startY: margen_superior,
      margin: {
        horizontal: 10,
        top: 115
      },
      styles: { cellPadding: 1, overflow: 'linebreak' },
      headStyles: {
        rowHeight: 5,
        fontSize: 10,
        halign: 'left',
        fillColor: [0, 102, 204]
      },
      bodyStyles: { rowHeight: 5, fontSize: 9, textColor: 0 },
      pageBreak: 'avoid',
      // columnStyles: columnStyle,
      // addPageContent: header,
    });
    // console.log("El objeto data table es: ", doc.autoTable.previous.finalY);
    // ((doc as any).autoTable as AutoTable)({

    //   // styles: {
    //   //   // fillColor: [100, 255, 255]
    //   //   fillColor: [255, 0, 255]
    //   // },
    //   theme: 'striped',

    //   pageBreak: 'avoid',

    //   headStyles: {
    //     fillColor: [128, 128, 128],
    //     textColor: [0, 0, 0],
    //     halign: 'center'
    //   },

    //   columnStyles: {
    //     id: {
    //       fillColor: 255
    //     }
    //   },

    //   margin: {
    //     top: 115
    //   },

    //   head: head,
    //   body: data,
    //   didDrawCell: data => {
    //     console.log(data.column.index)
    //   }
    // });

    total = (subTotal * datos[0][0].impuesto / 100);
    total = total + subTotal + datos[0][0].manejo_de_envio;

    // doc.text(160, 128, 'Subtotal ' + '$ ');
    // doc.text(185, 215, String(subTotal));
    // doc.text(150, 223, 'Manejo Envio ' + '$ ');
    // doc.text(185, 223, String(datos[0][0].manejo_de_envio));
    // doc.text(158, 231, 'Impuesto ' + '$ ');
    // doc.text(185, 231, String(datos[0][0].impuesto));
    // doc.text(166, 240, 'Total ' + '$ ');
    // doc.text(185, 240, String(total));

    let subRounded: any;
    subRounded = String(Math.round(subTotal * 100) / 100);


    let itbms: any;
    itbms = String(datos[0][0].impuesto / 100);

    let itbmsRounded = String(Math.round((subRounded * itbms) * 100) / 100);

    this.cantidad_caracteres = 0
    this.cantidad_caracteres_impuesto = 0
    this.cantidad_caracteres_resta_impuesto = 0
    this.cantidad_caracteres_resta_manejo_envio = 0
    this.cantidad_caracteres_manejo_envio = 0;
    this.cantidad_caracteres = (String((((total * 100) / 100)).toFixed(2)).length);
    this.cantidad_caracteres_impuesto = (String(datos[0][0].impuesto / 100).toString().length);
    this.cantidad_caracteres_resta_impuesto = Number(this.cantidad_caracteres) - Number(this.cantidad_caracteres_impuesto);
    this.cantidad_caracteres_manejo_envio = ((String((((datos[0][0].manejo_de_envio * 100)) / 100).toFixed(2))).length);
    this.cantidad_caracteres_resta_manejo_envio = Number(this.cantidad_caracteres) - Number(this.cantidad_caracteres_manejo_envio);

    doc.text(160, doc.autoTable.previous.finalY + 15, 'Subtotal ' + '$ ');
    doc.text(185, doc.autoTable.previous.finalY + 15, subRounded);

    doc.text(158, doc.autoTable.previous.finalY + 22, 'Impuesto ' + '$ ');
    doc.text(185 + Number(this.cantidad_caracteres_resta_impuesto), doc.autoTable.previous.finalY + 22, itbmsRounded);

    doc.setLineWidth(0.5)
    doc.line(182, doc.autoTable.previous.finalY + 25, 203, doc.previousAutoTable.finalY + 25)

    let totalSubItbms: number;
    totalSubItbms = Number(subRounded) + Number(itbmsRounded);
    totalSubItbms = Math.round(totalSubItbms * 100) / 100;
    doc.text(185 + Number(this.cantidad_caracteres_resta_impuesto), doc.autoTable.previous.finalY + 30, String(totalSubItbms));

    doc.text(150, doc.autoTable.previous.finalY + 36, 'Manejo Envio ' + '$ ');
    doc.text(185 + Number(this.cantidad_caracteres_resta_manejo_envio), doc.autoTable.previous.finalY + 36, String((((datos[0][0].manejo_de_envio * 100)) / 100).toFixed(2)));

    doc.setLineWidth(0.5)
    doc.line(182, doc.autoTable.previous.finalY + 39, 203, doc.previousAutoTable.finalY + 39)

    doc.setLineWidth(0.5)
    doc.line(182, doc.autoTable.previous.finalY + 40, 203, doc.previousAutoTable.finalY + 40)

    doc.text(166, doc.autoTable.previous.finalY + 46, 'Total ' + '$ ');
    doc.text(187, doc.autoTable.previous.finalY + 46, String(Math.round(total * 100) / 100));

    // doc.text(160, doc.autoTable.previous.finalY + 15, 'Subtotal ' + '$ ');
    // doc.text(185, doc.autoTable.previous.finalY + 15, subRounded);
    // doc.text(150, doc.autoTable.previous.finalY + 22, 'Manejo Envio ' + '$ ');
    // doc.text(185, doc.autoTable.previous.finalY + 22, String(Math.round(datos[0][0].manejo_de_envio * 100) / 100));
    // doc.text(158, doc.autoTable.previous.finalY + 29, 'Impuesto ' + '$ ');
    // doc.text(185, doc.autoTable.previous.finalY + 29, itbmsRounded);
    // doc.text(166, doc.autoTable.previous.finalY + 36, 'Total ' + '$ ');
    // doc.text(185, doc.autoTable.previous.finalY + 36, String(Math.round(total * 100) / 100));


    // doc.line(240, 20, 150, 200) // horizontal line
    // doc.line(20, 212,110, 10) // horizontal line

    doc.save('Pedido - ' + datos[0][0].nombre_proveedor + '.pdf');
  }
  //#endregion
}
