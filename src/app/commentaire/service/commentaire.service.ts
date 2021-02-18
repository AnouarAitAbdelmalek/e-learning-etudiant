import { HttpClient } from '@angular/common/http';
import { Commentaire } from './../model/commentaire';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {

  private url: string;
  

  constructor(
    private http: HttpClient
    ) {
    this.url = 'http://localhost:8081/api/commentaire';
  }

  public find(id: number): Observable<Commentaire> {
    return this.http.get<Commentaire>(`${this.url}s/${id}`);
  }

  public findAll(): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>(this.url+"s");
  }

  public save(commentaire: Commentaire) {
    return this.http.post<Commentaire>(this.url+"s", commentaire);
  }
}
