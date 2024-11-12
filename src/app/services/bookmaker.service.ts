import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Bookmaker } from '../models/bet.model';

@Injectable({
  providedIn: 'root',
})
export class BookmakerService {
  private apiUrl = 'http://localhost:8082/bookmakers'; // Ajuste a URL conforme o seu backend

  constructor(private http: HttpClient) {}

  getBookmakers(): Observable<Bookmaker[]> {
    return this.http.get<Bookmaker[]>(this.apiUrl);
  }

  getBookmaker(id: number): Observable<Bookmaker> {
    return this.http.get<Bookmaker>(`${this.apiUrl}/${id}`);
  }

  createBookmaker(bookmaker: Bookmaker): Observable<Bookmaker> {
    return this.http.post<Bookmaker>(this.apiUrl, bookmaker);
  }

  updateBookmaker(id: number, bookmaker: Bookmaker): Observable<Bookmaker> {
    return this.http.put<Bookmaker>(`${this.apiUrl}/${id}`, bookmaker);
  }

  deleteBookmaker(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
