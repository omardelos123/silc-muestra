import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestService, ValidadoresService } from '../../services/_export';
declare var swal: any;

@Component({
  selector: 'app-restablecer-contrasena',
  templateUrl: './restablecer-contrasena.component.html',
  styleUrls: ['./restablecer-contrasena.component.scss']
})
export class RestablecerContrasenaComponent implements OnInit {

  flag: boolean = false;
  login: any = { usuario: '', n_contrasena: '', nr_contrasena: '', v_contrasena: '', id_compania: 0, id_usuario: 0, accion_tipo: '',usuario_actualiza: 0 };

  expContrasena = "^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,500}$";
  
  constructor(private router: Router, private route: ActivatedRoute, private rest: RestService,
    private _validadores: ValidadoresService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['data'] != null) {
        try {
          let datos = JSON.parse(window.atob(params['data']));
          this.login.usuario = datos.usr;
          this.login.v_contrasena = datos.pwd;

          this.login.id_compania = datos.c;
          this.login.id_usuario = datos.u;
          this.login.accion_tipo = 'U';

        } catch (error) {
          alert("Ocurrio un error.");
          console.log(error);
        }
      }
      else {
        alert("ERROR NULL.");
      }
    });
  }

  restablecer_contrasena() {
    this.flag = true;
    this.rest.GEN_cambio_contrasena(this.login)
      .then((respuesta) => {
        let resp: any = respuesta;
        console.log(resp);

        let resp_validada = this._validadores.respuesta_api(resp);
        console.log("---->>  " + resp_validada)
        swal("Cambio de contraseña correcto", "Puede proceder al inicio de sesión", "success");

        this.flag = false;

        this.router.navigate(['login']);

      }, (error) => {
        this.flag = false;
        console.log(error);
      });

  }
}
