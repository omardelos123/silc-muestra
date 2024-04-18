import { Component, OnInit, ɵConsole, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RestService, parametros,  Permisos, ValidadoresService, UtilidadesService } from '../../../../services/_export';

@Component({
  selector: 'app-entrega-de-partes',
  templateUrl: './entrega-de-partes.component.html',
  styleUrls: ['./entrega-de-partes.component.scss']
})
export class EntregaDePartesComponent implements OnInit {

  flag: boolean = false;
  /* Variables de configuración de notificación*/
  
 
  constructor(private router: Router) { }

  ngOnInit() {
  }
  modificar_entrega_de_partes()
  {
    const arreglo={
      titulo:"MODIFICAR ENTREGA DE PARTES",estatus:"modificar"
    }
    const parametros=btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nueva-entrega-de-partes',parametros]);
  }
  crear_entrega_de_partes()
  {
    const arreglo={
      titulo:"CREAR ENTREGA DE PARTES",estatus:"crear"
    }
    const parametros=btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nueva-entrega-de-partes',parametros]);
  }
  detalle_entrega_de_partes()
  {
    const arreglo={
      titulo:"DETALLE ENTREGA DE PARTES",estatus:"detalle"
    }
    const parametros=btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nueva-entrega-de-partes',parametros]);
  }
}
