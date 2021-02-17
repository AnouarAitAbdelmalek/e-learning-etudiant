import { Formation } from './../model/formation';
import { FormationService } from 'src/app/formation/service/formation.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-achat',
  templateUrl: './achat.component.html',
  styleUrls: ['./achat.component.css']
})
export class AchatComponent implements OnInit {


  id!: number;
  formation: Formation = new Formation;

  achatForm = new FormGroup({
    cardNum : new FormControl('', 
    Validators.pattern('^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$')),
    proprietaire : new FormControl('', Validators.required),
    dateExporation : new FormControl('', Validators.required),
    codeSecurite : new FormControl('', Validators.required),
  });

  get cardNum() {
    return this.achatForm.get('cardNum');
  }

  get proprietaire() {
    return this.achatForm.get('proprietaire');
  }

  get dateExporation() {
    return this.achatForm.get('dateExporation');
  }

  get codeSecurite() {
    return this.achatForm.get('codeSecurite');
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formationService: FormationService
  ) { }

  ngOnInit(): void {
    this.id= this.activatedRoute.snapshot.params['id'];
    this.formationService.find(this.id).subscribe(
      (data) => {
        this.formation= data;
      }
    )
  }



  onSubmit() {
    this.router.navigate(['formation/'+this.id]);
  }

  

}
