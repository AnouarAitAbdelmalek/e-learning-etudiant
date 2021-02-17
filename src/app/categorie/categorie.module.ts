import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategorieRoutingModule } from './categorie-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CategorieListComponent } from './categorie-list/categorie-list.component';


@NgModule({
  declarations: [CategorieListComponent],
  imports: [
    CommonModule,
    CategorieRoutingModule, 
    SharedModule
  ]
})
export class CategorieModule { }
