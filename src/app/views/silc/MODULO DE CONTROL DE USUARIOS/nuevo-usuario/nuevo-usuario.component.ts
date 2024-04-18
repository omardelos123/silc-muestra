import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RestService, parametros, Permisos, ValidadoresService, UtilidadesService } from '../../../../services/_export';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


declare var swal: any;
@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.scss']
})
export class NuevoUsuarioComponent implements OnInit {

  /* Variables de configuración de notificación*/


  /* Variables para los permisos, eliminar, editar, guardar */
  permisos = new Permisos().access;
  /* Objeto que se envia al webservice  */
  solicitud = new parametros().prm_control_usuarios;
  flag: boolean = false;

  /*Variables del la vista */
  tipo_de_personal: any;
  licencias: any[] = [];


  filtrar_usuario: string = '';
  roles: any = [];
  titulo: string;
  estatus: string;
  compañia: string
  todas_las_companias: any;
  base64textString: string = ''
  btn_acciones = { btn_guardar: false, btn_limpiar: false };
  foto: string = '';
  mostrar_foto: boolean = false;
  url_origin = '';
  expContrasena = "^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,500}$";
  expCorreo = "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$";

  constructor(private router: Router, private route: ActivatedRoute, private rest: RestService,
    private _validadores: ValidadoresService, private _utilidades: UtilidadesService, public fb: FormBuilder) {

  }

  ngOnInit() {
    this.url_origin = window.location.origin;
    this.solicitud.url_origin = this.url_origin;
    this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
    this.solicitud.id_menu = 0;
    this.mostrar_foto = false;
    if (this.foto == '') {
      this.foto = 'assets/img/avatars/10.jpg';
      this.mostrar_foto = true;
    }

    this.consultar_roles();
    this.route.params.subscribe(params => {
      if (params['data'] != null) {
        try {
          this.titulo = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).titulo;
          this.estatus = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).estatus;

          // this.BtnVisibles();
          this.btn_acciones = this._validadores.BtnVisibles(this.estatus);

          if (this.estatus == 'crear') {
            this.solicitud.usuario_crea = parseInt(localStorage.getItem("USU"));
            this.solicitud.accion_tipo = 'C';
          } else if (this.estatus == 'modificar' || this.estatus == 'detalle') {
            this.solicitud.usuario_actualiza = parseInt(localStorage.getItem("USU"));
            this.solicitud.accion_tipo = 'U';
            this.solicitud = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).datos;
            this.solicitud.nombre_usuario = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).datos.nombre;
            if (this.estatus == 'modificar') {
              this.solicitud.usuario_actualiza = parseInt(localStorage.getItem("USU"));
              this.solicitud.accion_tipo = 'U';
            }
          }
        } catch (error) {
          alert("Ocurrio un error con los parametros del Router.");
          console.log(error);
        }
      }
      else {
        alert("Parametros nulos.");
      }
    });
    this.solicitud.token = JSON.parse(decodeURIComponent(escape(window.atob(localStorage._token))));
  }

  run_tipo_de_personal() {

    this.rest.CRUD_tipo_de_personal(this.solicitud)
      .then((respuesta) => {
        let resp: any = respuesta;
        this.tipo_de_personal = resp.recordset;
        this.consultar_licencias();
        console.log(resp);
        // this.flag = false;
      }, (error) => {
        this.flag = false;
        console.log(error);

      });
  }
  consultar_roles() {
    this.solicitud.accion_tipo = 'R'; // R: Read: Select en base de datos.
    // this.flag = true;
    this.rest.CRUD_roles(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log(resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).
        this.solicitud.accion_tipo = 'R';
        this.solicitud.sw_activo = 1;
        // this.solicitud.id_compania = parseInt(localStorage.getItem("COMP"));
        this.run_tipo_de_personal();
        if (resp_validada.estado) {
          this.roles = resp.recordset;
        } else {
          this.roles = [];
          swal('Ocurrio un Error', resp_validada.msg, 'error');
        }

        // this.flag = false;

      }, (error) => {
        this.flag = false;
        let respuesta = this._utilidades.manejo_status(error);
        swal('Oops', 'Ocurrió un error', 'error');
        console.log(error);
      });
  }

  consultar_img() {
    // this.flag = true;
    this.rest.GEN_obtener_img_usuario(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log(resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).
        if (resp_validada.estado) {
          if (resp.recordset[0].foto != null) {
            this.foto = 'data:' + resp.recordset[0].tipo_img + ';base64,' + resp.recordset[0].foto;
            this.mostrar_foto = true;
          }
        } else {
          this.roles = [];
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

  consultar_licencias() {
    this.flag = true;
    this.rest.CRUD_licencias(this.solicitud)
      .then((respuesta) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log("Viendo licencias");
        console.log(resp);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

        if (resp_validada.estado) {
          this.licencias = resp.recordset;
        } else {
          this.licencias = [];
          swal('Ocurrio un Error', resp_validada.msg, 'error');
        }
        this.consultar_img();
        this.flag = false;

      }, (error) => {
        this.flag = false;
        let respuesta = this._utilidades.manejo_status(error);
        swal('Oops', 'Ocurrió un error', 'error');
        console.log(error);
      });
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
    this.foto = 'data:' + this.solicitud.tipo_img + ';base64,' + this.solicitud.foto;
    this.flag = false;
    this.mostrar_foto = true;
  }


  guardar(FRM) {
    this.solicitud.usuario_actualiza = parseInt(localStorage.getItem("USU"));
    this.solicitud.usuario_crea = parseInt(localStorage.getItem("USU"));
    this.solicitud.id_compania = this.solicitud.id_compania;
    if (this.estatus == 'crear') {
      this.solicitud.accion_tipo = 'C';
    } else if (this.estatus == 'modificar' || this.estatus == 'detalle') {
      this.solicitud.accion_tipo = 'U';
    }
    this.flag = true;
    // this.solicitud.accion_tipo='C';
    this.solicitud.sw_activo = (this.solicitud.sw_activo) ? 1 : 0;
    this.solicitud.link = this.solicitud.identidad_personal.trim(); // le quito los espacios de izquierda y derecha


    this.rest.CRUD_usuarios(this.solicitud)
      .then((respuesta: any) => {

        let resp: any = respuesta; // toda la respuesta del servidor.
        console.log(respuesta);

        let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

        if (resp_validada.estado) {
          if (this.solicitud.accion_tipo == 'C') {
            let accepted: string[] = respuesta.respuesta.accepted;
            if (accepted.length > 0) {
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
                    this.mostrar_foto = false;
                  }

                });
            } else {
              swal('Ocurrio un Error', respuesta, 'error');
            }

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
        } else {
          let respuesta = this._utilidades.manejo_error(resp.number, this.solicitud.usuario);
          if (respuesta != '') {
            swal('Ocurrio un Error', respuesta, 'success');
          } else {
            swal('Ocurrio un Error', resp_validada.msg, 'error');
          }
        }

        this.flag = false;

      }, (error) => {
        this.flag = false;
        let respuesta = this._utilidades.manejo_status(error);
        swal('Oops', 'Ocurrió un error', 'error');
        console.log(error);
      });
  }


  limpiar(FRM: any) {
    this.solicitud.id_compania = 0;
    this.solicitud.id_usuario = 0;
    this.solicitud.id_rol = 0;
    this.solicitud.nombre_usuario = '';
    this.solicitud.apellido = '';
    this.solicitud.direccion = '';
    this.solicitud.funciones = '';
    this.solicitud.correo = '';
    this.solicitud.identidad_personal = '';
    this.solicitud.fecha_de_nacimiento = new Date().toUTCString();
    this.solicitud.usuario = '';
    this.solicitud.contrasena = '';
    this.solicitud.sw_activo = 0;
    FRM.reset();
  }

  cancelar() {
    history.back();
  }

  cambio_contrasena() {

    if (this.solicitud.correo != '') {

      swal({
        title: "Desea cambio de contraseña para el usuario: " + this.solicitud.nombre_usuario + " " + this.solicitud.apellido,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Si",
        cancelButtonText: "No",
        closeOnConfirm: true
      },
        confirmed => {
          if (confirmed) {
            this.flag = true;
            this.rest.GEN_cambio_contrasena_Activar(this.solicitud)
              .then((respuesta: any) => {
                this.flag = false;
                let accepted: string[] = respuesta.respuesta.accepted;

                if (accepted.length > 0) {
                  swal({
                    title: "Proceso exitoso!",
                    text: "Se envio un correo a :" + this.solicitud.correo + " con las nuevas credenciales del usuario.",
                    type: "success",
                    cancelButtonText: "Ok"
                  },
                    function (isConfirm) {
                      if (isConfirm) {
                        history.back();
                      }
                    });
                } else {
                  swal('Ocurrio un Error', respuesta, 'error');
                }

              }, (error) => {
                this.flag = false;
                swal('Oops', 'Ocurrió un error', 'error');
                console.log(error);
              });
          }
        });


    } else {
      swal("Primero debe asignar un correo al usuario", "", "error");
    }

  }
}
