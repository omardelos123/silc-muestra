import { Component, OnInit, ViewChild } from '@angular/core';
import { RestService, parametros,  Permisos, ValidadoresService, PDFserviceService, XLSXserviceService, UtilidadesService } from '../../../../services/_export';
import { Router, ActivatedRoute } from '@angular/router';

declare var swal: any;

@Component({
  selector: 'app-reporte-mantenimiento',
  templateUrl: './reporte-mantenimiento.component.html',
  styleUrls: ['./reporte-mantenimiento.component.scss']
})
export class ReporteMantenimientoComponent implements OnInit {

  
 

  titulo: string;
  flag: boolean = false;
  solicitud = new parametros().prm_reportes;
  private DATOS: any[];




  constructor(private route: ActivatedRoute, private rest: RestService,  private _validadores: ValidadoresService, private PDF: PDFserviceService, private excelService: XLSXserviceService, private _utilidades: UtilidadesService) { }

  ngOnInit() {

    this.solicitud.accion_tipo = 'R';
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
    this.titulo = 'REPORTE DE MANTENIMIENTOS';
  }



  obtenerReporte(TipoArchivo: string) {
    this.flag = true;
    this.rest.REP_mantenimiento_programado(this.solicitud).then((respuesta) => {
      let resp: any = respuesta;
      let resp_validada = this._validadores.respuesta_api(resp);

      if (resp_validada.estado) {
        this.DATOS = resp.recordset;
        if (this.DATOS.length == 0) {
          swal('No hay Registros', "No existen registros para esta consulta", 'info');
        } else {
          this.formatFecha(this.DATOS);
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
      let tipo = "De " + this.PDF.convertfecha(this.solicitud.fecha_ini) + " hasta " + this.PDF.convertfecha(this.solicitud.fecha_fin);
      this.PDF.generarPDFrep_mantenimiento_program(this.DATOS, tipo)
    } else if (TipoArchivo.toLowerCase() == 'xlsx') {
      this.excelService.exportAsExcelFile(this.DATOS, "Reporte Inventario ");
    }
  }

}
