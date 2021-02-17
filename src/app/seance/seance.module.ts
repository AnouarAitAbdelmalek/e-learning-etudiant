import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeanceRoutingModule } from './seance-routing.module';
import { SeanceItemComponent } from './seance-item/seance-item.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [SeanceItemComponent],
  imports: [
    CommonModule,
    SeanceRoutingModule,
    SharedModule
  ]
})
export class SeanceModule { }
