import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { Bet } from '../../models/bet.model';
import { BetService } from '../../services/bet.service';

@Component({
  selector: 'app-bet-list',
  templateUrl: './bet-list.component.html',
  styleUrls: ['./bet-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    TooltipModule,
    InputTextModule,
    CardModule,
    ConfirmDialogModule,
    TooltipModule,
  ],
  providers: [MessageService, ConfirmationService],
})
export class BetListComponent implements OnInit {
  @ViewChild('dt') dt!: Table;

  bets: Bet[] = [];
  loading: boolean = true;

  constructor(
    private betService: BetService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getBets();
  }

  getBets(): void {
    this.betService.getBets().subscribe({
      next: (bets) => {
        this.bets = bets;
        this.loading = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao carregar as apostas.',
        });
        this.loading = false;
        console.error(err);
      },
    });
  }

  createBet(): void {
    this.router.navigate(['/bets/create']);
  }

  editBet(id: number): void {
    this.router.navigate(['/bets/edit', id]);
  }

  confirmDelete(id: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza de que deseja excluir esta aposta?',
      accept: () => {
        this.deleteBet(id);
      },
    });
  }

  deleteBet(id: number): void {
    this.betService.deleteBet(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Aposta excluída com sucesso!',
        });
        this.getBets(); // Atualiza a lista após a exclusão
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao excluir a aposta.',
        });
        console.error(err);
      },
    });
  }

  exportExcel(): void {
    // Implementação para exportar as apostas em Excel
    // Pode utilizar bibliotecas como XLSX para exportação real
    // Aqui está um exemplo básico de exportação para CSV:

    const headers = ['ID', 'Data', 'Tipster', 'Esporte', 'Odds', 'Stake'];
    const rows = this.bets.map((bet) => [
      bet.id,
      bet.date ? new Date(bet.date).toLocaleString('pt-BR') : '', // Formatação segura da data
      bet.tipster?.name,
      bet.sport?.name,
      bet.odds?.toFixed(2), // Duas casas decimais
      bet.stake?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), // Formatação em BRL
    ]);

    let csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers, ...rows].map((e) => e.join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'apostas.csv');
    document.body.appendChild(link); // Necessário para Firefox

    link.click();
    document.body.removeChild(link);
  }

  onGlobalFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.dt.filterGlobal(input.value, 'contains');
  }
}
