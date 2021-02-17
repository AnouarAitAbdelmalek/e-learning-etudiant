import { Formation } from './../model/formation';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IntervenantService } from 'src/app/intervenant/service/intervenant.service';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  

  private formationUrl: string;
  

  constructor(
    private http: HttpClient,
    private intervenantService: IntervenantService
    ) {
    this.formationUrl = 'http://localhost:5001/formations';
  }

  public findAll(): Observable<Formation[]> {
    /*let username = 'formation';
    let password = 'formation';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });*/

    return this.http.get<Formation[]>(this.formationUrl);
  }

  public find(id: number): Observable<Formation> {
    return this.http.get<Formation>(`${this.formationUrl}/${id}`);
  }

  
}
