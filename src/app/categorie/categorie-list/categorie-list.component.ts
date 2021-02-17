import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CategorieService } from './../service/categorie.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Categorie } from '../model/categorie';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-categorie-list',
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.css']
})
export class CategorieListComponent implements OnInit {

  CATEGORIES: Categorie[] = [];


  dataSource: MatTableDataSource<Categorie> = new MatTableDataSource<Categorie>(this.CATEGORIES);
  obs!: Observable<any>;
  constructor
  (private categorieService: CategorieService, 
    private changeDetectorRef: ChangeDetectorRef, 
    public dialog: MatDialog,
    private route: Router) {}

  ngOnInit(): void {
    this.categorieService.findAll().subscribe(
      (data) => {
        this.CATEGORIES = data
        this.dataSource.data= this.CATEGORIES;
      },
      (error) => console.log(error)
    );
    this.changeDetectorRef.detectChanges();
    this.obs = this.dataSource.connect();
  }

  goToFormations(idCat: number) {
    this.route.navigate(['/categorie/'+ idCat +'/formations']);
  }

  goToAllFormations() {
    this.route.navigate(['/formationList']);
  }


  ngOnDestroy() {
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }
}
