import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RestService, parametros,  Permisos, ValidadoresService, PaginacionService, PDFserviceService, UtilidadesService } from '../../../../services/_export';

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { autoTable as AutoTable } from 'jspdf-autotable';
declare var swal: any;

@Component({
  selector: 'app-orden-de-trabajo',
  templateUrl: './orden-de-trabajo.component.html',
  styleUrls: ['./orden-de-trabajo.component.scss']
})
export class OrdenDeTrabajoComponent implements OnInit {

  itemsDB: any = [];
  data_dett: Array<any> = [];

  /* Variables de configuración de notificación*/
  
 

  /* Variables para los permisos, eliminar, editar, guardar */
  permisos = new Permisos().access;

  /* Objeto que se envia al webservice  */
  solicitud = new parametros().prm_deficiencias;
  solicitud_envio_matriz = new parametros().prm_pedidos;
  flag: boolean = false;

  ordenes: any[] = [];

  //#region Variables de paginacion
  // array of all items to be paged
  private allItems: any[];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  //#endregion
  ArregloRespuesta: any[];

  constructor( private router: Router, private route: ActivatedRoute, private rest: RestService,
    private _validadores: ValidadoresService, private _paginacion: PaginacionService, private PDF: PDFserviceService, private _utilidades: UtilidadesService) { }

  ngOnInit() {
    this.solicitud.token = JSON.parse(decodeURIComponent(escape(window.atob(localStorage._token))));
    this.solicitud_envio_matriz.token = JSON.parse(decodeURIComponent(escape(window.atob(localStorage._token))));
    this.run_ordenes_trabajo()


  }

  run_ordenes_trabajo() {
    this.solicitud.accion_tipo = 'R'; // R: Read: Select en base de datos.
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP")); // Valor debe estar en el localstoge se guarda cuando el usuario se autentica.
    this.flag = true;
    this.rest.CRUD_orden_de_trabajo(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log(resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

        if (resp_validada.estado) {
          // this.ordenes = resp.recordset; 
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


  crear() {
    const arreglo = {
      titulo: "CREAR ORDEN DE TRABAJO", estatus: "crear"
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nueva-orden-de-trabajo', parametros]);
  }

  modificar(datos: any) {
    const arreglo = {
      titulo: "MODIFICAR ORDEN DE TRABAJO", estatus: "modificar", datos: datos
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nueva-orden-de-trabajo', parametros]);
  }

  detalle(datos: any) {
    const arreglo = {
      titulo: "DETALLE ORDEN DE TRABAJO", estatus: "detalle", datos: datos
    }
    const parametros = btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nueva-orden-de-trabajo', parametros]);
  }

  //#region metodos de funcionamientos

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      // return;
    }

    // get pager object from service
    this.pager = this._paginacion.getPager(this.allItems.length, page, 10);

    // get current page of items
    this.ordenes = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);

  }

  //#endregion

  saveData(datos: any) {

    this.itemsDB = datos;
    console.log(this.itemsDB);
  }

  imprimir() {
    console.log("viendo item bd")
    console.log(this.itemsDB)
    this.itemsDB.token = JSON.parse(decodeURIComponent(escape(window.atob(localStorage._token))));

    this.rest.REP_orden_trabajo(this.itemsDB).then((respuesta) => {

      let resp: any = respuesta; // toda la respuesta del servidor.

      let resp_validada = this._validadores.respuesta_api(resp);
      if (resp_validada.estado) {
        this.allItems = resp.recordset;
        console.log("this.allItems ", this.allItems);
        this.orden();
      } 
      else {
        swal('Ocurrio un Error', resp_validada.msg, 'error');
        this.flag = false;
      }



      // let resp_validada = this._validadores.respuesta_api(resp);

      // if (resp_validada.estado) {
      //   // this.menus = resp.recordset;
      //   this.allItems = resp.recordset;

      //   // this.pdfOrden( this.allItems );

      //   console.log("this.allItems ", this.allItems);

      // } else {

      //   this.allItems = [];

      //   swal('Ocurrio un Error', resp_validada.msg, 'error');

      // }
      // this.flag = false;
    }, (error) => {
      this.flag = false;
      let respuesta = this._utilidades.manejo_status(error);
      swal('Oops', 'Ocurrió un error', 'error');
      console.log(error);

    });
    // console.log("this.allItems ", this.allItems);
    // console.log("this.allItems.descripcion_orden ", this.allItems[0].descripcion_orden);
    // this.pdfOrden(this.allItems);

  }

  orden() {
    //recorriendo arreglo e imprimir cotizaciones
    var i: number = 0

    //insertamos los datos por id_proveedor en el arreglo 
    for (const j in this.allItems) {

      this.data_dett.push(
        [
          this.allItems[j]
        ]);

      // this.pdfCotizacion(this.data_dett, Number(a));
      // console.log("data_dett", this.data_dett);

    }

    // this.pdfOrden(this.data_dett);
    this.PDF.generarPDForden(this.data_dett);
    //console.log("a    ", a);
    console.log("data_dett", this.data_dett);

    this.data_dett = new Array;

  }

  //#region pdf

  pdfOrden(datos: Array<any> = []) {

    console.info("datos[0].descripcion_orden: " + datos[0].descripcion_orden);

    let doc = new jsPDF();

    let imgBase64 = 'data:image/jpeg;base64,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';

    doc.addImage(imgBase64, 'JPEG', 12, 2, 35, 35);

    doc.text(120, 20, 'ORDEN DE TRABAJO # ' + datos[0][0].id_orden);

    //Rectangulo folio fiscal
    doc.setDrawColor(0);
    doc.setTextColor(255, 255, 255);
    // doc.setFillColor(234, 234, 234); //color gris
    doc.setFillColor(0, 102, 204);//color azul (0, 0, 255) o celeste
    // doc.roundedRect(12, 35, 190, 15, 1, 1, 'F');
    // doc.rect(12, 35, 190, 15, 1, 1, 'FD');
    doc.rect(12, 35, 190, 15, 'F')

    doc.setFontSize(12);

    doc.text(14, 40, 'Fecha de Creacion:');
    var d = new Date(datos[0][0].fecha_creacion);
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();
    doc.text(55, 40, curr_date + "/" + curr_month + "/" + curr_year);
    doc.text(14, 46, 'Descripcion:');
    doc.text(40, 46, datos[0][0].descripcion_orden);

    doc.setDrawColor(0);
    doc.setFillColor(0, 102, 204);
    doc.setTextColor(255, 255, 255);

    doc.rect(12, 60, 75, 10, 'F');

    doc.text(14, 67, 'Datos Generales:');

    doc.setTextColor(0, 0, 0);

    doc.text(14, 76, 'Emisor:');
    doc.text(30, 76, datos[0][0].nombre_usuario_creacion);
    doc.text(14, 82, 'Fecha de emision:');
    var d2 = new Date();
    var curr_date2 = d2.getDate();
    var curr_month2 = d2.getMonth() + 1; //Months are zero based
    var curr_year2 = d2.getFullYear();
    doc.text(50, 82, curr_date2 + "/" + curr_month2 + "/" + curr_year2);
    // doc.text(14, 89, 'Otros:');
    // doc.text(35, 89, 'otros');
    // doc.text(14, 96, 'Otros:');
    // doc.text(35, 96, 'otros');
    // doc.text(14, 104, 'Otros:');
    // doc.text(35, 104, 'otros');

    //datos de las tablas
    const headDeficiencias = [
      { 'title': '#', 'dataKey': 'linea' },
      { 'title': '# Deficiencia', 'dataKey': 'idDeficiencia' },
      { 'title': 'Descripcion', 'dataKey': 'descDef' },
      { 'title': 'Fecha', 'dataKey': 'fechDes' }
    ]

    let dataDeficiencias = [];

    //datos de las tablas
    const headRepuestos = [
      { 'title': '# Deficiencia', 'dataKey': 'numDef' },
      { 'title': 'Pieza', 'dataKey': 'pieza' },
      { 'title': 'Prioridad', 'dataKey': 'prioridad' },
      { 'title': 'Cantidad Solicitada', 'dataKey': 'cant' }
    ]

    let dataRepuestos = [];

    let cont = 0;

    for (const j in datos) {

      var d3 = new Date(datos[j][0].fecha_deficiencia);
      var curr_date3 = d3.getDate();
      var curr_month3 = d3.getMonth() + 1; //Months are zero based
      var curr_year3 = d3.getFullYear();

      cont = cont + 1;
      //llenando detalle
      dataDeficiencias.push({
        linea: cont,
        idDeficiencia: datos[j][0].id_deficiencia,
        descDef: datos[j][0].descripcion_deficiencia,
        fechDes: curr_date3 + "/" + curr_month3 + "/" + curr_year3,
      })

    }

    cont = 0;

    for (const j in datos) {

      dataRepuestos.push({
        numDef: datos[j][0].id_deficiencia,
        pieza: datos[j][0].nombre_parte,
        prioridad: datos[j][0].prioridad,
        cant: datos[j][0].cantidad_piezas,
      })

    }



    //titulo de la tabla
    doc.text(90, 115, 'DEFICIENCIAS');

    //tabla deficiencia
    doc.autoTable(headDeficiencias, dataDeficiencias, {
      theme: 'striped',
      tableLineWidth: 0.75,
      // startY: margen_superior,
      margin: {
        horizontal: 10,
        top: 120
      },
      styles: { cellPadding: 1, overflow: 'linebreak' },
      headStyles: {
        minCellHeight: 5,
        fontSize: 10,
        halign: 'left',
        fillColor: [0, 102, 204]
      },
      bodyStyles: { minCellHeight: 5, fontSize: 9, textColor: 0 },
      pageBreak: 'avoid',
      // columnStyles: columnStyle,
      // addPageContent: header,
    });

    let ultimaPos = doc.autoTable.previous.finalY + 20

    //titulo de la tabla
    doc.text(80, ultimaPos, 'REPUESTOS SOLICITADOS');
    //tabla Repuestos
    doc.autoTable(headRepuestos, dataRepuestos, {
      theme: 'striped',
      tableLineWidth: 0.75,
      startY: doc.previousAutoTable.finalY + 25,

      margin: {
        horizontal: 10,
        top: 200
      },
      styles: { cellPadding: 1, overflow: 'linebreak' },
      headStyles: {
        minCellHeight: 5,
        fontSize: 10,
        halign: 'left',
        fillColor: [0, 102, 204]
      },
      bodyStyles: { minCellHeight: 5, fontSize: 9, textColor: 0 },
      pageBreak: 'avoid',
      // columnStyles: columnStyle,
      // addPageContent: header,
    });

    //linea para la firma
    doc.setLineWidth(0.5)
    doc.line(10, doc.previousAutoTable.finalY + 40, 90, doc.previousAutoTable.finalY + 40)

    doc.text(12, doc.previousAutoTable.finalY + 45, 'Firma');

    //impresion de la orden de trabajo
    doc.save('Orden de trabajo.pdf');

  }
  //#endregion

  filtrar($evet) {
    this.allItems = $evet;
    this.setPage(1);
  }
}
