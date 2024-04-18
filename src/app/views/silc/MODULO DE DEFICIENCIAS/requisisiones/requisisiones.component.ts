import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router'; 


@Component({
  selector: 'app-requisisiones',
  templateUrl: './requisisiones.component.html',
  styleUrls: ['./requisisiones.component.scss']
})
export class RequisisionesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  modificar_requisisiones()
  {
    const arreglo={
      titulo:"MODIFICAR REQUISISONES",estatus:"modificar"
    }
    const parametros=btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nueva-requisisiones',parametros]);
  }
  crear_requisisiones()
  {
    const arreglo={
      titulo:"CREAR REQUISISONES",estatus:"crear"
    }
    const parametros=btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nueva-requisisiones',parametros]);
  }
  detalle_requisisiones()
  {
    const arreglo={
      titulo:"DETALLE REQUISISONES",estatus:"detalle"
    }
    const parametros=btoa(unescape(encodeURIComponent(JSON.stringify(arreglo)))) // btoa(JSON.stringify(arreglo));
    this.router.navigate(['./silc/nueva-requisisiones',parametros]);
  }

}
