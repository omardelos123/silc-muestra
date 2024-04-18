import { Component, OnInit, ViewChild } from '@angular/core';
import { RestService, parametros,  Permisos, ValidadoresService, PDFserviceService, XLSXserviceService, UtilidadesService } from '../../../../services/_export';
import { Router, ActivatedRoute } from '@angular/router';


import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { autoTable as AutoTable } from 'jspdf-autotable';


declare var swal: any;
@Component({
  selector: 'app-reporte-inventario',
  templateUrl: './reporte-inventario.component.html',
  styleUrls: ['./reporte-inventario.component.scss']
})
export class ReporteInventarioComponent implements OnInit {

  @ViewChild('RECIBIR_Modal') pdfViewer;

  
 

  titulo: string;
  flag: boolean = false;
  solicitud = new parametros().prm_inventarios;

  almacen_compania_datos: any = [];
  partes_datos: any = [];
  lista_provedores_numeroparte: any;
  catalogo: any;

  data_dett: Array<any> = [];
  private allItems: any[];

  private DATOS: any[];
  

  pdfSrc: string;

  constructor(private route: ActivatedRoute, private rest: RestService,  private _validadores: ValidadoresService, private PDF: PDFserviceService, private excelService: XLSXserviceService, private _utilidades: UtilidadesService) { }

  ngOnInit() {

    this.solicitud.sw_activo = 1;
    this.solicitud.accion_tipo = 'R';
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));

    this.titulo = 'REPORTE DE INVENTARIOS';

    this.run_almacen_compania();
  }


  run_numerodepartes() {
    this.flag = true;

    this.rest.CRUD_catalogo_de_repuesto(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta;
        this.catalogo = resp.recordset;
        //console.log('--->> '+this.catalogo)
        this.allItems = resp.recordset;
        this.arreglo_partes(this.allItems);

        this.solicitud.accion_tipo = 'R';
        this.solicitud.sw_activo = 1;
        this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
        // this.run_ubicacion();

        console.log(resp);
        this.flag = false;

      }, (error) => {
        this.flag = false;
        console.log(error);

      });
  }

  arreglo_partes(datos: any) {
    //console.log('arreglo')
    for (const i in datos) {
      //console.log('for')
      //if (datos[i].sw_proveedor == 1) {

      this.partes_datos.push(datos[i]);

      //}
    }
  }

  run_almacen_compania() {
    this.flag = true;
    this.rest.CRUD_almacen_compania(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta;
        this.almacen_compania_datos = resp.recordset;

        this.run_numerodepartes();

        console.info("resp: ", resp);
        this.flag = false;
      }, (error) => {
        this.flag = false;
        console.log(error);

      });
  }

  limpiar(FRM) {

    this.solicitud.id_almacen_compania = 0;
  }

  aceptar() {
    this.flag = true;
    console.info("this.solicitud.id_almacen " + this.solicitud.id_almacen_compania);
    console.info("this.solicitud.id_parte " + this.solicitud.id_parte);
    // console.info("this.solicitud.id_proveedor " + this.solicitud.id_proveedor);

    this.rest.REP_inventario(this.solicitud).then((respuesta) => {

      let resp: any = respuesta; // toda la respuesta del servidor.

      // this.allItems = resp.recordset;

      // // this.inventario();

      // console.log("this.allItems ", this.allItems);

      let resp_validada = this._validadores.respuesta_api(resp);

      if (resp_validada.estado) {
        // this.menus = resp.recordset;
        this.allItems = resp.recordset;

        this.inventario();

        console.log("this.allItems ", this.allItems);

      } else {

        this.allItems = [];

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

  inventario() {
    //recorriendo arreglo e imprimir cotizaciones
    var i: number = 0
    this.data_dett = [];
    //insertamos los datos por id_proveedor en el arreglo 
    for (const j in this.allItems) {

      this.data_dett.push(
        [
          this.allItems[j]
        ]);

    }
    console.log("data_dett", this.data_dett);
  }
  exportarPDF(){
    this.PDF.generarPDFrep_inventario(this.calcularTotal(this.data_dett));
  }
  exportarExcel(){
    this.excelService.exportAsExcelFile(this.calcularTotal(this.data_dett), "Reporte Inventario ");
  }

  calcularTotal(prm_data: any[]): any {
    let temp_data: any[] = [];
    let cont: number = 0;
    let sum_total: number = 0;

    prm_data.forEach(element => {
      cont++;
      temp_data.push({
        linea: cont,
        articulo: element[0].nombre_parte,
        almacen: element[0].nombre_almacen,
        ubi: element[0].nombre_ubicacion,
        desc: element[0].descripcion_parte,
        precio: element[0].precio,
        disp: element[0].disponible,
        min: element[0].minimo,
        conteo: '',
        total_precio: (element[0].precio * element[0].disponible).toFixed(2)
      });
      sum_total += element[0].precio * element[0].disponible;
    });
    temp_data.push({ precio: "TOTAL", total_precio: sum_total.toFixed(2) })
    return temp_data;
  }


  obtenerReporteDebajoMinimo(TipoArchivo: string) {
    this.flag = true;
    this.rest.REP_listado_inventario(this.solicitud).then((respuesta) => {
      let resp: any = respuesta; 
      let resp_validada = this._validadores.respuesta_api(resp);
      if (resp_validada.estado) {
        this.DATOS = resp.recordset;
        if (this.DATOS.length==0) {
            swal('No hay Registros', "No existen registros para esta consulta", 'info');
        }else
          this.exportarReporte(TipoArchivo);
      } else {
        this.DATOS = [];
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
  exportarReporte(TipoArchivo: string){
    if(TipoArchivo.toLowerCase() == 'pdf'){
      this.PDF.generarPDFrep_listado_inventario(this.DATOS, '')
    }else if(TipoArchivo.toLowerCase() == 'xlsx'){
      this.excelService.exportAsExcelFile(this.DATOS, "Reporte Inventario ");
    }
  }
}
