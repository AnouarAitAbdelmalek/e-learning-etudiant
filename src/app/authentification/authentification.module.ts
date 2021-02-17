import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { InscriptionComponent } from './inscription/inscription.component';



@NgModule({
  declarations: [LoginComponent, InscriptionComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AuthentificationModule { }
