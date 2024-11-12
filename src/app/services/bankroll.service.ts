import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bankroll } from '../models/bet.model';

@Injectable({
  providedIn: 'root',
})
export class BankrollService {
  private apiUrl = 'http://localhost:8082/bankrolls'; // Ajuste conforme necessário

  constructor(private http: HttpClient) {}

  getBankrolls(): Observable<Bankroll[]> {
    return this.http.get<Bankroll[]>(this.apiUrl);
  }

  getBankroll(id: number): Observable<Bankroll> {
    return this.http.get<Bankroll>(`${this.apiUrl}/${id}`);
  }

  createBankroll(bankroll: Bankroll): Observable<Bankroll> {
    return this.http.post<Bankroll>(this.apiUrl, bankroll);
  }

  updateBankroll(id: number, bankroll: Bankroll): Observable<Bankroll> {
    return this.http.put<Bankroll>(`${this.apiUrl}/${id}`, bankroll);
  }

  deleteBankroll(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
