import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nueva-entrega-de-partes',
  templateUrl: './nueva-entrega-de-partes.component.html',
  styleUrls: ['./nueva-entrega-de-partes.component.scss']
})
export class NuevaEntregaDePartesComponent implements OnInit {
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
