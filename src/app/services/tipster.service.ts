import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tipster } from '../models/bet.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TipsterService {
  private apiUrl = 'http://localhost:8082/tipsters'; // Ajuste a URL conforme necessário

  constructor(private http: HttpClient) {}

  getTipsters(): Observable<Tipster[]> {
    return this.http.get<Tipster[]>(this.apiUrl);
  }

  getTipster(id: number): Observable<Tipster> {
    return this.http.get<Tipster>(`${this.apiUrl}/${id}`);
  }

  createTipster(tipster: Tipster): Observable<Tipster> {
    return this.http.post<Tipster>(this.apiUrl, tipster);
  }

  updateTipster(id: number, tipster: Tipster): Observable<Tipster> {
    return this.http.put<Tipster>(`${this.apiUrl}/${id}`, tipster);
  }

  deleteTipster(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
