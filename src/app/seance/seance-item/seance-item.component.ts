import { CommentaireService } from './../../commentaire/service/commentaire.service';
import { Commentaire } from './../../commentaire/model/commentaire';
//import { MeetingService } from './../service/meeting.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { SupportService } from './../../support/service/support.service';
import { Support } from './../../support/model/support';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SeanceService } from './../service/seance.service';
import { Seance } from './../model/seance';
import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../service/meeting.service';

@Component({
  selector: 'app-seance-item',
  templateUrl: './seance-item.component.html',
  styleUrls: ['./seance-item.component.css']
})
export class SeanceItemComponent implements OnInit {


  seance: Seance = new Seance();
  
  
  supports: Support[] = [];


  commentaires: Commentaire[] = [];

  linkForm = new FormGroup({
    path: new FormControl({ value: '', disabled: true }),
  })

  get path() {
    return this.linkForm.get('path');
  }

  commentaireForm = new FormGroup({
    contenu: new FormControl('', Validators.required),
  })

  get contenu() {
    return this.commentaireForm.get('contenu');
  }

  

  idSeance = this.activatedRoute.snapshot.params['id'];

  
  obs!: Observable<any>;
  obsCommentaire!: Observable<any>;
  dataSource: MatTableDataSource<Support> = new MatTableDataSource<Support>(this.supports);
  commentaireSource: MatTableDataSource<Commentaire> = new MatTableDataSource<Commentaire>(this.commentaires);
  constructor(
    private seanceService: SeanceService,
    private supportService: SupportService,
    //private meetingService: MeetingService,
    private commentaireService: CommentaireService,
    private meetingService: MeetingService,
    public dialog: MatDialog,
    private router : Router,
    private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {

    
    this.seanceService.find(this.idSeance).subscribe(
      (data) => {
        this.seance = data;
        this.path?.setValue(this.seance.path);
      }
    );


    this.supportService.findAll().subscribe(
      (data) => {
        this.supports= data
        this.dataSource.data = this.supports
        this.obs= this.dataSource.connect();
      }
    )

    this.commentaireService.findAll().subscribe(
      (data) => {
        this.commentaires= data;
        this.commentaireSource.data = this.commentaires;
        this.obsCommentaire= this.commentaireSource.connect();
      }
    )

  }


  onCommentaireSubmit() {

    let commentaire= new Commentaire();
    commentaire.contenu = this.commentaireForm.get('contenu')?.value;
    commentaire.date = new Date;
    commentaire.seance = this.seance;
    this.commentaireService.save(commentaire).subscribe(
      (data) => {
        this.commentaires.push(data);
        this.contenu?.setValue('');

      }
    )
  }



}
