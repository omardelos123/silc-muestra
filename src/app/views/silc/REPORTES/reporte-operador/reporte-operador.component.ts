import { Component, OnInit, ViewChild } from '@angular/core';
import { RestService, parametros,  Permisos, ValidadoresService, PDFserviceService, XLSXserviceService, UtilidadesService } from '../../../../services/_export';
import { Router, ActivatedRoute } from '@angular/router';
declare var swal: any;

@Component({
  selector: 'app-reporte-operador',
  templateUrl: './reporte-operador.component.html',
  styleUrls: ['./reporte-operador.component.scss']
})
export class ReporteOperadorComponent implements OnInit {

  
 

  titulo: string;
  flag: boolean = false;
  solicitud = new parametros().prm_reportes;
  private DATOS: any[];
  licencias: any[] = [];

  constructor(private route: ActivatedRoute, private rest: RestService,  private _validadores: ValidadoresService, private PDF: PDFserviceService, private excelService: XLSXserviceService, private _utilidades: UtilidadesService) { }

  ngOnInit() {

    this.solicitud.accion_tipo = 'R';
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));

    this.titulo = 'REPORTE DE OPERADORES';
    this.consultar_licencias();
  }

  consultar_licencias() {
    this.flag = true;
    this.rest.CRUD_licencias(this.solicitud)
      .then((respuesta) => {
        let resp: any = respuesta; // toda la respuesta del servidor.

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).
        if (resp_validada.estado) {
          this.licencias = resp.recordset;
        } else {
          this.licencias = [];
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


  obtenerReporte(TipoArchivo: string) {
    this.flag = true;
    this.rest.REP_operador(this.solicitud).then((respuesta) => {
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

  limpiar() {
    this.solicitud.id_licencia = 0;
  }

  formatFecha(DATOS: any[]) {
    for (const key in DATOS) {
      this.DATOS[key].fecha_inicio = this.PDF.convertfecha(this.DATOS[key].fecha_inicio);
    }
    console.log(this.DATOS);
  }
  exportarReporte(TipoArchivo: string) {
    if (TipoArchivo.toLowerCase() == 'pdf') {
      let tipo = (this.solicitud.id_licencia != 0) ? 'por tipo de licencia ' + this.DATOS[0].licencia : 'General';
      this.PDF.generarPDFrep_operador(this.DATOS, tipo)
    } else if (TipoArchivo.toLowerCase() == 'xlsx') {
      this.excelService.exportAsExcelFile(this.DATOS, "Reporte Inventario ");
    }
  }

}
