// src/app/services/type.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Type } from '../models/bet.model';

@Injectable({
  providedIn: 'root',
})
export class TypeService {
  private apiUrl = 'http://localhost:8082/types'; // Atualize para o URL correto da API

  constructor(private http: HttpClient) {}

  getTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(this.apiUrl);
  }

  getType(id: number): Observable<Type> {
    return this.http.get<Type>(`${this.apiUrl}/${id}`);
  }

  createType(type: Type): Observable<Type> {
    return this.http.post<Type>(this.apiUrl, type);
  }

  updateType(type: Type): Observable<Type> {
    return this.http.put<Type>(`${this.apiUrl}/${type.id}`, type);
  }

  deleteType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}


