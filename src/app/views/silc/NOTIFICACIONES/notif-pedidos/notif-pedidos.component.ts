import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../../services/_export';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-notif-pedidos',
  templateUrl: './notif-pedidos.component.html',
  styleUrls: ['./notif-pedidos.component.scss']
})
export class NotifPedidosComponent implements OnInit {

  subscription: Subscription;
  notificacionPedidos: any = [];
  notificacionData = {
    id_compania: parseInt(localStorage.getItem("COMP")), token:''
  };
  
  itemsCEP: any = [];
  notifContador: number = 0;
  infoCalculo = {
    numeroParte: '',
    fabricante: '',
    cantPedir: 0
  };


  constructor(private rest: RestService) { }

  ngOnInit() {
    this.notificacionData.token = JSON.parse(decodeURIComponent(escape(window.atob(localStorage._token))));

    // this.verificaOrdenDeTrabajo();
    const source = interval(220000); //entrada en ms (1 SEG = 1000 MS)  240000 = 4 minutos
    this.subscription = source.subscribe(val =>this.verificaPuntoReorden());
  }

  verificaPuntoReorden() {


    this.rest.PROC_punto_reorden(this.notificacionData).then((respuesta) => {

      console.log("PROC_punto_reorden: ", respuesta);


      let resp: any = respuesta;

      this.notifContador = 0;
   
      this.notificacionPedidos.length = 0;

      this.itemsCEP = resp.recordset;

      // console.log("resp.recordset: ", respuesta);
      // console.log("PROC_punto_reorden: ", this.items);

      //calculando datos
      /*formula
      Q = Math.sqrt((2*D*S)/(C*H))*/
      let Q: any;//cantidad a pedir
      let D: any;//demanda por unidad
      let S: any;//costo de emitir el pedido
      let C: any;//costo de compra por articulo
      let H: any;//costo de almacenaje del articulo

      for (const indice in this.itemsCEP) {

        // console.log("indice: ", indice);
        //calculando demanda por unidad
        D = Math.round(this.itemsCEP[indice].cantidad_salida * 90);

        //calculando la cantidad a pedir
        S = 5;
        H = 10;

        // C = this.items[indice].precio * 0.15;
        // C = this.items[indice].precio + C;
        C = this.itemsCEP[indice].precio;

        Q = Math.round(Math.sqrt((2 * D * S) / (C * H)));
        // Q = Math.round(Math.sqrt((2 * D * S) / (H)));

        this.infoCalculo.numeroParte = this.itemsCEP[indice].nombre;
        this.infoCalculo.fabricante = this.itemsCEP[indice].nombre_fabricante;
        this.infoCalculo.cantPedir = Q;

        // console.log("Math.sqrt((2*D*S)/(C*H)): ", Math.sqrt((2 * D * S) / (C * H)));
        // console.log("this.infoCalculo: ", this.infoCalculo);

        // this.notificacion[indice].push(this.infoCalculo);
        // this.notificacion[indice] = this.infoCalculo;
        this.notificacionPedidos.push(
          {
            numeroParte: this.infoCalculo.numeroParte,
            fabricante: this.infoCalculo.fabricante,
            cantPedir: Q
          }
        );

        // console.log("this.notificacion: ", this.notificacion);

        //contando la cantidad de registro que tiene el arreglo de las notificaciones
        this.notifContador = this.notifContador + 1;

      }
    }, (error) => {

      console.log(error);

    });

  }


  reiniciaContador() {
    this.notifContador = 0;
  }

}
