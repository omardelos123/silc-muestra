import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RestService, parametros, Permisos, ValidadoresService, UtilidadesService } from '../../../../services/_export';
// import { dashboard } from '../../../../mappings/model/_export_model';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { dashboard } from '../../../../mappings/parameters/json_dashboard';

declare var swal: any;

@Component({
  selector: 'app-dashboard-pedidos',
  templateUrl: './dashboard-pedidos.component.html',
  styleUrls: ['./dashboard-pedidos.component.scss']
})
export class DashboardPedidosComponent implements OnInit {
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
  Dashboard_pedidos: any
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


  barras: any[] = [{ label: 'Cantidad solicitada' }]
  barras1: any[] = [{ label: 'Costo de inventario' }]
  barras2: any[] = [{ label: 'Cantidad en inventario' }]
  barras3: any[] = [{ label: 'Cantidad minima' }]
  barras4: any[] = [{ label: 'Cantidad autorizadas' }]
  barras5: any[] = [{ label: 'Entrada' }, { label: 'Salida' }]

  constructor(private router: Router, private route: ActivatedRoute, private rest: RestService, private _utilidades: UtilidadesService) {

  }

  ngOnInit() {

    this.run_proveedores();

  }

  arreglo_proveedor(datos: any) {
    //console.log('arreglo')
    for (const i in datos) {
      //console.log('for')
      //if (datos[i].sw_proveedor == 1) {

      this.proveedor_datos.push(datos[i]);
      console.log("for " + datos[i]);
      //}
    }
    this.run();
  }
  run_proveedores() {
    this.flag = true;
    this.solicitud.accion_tipo = 'R';
    this.solicitud.sw_activo =  1 ;
    this.solicitud.id_compania =  parseInt(localStorage.getItem("COMP"));

    this.rest.CRUD_proveedores(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta;
        this.proveedor = resp.recordset;
        this.arreglo_proveedor(this.proveedor);
        console.log("provedores"+resp);
        this.flag = false;


        // this.run2();
      }, (error) => {
        this.flag = false;
        console.log(error);
        swal('Oops', 'Ocurrió un error', 'error');
      });

  }






  run() {
    this.flag = true;
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP")); // Valor debe estar en el localstoge se guarda cuando el usuario se autentica.
    var hoy = new Date();
    console.log("hoyyyyyyyyyyyy ", hoy.toLocaleTimeString());
    this.solicitud.fecha_desde = (hoy.toISOString()).toString().split('T')[0];
    this.solicitud.fecha_hasta = (hoy.toISOString()).toString().split('T')[0];

     

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
        // for (let k = 0; k < this.dashboard.length; k++) {
        //   this.new_array_base_datos_labels = [this.dashboard[k].nombre_repuesto];
        //   this.barChartData[0].data.push(this.dashboard[k].cant_minima)
        //   this.barChartData[1].data.push(this.dashboard[k].historico_cant_disponible)
        //   this.barChartData[2].data.push(this.dashboard[k].cant_autorizada)
        //fechas barras
        //   this.barChartLabels.push(this.new_array_base_datos_labels.toString());
        //fechas graficos pequeños
        //      this.brandBoxChartLabels.push(this.new_array_base_datos_labels.toString().split('T')[0]);
        //fechas grafica de lineas
        //     this.lineChartLabels.push(this.new_array_base_datos_labels.toString().split('T')[0]);
        //graficos pequeños

        //    this.lineChartData[0].data.push(this.dashboard[k].entrada);
        //     this.lineChartData[1].data.push(this.dashboard[k].salida);




        //   }

        //3333333333333333333333
        this.solicitud.id_compania = parseInt(localStorage.getItem("COMP")); // Valor debe estar en el localstoge se guarda cuando el usuario se autentica.
        this.solicitud.fecha_desde = (this.solicitud.fecha_desde);
        this.solicitud.fecha_hasta = (this.solicitud.fecha_hasta);


 

        this.flag = false;
        this.bl_graficos = true;

      
  }

  run_compania() {

  }

  GEN_DASHBOARD() {

    this.bl_graficos = false;
    this.barChartData = [];
    this.barChartLabels = [];

    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));// Valor debe estar en el localstoge se guarda cuando el usuario se autentica.
    this.solicitud.fecha_desde = (this.solicitud.fecha_desde);
    this.solicitud.fecha_hasta = (this.solicitud.fecha_hasta);
    this.solicitud.id_proveedor = this.solicitud.id_proveedor;
    console.log("hoyyyyyyyyyyyy ", this.solicitud.fecha_desde, "     ", this.solicitud.fecha_hasta, "    ", this.solicitud.id_compania, "   ", this.solicitud.id_proveedor);
    this.rest.GEN_DASHBOARD_PEDIDOS(this.solicitud)
      .then((respuesta) => {
        this.flag = true;
        let resp: any = respuesta; // toda la respuesta del servidor.
        this.dashboard = resp.recordset;
        this.dashboard_data_table = resp.recordset;
     

       

        if (this.solicitud.id_proveedor == 0) {

          swal({
            title: "Buscando información...",
            text: "Debe selecionar un proveedor",
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
        else {
         // alert("" + resp.recordset.length)

          this.total_registros = resp.recordset.length


          if (resp.recordset.length != 0) {



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
              this.new_array_base_datos_labels = [this.dashboard[k].nombre_parte];//this.dashboard[k].fecha_pedido.toString().split('T')[0] + "\n" +
              this.barChartData[0].data.push(this.dashboard[k].cantidad)
              //this.barChartData[1].data.push(this.dashboard[k].fecha_pedido)

              this.barChartLabels.push(this.new_array_base_datos_labels.toString());
              //fechas graficos pequeños
              this.brandBoxChartLabels.push(this.new_array_base_datos_labels.toString().split('T')[0]);
              //fechas grafica de lineas
              this.lineChartLabels.push(this.new_array_base_datos_labels.toString().split('T')[0]);


            }
            this.bl_graficos = true;

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
         
          this.bl_graficos = true;
        }
        this.flag = false;
        }, (error) => {
          this.flag = false;
          let respuesta = this._utilidades.manejo_status(error);
          swal(respuesta.titulo, respuesta.mensaje, "warning");
          console.log(error);

        });

 

}




}
