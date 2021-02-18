import { Intervenant } from 'src/app/intervenant/model/intervenant';
import { Formation } from 'src/app/formation/model/formation';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormationService } from '../service/formation.service';
import { Seance } from 'src/app/seance/model/seance';
import { MatDialog } from '@angular/material/dialog';
import { IntervenantService } from 'src/app/intervenant/service/intervenant.service';
import { EtudiantService } from 'src/app/etudiant/service/etudiant.service';

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
  evaluationExiste:boolean=true;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute, 
    public dialog: MatDialog,
    private formationService: FormationService,
    private intervenantService : IntervenantService,
    private etudiantService:EtudiantService
  ) {}


  ngOnInit(): void {
    this.formationService.find(this.activatedRoute.snapshot.params['id']).subscribe(
      (data) => {
        
        this.formation=data[0];
        if(this.formation.evaluation===null) this.evaluationExiste=false;
        this.etudiantService.estInscrit(data[0]).subscribe((result)=>
        {
          this.possede=result.response;
        })
        this.intervenant=this.formation.intervenant;
        this.formationService.findSeances(this.activatedRoute.snapshot.params['id']).subscribe(
          result=> {
            this.seances=result;
          }
        )
      }
    );
  
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
