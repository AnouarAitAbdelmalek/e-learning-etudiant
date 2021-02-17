import { Intervenant } from 'src/app/intervenant/model/intervenant';
import { Formation } from 'src/app/formation/model/formation';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormationService } from '../service/formation.service';
import { Seance } from 'src/app/seance/model/seance';
import { MatDialog } from '@angular/material/dialog';
import { IntervenantService } from 'src/app/intervenant/service/intervenant.service';

@Component({
  selector: 'app-formation-item',
  templateUrl: './formation-item.component.html',
  styleUrls: ['./formation-item.component.css']
})
export class FormationItemComponent implements OnInit {

  formation: Formation = new Formation;
  intervenant: Intervenant = new Intervenant;

  seances: Seance[] = [];

  date: Date = new Date();

  possede: boolean = true;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute, 
    public dialog: MatDialog,
    private formationService: FormationService,
    private intervenantService : IntervenantService
  ) {}


  ngOnInit(): void {
    this.formationService.find(this.activatedRoute.snapshot.params['id']).subscribe(
      (data) => {
        this.formation=data;
        this.seances=this.formation.seances;
        this.intervenant = this.formation.intervenant;
      }
    );
    this.intervenantService.find(this.formation.intervenant.id).subscribe(
      (data) => {
        //this.intervenant = data
      }
    )
  }


  goToSeance(id: number) {
    this.router.navigate(['/seance/'+id]);
  }

  goToEvaluation(id: number) {
    
    this.router.navigate(['formation/'+id+'/evaluation']);
  }

  acheterFormation(id: number) {
    this.router.navigate(['formation/'+id+'/achat']);
  }
}
