import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Support } from './../model/support';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SupportService {

  private supportUrl: string;
  

  constructor(
    private http: HttpClient
    ) {
    this.supportUrl = 'http://localhost:5001/supports';
  }

  public find(id: number): Observable<Support> {
    return this.http.get<Support>(`${this.supportUrl}/${id}`);
  }

  public findAll(): Observable<Support[]> {
    return this.http.get<Support[]>(this.supportUrl);
  }

  public save(support: Support) {
    /*let username = 'formation';
    let password = 'formation';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });*/

    return this.http.post<Support>(this.supportUrl, support);
  }

  delete(id: number): Observable<any> {
    /*let username = 'formation';
    let password = 'formation';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });*/

    return this.http.delete(`${this.supportUrl}/${id}`);
  }

}
