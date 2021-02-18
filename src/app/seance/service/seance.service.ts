import { Seance } from 'src/app/seance/model/seance';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Commentaire } from 'src/app/commentaire/model/commentaire';
import { Support } from 'src/app/support/model/support';

@Injectable({
  providedIn: 'root'
})
export class SeanceService {

  private seanceUrl: string;
  

  constructor(
    private http: HttpClient
    ) {
    this.seanceUrl = 'http://localhost:8081/api/seance';
  }
  public addComment(id:number,commentaire:Commentaire)
  {
    return this.http.post<Commentaire>(this.seanceUrl+"/"+id+"/commentaire",commentaire);
  }

  public addFile(id:number,file:File) {
    const formData: FormData = new FormData();

    formData.append('support', file);
    return this.http.post<Seance>("http://localhost:8081/api/seanceSupport/"+id, formData,{
      reportProgress: true,
      responseType: 'json'
    });
  }
  public find(id: number): Observable<Seance[]> {
    return this.http.get<Seance[]>(`${this.seanceUrl}s?id=${id}`);
  }

  public findCommentaires(id:number): Observable<Commentaire[]>{
    return this.http.get<Commentaire[]>(this.seanceUrl+"/"+id+"/commentaires");
  }

  public findSupports(id:number): Observable<Support[]>{
    return this.http.get<Support[]>(this.seanceUrl+"/"+id+"/supports");
  }

  public update(id: number ,seance: Seance){
    return this.http.put<Seance>(`${this.seanceUrl}/${id}`, seance);
  }
}
