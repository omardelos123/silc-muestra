import { Injectable } from '@angular/core';
import * as _ from 'rxjs';

declare var swal: any;

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  respuesta_validada: any = { estado: false, msg: '' };
  btn_acciones = { btn_guardar: false, btn_limpiar: false }
  constructor() { }


  respuesta_api(resp: any) {
    let code_error = resp.code;
    console.log('code_error', code_error);
    switch (code_error) {
      case 'EREQUEST': {
        /* 
          Entro a la base de datos pero ocurrio un error en la consulta 
        */
        this.respuesta_validada.estado = false;
        this.respuesta_validada.msg = resp.originalError.info.message;
        break;
      }
      case 'EPARAM': {
        /* 
          Error en los parametros que se envian:
          - puede ser error de tipos de datos.
        */
        this.respuesta_validada.estado = false;
        this.respuesta_validada.msg = resp.originalError.message;
        break;
      }
      case 'ECONNCLOSED': {
        /* 
          No encontro el servidor:
          - Estan mal los parametros de conexion a la base de datos.
          - La instancia esta abajo.
        */
        this.respuesta_validada.estado = false;
        this.respuesta_validada.msg = 'En la conexion de la base de datos ("' + resp.name + '").';
        break;
      }
      case 'ETIMEOUT': {
        /* 
          Time Out:
          - Tiempo de espera.
        */
        this.respuesta_validada.estado = false;
        this.respuesta_validada.msg = resp.originalError.message;
        break;
      }
      default: {
        if (code_error != undefined || code_error != null || code_error != NaN || code_error != false || code_error != '' || code_error != 0) {
          this.respuesta_validada.estado = true;
        } else {
          this.respuesta_validada.estado = false;
          this.respuesta_validada.msg = 'El error no esta definido, ver el console.log().';
        }
        break;
      }
    }
    return this.respuesta_validada;
  }

  BtnVisibles(estatus: string) {
    if (estatus == 'crear' || estatus == 'modificar' || estatus == 'recibir') {
      this.btn_acciones.btn_guardar = true;
      if (estatus == 'modificar' || estatus == 'recibir') {
        this.btn_acciones.btn_limpiar = false;
      } else {
        this.btn_acciones.btn_limpiar = true;
      }
    } else if (estatus == 'detalle') {
      this.btn_acciones.btn_guardar = false;
      this.btn_acciones.btn_limpiar = false;
    }
    return this.btn_acciones;
  }

  tipo_estatus(estatus: string) {
    let solicitud = '';
    if (estatus == 'crear') {
      solicitud = 'C';
    } else if (estatus == 'modificar' || estatus == 'detalle' || estatus == 'recibir') {
      if (estatus == 'modificar' || estatus == 'recibir') {
        solicitud = 'U';
      }
    }
    return solicitud;
  }



  errores(error: any) {
    console.log(error)
    let codigo = error.status;
    switch (codigo) {
      case 401: {
        /* 
          Utenticacion basada en token 
        */
        swal({
          type: 'error',
          title: 'Oops...',
          text: error.error.error,
          cancelButtonText: "Ok"
        },
          function (isConfirm) {
            if (isConfirm) {
              window.location.href = '/';
            }
          })
        break;
      }
      default: {
        swal({
          type: 'error',
          title: 'Oops...',
          text: error.message
        });
        break;
      }
    }
    return this.respuesta_validada;
  }
}
