// src/app/services/bet-import.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BetCsvDTO, BetImportResponseDTO } from '../models/bet.model';

@Injectable({
  providedIn: 'root',
})
export class BetImportService {
  private apiUrl = 'http://localhost:8082/import/bets'; // Atualize conforme necessário

  constructor(private http: HttpClient) {}

  /**
   * Envia o arquivo CSV para importação e validação.
   *
   * @param file        Arquivo CSV.
   * @param bankrollId  ID do Bankroll.
   * @returns Observable com a resposta da importação.
   */
  importBetsFromCsv(file: File, bankrollId: number): Observable<BetImportResponseDTO> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('bankrollId', bankrollId.toString());

    return this.http.post<BetImportResponseDTO>(`${this.apiUrl}`, formData);
  }

  /**
   * Envia as apostas validadas para serem salvas no backend.
   *
   * @param bets        Lista de apostas validadas.
   * @param bankrollId  ID do Bankroll.
   * @returns Observable com a resposta do salvamento.
   */
  saveBets(bets: BetCsvDTO[], bankrollId: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/save?bankrollId=${bankrollId}`, bets);
  }
}
