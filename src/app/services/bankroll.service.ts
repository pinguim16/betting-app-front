import { BankrollEvolutionDTO, BetCsvDTO, BetImportResponseDTO } from './../models/bet.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bankroll } from '../models/bet.model';

@Injectable({
  providedIn: 'root',
})
export class BankrollService {
  private apiUrl = 'http://localhost:8082/bankrolls'; // Ajuste conforme necessário

  constructor(private http: HttpClient) { }

  getBankrolls(): Observable<Bankroll[]> {
    return this.http.get<Bankroll[]>(this.apiUrl);
  }

  getBankrollById(id: number): Observable<Bankroll> {
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

  // GET: Obter a evolução do bankroll específico
  getBankrollEvolution(bankrollId: number): Observable<BankrollEvolutionDTO[]> {
    return this.http.get<BankrollEvolutionDTO[]>(`${this.apiUrl}/${bankrollId}/evolution`);
  }

  // GET: Obter todos os bankrolls
  getAllBankrolls(): Observable<Bankroll[]> {
    return this.http.get<Bankroll[]>(`${this.apiUrl}`);
  }

  // POST: Criar ou atualizar um registro no histórico (se necessário)
  createOrUpdateHistory(bankrollId: number, date: string, total: number): Observable<void> {
    const params = { bankrollId: bankrollId.toString(), date, total: total.toString() };
    return this.http.post<void>(`${this.apiUrl}/history`, null, { params });
  }

  /**
 * Importa apostas a partir de um arquivo CSV.
 * @param file O arquivo CSV contendo as apostas.
 * @returns Resposta contendo as apostas importadas e quaisquer erros.
 */
  importBets(file: File): Observable<BetImportResponseDTO> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<BetImportResponseDTO>(`${this.apiUrl}/bets`, formData);
  }

  /**
* Salva as apostas importadas após validação.
* @param bankrollId ID do Bankroll onde as apostas serão associadas.
* @param bets Lista de apostas a serem salvas.
* @returns Lista de apostas salvas.
*/
  saveBets(bankrollId: number, bets: BetCsvDTO[]): Observable<any> {
    const params = new HttpParams().set('bankrollId', bankrollId.toString());
    return this.http.post<any>(`${this.apiUrl}/bets/save`, bets, { params });
  }

}
