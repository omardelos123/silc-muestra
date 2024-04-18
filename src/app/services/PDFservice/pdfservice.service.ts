import { Injectable } from '@angular/core';

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

//declare let jsPDF;

@Injectable({
  providedIn: 'root'
})
export class PDFserviceService {


  pageWidth: 0;
  pageHeight: 0;
  doc = new jsPDF();

  cantidad_caracteres: Number = 0;
  cantidad_caracteres_impuesto: Number = 0;
  cantidad_caracteres_manejo_envio: Number = 0;
  cantidad_caracteres_resta_impuesto: Number = 0;
  cantidad_caracteres_resta_manejo_envio: Number = 0;

  constructor() {
    this.carga_IMG();

    this.pageWidth = this.doc.internal.pageSize.width || this.doc.internal.pageSize.getWidth();
    this.pageHeight = this.doc.internal.pageSize.height || this.doc.internal.pageSize.getHeight();
  }

  getMaxWidth(): number{
    return this.doc.internal.pageSize.width || this.doc.internal.pageSize.getWidth();
  }
  getMaxSize(): number{
    return this.doc.internal.pageSize.height || this.doc.internal.pageSize.getHeight();
  }

  public exportarPDF() {
    console.log("Servicio PDF Funcionando");
  }
  imgBase64 = '';
  carga_IMG() {
    this.imgBase64 = 'data:image/jpeg;base64,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';
  }

  generarPDFrep_inventario(datos: any[]) {
    this.doc = new jsPDF({orientation: 'l'});
    var line_init = 0;
    line_init += 10;

    ////////////////////////////////////////
    //////////     ENCABEZADO       ////////
    ////////////////////////////////////////

    this.doc.addImage(this.imgBase64, 'JPEG', 12, 2, 35, 35);

    //this.doc.text(75, 35, 'Reporte de Inventarios'); //* ANTERIOR
    this.doc.autoTableText('Reporte de Inventarios', this.getMaxWidth() / 2, line_init, { valign: 'middle', halign: 'center' });
    line_init += 40;

    this.doc.setLineWidth(0.5)
    this.doc.line(10, 40, this.getMaxWidth()-10, 40)

    let head = [
      { 'title': '#', 'dataKey': 'linea' },
      { 'title': 'Artículo', 'dataKey': 'articulo' },
      { 'title': 'Almacén', 'dataKey': 'almacen' },
      { 'title': 'Ubicación', 'dataKey': 'ubi' },
      { 'title': 'Descripción', 'dataKey': 'desc' },
      { 'title': 'Disp', 'dataKey': 'disp' },
      { 'title': 'Min', 'dataKey': 'min' },
      { 'title': 'Físico', 'dataKey': 'conteo' },
      { 'title': 'Precio', 'dataKey': 'precio' },
      { 'title': 'Tot. Precio', 'dataKey': 'total_precio' }
    ]

    this.doc.autoTable(head, datos, {
      startY: line_init,
      styles: { fontSize: 9, cellWidth: 'wrap' },
      theme: 'striped',
      headStyles: {
        halign:'center'
      },
      bodyStyles: {
        lineWidth: 0.2,
      },
      columnStyles: {
        linea: { columnWidth: 'auto', halign: 'center' },
        articulo: {columnWidth: 'auto'},
        almacen: { columnWidth: 'auto' },
        ubi: { columnWidth: 'auto' },
        desc: { columnWidth: 'auto' },
        precio: { columnWidth: 'auto', halign: 'right' },
        disp: { columnWidth: 'auto', halign: 'right' },
        min: { columnWidth: 'auto', halign: 'right' },
        conteo: { columnWidth: 'auto' },
        total_precio: { columnWidth: 'auto', halign: 'right'}
      },
    });
    
    this.doc.save('Reporte de Inventarios.pdf');
  }


  generarPDFpedido(datos: Array<any> = [], i: number) {
    this.doc = new jsPDF();
    this.doc.addImage(this.imgBase64, 'JPEG', 12, 2, 35, 35)

    this.doc.setFont("times");

    this.doc.setFontType("bold");

    //seccion de arriba (parte superior derecha)
    this.doc.text(150, 20, 'PEDIDO # ' + datos[0][0].id_pedido);
    this.doc.setFontType("italic");
    //Rectangulo folio fiscal
    this.doc.setDrawColor(0);
    this.doc.setTextColor(255, 255, 255);
    //this.doc.setFillColor(234, 234, 234); //color gris
    this.doc.setFillColor(0, 102, 204);//color azul (0, 0, 255) o celeste
    //this.doc.roundedRect(12, 35, 190, 15, 1, 1, 'F');
    //this.doc.rect(12, 35, 190, 15, 1, 1, 'FD');
    this.doc.rect(12, 35, 190, 15, 'F')

    this.doc.setFontSize(12);


    this.doc.text(14, 40, 'Fecha:');

    //corte de fecha para mostrarla en el reporte
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();
    console.info("fecha: " + curr_date + "/" + curr_month + "/" + curr_year)
    this.doc.text(40, 40, curr_date + "/" + curr_month + "/" + curr_year);
    this.doc.text(14, 46, 'Pedido #:');
    this.doc.text(40, 46, datos[0][0].id_pedido + ' - ' + (i + 1));

    this.doc.setDrawColor(0);
    //this.doc.setFillColor(234, 234, 234);
    this.doc.setFillColor(0, 102, 204);
    this.doc.setTextColor(255, 255, 255);

    //this.doc.setFillColor(0, 102, 204);//color azul (0, 0, 255) o celeste
    this.doc.rect(12, 60, 75, 10, 'F');

    //this.doc.roundedRect(12, 60, 75, 10, 1, 1, 'F');

    this.doc.text(14, 67, 'Datos Proveedor:');

    this.doc.setTextColor(0, 0, 0);

    this.doc.text(14, 76, 'Nombre:');
    this.doc.text(35, 76, datos[0][0].nombre_proveedor);
    this.doc.text(14, 82, 'Direccion:');
    this.doc.text(35, 82, datos[0][0].direccion_proveedor);
    this.doc.text(14, 89, 'Telefono:');
    this.doc.text(35, 89, datos[0][0].telefono_proveedor);
    this.doc.text(14, 96, 'Email:');
    this.doc.text(35, 96, datos[0][0].correo_proveedor);
    this.doc.text(14, 104, 'Contacto:');
    this.doc.text(35, 104, datos[0][0].contacto_proveedor);

    this.doc.setDrawColor(0);
    //this.doc.setFillColor(234, 234, 234);
    this.doc.setFillColor(0, 102, 204);
    this.doc.setTextColor(255, 255, 255);

    //this.doc.setFillColor(0, 102, 204);//color azul (0, 0, 255) o celeste
    this.doc.rect(126, 60, 75, 10, 'F');
    //this.doc.roundedRect(126, 60, 75, 10, 1, 1, 'F');

    this.doc.text(128, 67, 'Datos de la Empresa:');

    this.doc.setTextColor(0, 0, 0);
    this.doc.text(128, 76, 'Nombre:');
    this.doc.text(149, 76, datos[0][0].nombre_compania);
    this.doc.text(128, 82, 'Direccion:');
    this.doc.text(149, 82, datos[0][0].direccion_compania);
    this.doc.text(128, 89, 'Telefono:');
    this.doc.text(149, 89, datos[0][0].telefono_compania);
    this.doc.text(128, 96, 'Email:');
    this.doc.text(149, 96, datos[0][0].correo_compania);
    this.doc.text(128, 104, 'Contacto:');
    this.doc.text(149, 104, datos[0][0].contacto_compania);

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

    let subTotal: number = 0;
    let total: number = 0;
    let impuesto: number = 0;
    let manejoEnvio: number = 0;

    for (const j in datos) {


      data.push({
        cantidad: datos[j][0].cantidad_pedido,
        precio: datos[j][0].precio,
        fabricante: datos[j][0].nombre_fabricante.trim(),
        pieza: datos[j][0].nombre_parte,
        descuento: datos[j][0].descuento,
        total: Math.round(datos[j][0].total_linea * 100) / 100,
      })

      subTotal = subTotal + Math.round(datos[j][0].total_linea * 100) / 100;

      // }  

      // console.log("data: ", data);

    }

    console.log("data que va en la cotizacion: ", data);


    this.doc.autoTable(head, data, {
      styles: { fontSize: 9, cellWidth: 'wrap' },
      theme: 'striped',
      bodyStyles: {
        //margin: 40,
        //fontSize: 10,
        lineWidth: 0.2,
        //lineColor: [0, 0, 0]
      },
      margin: {
        horizontal: 10,
        top: 115
      },
      headStyles: {
        rowHeight: 5,
        fontSize: 10,
        halign: 'left',
        fillColor: [0, 102, 204]
      },
      pageBreak: 'avoid',
      // columnStyles: columnStyle,
      // addPageContent: header,
    });

    total = (subTotal * datos[0][0].impuesto / 100);
    total = total + subTotal + datos[0][0].manejo_de_envio;

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

    this.doc.setFontType('normal');
    this.doc.setFontType("normal");


    this.doc.text(160, this.doc.autoTable.previous.finalY + 15, 'Subtotal ' + '$ ');
    //*******NUMEROS */
    this.doc.text(200, this.doc.autoTable.previous.finalY + 15, subRounded, 'right');

    this.doc.text(158, this.doc.autoTable.previous.finalY + 22, 'Impuesto ' + '$ ');
    //*******NUMEROS */
    this.doc.text(200, this.doc.autoTable.previous.finalY + 22, itbmsRounded, 'right');

    this.doc.setLineWidth(0.5)

    this.doc.line(182, this.doc.autoTable.previous.finalY + 25, 203, this.doc.previousAutoTable.finalY + 25)

    let totalSubItbms: number;
    totalSubItbms = Number(subRounded) + Number(itbmsRounded);
    totalSubItbms = Math.round(totalSubItbms * 100) / 100;
    //*******NUMEROS */
    this.doc.text(200, this.doc.autoTable.previous.finalY + 30, String(totalSubItbms), 'right');

    this.doc.text(150, this.doc.autoTable.previous.finalY + 36, 'Manejo Envio ' + '$ ');
    //*******NUMEROS */
    this.doc.text(200, this.doc.autoTable.previous.finalY + 36, String((((datos[0][0].manejo_de_envio * 100)) / 100).toFixed(2)), 'right');

    this.doc.setLineWidth(0.5)
    this.doc.line(182, this.doc.autoTable.previous.finalY + 39, 203, this.doc.previousAutoTable.finalY + 39)

    this.doc.setLineWidth(0.5)
    this.doc.line(182, this.doc.autoTable.previous.finalY + 40, 203, this.doc.previousAutoTable.finalY + 40)

    this.doc.text(166, this.doc.autoTable.previous.finalY + 46, 'Total ' + '$ ');
    //*******NUMEROS */
    this.doc.text(200, this.doc.autoTable.previous.finalY + 46, String(Math.round(total * 100) / 100), 'right');


    this.doc.save('Pedido - ' + datos[0][0].nombre_proveedor + '.pdf');
  }


  generarPDFdespacho(datos: Array<any> = []) {
    this.doc = new jsPDF();

    //linea de codigo para agregar pagina nueva
    let pageHeight = this.doc.internal.pageSize.height;

    console.log("pageHeight: " + pageHeight);

    this.doc.addImage(this.imgBase64, 'JPEG', 12, 2, 35, 35);

    this.doc.text(120, 20, 'ORDEN DE DESPACHO # ' + datos[0][0].id_despacho);

    //Rectangulo folio fiscal
    this.doc.setDrawColor(0);
    this.doc.setTextColor(255, 255, 255);
    //this.doc.setFillColor(234, 234, 234); //color gris
    this.doc.setFillColor(0, 102, 204);//color azul (0, 0, 255) o celeste
    //this.doc.roundedRect(12, 35, 190, 15, 1, 1, 'F');
    //this.doc.rect(12, 35, 190, 15, 1, 1, 'FD');
    this.doc.rect(12, 35, 190, 15, 'F')

    this.doc.setFontSize(10);

    this.doc.text(14, 40, 'Fecha de Creacion:');
    var d = new Date(datos[0][0].fecha_creacion);
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();
    this.doc.text(55, 40, curr_date + "/" + curr_month + "/" + curr_year);
    this.doc.text(14, 46, 'Descripcion:');
    this.doc.text(40, 46, datos[0][0].descripcion);


    //datos de las tablas
    const headSolDest = [
      { 'title': 'SOLICITADO', 'dataKey': 'solicitado' },
      { 'title': 'DESTINO', 'dataKey': 'destino' },
    ]

    let dataSolDest = [];

    //datos de las tablas
    const headCaracteristicas = [
      { 'title': 'Sistema', 'dataKey': 'sistema' },
      { 'title': 'Clase', 'dataKey': 'clase' },
      { 'title': 'Modelo', 'dataKey': 'modelo' },
      { 'title': 'Placa', 'dataKey': 'placa' }
    ]

    let dataCaracteristicas = [];

    //datos de las tablas
    const headSalLleg = [
      { 'title': 'Fecha Salida', 'dataKey': 'fechSal' },
      { 'title': 'Valor Salida', 'dataKey': 'valSal' },
      { 'title': 'Fecha Llegada', 'dataKey': 'fechLleg' },
      { 'title': 'Valor Llegada', 'dataKey': 'valLleg' },
      { 'title': 'Distancia Recorrida', 'dataKey': 'distReco' }
    ]

    let dataSalLleg = [];

    let cont = 0;

    for (const j in datos) {

      //llenando detalle
      dataSolDest.push({
        solicitado: datos[j][0].nombre_usuario_creacion,
        destino: datos[j][0].nombre_destino
      })

    }

    cont = 0;

    for (const j in datos) {

      dataCaracteristicas.push({
        sistema: datos[j][0].nombre_sistema,
        clase: datos[j][0].nombre_clase,
        modelo: datos[j][0].nombre_modelo,
        placa: datos[j][0].placa,
      })

    }

    for (const j in datos) {

      var d = new Date(datos[j][0].fecha_salida);
      var curr_date = d.getDate();
      var curr_month = d.getMonth() + 1; //Months are zero based
      var curr_year = d.getFullYear();

      //fecha de llegada
      var dLlegada = new Date(datos[j][0].fecha_llegada);
      var curr_dateLlegada = dLlegada.getDate();
      var curr_monthLlegada = dLlegada.getMonth() + 1; //Months are zero based
      var curr_yearLlegada = dLlegada.getFullYear();

      let llegada: any;
      let distancia: any;

      console.log('(Number(datos[j][0].valor_llegada): ' + datos[j][0].valor_llegada);

      llegada = datos[j][0].valor_llegada;

      llegada = String(llegada).substring(0, Number(String(llegada).indexOf(" ")));
      //alert('llegada: ' + llegada);

      if (llegada > 0) {

        llegada = datos[j][0].valor_llegada;
        //alert('llegada: ' + llegada);
      } else {

        llegada = '';

      }

      distancia = datos[j][0].distancia_recorrida;
      distancia = String(distancia).substring(0, Number(String(distancia).indexOf(" ")));
      // console.log('Number(datos[j][0].distancia_recorrida): ' + Number(datos[j][0].distancia_recorrida));

      if (distancia > 0) {

        distancia = datos[j][0].distancia_recorrida;

      } else {

        distancia = '';

      }

      dataSalLleg.push({
        fechSal: curr_date + "/" + curr_month + "/" + curr_year,
        valSal: datos[j][0].valor_recorrido,
        fechLleg: curr_dateLlegada + "/" + curr_monthLlegada + "/" + curr_yearLlegada,
        valLleg: llegada,
        distReco: distancia

      })

    }

    //titulo de la tabla
    this.doc.setFontSize(18);

    this.doc.setTextColor(0, 0, 0);
    this.doc.text(90, 60, 'SOLICITUD');

    //tabla deficiencia
    this.doc.autoTable(headSolDest, dataSolDest, {
      theme: 'striped',
      margin: {
        horizontal: 10,
        top: 65
      },
      styles: { cellPadding: 1, overflow: 'linebreak' },
      headStyles: {
        minCellHeight: 5,
        fontSize: 10,
        halign: 'center',
        fillColor: [0, 102, 204]
      },
      bodyStyles: { minCellHeight: 5, fontSize: 9, textColor: 0, lineWidth: 0.2, },
      pageBreak: 'avoid',
      // columnStyles: columnStyle,
      // addPageContent: header,
    });

    let ultimaPos = this.doc.autoTable.previous.finalY + 20

    //titulo de la tabla
    this.doc.text(80, ultimaPos, 'CARACTERISTICAS');
    //tabla Repuestos
    this.doc.autoTable(headCaracteristicas, dataCaracteristicas, {
      theme: 'striped',
      startY: this.doc.previousAutoTable.finalY + 25,

      margin: {
        horizontal: 10,
        top: 200
      },
      styles: { cellPadding: 1, overflow: 'linebreak' },
      headStyles: {
        minCellHeight: 5,
        fontSize: 10,
        halign: 'center',
        fillColor: [0, 102, 204]
      },
      bodyStyles: { minCellHeight: 5, fontSize: 9, textColor: 0, lineWidth: 0.2, },
      pageBreak: 'avoid',
      // columnStyles: columnStyle,
      // addPageContent: header,
    });

    ultimaPos = this.doc.autoTable.previous.finalY + 20

    //tabla Repuestos
    this.doc.autoTable(headSalLleg, dataSalLleg, {
      theme: 'grid',
      startY: this.doc.previousAutoTable.finalY + 25,

      margin: {
        horizontal: 10,
        top: 200
      },
      styles: { cellPadding: 1, overflow: 'linebreak' },
      headStyles: {
        minCellHeight: 5,
        fontSize: 10,
        halign: 'center',
        fillColor: [0, 102, 204]
      },
      bodyStyles: { minCellHeight: 5, fontSize: 9, textColor: 0, lineWidth: 0.2, },
      pageBreak: 'avoid',
      // columnStyles: columnStyle,
      // addPageContent: header,
    });

    //entrega del vehiculo
    //this.doc.text(12, ultimaPos + 35, 'SALIDA');
    this.doc.setFont("helvetica");
    this.doc.setFontSize(9);
    this.doc.text(12, this.doc.previousAutoTable.finalY + 10, 'SALIDA');


    this.doc.setFontSize(8);
    //linea para la firma
    this.doc.setLineWidth(0.5)
    this.doc.line(10, this.doc.previousAutoTable.finalY + 20, 90, this.doc.previousAutoTable.finalY + 20)
    this.doc.text(12, this.doc.previousAutoTable.finalY + 25, 'Firma Entrega');

    this.doc.setLineWidth(0.5)
    this.doc.line(10, this.doc.previousAutoTable.finalY + 35, 90, this.doc.previousAutoTable.finalY + 35)
    this.doc.text(12, this.doc.previousAutoTable.finalY + 40, 'Firma Recibe');

    //entrega del vehiculo
    this.doc.setFontSize(9);
    this.doc.text(15, this.doc.previousAutoTable.finalY + 70, 'LLEGADA');

    //linea para la firma
    this.doc.setFontSize(8);
    this.doc.setLineWidth(0.5)
    this.doc.line(10, this.doc.previousAutoTable.finalY + 80, 90, this.doc.previousAutoTable.finalY + 80)
    this.doc.text(12, this.doc.previousAutoTable.finalY + 85, 'Firma Entrega');

    this.doc.setLineWidth(0.5)
    this.doc.line(10, this.doc.previousAutoTable.finalY + 95, 90, this.doc.previousAutoTable.finalY + 95)
    this.doc.text(12, this.doc.previousAutoTable.finalY + 100, 'Firma Recibe');

    //impresion de la orden de trabajo
    this.doc.save('Orden de Despacho.pdf');
  }

  generarPDForden(datos: Array<any> = []) {
    console.info("datos[0].descripcion_orden: " + datos[0][0].descripcion_orden);

    this.doc = new jsPDF();

    this.doc.setFont("times");
    this.doc.setFontType("bold");
    this.doc.addImage(this.imgBase64, 'JPEG', 12, 2, 35, 35);

    this.doc.text(120, 20, 'ORDEN DE TRABAJO # ' + datos[0][0].id_orden);
    this.doc.setFontType("italic");
    //Rectangulo folio fiscal
    this.doc.setDrawColor(0);
    this.doc.setTextColor(255, 255, 255);
    //this.doc.setFillColor(234, 234, 234); //color gris
    this.doc.setFillColor(0, 102, 204);//color azul (0, 0, 255) o celeste
    //this.doc.roundedRect(12, 35, 190, 15, 1, 1, 'F');
    //this.doc.rect(12, 35, 190, 15, 1, 1, 'FD');
    this.doc.rect(12, 35, 190, 15, 'F')

    this.doc.setFontSize(12);

    this.doc.text(14, 40, 'Fecha de Creacion:');
    var d = new Date(datos[0][0].fecha_creacion);
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();
    this.doc.text(55, 40, curr_date + "/" + curr_month + "/" + curr_year);
    this.doc.text(14, 46, 'Descripcion:');
    this.doc.text(40, 46, datos[0][0].descripcion_orden);

    this.doc.setDrawColor(0);
    this.doc.setFillColor(0, 102, 204);
    this.doc.setTextColor(255, 255, 255);

    this.doc.rect(12, 60, 75, 10, 'F');

    this.doc.text(14, 67, 'Datos Generales:');

    this.doc.setTextColor(0, 0, 0);

    this.doc.text(14, 76, 'Emisor:');
    this.doc.text(30, 76, datos[0][0].nombre_usuario_creacion);
    this.doc.text(14, 82, 'Fecha de emision:');
    var d2 = new Date();
    var curr_date2 = d2.getDate();
    var curr_month2 = d2.getMonth() + 1; //Months are zero based
    var curr_year2 = d2.getFullYear();
    this.doc.text(50, 82, curr_date2 + "/" + curr_month2 + "/" + curr_year2);
    //this.doc.text(14, 89, 'Otros:');
    //this.doc.text(35, 89, 'otros');
    //this.doc.text(14, 96, 'Otros:');
    //this.doc.text(35, 96, 'otros');
    //this.doc.text(14, 104, 'Otros:');
    //this.doc.text(35, 104, 'otros');

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

    this.doc.setFontType("normal");
    this.doc.text(90, 115, 'DEFICIENCIAS');

    //tabla deficiencia
    this.doc.autoTable(headDeficiencias, dataDeficiencias, {
      theme: 'striped',
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
      bodyStyles: { minCellHeight: 5, fontSize: 9, textColor: 0, lineWidth: 0.2 },
      pageBreak: 'avoid',
      // columnStyles: columnStyle,
      // addPageContent: header,
    });

    let ultimaPos = this.doc.autoTable.previous.finalY + 20

    //titulo de la tabla
    this.doc.text(80, ultimaPos, 'REPUESTOS SOLICITADOS');
    //tabla Repuestos
    this.doc.autoTable(headRepuestos, dataRepuestos, {
      theme: 'striped',
      startY: this.doc.previousAutoTable.finalY + 25,

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
      bodyStyles: { minCellHeight: 5, fontSize: 9, textColor: 0, lineWidth: 0.2 },
      pageBreak: 'avoid',
      // columnStyles: columnStyle,
      // addPageContent: header,
    });

    let pos_vertical = this.doc.autoTable.previous.finalY + 40;
    if (pos_vertical > (this.pageHeight - 50)) {
      this.doc.addPage();
      pos_vertical = 50;
      this.doc.autoTable.previous.finalY = 0;
    }

    //linea para la firma
    this.doc.setLineWidth(0.5)
    this.doc.line(10, pos_vertical, 90, pos_vertical)
    pos_vertical += 5;
    this.doc.text(12, pos_vertical, 'Firma');

    //impresion de la orden de trabajo
    this.doc.save('Orden de trabajo.pdf');

  }

  generarPDFrep_sistema(datos: Array<any> = [], tipo: String) {
    this.doc = new jsPDF();

    var line_init = 0;
    line_init += 10;

    ////////////////////////////////////////
    //////////     ENCABEZADO       ////////
    ////////////////////////////////////////

    this.doc.addImage(this.imgBase64, 'JPEG', 12, 2, 35, 35);

    console.log("pageWidth " + this.pageWidth);
    console.log("pageHeight " + this.pageHeight);
    //this.doc.text(75, 35, 'Reporte de Inventarios'); //* ANTERIOR
    this.doc.autoTableText('Reporte de Sistema', this.pageWidth / 2, line_init, { valign: 'middle', halign: 'center' });
    this.doc.autoTableText(tipo, this.pageWidth / 2, line_init + 10, { valign: 'middle', halign: 'center' });
    line_init += 40;

    this.doc.setLineWidth(0.5)
    this.doc.line(10, 40, 200, 40)

    const head = [
      { 'title': 'No', 'dataKey': 'id_sistema' },
      { 'title': 'Modelo', 'dataKey': 'modelo' },
      { 'title': 'Placa', 'dataKey': 'numero_placa' },
      { 'title': 'No Serie', 'dataKey': 'numero_serie' },
      { 'title': 'Tipo', 'dataKey': 'tipo_sistema' },
      { 'title': 'Fabricante', 'dataKey': 'fabricante' },
      { 'title': 'Clase', 'dataKey': 'clase' },
      { 'title': 'Activo', 'dataKey': 'sw_activo' }
    ]

    ////////////////////////////////////////
    //////////CUERPO Y DATOS        ////////
    ////////////////////////////////////////


    this.doc.autoTable(head, datos, {
      startY: line_init,
      styles: { fontSize: 9, cellWidth: 'wrap' },
      theme: 'striped',
      bodyStyles: {
        //margin: 40,
        //fontSize: 10,
        lineWidth: 0.2,
        //lineColor: [0, 0, 0]
      },
      columnStyles: {
        id_sistema: { columnWidth: 7, halign: 'left' },
        modelo: { columnWidth: 20, halign: 'left' },
        numero_placa: { columnWidth: 14, halign: 'left' },
        numero_serie: { columnWidth: 19, halign: 'left' },
        tipo_sistema: { columnWidth: 14, halign: 'left' },
        fabricante: { columnWidth: 14, halign: 'left' },
        clase: { columnWidth: 14, halign: 'left' },
        sw_activo: { columnWidth: 8, halign: 'left' },
        
      },

    });

    this.doc.save('Reporte de Sistema ' + tipo + '.pdf');
  }

  generarPDFrep_operador(datos: Array<any> = [], tipo: String) {
    this.doc = new jsPDF();
    var line_init = 0;
    line_init += 10;

    ////////////////////////////////////////
    //////////     ENCABEZADO       ////////
    ////////////////////////////////////////

    this.doc.addImage(this.imgBase64, 'JPEG', 12, 2, 35, 35);

    console.log("pageWidth " + this.pageWidth);
    console.log("pageHeight " + this.pageHeight);
    //this.doc.text(75, 35, 'Reporte de Inventarios'); //* ANTERIOR
    this.doc.autoTableText('Reporte de Operador', this.pageWidth / 2, line_init, { valign: 'middle', halign: 'center' });
    this.doc.autoTableText(tipo, this.pageWidth / 2, line_init + 10, { valign: 'middle', halign: 'center' });
    line_init += 40;

    this.doc.setLineWidth(0.5)
    this.doc.line(10, 40, 200, 40)

    const head = [
      { 'title': 'Id', 'dataKey': 'id_usuario' },
      { 'title': 'C.I.P', 'dataKey': 'identidad_personal' },
      { 'title': 'Rol', 'dataKey': 'nombre_rol' },
      { 'title': 'Nombre', 'dataKey': 'nombre' },
      { 'title': 'Sexo', 'dataKey': 'genero' },
      { 'title': 'Teléfono', 'dataKey': 'telefono' },
      { 'title': 'T. Licencia', 'dataKey': 'licencia' },
      { 'title': 'Correo', 'dataKey': 'correo' },
      { 'title': 'F. Inicio', 'dataKey': 'fecha_inicio' }
      // { 'title': '', 'dataKey': 'sw_activo' },
    ]

    ////////////////////////////////////////
    //////////CUERPO Y DATOS        ////////
    ////////////////////////////////////////


    this.doc.autoTable(head, datos, {
      startY: line_init,
      styles: { fontSize: 9, cellWidth: 'wrap' },
      theme: 'striped',
      bodyStyles: {
        //margin: 40,
        //fontSize: 10,
        lineWidth: 0.2,
        //lineColor: [0, 0, 0]
      },
      columnStyles: {
        id_usuario: { columnWidth: 8, halign: 'center' },
        identidad_personal: { columnWidth: 20 },
        nombre_rol: { columnWidth: 20 },
        nombre: { columnWidth: 20 },
        genero: { columnWidth: 10 },
        telefono: { columnWidth: 20, halign: 'right' },
        licencia: { columnWidth: 10, halign: 'right' },
        correo: { columnWidth: 10, halign: 'right' },
        fecha_inicio: { columnWidth: 15 }
      },

    });

    this.doc.save('Reporte de Sistema ' + tipo + '.pdf');
  }

  generarPDFrep_mantenimiento_program(datos: Array<any> = [], tipo: String) {
    this.doc = new jsPDF();
    var line_init = 0;
    line_init += 10;

    ////////////////////////////////////////
    //////////     ENCABEZADO       ////////
    ////////////////////////////////////////

    this.doc.addImage(this.imgBase64, 'JPEG', 12, 2, 35, 35);

    console.log("pageWidth " + this.pageWidth);
    console.log("pageHeight " + this.pageHeight);
    //this.doc.text(75, 35, 'Reporte de Inventarios'); //* ANTERIOR
    this.doc.autoTableText('Reporte de Mantenimientos', this.pageWidth / 2, line_init, { valign: 'middle', halign: 'center' });
    this.doc.autoTableText(tipo, this.pageWidth / 2, line_init + 10, { valign: 'middle', halign: 'center' });
    line_init += 40;

    this.doc.setLineWidth(0.5)
    this.doc.line(10, 40, 200, 40)

    const head = [
      { 'title': 'No. Deficiencia', 'dataKey': 'id_deficiencia' },
      { 'title': 'Sistema', 'dataKey': 'sistema' },
      { 'title': 'Tipo Deficiencia', 'dataKey': 'tipo_deficiencia' },
      { 'title': 'Tipo Mantenimiento', 'dataKey': 'tipo_mantenimiento' },
      { 'title': 'Estatus', 'dataKey': 'estatus' },
      { 'title': 'Fecha Deficiencia', 'dataKey': 'fecha_deficiencia' }
      // { 'title': '', 'dataKey': 'sw_activo' },
    ]

    ////////////////////////////////////////
    //////////CUERPO Y DATOS        ////////
    ////////////////////////////////////////


    this.doc.autoTable(head, datos, {
      startY: line_init,
      styles: { fontSize: 9, cellWidth: 'wrap' },
      theme: 'striped',
      bodyStyles: {
        //margin: 40,
        //fontSize: 10,
        lineWidth: 0.2,
        //lineColor: [0, 0, 0]
      },
      // columnStyles: {
      //   linea: { columnWidth: 10, halign: 'center' },
      //   articulo: { columnWidth: 25 },
      //   almacen: { columnWidth: 35 },
      //   ubi: { columnWidth: 25 },
      //   desc: { columnWidth: 35 },
      //   precio: { columnWidth: 20, halign: 'right' },
      //   disp: { columnWidth: 10, halign: 'right' },
      //   min: { columnWidth: 10, halign: 'right' },
      //   conteo: { columnWidth: 15 }
      // },

    });

    this.doc.save('Reporte de Mantenimiento ' + tipo + '.pdf');
  }

  generarPDFrep_listado_inventario(datos: Array<any> = [], tipo: String) {
    this.doc = new jsPDF();
    var line_init = 0;
    line_init += 10;

    ////////////////////////////////////////
    //////////     ENCABEZADO       ////////
    ////////////////////////////////////////

    this.doc.addImage(this.imgBase64, 'JPEG', 12, 2, 35, 35);

    console.log("pageWidth " + this.pageWidth);
    console.log("pageHeight " + this.pageHeight);
    //this.doc.text(75, 35, 'Reporte de Inventarios'); //* ANTERIOR
    this.doc.autoTableText('Articulos debajo del mínimo', this.pageWidth / 2, line_init, { valign: 'middle', halign: 'center' });
    this.doc.autoTableText(tipo, this.pageWidth / 2, line_init + 10, { valign: 'middle', halign: 'center' });
    line_init += 40;

    this.doc.setLineWidth(0.5)
    this.doc.line(10, 40, 200, 40)

    const head = [
      { 'title': 'No. Parte', 'dataKey': 'numero_parte' },
      { 'title': 'Nombre', 'dataKey': 'nombre' },
      // { 'title': 'Descripcion', 'dataKey': 'descripcion' },
      { 'title': 'Proveedor', 'dataKey': 'proveedro' },
      { 'title': 'Fabricante', 'dataKey': 'fabricante' },
      { 'title': 'Cant. Disponible', 'dataKey': 'cant_disponible' },
      { 'title': 'Cant. Min. Permitida', 'dataKey': 'min_permitida' }
      // { 'title': '', 'dataKey': 'sw_activo' },
    ]

    ////////////////////////////////////////
    //////////CUERPO Y DATOS        ////////
    ////////////////////////////////////////


    this.doc.autoTable(head, datos, {
      startY: line_init,
      styles: { fontSize: 9, cellWidth: 'wrap' },
      headerStyles: {
        halign:'center'
      },
      theme: 'striped',
      bodyStyles: {
        //margin: 40,
        //fontSize: 10,
        lineWidth: 0.2,
        //lineColor: [0, 0, 0]
      },
      columnStyles: {
        numero_parte: { columnWidth: 'auto', halign: 'center' },
        nombre: { columnWidth: 'auto',  halign: 'center' },
        proveedro: { columnWidth: 'auto',  halign: 'center' },
        fabricante: { columnWidth: 'auto',  halign: 'center' },
        cant_disponible: { columnWidth: 'auto' ,  halign: 'right' },
        min_permitida: { columnWidth: 'auto', halign: 'right' }
      },

    });

    this.doc.save('Articulos debajo del mínimo ' + tipo + '.pdf');
  }

  generarPDFrep_gasto_equipo(datos: Array<any> = [], tipo: String, metadatos: any) {
    this.doc = new jsPDF();
    var line_init = 20;

    ////////////////////////////////////////
    //////////     ENCABEZADO       ////////
    ////////////////////////////////////////

    this.doc.addImage(this.imgBase64, 'JPEG', 12, 2, 35, 35);

    console.log("pageWidth " + this.pageWidth);
    console.log("pageHeight " + this.pageHeight);

    // this.doc.text(line_init, 20, 'Informe de Gastos');
    
    this.doc.autoTableText('Informe de Gastos', this.getMaxWidth() / 2, line_init, { valign: 'middle', halign: 'center' });

    // this.doc.autoTableText('Reporte de Listado de Inventario', this.pageWidth / 2, line_init, { valign: 'middle', halign: 'center' });
    // this.doc.autoTableText(tipo, this.pageWidth / 2, line_init + 10, { valign: 'middle', halign: 'center' });

    

    this.doc.setLineWidth(0.5)
    this.doc.line(10, 40, 200, 40)

    // this.doc.text(line_init, (this.getMaxWidth() / 2 )/2 , 'Informe de Gastos LEFT');
    let pos_x = this.getMaxWidth() * 0.22;
    let pos_y_metadatos = line_init + 30;
    
    line_init += 30;
    // Metadatos Izquierda
    this.doc.setFontSize(12);
    this.doc.setFontType("bold");
    this.doc.setTextColor(39, 73, 187);
    this.doc.autoTableText('Informe de Gastos', this.getMaxWidth() * 0.09, line_init, { valign: 'middle', halign: 'left' });
    this.doc.setTextColor(0,0,0);
    this.doc.setFontType("normal");
    line_init += 5;
    
    this.doc.setFontSize(8);
    this.doc.autoTableText('Numero de Equipo:', pos_x, line_init, { valign: 'middle', halign: 'right' });
    this.doc.setFontType("italic");
    this.doc.autoTableText(metadatos.numero_equipo, pos_x + 1, line_init, { valign: 'middle', halign: 'left' });
    this.doc.setFontType("normal");
    line_init += 4;
    // this.doc.autoTableText('Propiedad 2:', pos_x, line_init, { valign: 'middle', halign: 'right' });
    // this.doc.setFontType("italic");
    // this.doc.autoTableText('Parametro 2', pos_x + 1, line_init, { valign: 'middle', halign: 'left' });
    // this.doc.setFontType("normal");
    line_init += 4;
    // this.doc.autoTableText('Propiedads 3:', pos_x, line_init, { valign: 'middle', halign: 'right' });
    // this.doc.setFontType("italic");
    // this.doc.autoTableText('Parametro 3', pos_x + 1, line_init, { valign: 'middle', halign: 'left' });
    // this.doc.setFontType("normal");
    line_init += 4;
    // this.doc.autoTableText('Propiedad xwl 4:', pos_x, line_init, { valign: 'middle', halign: 'right' });
    // this.doc.setFontType("italic");
    // this.doc.autoTableText('Parametro 4', pos_x + 1, line_init, { valign: 'middle', halign: 'left' });
    // this.doc.setFontType("normal");
    line_init += 4;
    // this.doc.autoTableText('Propiedad xwl 5:', pos_x, line_init, { valign: 'middle', halign: 'right' });
    // this.doc.setFontType("italic");
    // this.doc.autoTableText('Parametro 5', pos_x + 1, line_init, { valign: 'middle', halign: 'left' });
    // this.doc.setFontType("normal");
    line_init += 10;

    //metadatos Derecha
    let pos_x_Der = this.getMaxWidth() * 0.85;
    this.doc.setFontSize(12);
    this.doc.setFontType("bold");
    this.doc.setTextColor(39, 73, 187);
    this.doc.autoTableText('Periodo Considerado', pos_x_Der, pos_y_metadatos, { valign: 'middle', halign: 'right' });
    this.doc.setTextColor( 0, 0, 0);
    this.doc.setFontType("normal");
    pos_y_metadatos += 5;

    this.doc.setFontSize(8);
    this.doc.autoTableText('DESDE: ', pos_x_Der, pos_y_metadatos, { valign: 'middle', halign: 'right' });
    this.doc.setFontType("italic");
    this.doc.autoTableText(metadatos.fecha_inicio, pos_x_Der + 1, pos_y_metadatos, { valign: 'middle', halign: 'left' });
    this.doc.setFontType("normal");
    pos_y_metadatos += 4;
    this.doc.autoTableText('HASTA: ', pos_x_Der, pos_y_metadatos, { valign: 'middle', halign: 'right' });
    this.doc.setFontType("italic");
    this.doc.autoTableText(metadatos.fecha_fin, pos_x_Der + 1, pos_y_metadatos, { valign: 'middle', halign: 'left' });
    this.doc.setFontType("normal");
    line_init += 4;

    const head = [
      { 'title': 'FECHA', 'dataKey': 'fecha' },
      { 'title': 'NOMBRE EQUIPO', 'dataKey': 'nombre_equipo' },
      { 'title': 'PROVEEDOR', 'dataKey': 'proveedor' },
      { 'title': 'DESCRIPCIÓN', 'dataKey': 'descripcion' },
      { 'title': 'CANTIDAD', 'dataKey': 'cantidad' },
      { 'title': 'PRECIO', 'dataKey': 'precio' },
      { 'title': 'TOTAL', 'dataKey': 'total' },
    ]

    ////////////////////////////////////////
    //////////CUERPO Y DATOS        ////////
    ////////////////////////////////////////


    this.doc.autoTable(head, datos, {
      startY: line_init,
      styles: { fontSize: 9, cellWidth: 'wrap' },
      theme: 'striped',
      bodyStyles: {
        //margin: 40,
        //fontSize: 10,
        lineWidth: 0.2,
        //lineColor: [0, 0, 0]
      },
      columnStyles: {
        fecha: { columnWidth: 'auto', },
        nombre_equipo: { columnWidth: 'auto' },
        proveedor: { columnWidth: 'auto' },
        descripcion: { columnWidth: 'auto' },
        cantidad: { columnWidth: 'auto',halign: 'right' },
        precio: { columnWidth: 'auto', halign: 'right'},
        total: { columnWidth: 'auto',halign: 'right'},
      },

    });

    this.doc.save('Reporte de Listado de Inventario ' + tipo + '.pdf');
  }


  ////////////////////////////////////////
  //////////OTRAS UTILIDADES      ////////
  ////////////////////////////////////////
  public convertfecha(param) {
    let today = new Date(param);
    let resp = today.toLocaleDateString();
    return resp;
  }
}
