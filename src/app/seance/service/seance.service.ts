import { Seance } from 'src/app/seance/model/seance';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeanceService {

  private seanceUrl: string;
  

  constructor(
    private http: HttpClient
    ) {
    this.seanceUrl = 'http://localhost:5001/seances';
  }

  public find(id: number): Observable<Seance> {
    return this.http.get<Seance>(`${this.seanceUrl}/${id}`);
  }

  public update(id: number ,seance: Seance){
    return this.http.put<Seance>(`${this.seanceUrl}/${id}`, seance);
  }
}
