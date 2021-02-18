import { Formation } from './../model/formation';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IntervenantService } from 'src/app/intervenant/service/intervenant.service';
import { Etudiant } from 'src/app/etudiant/model/etudiant';
import { Seance } from 'src/app/seance/model/seance';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  
  private formationUrl: string;
  

  constructor(
    private http: HttpClient
    ) {
    this.formationUrl = 'http://localhost:8081/api/formation';
  }
  public findAll(): Observable<Formation[]> {

    return this.http.get<Formation[]>(this.formationUrl+"s");
  }
  public findEtudiants(id:number): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(this.formationUrl+"/"+id+"/etudiants");
  }

  public findSeances(id:number): Observable<Seance[]> {
    return this.http.get<Seance[]>(this.formationUrl+"/"+id+"/seances");
  }

  public passageEvaluation(id:number,passage: any) {
    return this.http.post<any>(this.formationUrl+"/"+id+"/passageEvaluation", passage);
  }
  

  public find(id: number): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${this.formationUrl}s?id=${id}`);
  }

  public save(formation: Formation) {
    return this.http.post<Formation>(this.formationUrl+"s", formation);
  }
  public saveImage(id:number,image:File) {
    const formData: FormData = new FormData();

    formData.append('image', image);
    return this.http.post<Formation>("http://localhost:8081/api/formationThumbnail/"+id, formData,{
      reportProgress: true,
      responseType: 'json'
    });
  }
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.formationUrl}/${id}`);
  }

  public update(id: number,formation: Formation) {
    return this.http.put<Formation>(`${this.formationUrl}/${id}`,formation);
  }

  
}
