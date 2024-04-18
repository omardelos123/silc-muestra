import { Component, OnInit, ViewChild } from '@angular/core';


import { Router } from '@angular/router';
import { RestService, parametros, ValidadoresService, PaginacionService, UtilidadesService } from '../../services/_export';
declare var swal: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  /*
    Variables Globales en la vista.
  */
  @ViewChild('Modal') public Modal_1;
  flag: boolean = false;
  solicitud = new parametros().prm_control_usuarios;
  solicitud_cambio = new parametros().prm_control_usuarios;
  pass: "";
  logind_usuario: number = 0;
  login = { usuario: '', contrasena: '' }
  constructor(private router: Router, private rest: RestService,
    private _validadores: ValidadoresService, private _utilidades: UtilidadesService) {
    localStorage.removeItem('_token');
  }

  ngOnInit() {
    this.limpiar();
  }

  entrar() {
    this.flag = true;
    this.rest.GEN_login_control_acceso(this.login)
      .then((respuesta) => {
        console.log(respuesta);

        let resp: any = respuesta;

        if (resp.token != '') {
          localStorage.setItem('_token', btoa(unescape(encodeURIComponent(JSON.stringify(resp.token)))));

          let resp_validada = this._validadores.respuesta_api(resp); // la respuesta validada (si ocurrio erro o no).

          if (resp_validada.estado) {
            if (resp.recordset.length > 0) {
              if (resp.recordset[0].ACCESO == 1) {
                if (resp.recordset[0].sw_cambio_contrasena == 0) {
                  let datos = {
                    u: resp.recordset[0].id_usuario,
                    c: resp.recordset[0].id_compania,
                    usr: this.login.usuario,
                    pwd: this.login.contrasena,
                    nombre: '',
                    datos: ''
                  }
                  let datosString = JSON.stringify(datos);
                  let btoa_datos = window.btoa(datosString);
                  this.router.navigate(['restablecer-contrasena', btoa_datos]);
                }
                else {
                  // let menu = [];
                  let menu_copia = resp.recordset;
                  if (typeof (Storage) !== "undefined") {
                    localStorage.setItem("COMP", resp.recordset[0].id_compania);
                    localStorage.setItem("USU", resp.recordset[0].id_usuario);
                    localStorage.setItem("sadm", resp.recordset[0].sadm);
                  }
                  else {
                    console.log("LocalStorage no soportado en este navegador")
                  }


                  let link = '';
                  for (const i in menu_copia) {
                    if (menu_copia[i].sw_principal == 1) {
                      link = menu_copia[i].link_menu;
                      console.log(link)
                    }
                  }

                  if (link == '') {
                    link = '/silc/inicio';
                  }


                  let menu_mostrar = [];

                  for (const i in menu_copia) {
                    if (menu_copia[i].sw_contenedor_menu == 1) {
                      menu_mostrar.push({
                        sw_contenedor_menu: 1,
                        id_menu: menu_copia[i].id_menu,
                        name: menu_copia[i].nombre_menu,
                        url: menu_copia[i].link_menu,
                        icon: 'fa fa-bars',
                        children: [],
                        sw_crea: menu_copia[i].crea_rol,
                        sw_eliminar: menu_copia[i].elimina_rol,
                        sw_editar: menu_copia[i].edita_rol
                      });
                    } else if (menu_copia[i].sw_contenedor_menu == 0 && menu_copia[i].id_padre == 0) {
                      menu_mostrar.push({
                        id_menu: menu_copia[i].id_menu,
                        name: menu_copia[i].nombre_menu,
                        url: menu_copia[i].link_menu,
                        icon: 'fa fa-angle-right',
                        sw_crea: menu_copia[i].crea_rol,
                        sw_eliminar: menu_copia[i].elimina_rol,
                        sw_editar: menu_copia[i].edita_rol,
                        sw_mostrar: menu_copia[i].sw_mostrar
                      });
                    }
                  }


                  for (const i in menu_mostrar) {
                    if (menu_mostrar[i].sw_contenedor_menu == 1) {
                      for (const j in menu_copia) {
                        if (menu_mostrar[i].id_menu == menu_copia[j].id_padre && menu_copia[j].sw_mostrar == 1) {
                          menu_mostrar[i].children.push({
                            name: menu_copia[j].nombre_menu,
                            url: menu_copia[j].link_menu,
                            icon: 'fa fa-angle-right',
                            sw_crea: menu_copia[j].crea_rol,
                            sw_eliminar: menu_copia[j].elimina_rol,
                            sw_editar: menu_copia[j].edita_rol,
                            sw_mostrar: menu_copia[j].sw_mostrar
                          });
                        }
                      }
                    }
                  }

                  localStorage.setItem('_menu', btoa(unescape(encodeURIComponent(JSON.stringify(menu_copia)))));
                  localStorage.setItem('_menu_mostrar', btoa(unescape(encodeURIComponent(JSON.stringify(menu_mostrar)))));
                  this.router.navigate([link]);
                }
              }
              else {
                swal("Usuario o contraseña incorrecto", "", "warning");
                this.login.contrasena = '';
                this.flag = false;
              }
            }
          } else {
            this.flag = false;
            swal("Ocurrio un Error", "", "");
          }
        } else {
          this.flag = false;
          swal("Ocurrio un Error", "'Error en la autenticación del token", "");
          this.limpiar()
        }

      }, (error) => {
        this.flag = false;
        let respuesta = this._utilidades.manejo_status(error);
        swal(respuesta.titulo, respuesta.mensaje, "");
        console.log(error);
      });
  }

  limpiar() {
    localStorage.removeItem('_token');
    localStorage.removeItem('_user');
    localStorage.removeItem('_menu');
    localStorage.removeItem('COMP');
    localStorage.removeItem('USU');
    localStorage.removeItem('_menu_mostrar');
    localStorage.removeItem('_acess');
    localStorage.removeItem('sadm');
  }
}
