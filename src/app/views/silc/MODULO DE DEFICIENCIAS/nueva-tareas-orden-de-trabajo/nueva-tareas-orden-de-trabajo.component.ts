import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nueva-tareas-orden-de-trabajo',
  templateUrl: './nueva-tareas-orden-de-trabajo.component.html',
  styleUrls: ['./nueva-tareas-orden-de-trabajo.component.scss']
})
export class NuevaTareasOrdenDeTrabajoComponent implements OnInit {
  titulo: string;
  estatus: string;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      if (params['data'] != null) {
        try {
          this.titulo = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).titulo;
          this.estatus = JSON.parse(decodeURIComponent(escape(window.atob(params['data'])))).estatus;
          // this.solicitud.token = JSON.parse(decodeURIComponent(escape(window.atob(localStorage._token))));
        } catch (error) {
          alert("hubo un error");
        }
      }
      else {
        alert("envio un valor null");
      }
    });
  }

}
