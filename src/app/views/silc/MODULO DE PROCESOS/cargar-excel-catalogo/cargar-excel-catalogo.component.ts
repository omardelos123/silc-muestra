import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { RestService, parametros,  Permisos, ValidadoresService, PaginacionService, UtilidadesService } from '../../../../services/_export';

import * as XLSX from 'xlsx';
declare var swal: any;

@Component({
  selector: 'app-cargar-excel-catalogo',
  templateUrl: './cargar-excel-catalogo.component.html',
  styleUrls: ['./cargar-excel-catalogo.component.scss']
})
export class CargarExcelCatalogoComponent implements OnInit {

  /* Variables de configuración de notificación*/
  
 
  /* Variables para los permisos, eliminar, editar, guardar */
  permisos = new Permisos().access;

  flag: boolean = false;
  solicitud_envio_matriz = new parametros().prm_excel;


  private allItems: any[];

  registro_excelG: any = [];
  registro: any = {};
  reader = new FileReader();
  bool_proceder = false;
  matriz: any[];
  
  FormatoExcel: any[] = ["Numero Parte","descripcion","precio_unitario_base"];

  constructor( private router: Router, private rest: RestService,
    private _validadores: ValidadoresService, private _paginacion: PaginacionService, private _utilidades: UtilidadesService) { }

  ngOnInit() {
    this.solicitud_envio_matriz.accion_tipo = 'C';
  }


  cargarExcel(ev) {
    let workBook = null;
    const reader = new FileReader();
    const file = ev.target.files[0];

    let registro_excel = [];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });

      // Get headers.
      var headers = [];
      console.log(workBook);
      var nombreHoja = workBook.SheetNames[0];  //numero de hoja a leer
      var sheet = workBook.Sheets[nombreHoja]; // Ajustado solo para leer la primera hoja del excel

      let propiedades = [];
      /* loop through every cell manually */
      var range = XLSX.utils.decode_range(sheet['!ref']); // get the range


      //Inicio Validacion
      //Extraccion de los header del excel (formato de columnas que trae el excel)
      let CabeceraExcel:any[] = [];
      for (var C = range.s.c; C <= range.e.c; ++C) {
        var cabecera = XLSX.utils.encode_cell({ c: C, r: 0 });
        if (sheet[cabecera] != undefined) {
          CabeceraExcel.push( sheet[cabecera].v )
        }
      }
      if (this.validarFormato(CabeceraExcel)) {
        this.bool_proceder = true;
      }else{
        this.bool_proceder = false;
        swal({
          title: "Error",
          text: "Verifique su formato de excel y vuelva a intentarlo",
          type: "warning",
          confirmButtonText: "OK",
        });
        return;
      }
      //Fin Validacion


      range.s.r = 1;
      console.log(range);
      for (var R = range.s.r; R <= range.e.r; ++R) {

        var campo1 = XLSX.utils.encode_cell({ c: 0, r: R }); // construct A1 reference for cell
        var campo2 = XLSX.utils.encode_cell({ c: 1, r: R }); // construct A1 reference for cell
        var campo3 = XLSX.utils.encode_cell({ c: 2, r: R }); // construct A1 reference for cell


        if (sheet[campo1] != undefined) {
          registro_excel.push({
            'campo1': (sheet[campo1] != undefined) ? sheet[campo1].v : '',
            'campo2': (sheet[campo2] != undefined) ? sheet[campo2].v : '',
            'campo3': (sheet[campo3] != undefined) ? sheet[campo3].v : '',

          })
        }
      }
      console.log(registro_excel);
      this.bool_proceder = true;
    }


    reader.readAsBinaryString(file);
    this.registro_excelG = registro_excel;
  }

  cargarMatriz(){
    this.matriz = new Array();
    for (const j in this.registro_excelG) {
      //console.log(" recorrido....  ", this.fieldArray[j].id_unidad);
      this.matriz.push(
        [  
          this.registro_excelG[j].campo1
          , this.registro_excelG[j].campo2
          , this.registro_excelG[j].campo3
          
        ]);
      this.solicitud_envio_matriz.matriz = this.matriz;
    }
  }


  enviar(){
    this.cargarMatriz();

    this.flag = true;
    this.rest.PROC_cargar_catalogo_compania(this.solicitud_envio_matriz)
      .then((respuesta) => {
        let resp: any = respuesta;
        console.log(" respuesta .... ", respuesta);
        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).
        if (resp_validada.estado) {
          if (this.solicitud_envio_matriz.accion_tipo == 'C') {
            swal({
              title: "Proceso exitoso!",
              text: "Se registraron los datos correctamente! ",
              type: "success",
              //showCancelButton: true,
              confirmButtonText: "OK",
              // cancelButtonText: "Si"
            },
              confirmed => {
                if (confirmed) {
                  //history.back();
                } else {

                  // this.limpiar(FRM);
                }

              });
          } 
        } else {
          swal('Ocurrio un Error', resp_validada.msg, 'error');
        }

        this.flag = false;

      }, (error) => {
        this.flag = false;
        let respuesta = this._utilidades.manejo_status(error);
        swal('Oops', 'Ocurrió un error', 'error');
        console.log(error);

      });
  }

  //verifica columna por columna si son iguales al formato establecido
  validarFormato(prm_cabeceras: any[]): Boolean {
    
    if (this.FormatoExcel.length != prm_cabeceras.length) {
      return false

    }else{
      for (const key in this.FormatoExcel) {
        if (this.FormatoExcel[key] != prm_cabeceras[key] ) {
          return false;
        }
      }
      return true;

    }
    
  }

}
