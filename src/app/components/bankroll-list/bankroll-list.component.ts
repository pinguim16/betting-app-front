import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { Bankroll } from '../../models/bet.model';
import { BankrollService } from '../../services/bankroll.service';

@Component({
  selector: 'app-bankroll-list',
  templateUrl: './bankroll-list.component.html',
  styleUrls: ['./bankroll-list.component.css'],
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
export class BankrollListComponent implements OnInit {
  bankrolls: Bankroll[] = [];
  loading: boolean = true;

  constructor(
    private bankrollService: BankrollService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getBankrolls();
  }

  getBankrolls(): void {
    this.bankrollService.getBankrolls().subscribe({
      next: (bankrolls) => {
        this.bankrolls = bankrolls;
        this.loading = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao carregar os bankrolls.',
        });
        this.loading = false;
        console.error(err);
      },
    });
  }

  createBankroll(): void {
    this.router.navigate(['/bankrolls/create']);
  }

  editBankroll(id: number): void {
    this.router.navigate(['/bankrolls/edit', id]);
  }

  confirmDelete(id: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza de que deseja excluir este bankroll?',
      accept: () => {
        this.deleteBankroll(id);
      },
    });
  }

  deleteBankroll(id: number): void {
    this.bankrollService.deleteBankroll(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Bankroll excluído com sucesso!',
        });
        this.getBankrolls(); // Atualiza a lista após a exclusão
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao excluir o bankroll.',
        });
        console.error(err);
      },
    });
  }

  exportExcel(): void {
    // Implementação para exportar os bankrolls em Excel
    // Pode utilizar o método `exportExcel()` do PrimeNG
  }

  onGlobalFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    // Filtra a tabela globalmente com base no valor do input
    (this.dt as any).filterGlobal(input.value, 'contains');
  }

  // Referência à tabela para aplicar filtros
  dt: any;
}
