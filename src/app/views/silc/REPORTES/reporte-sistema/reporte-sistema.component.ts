import { Component, OnInit, ViewChild } from '@angular/core';
import { RestService, parametros,  Permisos, ValidadoresService, PDFserviceService, XLSXserviceService, UtilidadesService } from '../../../../services/_export';
import { Router, ActivatedRoute } from '@angular/router';

declare var swal: any;

@Component({
  selector: 'app-reporte-sistema',
  templateUrl: './reporte-sistema.component.html',
  styleUrls: ['./reporte-sistema.component.scss']
})
export class ReporteSistemaComponent implements OnInit {


  
 

  titulo: string;
  flag: boolean = false;
  solicitud = new parametros().prm_inventarios;
  private DATOS: any[];

  constructor(private route: ActivatedRoute, private rest: RestService,  private _validadores: ValidadoresService, private PDF: PDFserviceService, private excelService: XLSXserviceService, private _utilidades: UtilidadesService) { }

  ngOnInit() {
    this.solicitud.sw_activo = 2;
    this.solicitud.accion_tipo = 'R';
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));

    this.titulo = 'REPORTE DE SISTEMAS';
  }

  obtenerReporte(TipoArchivo: string) {
    this.flag = true;
    this.rest.REP_sistema(this.solicitud).then((respuesta) => {
      let resp: any = respuesta;
      let resp_validada = this._validadores.respuesta_api(resp);
      if (resp_validada.estado) {

        this.DATOS = resp.recordset;
        if (this.DATOS.length == 0) {
          swal('No hay Registros', "No existen registros para esta consulta", 'info');
        } else {
          this.exportarReporte(TipoArchivo);
        }
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
  limpiar() {
    this.solicitud.sw_activo = 2; //2 representa sin status(todos)
  }

  exportarReporte(TipoArchivo: string) {
    if (TipoArchivo.toLowerCase() == 'pdf') {
      let tipo = (this.solicitud.sw_activo == 0) ? 'Inactivos' : 'Activos';
      tipo = (this.solicitud.sw_activo > 1) ? 'General' : tipo;
      this.PDF.generarPDFrep_sistema(this.DATOS, tipo)
    } else if (TipoArchivo.toLowerCase() == 'xlsx') {
      this.excelService.exportAsExcelFile(this.DATOS, "Reporte Inventario ");
    }
  }

}
