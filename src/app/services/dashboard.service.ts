import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DashboardMetrics, BankrollEvolution, Distribution, TipsterMetrics } from '../models/bet.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = 'http://localhost:8082/api/dashboard';

  constructor(private http: HttpClient) {}

  getMetrics(): Observable<DashboardMetrics> {
    return this.http.get<DashboardMetrics>(`${this.apiUrl}/metrics`);
  }

  getBankrollEvolution(): Observable<BankrollEvolution[]> {
    return this.http.get<BankrollEvolution[]>(`${this.apiUrl}/evolution`);
  }

  getDistributionBySport(): Observable<Distribution[]> {
    return this.http.get<Distribution[]>(`${this.apiUrl}/distribution/sport`);
  }

  getDistributionByTipster(): Observable<Distribution[]> {
    return this.http.get<Distribution[]>(`${this.apiUrl}/distribution/tipster`);
  }

  getDistributionByCategory(): Observable<Distribution[]> {
    return this.http.get<Distribution[]>(`${this.apiUrl}/distribution/category`);
  }

  getTipsterMetrics(): Observable<TipsterMetrics[]> {
    return this.http.get<TipsterMetrics[]>(`${this.apiUrl}/tipsters/metrics`);
  }

}
