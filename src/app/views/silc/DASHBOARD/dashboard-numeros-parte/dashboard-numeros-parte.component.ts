import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RestService, parametros, Permisos, ValidadoresService, UtilidadesService } from '../../../../services/_export';
// import { dashboard } from '../../../../mappings/model/_export_model';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { dashboard } from '../../../../mappings/parameters/json_dashboard';
import { Alert } from 'selenium-webdriver';

declare var swal: any;

@Component({
  selector: 'app-dashboard-numeros-parte',
  templateUrl: './dashboard-numeros-parte.component.html',
  styleUrls: ['./dashboard-numeros-parte.component.scss']
})
export class DASHBOARDNUMEROSPARTEComponent implements OnInit {
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
  suma_total_top:number=0
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
  barraspie: any[] = [{ label: '' }]
  barras1: any[] = [{ label: 'Costo de inventario' }]
  barras2: any[] = [{ label: 'Cantidad en inventario' }]
  barras3: any[] = [{ label: 'Cantidad minima' }]
  barras4: any[] = [{ label: 'Cantidad autorizadas' }]
  barras5: any[] = [{ label: 'TOP' }]
 // Pie
 public pieChartLabels: string[] = [];//['Download Sales', 'In-Store Sales', 'Mail Sales'];
 public pieChartData: any[]=[];//number[]// = [300, 500, 100];
 public pieChartType = 'pie';
 //public pieChartLegend = true;

 //public barChartType = 'bar';
  //public barChartLegend = true;
  //barChartData: any[] = [];
  //barChartLabels: string[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private rest: RestService, private _utilidades: UtilidadesService) {

  }

  ngOnInit() {

    this.run();
    this.solicitud.top = 3
  }

  
  run() {

    
    this.suma_total_top=0;

    this.bl_graficos = false;
    this.barChartData = [];
    this.barChartLabels = [];

    this.pieChartData = [];
    this.pieChartLabels = [];


   
    this.flag = true;
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP")); // Valor debe estar en el localstoge se guarda cuando el usuario se autentica.
    var hoy = new Date();
    console.log("hoyyyyyyyyyyyy ", hoy.toLocaleTimeString());
    this.solicitud.fecha_desde = (hoy.toISOString()).toString().split('T')[0];
    this.solicitud.fecha_hasta = (hoy.toISOString()).toString().split('T')[0];

   

        for (let i = 0; i < this.barras.length; i++) {
          this.barChartData.push({ data: [], label: this.barras[i].label });
        
        }
        for (let i9 = 0; i9 < this.barraspie.length; i9++) {
          this.pieChartData.push({ data: [], label: this.barraspie[i9].label });
        
        }

        

        this.flag = false;
        this.bl_graficos = true;

      
  }

   
  GEN_DASHBOARD() {

    this.suma_total_top=0;

    this.bl_graficos = false;
    this.barChartData = [];
    this.barChartLabels = [];
    this.lineChartData=[];
    this.pieChartData = [];
    this.pieChartLabels = [];
    this.lineChartLabels=[];
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));// Valor debe estar en el localstoge se guarda cuando el usuario se autentica.
    this.solicitud.fecha_desde = (this.solicitud.fecha_desde);
    this.solicitud.fecha_hasta = (this.solicitud.fecha_hasta);
    this.solicitud.top = this.solicitud.top;
    console.log("hoyyyyyyyyyyyy ", this.solicitud.fecha_desde, "     ", this.solicitud.fecha_hasta, "    ", this.solicitud.id_compania, "   ", this.solicitud.top);
    this.rest.GEN_DASHBOARD_NUMERO_PARTE(this.solicitud)
      .then((respuesta) => {
        this.flag = true;
        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log(" NUMEROMPARTE  "+ resp);
        this.dashboard = resp.recordset;
        this.dashboard_data_table = resp.recordset;
       // alert("" + this.solicitud.id_proveedor)

        this.total_registros = resp.recordset.length
       
        if (this.solicitud.top == 0) {

          swal({
            title: "Buscando información...",  
            text: "Debe selecionar una cantidad top mayor que cero",
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

          for (let x = 0; x < this.dashboard_data_table.length; x++) {
            this.suma_total_top=this.dashboard_data_table[x].cantidad+this.suma_total_top;
            //alert(""+this.suma_total_top+"   "+this.dashboard_data_table[x].Cantidad)
          }
          


          if (resp.recordset.length != 0) {



            for (let i = 0; i < this.barras.length; i++) {
              this.barChartData.push({ data: [], label: this.barras[i].label });
            
            }
           // alert(""+this.solicitud.top)
            for (let i9 = 0; i9 < this.barraspie.length; i9++) {
              this.pieChartData.push({ data: [], label: this.barraspie[i9].label });
            
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
              //this.barraspie[0].data.push([this.dashboard[k].cantidad])
              this.new_array_base_datos_labels = [this.dashboard[k].nombre_parte];//this.dashboard[k].fecha_pedido.toString().split('T')[0] + "\n" +
              
              this.barChartData[0].data.push(this.dashboard[k].cantidad)
              this.pieChartData[0].data.push(this.dashboard[k].cantidad)

              this.barChartLabels.push(this.new_array_base_datos_labels.toString());
              this.pieChartLabels.push(this.new_array_base_datos_labels.toString());

              this.barChartLabels.push(this.new_array_base_datos_labels.toString());
              //fechas graficos pequeños
              this.brandBoxChartLabels.push(this.new_array_base_datos_labels.toString().split('T')[0]);
              this.lineChartData[0].data.push(this.dashboard[k].cantidad);
              //fechas grafica de lineas
              this.lineChartLabels.push(this.new_array_base_datos_labels.toString().split('T')[0]);


            }


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

top_minimas() {
  if (this.solicitud.top< 0) {
    swal({
      title: "Verificando top minimo",
      text: "las cantidad no puede ser menor que 1 ",
      type: "warning",
      // showCancelButton: true,
      cancelButtonText: "Ok",

    },
      confirmed => {
        this.solicitud.top = 0

      });

  }
  else {
    
  }
 
}


}
