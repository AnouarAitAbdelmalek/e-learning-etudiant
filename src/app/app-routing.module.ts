import { InscriptionComponent } from './authentification/inscription/inscription.component';
import { AchatComponent } from './formation/achat/achat.component';
import { SeanceItemComponent } from './seance/seance-item/seance-item.component';
import { EvaluationItemComponent } from './evaluation/evaluation-item/evaluation-item.component';
import { FormationItemComponent } from './formation/formation-item/formation-item.component';
import { AcceuilComponent } from './shared/acceuil/acceuil.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FormationListComponent } from './formation/formation-list/formation-list.component';
import { CategorieListComponent } from './categorie/categorie-list/categorie-list.component';
import { LoginComponent } from './authentification/login/login.component';
import { AuthGuardService } from './authentification/service/auth-guard.service';

const routes: Routes = [
  {
    path: 'inscription',
    component: InscriptionComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: SidebarComponent,
    canActivate:[AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'formationList',
        pathMatch: 'full',
      },
      {
        path: 'acceuil',
        component: AcceuilComponent,
      },
      {
        path: 'etudiant/:idEtud/formations',
        component: FormationListComponent,
      },
      {
        path: 'categorie/:idCat/formations',
        component: FormationListComponent,
      },
      {
        path: 'formationList',
        component: FormationListComponent,
      },
      {
        path: 'formation/:id',
        component: FormationItemComponent,
      },
      {
        path: 'formation/:id/evaluation',
        component: EvaluationItemComponent,
      },
      {
        path: 'formation/:id/achat',
        component: AchatComponent,
      },
      {
        path: 'seance/:id',
        component: SeanceItemComponent,
      },
      {
        path: 'categorieList',
        component: CategorieListComponent,
      },  
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
