import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormationRoutingModule } from './formation-routing.module';
import { FormationListComponent } from './formation-list/formation-list.component';
import { FormationItemComponent } from './formation-item/formation-item.component';
import { SharedModule } from '../shared/shared.module';
import { AchatComponent } from './achat/achat.component';


@NgModule({
  declarations: [FormationListComponent, FormationItemComponent, AchatComponent],
  imports: [
    CommonModule,
    FormationRoutingModule,
    SharedModule,
  ]
})
export class FormationModule { }
