import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RestService, parametros, Permisos, ValidadoresService, PaginacionService, UtilidadesService } from '../../../../services/_export';

import * as XLSX from 'xlsx';
declare var swal: any;


@Component({
  selector: 'app-cargar-excel-posible-falla',
  templateUrl: './cargar-excel-posible-falla.component.html',
  styleUrls: ['./cargar-excel-posible-falla.component.scss']
})
export class CargarExcelPosibleFallaComponent implements OnInit {

  permisos = new Permisos().access;

  flag: boolean = false;
  solicitud_envio_matriz = new parametros().prm_excel;


  private allItems: any[];

  registro_excelG: any = [];
  registro: any = {};
  cedulas_masivo: '';
  reader = new FileReader();
  bool_proceder = false;
  matriz: any[];
  FormatoExcel: any[] = [ "nombre", "descripcion", "codigo_falla"];
  CONFLICTOS: any[] = [];

  constructor(private router: Router, private rest: RestService,
    private _validadores: ValidadoresService, private _paginacion: PaginacionService, private _utilidades: UtilidadesService) { }

  ngOnInit(): void {
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
      let CabeceraExcel: any[] = [];
      for (var C = range.s.c; C <= range.e.c; ++C) {
        var cabecera = XLSX.utils.encode_cell({ c: C, r: 0 });
        if (sheet[cabecera] != undefined) {
          CabeceraExcel.push(sheet[cabecera].v)
        }
      }
      if (this.validarFormato(CabeceraExcel)) {
        this.bool_proceder = true;
      } else {
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
        var campo3 = XLSX.utils.encode_cell({ c: 2, r: R });
        // var campo4 = XLSX.utils.encode_cell({ c: 3, r: R });
        // var campo5 = XLSX.utils.encode_cell({ c: 4, r: R });
        // var campo6 = XLSX.utils.encode_cell({ c: 5, r: R });
        // var campo7 = XLSX.utils.encode_cell({ c: 6, r: R });
        // var campo8 = XLSX.utils.encode_cell({ c: 7, r: R });
        // var campo9 = XLSX.utils.encode_cell({ c: 8, r: R });
        // var campo10 = XLSX.utils.encode_cell({ c: 9, r: R });
        // var campo11 = XLSX.utils.encode_cell({ c: 10, r: R });

        if (sheet[campo1] != undefined) {
          registro_excel.push({
            'campo1': (sheet[campo1] != undefined) ? sheet[campo1].v : '',
            'campo2': (sheet[campo2] != undefined) ? sheet[campo2].v : '',
            'campo3': (sheet[campo3] != undefined) ? sheet[campo3].v : '',
            // 'campo4': (sheet[campo4] != undefined) ? sheet[campo4].v : '',
            // 'campo5': (sheet[campo5] != undefined) ? sheet[campo5].v : '',
            // 'campo6': (sheet[campo6] != undefined) ? sheet[campo6].v : '',
            // 'campo7': (sheet[campo7] != undefined) ? sheet[campo7].v : '',
            // 'campo8': (sheet[campo8] != undefined) ? sheet[campo8].v : '',
            // 'campo9': (sheet[campo9] != undefined) ? sheet[campo9].v : '',
            // 'campo10': (sheet[campo10] != undefined) ? sheet[campo10].v : '',
            // 'campo11': (sheet[campo11] != undefined) ? sheet[campo11].v : '',


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
    this.rest.PROC_cargar_posible_falla(this.solicitud_envio_matriz)
      .then((respuesta) => {
        let resp: any = respuesta;
        console.log(" respuesta .... ", respuesta);
        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).
        if (resp_validada.estado) {
          let resp: any = respuesta;

          

          if (this.solicitud_envio_matriz.accion_tipo == 'C') {
            if(resp.recordset.length > 0 ){
              swal('Existen códigos de posibles fallas repetidos, verifique', resp_validada.msg, 'error');
              // CONTINUAR CON EL MANEJO DE CONFLICTOS Y LA IDENTIFICACION EN LA TABLA DESPLEGADA
              this.CONFLICTOS = resp.recordsets[0];
              this.mostrarConflicots();
              console.debug("Viendo var conflicto ", this.CONFLICTOS);
            }else{
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


  mostrarConflicots(){

  }
  esConflicot(codigo): boolean{
    const found = this.CONFLICTOS.find(element => element.codigo_falla == codigo);
    if (found != undefined){
      return true;
    }else{
      return false;
    }
  }

  //verifica columna por columna si son iguales al formato establecido
  validarFormato(prm_cabeceras: any[]): Boolean {

    if (this.FormatoExcel.length != prm_cabeceras.length) {
      return false

    } else {
      for (const key in this.FormatoExcel) {
        if (this.FormatoExcel[key] != prm_cabeceras[key]) {
          return false;
        }
      }
      return true;

    }

  }

}
