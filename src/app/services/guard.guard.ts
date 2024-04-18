import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let data = [];
    const pagina = '/silc/' + route.url[0].path;

    const permisos = {
      // pp: Date.now().toString(),
      actualizar: 0,
      // pp1: Date.now().toString() + 'primera',
      eliminar: 0,
      // pp2: Date.now().toString() + 'segunda',
      registrar: 0,
      pagina: ''
    }
    if (localStorage.getItem('_menu')) {
      data = JSON.parse(decodeURIComponent(escape(window.atob(localStorage.getItem('_menu')))));
      for (const key in data) {
        if (data[key].link_menu != undefined && data[key].link_menu != null) {
          if (data[key].link_menu === pagina) {
            permisos.registrar = data[key].crea_rol;
            permisos.actualizar = data[key].edita_rol;
            permisos.eliminar = data[key].elimina_rol;
            localStorage._acess = btoa(unescape(encodeURIComponent(JSON.stringify(permisos))));
            return true;
          }
        }
      }

      // for (const key in data) {
      //   if (data[key].children != undefined && data[key].children != null) {
      //     for (const a in data[key].children) {
      //         if (data[key].children[a].url === pagina) {
      //             permisos.registrar = data[key].children[a].sw_crea;
      //             permisos.actualizar = data[key].children[a].sw_editar;
      //             permisos.eliminar = data[key].children[a].sw_eliminar;
      //             localStorage._acess = btoa(unescape(encodeURIComponent(JSON.stringify(permisos))));
      //             return true;
      //         }
      //     }
      //   }else{
      //     if (data[key].url === pagina) {
      //       permisos.registrar = data[key].sw_crea;
      //       permisos.actualizar = data[key].sw_editar;
      //       permisos.eliminar = data[key].sw_eliminar;
      //       localStorage._acess = btoa(unescape(encodeURIComponent(JSON.stringify(permisos))));
      //       return true;
      //   }
      //   }
      // }
    }
    else {
      return false;
    }
    alert('Usted no posee permiso para acceder a esta esta pantalla. ' + pagina + ' Consulte con el (la) administrador (a).');
    return false;
  }
}
