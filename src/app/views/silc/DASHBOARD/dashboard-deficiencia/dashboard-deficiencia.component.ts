import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RestService, parametros, Permisos, ValidadoresService, UtilidadesService } from '../../../../services/_export';
declare var swal: any;
@Component({
  selector: 'app-dashboard-deficiencia',
  templateUrl: './dashboard-deficiencia.component.html',
  styleUrls: ['./dashboard-deficiencia.component.scss']
})

export class DashboardDeficienciaComponent implements OnInit {

  /* Variables para los permisos, eliminar, editar, guardar */
  permisos = new Permisos().access;
  /* Objeto que se envia al webservice  */
  solicitud = new parametros().prm_dashboard;
  flag: boolean = false;
  proveedor_datos: any = [];
  catalogo_dashboard_pedidos: any;
  proveedor: any;
  /*Variables del la vista */
  dashboard: any[] = [];
  total_registros: number = 0
  dashboard_data_table: any;
  dashboard_data_table_graficos: any;
  Dashboard_pedidos: any
  suma_total: number = 0
  suma_reparacion: number = 0
  suma_diferidas: number = 0

  porcentaje_suma_reparacion: number = 0
  porcentaje_suma_diferidas: number = 0

  /*Variables del la vista */
  dashboard_pequeños: any[] = [];
  bl_graficos: boolean = false;

  // costo_total_inventario:any[] = [];
  costo_total_inventario: number = 0;
  cantidad_en_inventario: number = 0;
  precio_unitario_catalogo: number = 0;
  cantidad_minimas: number = 0;
  cantidad_autorizadas: number = 0;




  //+++++++++++++++++++++++++++++++++++





  constructor(private router: Router, private route: ActivatedRoute, private rest: RestService, private _utilidades: UtilidadesService) {

  }
  ngOnInit(): void {
    var hoy = new Date();
    console.log("hoyyyyyyyyyyyy ", hoy.toLocaleTimeString());
    this.solicitud.fecha_desde = (hoy.toISOString()).toString().split('T')[0];
    this.solicitud.fecha_hasta = (hoy.toISOString()).toString().split('T')[0];
    // generate random values for mainChart

  }






  GEN_DASHBOARD() {

    this.suma_total = 0;
    this.suma_reparacion = 0;
    this.suma_diferidas = 0;
    this.porcentaje_suma_reparacion = 0;
    this.porcentaje_suma_diferidas = 0;
    this.bl_graficos = false;

    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));// Valor debe estar en el localstoge se guarda cuando el usuario se autentica.
    this.solicitud.fecha_desde = (this.solicitud.fecha_desde);
    this.solicitud.fecha_hasta = (this.solicitud.fecha_hasta);

    console.log("hoyyyyyyyyyyyy ", this.solicitud.fecha_desde, "     ", this.solicitud.fecha_hasta, "    ", this.solicitud.id_compania, "   ", this.solicitud.top);
    this.rest.GEN_DASHBOARD_DEFICIENCIAS_GRID_DATOS(this.solicitud)
      .then((respuesta) => {
        this.flag = true;
        let resp: any = respuesta; // toda la respuesta del servidor.

        this.dashboard = resp.recordset;
        this.dashboard_data_table = resp.recordset;
        // alert("" + this.solicitud.id_proveedor)

        this.total_registros = resp.recordset.length





        if (resp.recordset.length != 0) {


          this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));// Valor debe estar en el localstoge se guarda cuando el usuario se autentica.
          this.solicitud.fecha_desde = (this.solicitud.fecha_desde);
          this.solicitud.fecha_hasta = (this.solicitud.fecha_hasta);

          this.rest.GEN_DASHBOARD_DEFICIENCIAS_GRAFICOS(this.solicitud)
            .then((respuesta) => {
              this.flag = true;
              let resp: any = respuesta; // toda la respuesta del servidor.

              this.dashboard = resp.recordset;
              this.dashboard_data_table_graficos = resp.recordset;
              console.log("   " + resp.recordset.length);
              // for (const i in resp.recordset.length)
              for (var i = 0; i < resp.recordset.length; i++) {
                if (resp.recordset[i].nombre_estatus == 'DIFERIDA') {

                  this.suma_diferidas = resp.recordset[i].cantidad;
                  //alert(this.suma_diferidas+"------- 1   -----"+resp.recordset[i].cantidad)
                }
                if (resp.recordset[i].nombre_estatus == 'EN REPARACION') {

                  this.suma_reparacion = resp.recordset[i].cantidad;
                  //alert(this.suma_reparacion+"-------- 2   -----"+resp.recordset[i].cantidad)
                }
                this.suma_total = this.suma_reparacion + this.suma_diferidas;
              }
              this.porcentaje_suma_reparacion = ((this.suma_reparacion / this.suma_total) * 100);
              this.porcentaje_suma_diferidas = ((this.suma_diferidas / this.suma_total) * 100);


            }, (error) => {
              this.flag = false;
              let respuesta = this._utilidades.manejo_status(error);

              swal(respuesta.titulo, respuesta.mensaje, "warning");
              console.log(error);

            });


        } else {


          swal({
            title: "Buscando información...",
            text: "Para este rango de fechas no hay registros!",
            type: "warning",
            // showCancelButton: true,
            confirmButtonText: "OK",
            // cancelButtonText: "Si"
          },
            confirmed => {
              if (confirmed) {

              } else {


              }

            });

        }

        this.flag = false;
        this.bl_graficos = true;
      }, (error) => {
        this.flag = false;
        let respuesta = this._utilidades.manejo_status(error);
        swal(respuesta.titulo, respuesta.mensaje, "warning");
        console.log(error);

      });



  }

}
