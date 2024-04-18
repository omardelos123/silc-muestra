import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../../services/_export';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-notif-ordenes',
  templateUrl: './notif-ordenes.component.html',
  styleUrls: ['./notif-ordenes.component.scss']
})
export class NotifOrdenesComponent implements OnInit {

  subscription: Subscription;
  notificacionOrdenes: any = [];
  notificacionData = {
    id_compania: parseInt(localStorage.getItem("COMP")), token:''
  };
  itemsOT: any = [];

  notifContador: number = 0;



  constructor(private rest: RestService) { }

  ngOnInit() {
    this.notificacionData.token = JSON.parse(decodeURIComponent(escape(window.atob(localStorage._token))));

    // this.verificaOrdenDeTrabajo();
    const source = interval(200000); //entrada en ms (1 SEG = 1000 MS)  240000 = 4 minutos
    this.subscription = source.subscribe(val =>this.verificaOrdenDeTrabajo());
  }

  verificaOrdenDeTrabajo() {

    this.rest.PROC_notificacion_ordenes(this.notificacionData).then((respuesta) => {
      this.notifContador = 0;

      let resp: any = respuesta; // toda la respuesta del servidor.
      console.log("verificaOrdenDeTrabajo ", resp)

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
