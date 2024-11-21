import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BetType } from '../models/bet.model';

@Injectable({
  providedIn: 'root',
})
export class BetTypeService {
  private apiUrl = 'http://localhost:8082/bet-types'; // Ajuste a URL conforme o seu backend

  constructor(private http: HttpClient) {}

  getBetTypes(): Observable<BetType[]> {
    return this.http.get<BetType[]>(this.apiUrl);
  }

  getBetTypeById(id: number): Observable<BetType> {
    return this.http.get<BetType>(`${this.apiUrl}/${id}`);
  }

  createBetType(betType: BetType): Observable<BetType> {
    return this.http.post<BetType>(this.apiUrl, betType);
  }

  updateBetType(id: number, betType: BetType): Observable<BetType> {
    return this.http.put<BetType>(`${this.apiUrl}/${id}`, betType);
  }

  deleteBetType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
