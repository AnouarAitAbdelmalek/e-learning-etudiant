import { Etudiant } from 'src/app/etudiant/model/etudiant';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Formation } from 'src/app/formation/model/formation';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  private etudiantUrl: string;

  constructor(private http: HttpClient) {
    this.etudiantUrl = 'http://localhost:8081/api/etudiant';
  }
  public findAll(): Observable<Etudiant[]> {

    return this.http.get<Etudiant[]>(this.etudiantUrl+"s");
  }

  public save(etudiant: Etudiant) {

    return this.http.post<Etudiant>("http://localhost:8081/api/inscriptionEtudiant", etudiant);
  }

  public estInscrit(formation: Formation) {

    return this.http.post<any>("http://localhost:8081/api/etudiant/estInscrit", formation);
  }

  public inscrireDansFormation(formation: Formation) {

    return this.http.post<Etudiant>("http://localhost:8081/api/etudiant/inscriptionFormation", formation);
  }
  public saveImage(id:number,image:File) {
    /*let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });*/
    const formData: FormData = new FormData();

    formData.append('image', image);
    return this.http.post<Etudiant>("http://localhost:8081/api/etudiantPicture/"+id, formData,{
      reportProgress: true,
      responseType: 'json'
    });
  }
  public findFormations(id: Number): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${this.etudiantUrl}/formations`);
  }


  public find(id: number): Observable<Etudiant> {
    return this.http.get<Etudiant>(`${this.etudiantUrl}s?id=${id}`);
  }
}
