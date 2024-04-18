import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DatePipe } from '@angular/common'
import { RestService, parametros,  Permisos, ValidadoresService, UtilidadesService } from '../../../../services/_export';
declare var swal: any;
@Component({
  selector: 'app-nuevo-personal',
  templateUrl: './nuevo-personal.component.html',
  styleUrls: ['./nuevo-personal.component.scss'],
  providers: [DatePipe]
})
export class NuevoPersonalComponent implements OnInit {


  dateNow: Date = new Date();
  dateNowISO = this.dateNow.toISOString();
  dateNowMilliseconds = this.dateNow.getTime();





  /* Variables de configuración de notificación*/
  
 
  /* Variables para los permisos, eliminar, editar, guardar */
  permisos = new Permisos().access;
  /* Objeto que se envia al webservice  */
  solicitud = new parametros().prm_control_sistemas;

  tipo_de_personal: any;
  /*Variables del la vista */
  flag: boolean = false;
  titulo: string;
  estatus: string;
  //compañia: string
  base64textString: string = ';'

  btn_acciones = { btn_guardar: false, btn_limpiar: false }

  constructor(private datePipe: DatePipe,  private router: Router, private route: ActivatedRoute, private rest: RestService,
    private _validadores: ValidadoresService, private _utilidades: UtilidadesService) { }
  checkDate() {
    const datesendtoserver1 = new DatePipe('en-US').transform(this.solicitud.fecha_inicio, 'yyyy-MM-dd')
    const datesendtoserver2 = new DatePipe('en-US').transform(this.solicitud.fecha_nacimiento, 'yyyy-MM-dd')
    this.solicitud.fecha_inicio = datesendtoserver1;
    this.solicitud.fecha_nacimiento = datesendtoserver2;
    console.log(datesendtoserver1);
    console.log(datesendtoserver2);
  }
  ngOnInit() {
    this.solicitud.accion_tipo = 'R';
    this.solicitud.sw_activo = 1;
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
    this.run_tipo_de_personal();

    this.solicitud.fecha_actualiza = null;
    this.solicitud.fecha_crea = null;
    this.route.params.subscribe(params => {
      if (params['data'] != null) {
        try {
          this.titulo = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).titulo;
          this.estatus = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).estatus;

          this.btn_acciones = this._validadores.BtnVisibles(this.estatus);

          if (this.estatus == 'crear') {
            this.solicitud.usuario_crea = parseInt(localStorage.getItem("USU"));
            this.solicitud.accion_tipo = 'C';

          } else if (this.estatus == 'modificar') {
            this.solicitud.usuario_actualiza = parseInt(localStorage.getItem("USU"));
            this.solicitud = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).datos;
            this.solicitud.sw_activo = 1;
            this.solicitud.accion_tipo = 'U';
            console.log(this.solicitud);
          } else if (this.estatus == 'detalle') {
            if (this.solicitud.genero = "option1") { this.solicitud.genero = "F" }
            if (this.solicitud.genero = "option2") { this.solicitud.genero = "M" }
            this.solicitud = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).datos;
            this.solicitud.accion_tipo = 'U';
            console.log(this.solicitud);
          }
        } catch (error) {
          alert("hubo un error 1");
        }
      }
      else {
        alert("envio un valor null");
      }
    });
          this.solicitud.token = JSON.parse(decodeURIComponent(escape(window.atob(localStorage._token))));
  }

  run_tipo_de_personal() {
    this.flag = true;

    this.rest.CRUD_tipo_de_personal(this.solicitud)
      .then((respuesta) => {
        //var dateF = new Date();

        // this.solicitud.fecha_inicio = this.datePipe.transform(this.solicitud.fecha_inicio, "dd-MM-yyyy");
        //console.log(this.datePipe.transform(this.solicitud.fecha_inicio, 'dd/MM/yyyy'));
        // alert("  "+this.solicitud.fecha_inicio==this.solicitud.fecha_inicio);
        // this.solicitud.fecha_inicio = new DatePipe('en-US').transform(this.solicitud.fecha_inicio, 'yyyy-MM-dd');
        //alert("---->>>  "+this.solicitud.fecha_inicio);
        //this.solicitud.fecha_nacimiento = this.datePipe.transform(this.solicitud.fecha_nacimiento, 'yyyy-MM-dd');

        let resp: any = respuesta;
        this.tipo_de_personal = resp.recordset;

        console.log(resp);
        this.flag = false;
      }, (error) => {
        this.flag = false;
        console.log(error);

      });
  }

  guardar(FRM) {
    this.solicitud.usuario_actualiza = parseInt(localStorage.getItem("USU"));
    this.solicitud.usuario_crea = parseInt(localStorage.getItem("USU"));
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));

    if (this.estatus == 'crear') {
      this.solicitud.sw_activo = (this.solicitud.sw_activo) ? 1 : 0;
    }

    // Se Puede colocar un metodo ara validar los datos que se envian.
    this.rest.CRUD_personal(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log(resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

        if (resp_validada.estado) {
          if (this.solicitud.accion_tipo == 'C') {
            swal({
              title: "Proceso exitoso!",
              text: "Se registraron los datos correctamente!   \n ¿Desea crear otro registro?",
              type: "success",
              showCancelButton: true,
              confirmButtonText: "No",
              cancelButtonText: "Si"
            },
              confirmed => {
                if (confirmed) {
                  history.back();
                } else {

                  this.limpiar(FRM);
                }

              });
          } else if (this.solicitud.accion_tipo == 'U') {
            swal({
              title: "Proceso exitoso!",
              text: "Se Actualizaron los datos correctamente",
              type: "success",
              cancelButtonText: "Ok"
            },
              function (isConfirm) {
                if (isConfirm) {
                  history.back();
                } else {

                  this.limpiar(FRM);
                }

              });
          }
          // this.router.navigate(['./silc/menus']);
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

  limpiar(FRM) {

    this.solicitud.id_tipo_personal = 0;
    this.solicitud.identidad_personal = '';
    this.solicitud.nombre = '';
    this.solicitud.apellido = '';
    this.solicitud.fecha_inicio = null;
    this.solicitud.fecha_nacimiento = null;
    this.solicitud.genero = '';
    this.solicitud.descripcion = '';
    this.solicitud.sw_activo = 0;
    FRM.reset();
  }

//data:image/jpeg;base64,
  handleFileSelect(evt) {
    this.flag = true;
    this.solicitud.tipo_img = '';
    this.solicitud.foto = '';
    let files = evt.target.files;
    let file = files[0];
    this.solicitud.tipo_img = file.type;

    if (files && file) {
      let reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }



  _handleReaderLoaded(readerEvt) {
    let binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.solicitud.foto = this.base64textString;
    this.flag = false;
  }



  cancelar() {
    history.back();
  }



}
