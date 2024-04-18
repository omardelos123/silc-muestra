import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../../services/_export';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-notif-mantenimiento',
  templateUrl: './notif-mantenimiento.component.html',
  styleUrls: ['./notif-mantenimiento.component.scss']
})
export class NotifMantenimientoComponent implements OnInit {

  subscription: Subscription;
  notificacionData = {
    id_compania: parseInt(localStorage.getItem("COMP")), token:''
  };
  itemsOT: any = [];

  notifContador: number = 0;
  notificacionMantenimiento: any = [];
  itemsMANT: any = [];


  constructor(private rest: RestService) { }

  ngOnInit() {
    this.notificacionData.token = JSON.parse(decodeURIComponent(escape(window.atob(localStorage._token))));

    // this.verificaOrdenDeTrabajo();
    const source = interval(240000); //entrada en ms (1 SEG = 1000 MS)  240000 = 4 minutos
    this.subscription = source.subscribe(val =>this.verificaMantenimientoProgramado());
  }

   verificaMantenimientoProgramado() {

    this.rest.PROC_notificacion_mantenimientos(this.notificacionData).then((respuesta) => {
      this.notifContador = 0;


      let resp: any = respuesta; // toda la respuesta del servidor.
      console.log("verificaMantenimiento ", resp)

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
    this.notifContador = 0;
  }

}