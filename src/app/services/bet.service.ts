import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bet, BetCreate } from '../models/bet.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BetService {
  private apiUrl = 'http://localhost:8082/bets'; // Ajuste a URL conforme necessário

  constructor(private http: HttpClient) {}

  createBet(bet: BetCreate): Observable<Bet> {
    return this.http.post<Bet>(`${this.apiUrl}`, bet); 
  }

  getBets(): Observable<Bet[]> {
    return this.http.get<Bet[]>(this.apiUrl);
  }

  getBet(id: number): Observable<Bet> {
    return this.http.get<Bet>(`${this.apiUrl}/${id}`);
  }

  updateBet(id: number, bet: Bet): Observable<Bet> {
    return this.http.put<Bet>(`${this.apiUrl}/${id}`, bet);
  }

  deleteBet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
