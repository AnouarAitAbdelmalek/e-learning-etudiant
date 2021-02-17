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
    this.url = 'http://localhost:5001/commentaires';
  }

  public find(id: number): Observable<Commentaire> {
    return this.http.get<Commentaire>(`${this.url}/${id}`);
  }

  public findAll(): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>(this.url);
  }

  public save(commentaire: Commentaire) {
    return this.http.post<Commentaire>(this.url, commentaire);
  }
}
