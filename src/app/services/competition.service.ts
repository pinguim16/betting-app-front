import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Competition } from '../models/bet.model';

@Injectable({
  providedIn: 'root',
})
export class CompetitionService {
  private apiUrl = 'http://localhost:8082/competitions'; // Ajuste a URL conforme o seu backend

  constructor(private http: HttpClient) {}

  getCompetitions(): Observable<Competition[]> {
    return this.http.get<Competition[]>(this.apiUrl);
  }

  getCompetitionById(id: number): Observable<Competition> {
    return this.http.get<Competition>(`${this.apiUrl}/${id}`);
  }

  createCompetition(competition: Competition): Observable<Competition> {
    return this.http.post<Competition>(this.apiUrl, competition);
  }

  updateCompetition(id: number, competition: Competition): Observable<Competition> {
    return this.http.put<Competition>(`${this.apiUrl}/${id}`, competition);
  }

  deleteCompetition(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
