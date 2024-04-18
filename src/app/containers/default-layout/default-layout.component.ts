import {Component, OnDestroy} from '@angular/core';
import { navItems } from './../../_nav';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
  // public navItems = navItems;
  // JSON.parse(atob(localStorage._menu)).
  
  public navItems = JSON.parse(decodeURIComponent(escape(window.atob(localStorage._menu_mostrar))));
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  version:string = environment.VERSION;
  constructor() {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: [ 'class' ]
    });
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
}
