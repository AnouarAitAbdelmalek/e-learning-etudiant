import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Intervenant } from '../model/intervenant';

@Injectable({
  providedIn: 'root'
})
export class IntervenantService {

  private intervenantUrl: string;

  constructor(private http: HttpClient) {
    this.intervenantUrl = 'http://localhost:8081/api/intervenant';
  }
  public findAll(): Observable<Intervenant[]> {
    /*let username = 'intervenant';
    let password = 'intervenant';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });*/

    return this.http.get<Intervenant[]>(this.intervenantUrl+"s");
  }

  public find(id: number): Observable<Intervenant> {
    return this.http.get<Intervenant>(`${this.intervenantUrl}s/${id}`);
  }

  public save(intervenant: Intervenant) {
    /*let username = 'intervenant';
    let password = 'intervenant';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });*/

    return this.http.post<Intervenant>(this.intervenantUrl+"s", intervenant);
  }
  delete(id: number): Observable<any> {
    /*let username = 'intervenant';
    let password = 'intervenant';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });*/

    return this.http.delete(`${this.intervenantUrl}/${id}`);
  }

  public update(id: number,intervenant: Intervenant) {
    /*let username = 'intervenant';
    let password = 'intervenant';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });*/

    return this.http.put<Intervenant>(`${this.intervenantUrl}/${id}`,intervenant);
  }
}
