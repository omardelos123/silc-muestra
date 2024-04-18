import { Component, OnInit, Input, Output, SimpleChanges, OnChanges, EventEmitter } from '@angular/core';
import { UtilidadesService } from '../../services/_export';

@Component({
  selector: 'app-buscar-texto',
  templateUrl: './buscar-texto.component.html',
  styleUrls: ['./buscar-texto.component.scss']
})
export class BuscarTextoComponent implements OnInit, OnChanges {

  @Input() arreglo: any[] = [];
  @Input() FiltroStringObj: string[] = [];
  @Input() placeholderTxt: string = '';
  FiltroTxt: string = '';
  FiltroObj: Object = {};
  RespArreglo: any[] = [];
  @Output() salidaArreglo = new EventEmitter<any[]>();

  constructor(private _utilidades: UtilidadesService) { }

  ngOnInit() {
  }

  obtenerFiltroObj() {
    for (const property in this.FiltroStringObj) {
      for (const key in this.arreglo[0]) {
        if (this.FiltroStringObj[property] == key)
          this.FiltroObj[key] = '';
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['arreglo'].currentValue != undefined) {
      this.obtenerFiltroObj();
    }
  }


  modelChanged(newObj) {
    this.RespArreglo = this._utilidades.buscar_texto_en_arreglo(this.arreglo, this.FiltroTxt.trim(), this.FiltroObj);
    this.salidaArreglo.emit(this.RespArreglo);
  }
}
