import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PopoverModule } from 'ngx-bootstrap/popover';

import { SpinnerComponent } from '../controles/spinner/spinner.component';
import { BuscarTextoComponent } from '../controles/buscar-texto/buscar-texto.component';
import { ChartsModule } from 'ng2-charts';
// import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    SpinnerComponent, BuscarTextoComponent],
  imports: [
    CommonModule, FormsModule, PopoverModule.forRoot(),
    // ChartsModule,
  ],
  exports:[
    SpinnerComponent,
    BuscarTextoComponent
  ]
})
export class ShareModule { }
