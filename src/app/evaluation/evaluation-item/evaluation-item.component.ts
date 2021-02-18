import { Formation } from 'src/app/formation/model/formation';
import { ConfirmationDialogComponent } from './../../shared/confirmation-dialog/confirmation-dialog.component';
import { Question } from './../model/question';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { EvaluationService } from './../service/evaluation.service';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Evaluation } from '../model/evaluation';
import { FormationService } from 'src/app/formation/service/formation.service';

@Component({
  selector: 'app-evaluation-item',
  templateUrl: './evaluation-item.component.html',
  styleUrls: ['./evaluation-item.component.css']
})
export class EvaluationItemComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute, 
    public dialog: MatDialog,
    private evaluationService: EvaluationService,
    private formationService: FormationService,
    private formBuilder: FormBuilder) {
     }
     formation: Formation = new Formation();
    evaluation: Evaluation = new Evaluation();
    questions: Question[] = [];
    formgroup : FormGroup=  new FormGroup({});
    formArray :  FormArray = new FormArray([]);

    reps: any[] = [];
    

    getControls() {
      return (this.formgroup.get('reponses') as FormArray).controls;
    }


  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'];

    // let date = new Date;
    

    this.formationService.find(id).subscribe(
      (data) => {
        this.formation = data[0];
        this.evaluation = this.formation.evaluation;
        this.questions = this.evaluation.questions;

        this.formgroup = this.formBuilder.group({
          reponses : this.formBuilder.array ([])
        })
        const reponses = this.getControls();
        this.questions.forEach((qst) => {
          
          reponses.push(this.formBuilder.group({
            numeroDeQuestion : qst.numeroDeQuestion,
            valeur : ''
          }))

        })

        console.log(this.formgroup)
      }
    );

    
    
  }

  onItemChange(value : string, question: Question) {
    this.getControls()[question.numeroDeQuestion-1].setValue({
      numeroDeQuestion : question.numeroDeQuestion,
      valeur : value
    })
  }
 

  onSubmit(){

    this.getControls().forEach(alo => {
      this.reps.push(alo.value);
    });

    let passageEvaluation = {
      reponses : this.reps
    }
    this.formationService.passageEvaluation(this.formation.id,passageEvaluation).subscribe((result)=>
    {
      console.log("ça marche.")
    })

  }





  

}
