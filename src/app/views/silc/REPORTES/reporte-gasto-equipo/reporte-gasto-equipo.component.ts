import { Component, OnInit, ViewChild } from '@angular/core';
import { RestService, parametros,  Permisos, ValidadoresService, PDFserviceService, XLSXserviceService, UtilidadesService } from '../../../../services/_export';
import { Router, ActivatedRoute } from '@angular/router';


declare var swal: any;

@Component({
  selector: 'app-reporte-gasto-equipo',
  templateUrl: './reporte-gasto-equipo.component.html',
  styleUrls: ['./reporte-gasto-equipo.component.scss']
})
export class ReporteGastoEquipoComponent implements OnInit {

  
 

  titulo: string;
  flag: boolean = false;
  solicitud = new parametros().prm_reportes;

  private DATOS: any[];
  private MetadatosPDF = {
    fecha_inicio: '', fecha_fin: '', numero_equipo: ''
  }
  private allItems: any[];


  constructor(private route: ActivatedRoute, private rest: RestService,  private _validadores: ValidadoresService, private PDF: PDFserviceService, private excelService: XLSXserviceService, private _utilidades: UtilidadesService) { }

  ngOnInit() {

    this.solicitud.accion_tipo = 'R';
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
    this.titulo = 'REPORTE DE GASTOS POR EQUIPO';
  }


  obtenerReporte(TipoArchivo: string) {
    // this.flag = true;
    // console.log("ver fechas enviadas")
    // console.log(this.solicitud.fecha_ini)
    // console.log(this.solicitud.fecha_fin)

    // this.testLlenado();
    this.exportarReporte(TipoArchivo);

  }

  testLlenado() {
    this.DATOS = [];
    for (let index = 1; index <= 5; index++) {
      this.DATOS.push({ "fecha": "Fecha " + index, "nombre_equipo": "Nom_quipo " + index, "proveedor": "proveedor " + index, "descripcion": "descripcion " + index, "cantidad": 2 + index, "precio": 3 + index, "total": 40 + index });
    }

    // let index = 1;
    // this.DATOS = [{"fecha": "Fecha "+index, "cuenta": "Cuenta "+index, "descripcion": "descripcion "+index, "hotel": "hotel "+index, "transporte": "transporte "+index, "combustible": "combustible "+index, "comidas": "comidas "+index}];
    console.log("VER VARIABLE");
    console.log(this.DATOS)
  }

  formatFecha(DATOS: any[]) {
    for (const key in DATOS) {
      this.DATOS[key].fecha_deficiencia = this.PDF.convertfecha(this.DATOS[key].fecha_deficiencia);
    }
  }

  limpiar() {
    this.solicitud.fecha_ini = new Date().toUTCString();
    this.solicitud.fecha_fin = new Date().toUTCString();
  }

  exportarReporte(TipoArchivo: string) {
    if (TipoArchivo.toLowerCase() == 'pdf') {
      // this.PDF.generarPDFrep_gasto_equipo(this.DATOS, 'Subtitulo')
      this.MetadatosPDF.fecha_inicio = this.PDF.convertfecha(this.solicitud.fecha_ini);
      this.MetadatosPDF.fecha_fin =  this.PDF.convertfecha(this.solicitud.fecha_fin);
      this.MetadatosPDF.numero_equipo = this.solicitud.numero_equipo; 
      this.PDF.generarPDFrep_gasto_equipo(this.calcularTotal(this.allItems), 'Reporte Gasto por Equipo', this.MetadatosPDF)

    } else if (TipoArchivo.toLowerCase() == 'xlsx') {
      this.excelService.exportAsExcelFile(this.allItems, "Reporte Gasto por Equipo");
    }
  }


  aceptar(TipoArchivo: string) {
    this.flag = true;
    console.log(this.solicitud)

    this.rest.REP_gasto_equipo(this.solicitud).then((respuesta) => {
      let resp: any = respuesta; // toda la respuesta del servidor.
      let resp_validada = this._validadores.respuesta_api(resp);

      if (resp_validada.estado) {
        this.allItems = resp.recordset;
        console.log("this.allItems ", this.allItems);
        this.exportarReporte(TipoArchivo);
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

  calcularTotal(prm_data: any[]): any {
    let temp_data: any[] = [];
    // let cont: number = 0;
    let sum_total: number = 0;
    console.log("Viendo injrtos arreglo prm"); console.log(prm_data);
    prm_data.forEach(element => {
      // cont++;
      temp_data.push({
        // linea: cont,
        fecha: element.fecha,
        nombre_equipo: element.nombre_equipo,
        proveedor: element.proveedor,
        descripcion: element.descripcion,
        cantidad: element.cantidad,
        precio: element.precio.toFixed(2),
        total: element.total.toFixed(2),
      });
      sum_total += element.total;
    });
    temp_data.push({ precio: "TOTAL", total: sum_total.toFixed(2) })
    return temp_data;
  }
}
