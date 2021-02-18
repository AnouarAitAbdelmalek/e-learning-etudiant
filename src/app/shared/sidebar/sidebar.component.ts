import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthentificationService } from 'src/app/authentification/service/authentification.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  step = 0;
  title = "";

  
  setTitle(text: string) {
    this.title = text;
  }

  setStep(index: number) {
    this.step = index;
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authentificationService:AuthentificationService
    ) {}

  

  goToEtudiantFormations(){
   
    this.router.navigate(['/etudiant/1/formations']);
  }
  logOut() {
    this.authentificationService.logOut();
    this.router.navigate(['login']);
  }

}
