import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtudiantRoutingModule } from './etudiant-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EtudiantRoutingModule,
    SharedModule
  ]
})
export class EtudiantModule { }
