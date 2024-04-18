import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RestService, parametros, Permisos, ValidadoresService, UtilidadesService } from '../../../../services/_export';
// import { dashboard } from '../../../../mappings/model/_export_model';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { dashboard } from '../../../../mappings/parameters/json_dashboard';

declare var swal: any;

@Component({
  selector: 'app-dashboard-administrador',
  templateUrl: './dashboard-administrador.component.html',
  styleUrls: ['./dashboard-administrador.component.scss']
})

export class DashboardAdministradorComponent implements OnInit {
  /* Variables para los permisos, eliminar, editar, guardar */
  permisos = new Permisos().access;
  /* Objeto que se envia al webservice  */
  solicitud = new parametros().prm_dashboard;
  flag: boolean = false;

  /*Variables del la vista */
  dashboard: any[] = [];
  /*Variables del la vista */
  dashboard_pequeños: any[] = [];
  bl_graficos: boolean = false;
  public testChar = 'pie';
  // costo_total_inventario:any[] = [];
  costo_total_inventario: number = 0;
  cantidad_en_inventario: number = 0;
  precio_unitario_catalogo: number = 0;
  cantidad_minimas: number = 0;
  cantidad_autorizadas: number = 0;
  // public barChartData: any[];
  // barChart1


  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  // public barChartLabels: string[] = ['2001', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  barChartData: any[] = [];
  barChartLabels: string[] = [];

  private new_array_base_datos_labels = [];

  // public barChartData: any[] = [
  //   {
  //     data: [89, 59, 80, 81, 56, 55, 40], label: 'Series A'
  //   },
  //   { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  // ];
  // public test: any[] = [];

  // social box charts
  brandBoxChartData1: any[] = [];

  // public brandBoxChartData1: Array<any> = [
  //  {
  //    data: [65, 59, 84, 84, 51, 55, 40],
  //   label: 'Costo total inventario'
  // }
  //];
  brandBoxChartData2: any[] = [];
  //public brandBoxChartData2: Array<any> = [
  //   {
  //     data: [1, 13, 9, 17, 34, 41, 38],
  //     label: 'Cantiadad en inventario'
  //   }
  // ];
  brandBoxChartData3: any[] = [];
  brandBoxChartData4: any[] = [];

  brandBoxChartLabels: any[] = [];

  //public brandBoxChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public brandBoxChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false,
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };
  public brandBoxChartColours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.1)',
      borderColor: 'rgba(255,255,255,.55)',
      pointHoverBackgroundColor: '#fff'
    }
  ];
  public brandBoxChartLegend = false;
  public brandBoxChartType = 'line';

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // lineChart
  lineChartData: any[] = [];
  // public lineChartData: Array<any> = [
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  //  {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
  //  {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  //];
  lineChartLabels: any[] = [];
  //public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: any = {
    animation: false,
    responsive: true
  };

  public lineChartColours: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';


  barras: any[] = [{ label: 'Cantidad minima' }, { label: 'Cantidad disponible' }, { label: 'Cantidad Autorizadas' }]
  barras1: any[] = [{ label: 'Costo de inventario' }]
  barras2: any[] = [{ label: 'Cantidad en inventario' }]
  barras3: any[] = [{ label: 'Cantidad minima' }]
  barras4: any[] = [{ label: 'Cantidad autorizadas' }]
  barras5: any[] = [{ label: 'Entrada' }, { label: 'Salida' }]

  constructor(private router: Router, private route: ActivatedRoute, private rest: RestService,
    private _validadores: ValidadoresService, private _utilidades: UtilidadesService) {

  }

  ngOnInit() {
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP")); // Valor debe estar en el localstoge se guarda cuando el usuario se autentica.
    var hoy = new Date();
    console.log("hoyyyyyyyyyyyy ", hoy.toLocaleTimeString());
    this.solicitud.fecha_desde = (hoy.toISOString()).toString().split('T')[0];
    this.solicitud.fecha_hasta = (hoy.toISOString()).toString().split('T')[0];
    this.run();
  }
  run() {
    console.log(this.solicitud);
    this.flag = true;
    this.rest.PROC_dashboard(this.solicitud)
      .then((respuesta) => {
        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log(resp);
        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).
        //if (resp_validada.estado) {
        this.dashboard = resp.recordset;

        for (let i = 0; i < this.barras.length; i++) {
          this.barChartData.push({ data: [], label: this.barras[i].label });
        }

        for (let i1 = 0; i1 < this.barras1.length; i1++) {
          this.brandBoxChartData1.push({ data: [], label: this.barras1[i1].label });
        }

        for (let i2 = 0; i2 < this.barras2.length; i2++) {
          this.brandBoxChartData2.push({ data: [], label: this.barras2[i2].label });
        }

        for (let i3 = 0; i3 < this.barras3.length; i3++) {
          this.brandBoxChartData3.push({ data: [], label: this.barras3[i3].label });
        }
        for (let i4 = 0; i4 < this.barras4.length; i4++) {
          this.brandBoxChartData4.push({ data: [], label: this.barras4[i4].label });
        }
        for (let i5 = 0; i5 < this.barras5.length; i5++) {
          this.lineChartData.push({ data: [], label: this.barras5[i5].label });
        }
        for (let k = 0; k < this.dashboard.length; k++) {
          this.new_array_base_datos_labels = [this.dashboard[k].nombre_repuesto];
          this.barChartData[0].data.push(this.dashboard[k].cant_minima)
          this.barChartData[1].data.push(this.dashboard[k].historico_cant_disponible)
          this.barChartData[2].data.push(this.dashboard[k].cant_autorizada)
          //fechas barras
          this.barChartLabels.push(this.new_array_base_datos_labels.toString());
          //fechas graficos pequeños
          this.brandBoxChartLabels.push(this.new_array_base_datos_labels.toString().split('T')[0]);
          //fechas grafica de lineas
          this.lineChartLabels.push(this.new_array_base_datos_labels.toString().split('T')[0]);
          //graficos pequeños
          // this.costo_total_inventario += (this.dashboard[k].costo_total_en_inventario * this.dashboard[k].cant_disponible)
          //this.cantidad_en_inventario += this.dashboard[k].cant_disponible
          // this.brandBoxChartData1[0].data.push(this.dashboard[k].costo_total_en_inventario * this.dashboard[k].cant_disponible);
          //this.brandBoxChartData2[0].data.push(this.dashboard[k].cant_disponible);
          // this.cantidad_minimas += this.dashboard[k].cant_minima
          //this.brandBoxChartData3[0].data.push(this.dashboard[k].cant_minima);
          //this.cantidad_autorizadas += this.dashboard[k].cant_autorizada
          //this.brandBoxChartData4[0].data.push(this.dashboard[k].cant_autorizada);
          //grafico de linea
          this.lineChartData[0].data.push(this.dashboard[k].entrada);
          this.lineChartData[1].data.push(this.dashboard[k].salida);




        }

        //3333333333333333333333
        this.solicitud.id_compania = parseInt(localStorage.getItem("COMP")); // Valor debe estar en el localstoge se guarda cuando el usuario se autentica.
        this.solicitud.fecha_desde = (this.solicitud.fecha_desde);
        this.solicitud.fecha_hasta = (this.solicitud.fecha_hasta);

        this.rest.GEN_movimiento_de_inventario(this.solicitud)
          .then((respuesta) => {
            let resp: any = respuesta; // toda la respuesta del servidor.
            console.log(resp);
            let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).
            //if (resp_validada.estado) {
            this.dashboard_pequeños = resp.recordset;

            console.log("this.dashboard_pequeños   ", this.dashboard_pequeños);
            for (let k = 0; k < this.dashboard_pequeños.length; k++) {
              //graficos pequeños
              // this.precio_unitario_catalogo = this.dashboard_pequeños[k].precio_unitario_base_catalogo + this.precio_unitario_catalogo
              this.cantidad_en_inventario += this.dashboard_pequeños[k].cant_disponible_catalogo;
              // this.costo_total_inventario = this.precio_unitario_catalogo * this.cantidad_en_inventario
              this.costo_total_inventario += this.dashboard_pequeños[k].precio_unitario_base_catalogo * this.dashboard_pequeños[k].cant_disponible_catalogo;
              this.brandBoxChartData1[0].data.push(this.costo_total_inventario);
              this.brandBoxChartData2[0].data.push(this.dashboard_pequeños[k].cant_disponible_catalogo);
              this.cantidad_minimas += this.dashboard_pequeños[k].cant_minima_catalogo
              this.brandBoxChartData3[0].data.push(this.dashboard_pequeños[k].cant_minima_catalogo);
              this.cantidad_autorizadas += this.dashboard_pequeños[k].cant_autorizada_catalogo
              this.brandBoxChartData4[0].data.push(this.dashboard_pequeños[k].cant_autorizada_catalogo);
            }
          }, (error) => {
            this.flag = false;
            let respuesta = this._utilidades.manejo_status(error);
            swal(respuesta.titulo, respuesta.mensaje, "warning");
            console.log(error);

          });


        //33333333333333333





        console.log('costo total inventario ', this.brandBoxChartData1)
        console.log('costo total inventario ', this.brandBoxChartData2)

        this.flag = false;
        this.bl_graficos = true;

      }, (error) => {
        this.flag = false;
        this._validadores.errores(error);
      });
  }
  BUSCAR_DATA_DASHBOARD() {

    // alert("COMPAÑIA "+ parseInt(localStorage.getItem("COMP"))+"      USUARIO "+ parseInt(localStorage.getItem("USU")))

    this.bl_graficos = false;
    this.barChartData = [];
    this.barChartLabels = [];
    this.new_array_base_datos_labels = [];
    this.brandBoxChartData1 = [];
    this.brandBoxChartData2 = [];
    this.brandBoxChartData3 = [];
    this.brandBoxChartData4 = [];
    this.brandBoxChartLabels = [];
    this.lineChartData = [];
    this.lineChartLabels = [];

    this.costo_total_inventario = 0;
    this.cantidad_en_inventario = 0;
    this.precio_unitario_catalogo = 0;
    this.cantidad_minimas = 0;
    this.cantidad_autorizadas = 0;



    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));// Valor debe estar en el localstoge se guarda cuando el usuario se autentica.
    this.solicitud.fecha_desde = (this.solicitud.fecha_desde);
    this.solicitud.fecha_hasta = (this.solicitud.fecha_hasta);
    console.log("hoyyyyyyyyyyyy ", this.solicitud.fecha_desde, "     ", this.solicitud.fecha_hasta);

    this.flag = true;
    this.rest.PROC_dashboard(this.solicitud)
      .then((respuesta) => {
        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log("________ZZZZZZ------>>>>" + resp);
        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).
        //if (resp_validada.estado) {
        this.dashboard = resp.recordset;

        for (let i = 0; i < this.barras.length; i++) {
          this.barChartData.push({ data: [], label: this.barras[i].label });
        }

        for (let i1 = 0; i1 < this.barras1.length; i1++) {
          this.brandBoxChartData1.push({ data: [], label: this.barras1[i1].label });
        }

        for (let i2 = 0; i2 < this.barras2.length; i2++) {
          this.brandBoxChartData2.push({ data: [], label: this.barras2[i2].label });
        }

        for (let i3 = 0; i3 < this.barras3.length; i3++) {
          this.brandBoxChartData3.push({ data: [], label: this.barras3[i3].label });
        }
        for (let i4 = 0; i4 < this.barras4.length; i4++) {
          this.brandBoxChartData4.push({ data: [], label: this.barras4[i4].label });
        }
        for (let i5 = 0; i5 < this.barras5.length; i5++) {
          this.lineChartData.push({ data: [], label: this.barras5[i5].label });
        }
        for (let k = 0; k < this.dashboard.length; k++) {
          this.new_array_base_datos_labels = [this.dashboard[k].nombre_repuesto];
          this.barChartData[0].data.push(this.dashboard[k].cant_minima)
          this.barChartData[1].data.push(this.dashboard[k].historico_cant_disponible)
          this.barChartData[2].data.push(this.dashboard[k].cant_autorizada)
          //fechas barras

          this.barChartLabels.push(this.new_array_base_datos_labels.toString());
          //fechas graficos pequeños
          this.brandBoxChartLabels.push(this.dashboard[k].fecha_crea.toString().split('T')[0]);

          //grafico de linea
          this.lineChartData[0].data.push(this.dashboard[k].entrada);
          this.lineChartData[1].data.push(this.dashboard[k].salida);


          //fechas grafica de lineas
          this.lineChartLabels.push(this.new_array_base_datos_labels.toString());




        }






        //3333333333333333333333
        this.solicitud.id_compania = parseInt(localStorage.getItem("COMP")); // Valor debe estar en el localstoge se guarda cuando el usuario se autentica.
        this.solicitud.fecha_desde = (this.solicitud.fecha_desde);
        this.solicitud.fecha_hasta = (this.solicitud.fecha_hasta);

        this.rest.GEN_movimiento_de_inventario(this.solicitud)
          .then((respuesta) => {
            let resp: any = respuesta; // toda la respuesta del servidor.
            console.log(resp);
            let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).
            //if (resp_validada.estado) {
            this.dashboard_pequeños = resp.recordset;

            console.log("this.dashboard_pequeños   ", this.dashboard_pequeños);
            for (let k = 0; k < this.dashboard_pequeños.length; k++) {
              //graficos pequeños

              // this.precio_unitario_catalogo = this.dashboard_pequeños[k].precio_unitario_base_catalogo + this.precio_unitario_catalogo
              this.cantidad_en_inventario += this.dashboard_pequeños[k].cant_disponible_catalogo;
              // this.costo_total_inventario = this.precio_unitario_catalogo * this.cantidad_en_inventario
              this.costo_total_inventario += this.dashboard_pequeños[k].precio_unitario_base_catalogo * this.dashboard_pequeños[k].cant_disponible_catalogo;
              this.brandBoxChartData1[0].data.push(this.costo_total_inventario);
              this.brandBoxChartData2[0].data.push(this.dashboard_pequeños[k].cant_disponible_catalogo);
              this.cantidad_minimas += this.dashboard_pequeños[k].cant_minima_catalogo
              this.brandBoxChartData3[0].data.push(this.dashboard_pequeños[k].cant_minima_catalogo);
              this.cantidad_autorizadas += this.dashboard_pequeños[k].cant_autorizada_catalogo
              this.brandBoxChartData4[0].data.push(this.dashboard_pequeños[k].cant_autorizada_catalogo);
            }
          }, (error) => {
            this.flag = false;
            let respuesta = this._utilidades.manejo_status(error);
            swal(respuesta.titulo, respuesta.mensaje, "warning");
            console.log(error);

          });


        //33333333333333333



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
