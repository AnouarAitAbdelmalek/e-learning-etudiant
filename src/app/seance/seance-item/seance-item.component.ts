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
  
  selectedFile!: File;
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

  supportForm = new FormGroup({
    file: new FormControl('', Validators.required),
  })

  get file() {
    return this.supportForm.get('file');
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
        this.seance = data[0];
        console.log(this.seance);
      }
    );


    this.seanceService.findSupports(this.idSeance).subscribe(
      (data) => {
        this.supports= data
        this.dataSource.data = this.supports
        this.obs= this.dataSource.connect();
      }
    )

    this.seanceService.findCommentaires(this.idSeance).subscribe(
      (data) => {
        this.commentaires= data;
        this.commentaireSource.data = this.commentaires;
        this.obsCommentaire= this.commentaireSource.connect();
      }
    )

  }

  onFileSelected(event: Event) {
    let target = event.target as HTMLInputElement;
    this.selectedFile = target.files![0];
    console.log(this.selectedFile);
  }

  onSubmit() {
    let support = new Support();
    support.seance = this.seance;
    support.nom= this.selectedFile.name;
    console.log(support.nom);
    this.seanceService.addFile(this.idSeance,this.selectedFile).subscribe(
      (data) => {
        this.seanceService.findSupports(this.idSeance).subscribe(
          (data) => {
            this.supports = data;
            this.dataSource.data = this.supports;
          }
        );

      }
    )
  }


  deleteSupport(support: Support) {
  
      this.supportService.delete(support.id).subscribe(
        (data) =>{
          console.log("c'fait");

          this.seanceService.findSupports(this.idSeance).subscribe(
            (result) => {
              this.supports = result;
              this.dataSource.data = this.supports;
            }
          );
          
        },(error) => {
          alert(support.id)
        }
      )

      // this.formationService.update(this.formation.id,this.formation).subscribe(
      //   (data) => {
      //     this.formation=data;
      //     this.seances=this.formation.seances;
      //   },
      //   (error) => {
      //     console.log(error);
      //   }
      // )

  }

  openDialog(support: Support): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        message: "Voulez vous supprimer le support " + support.nom + '?',
        supp: support,
      },
    });


    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteSupport(result.data.supp);
      }
    });
  }

  // generateMeeting() {
  //   this.meetingService.createMeeting().subscribe(
  //     (data) => {
  //       console.log(data);
  //     }
  //   );
  // }

  onCommentaireSubmit() {

    let commentaire= new Commentaire();
    commentaire.contenu = this.commentaireForm.get('contenu')?.value;
    //commentaire.date = new Date;
    commentaire.seance = this.seance;
    this.seanceService.addComment(this.idSeance,commentaire).subscribe(
      (data) => {
        this.seanceService.findCommentaires(this.idSeance).subscribe(
          (data) => {
            this.commentaires= data;
            this.commentaireSource.data = this.commentaires;
            this.obsCommentaire= this.commentaireSource.connect();
          }
        )
        
        this.contenu?.setValue('');

      }
    )
  }

  onLinkSubmit(){
    this.meetingService.createMeeting().subscribe(
      (data) => {
        this.path?.setValue(data.join_url);
        this.seance.path = this.path?.value;
    this.seanceService.update(this.seance.id, this.seance).subscribe(
      (data) => {
        console.log("khdmat");
      }
    );
      }
    )
  }


}
