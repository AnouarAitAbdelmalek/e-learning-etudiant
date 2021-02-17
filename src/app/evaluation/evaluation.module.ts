import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaluationItemComponent } from './evaluation-item/evaluation-item.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [EvaluationItemComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class EvaluationModule { }
