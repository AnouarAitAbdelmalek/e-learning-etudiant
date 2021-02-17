import { EtudiantService } from './../../etudiant/service/etudiant.service';
import { Etudiant } from 'src/app/etudiant/model/etudiant';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthentificationService } from './../service/authentification.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  etudiant!: Etudiant;
  etudiants!: Etudiant[];
  selectedImage!: File;
  etudiantForm = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    cin: new FormControl('', Validators.required),
    adresse: new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
  });

  get prenom() {
    return this.etudiantForm.get('prenom');
  }

  get nom() {
    return this.etudiantForm.get('nom');
  }

  get cin() {
    return this.etudiantForm.get('cin');
  }

  get adresse() {
    return this.etudiantForm.get('adresse');
  }
  get telephone() {
    return this.etudiantForm.get('telephone');
  }

  get username() {
    return this.etudiantForm.get('username');
  }

  get email() {
    return this.etudiantForm.get('email');
  }
  get image() {
    return this.etudiantForm.get('image');
  }


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private etudiantService: EtudiantService
  ) {}

  ngOnInit(): void {}
  

  onSubmit() {
    this.etudiant = this.etudiantForm.value;
    this.etudiant.image="";
    console.log(this.etudiant);
    this.etudiantService
      .save(this.etudiant)
      .subscribe((result) => {
        this.etudiantService.saveImage(result.id,this.selectedImage).subscribe(
          data => {
              this.gotoLogin();
          }
        )

        
      });
  }

  gotoLogin() {
    this.router.navigate(['/login']);
  }

  onFileSelected(event: Event) {
    let target = event.target as HTMLInputElement;
    this.selectedImage = target.files![0];
    console.log(this.selectedImage);
  }

}
