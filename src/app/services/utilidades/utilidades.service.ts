import { Injectable } from '@angular/core';
declare var swal: any;
@Injectable({
  providedIn: 'root'
})
export class UtilidadesService {

  constructor() { }
  // manejo_de_envio_arreglo: Array<any> = [];;
  manejo_de_envio_arreglo: any = [];


  sumar_total_arreglo(arreglo: any[]) {

    //const test = arreglo.map(function (x) {
    //return x.id_proveedor;
    //});
    let manejo_de_envio_sum: number = 0;

    let subtotal: number = 0;

    for (const i in arreglo) {

      const result = this.manejo_de_envio_arreglo.filter(proveedor => proveedor == arreglo[i].id_proveedor);
      //console.log(" result2 : " + result.length);
      if (result.length == 0) {
        // console.log(" result : " + result);
        manejo_de_envio_sum = manejo_de_envio_sum + arreglo[i].manejo_de_envio;
        this.manejo_de_envio_arreglo[i] = arreglo[i].id_proveedor;


      } else {

        //console.log("Proveedor ya existe...");

      }

      subtotal += arreglo[i].total;
    }
    //console.log(" manejo_de_envio_sum  : " + manejo_de_envio_sum );
    subtotal = (subtotal)// + manejo_de_envio_sum;
    this.manejo_de_envio_arreglo.length = 0;
    return subtotal;
  }


  sumar_total_final_arreglo(arreglo: any[]) {

    //const test = arreglo.map(function (x) {
    //return x.id_proveedor;
    //});
    let manejo_de_envio_sum: number = 0;

    let total_mas_manejo_envio: number = 0;

    for (const i in arreglo) {

      const result = this.manejo_de_envio_arreglo.filter(proveedor => proveedor == arreglo[i].id_proveedor);
      //console.log(" result2 : " + result.length);
      if (result.length == 0) {
        // console.log(" result : " + result);
        manejo_de_envio_sum = manejo_de_envio_sum + arreglo[i].manejo_de_envio;
        this.manejo_de_envio_arreglo[i] = arreglo[i].id_proveedor;


      } else {

        //console.log("Proveedor ya existe...");

      }

      total_mas_manejo_envio += arreglo[i].total;
    }
    //console.log(" manejo_de_envio_sum  : " + manejo_de_envio_sum );
    total_mas_manejo_envio = manejo_de_envio_sum;//(total_mas_manejo_envio) + manejo_de_envio_sum;
    this.manejo_de_envio_arreglo.length = 0;
    return total_mas_manejo_envio;
  }


  recorrer_fila_arreglo(arreglo: any[]) {
    for (const i in arreglo) {
      arreglo[i].fila = parseInt(i) + 1;
    }
    return arreglo;
  }

  manejo_error(numero_error: number, nombre_campos: string = '') {
    let respuesta: string = '';
    switch (numero_error) {
      case 2627: {
        respuesta = 'No puede Duplicar el registro ' + nombre_campos + '.'
        break;
      }
      default: {
        respuesta = ''
        break;
      }
    }
    return respuesta;
  }

  manejo_status(objError: any) {
    let respuesta: any = {};
    switch (objError.status) {
      case 401: {
        respuesta.titulo = 'Autenticación';
        respuesta.mensaje = objError.error;
        swal({
          title: 'Oops...',
          text: respuesta.mensaje,
          type: "error",
          cancelButtonText: "Ok"
        },
          function (isConfirm) {
            if (isConfirm) {
              window.location.href = '/';
              // history.back();
            }
          });
        break;
      }
      default: {
        respuesta.titulo = 'Ocurrio un Error';
        respuesta = 'Respuesta de error de HTTP ("' + objError.name + '").'
        break;
      }
    }
    return respuesta;
  }

  buscar_texto_en_arreglo(arreglo: any[], texto: string, filtro: object): any[] {
    let respuesta: any[] = [];
    respuesta = arreglo.filter(item => {
      return Object.keys(filtro).find(key => item[key].toString().toLowerCase().indexOf(texto.toLowerCase()) !== -1);
    });
    return respuesta;
  }

}
