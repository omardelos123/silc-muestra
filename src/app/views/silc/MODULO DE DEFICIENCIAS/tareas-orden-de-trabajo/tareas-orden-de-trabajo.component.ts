import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router'; 


@Component({
  selector: 'app-tareas-orden-de-trabajo',
  templateUrl: './tareas-orden-de-trabajo.component.html',
  styleUrls: ['./tareas-orden-de-trabajo.component.scss']
})
export class TareasOrdenDeTrabajoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  modificar_tareas_orden_de_trabajo()
  {
    const arreglo={
      titulo:"MODIFICAR TAREAS ORDEN DE TRABAJO",estatus:"modificar"
    }
    const parametros=btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nueva-tareas-orden-de-trabajo',parametros]);
  }
  crear_tareas_orden_de_trabajo()
  {
    const arreglo={
      titulo:"CREAR TAREAS ORDEN DE TRABAJO",estatus:"crear"
    }
    const parametros=btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nueva-tareas-orden-de-trabajo',parametros]);
  }
  detalle_tareas_orden_de_trabajo()
  {
    const arreglo={
      titulo:"DETALLE TAREAS ORDEN DE TRABAJO",estatus:"detalle"
    }
    const parametros=btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nueva-tareas-orden-de-trabajo',parametros]);
  }
}
