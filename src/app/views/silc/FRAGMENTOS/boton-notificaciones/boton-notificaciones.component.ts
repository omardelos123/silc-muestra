import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../../services/_export';

import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-boton-notificaciones',
  templateUrl: './boton-notificaciones.component.html',
  styleUrls: ['./boton-notificaciones.component.scss']
})
export class BotonNotificacionesComponent implements OnInit {

  subscription: Subscription;

  // notificacion: any = [
  //   { id: 11, name: 'Mr. Nice' },
  //   { id: 12, name: 'Narco' },
  //   { id: 13, name: 'Bombasto' },
  //   { id: 14, name: 'Celeritas' },
  //   { id: 15, name: 'Magneta' },
  //   { id: 16, name: 'RubberMan' },
  //   { id: 17, name: 'Dynama' },
  //   { id: 18, name: 'Dr IQ' },
  //   { id: 19, name: 'Magma' },
  //   { id: 20, name: 'Tornado' }
  // ];

  notificacionPedidos: any = [

  ];

  notificacionOrdenes: any = [

  ];

  notificacionMantenimiento: any = [

  ];
  // notificacion: Array<{ numeroParte: string, fabricante: string, cantPedir: number }> = [];

  //datos que se mostraran en las notificaciones
  infoCalculo = {
    numeroParte: '',
    fabricante: '',
    cantPedir: 0
  };

  notificacionData = {
    id_compania: parseInt(localStorage.getItem("COMP")), token:''
  };

  itemsCEP: any = [];
  itemsOT: any = [];
  itemsMANT: any = [];

  notifContador: number = 0;

  constructor(
    private rest: RestService
  ) { }

  ngOnInit() {
    this.notificacionData.token = JSON.parse(decodeURIComponent(escape(window.atob(localStorage._token))));
    // const source = interval(20000);
    const source = interval(900000); //entrada en ms (1 SEG = 1000 MS)
    const text = 'Your Text Here';

    //llamando al metodo que llena las notificaciones del punto de reorden
    this.subscription = source.subscribe(val =>this.verificaOrdenDeTrabajo());

  }

  opensnack() {
    alert('entro')
  }

  verificaPuntoReorden() {

    this.rest.PROC_punto_reorden(this.notificacionData).then((respuesta) => {

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

      this.verificaOrdenDeTrabajo();
      

    }, (error) => {

      console.log(error);

    });

  }

  verificaOrdenDeTrabajo() {

    this.rest.PROC_notificacion_ordenes(this.notificacionData).then((respuesta) => {

      let resp: any = respuesta; // toda la respuesta del servidor.
      console.log("verificaOrdenDeTrabajo", resp)

      this.notificacionOrdenes.length = 0;

      this.itemsOT = resp.recordset;

      for (const indice in this.itemsOT) {

        this.notificacionOrdenes.push(
          {
            descripcionOrden: this.itemsOT[indice].descripcion_orden,
            fechaOrden: this.itemsOT[indice].fecha_orden,
            emisor: this.itemsOT[indice].nombre_usuario
          }
        );

        console.log("this.notificacion: ", this.notificacionOrdenes);

        //contando la cantidad de registro que tiene el arreglo de las notificaciones
        this.notifContador = this.notifContador + 1;

      }

      //this.verificaMantenimientoProgramado();

    }, (error) => {
      
      console.log(error);

    });

  }

  verificaMantenimientoProgramado() {

    this.rest.PROC_notificacion_mantenimientos(this.notificacionData).then((respuesta) => {

      let resp: any = respuesta; // toda la respuesta del servidor.

      this.notificacionMantenimiento.length = 0;

      this.itemsMANT = resp.recordset;

      for (const indice in this.itemsMANT) {

        this.notificacionMantenimiento.push(
          {
            nombre_sistema: this.itemsMANT[indice].nombre_sistema,
            nombre_mantenimiento: this.itemsMANT[indice].nombre_mantenimiento,
            fecha_mantenimiento: this.itemsMANT[indice].fecha_mantenimiento
          }
        );

        // console.log("this.notificacion: ", this.notificacion);

        //contando la cantidad de registro que tiene el arreglo de las notificaciones
        this.notifContador = this.notifContador + 1;

      }

      // console.log("this.notificacionMantenimiento: ", this.notificacionMantenimiento);

    }, (error) => {
      
      console.log(error);

    });

  }

  reiniciaContador() {

    // alert('reinicio valor')
    this.notifContador = 0;

  }

}
