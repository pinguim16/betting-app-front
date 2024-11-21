import { Component, OnInit } from '@angular/core';
import { BankrollService } from '../../services/bankroll.service';
import { TipsterService } from '../../services/tipster.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { Bankroll } from '../../models/bet.model';

@Component({
  selector: 'app-bankroll-edit',
  templateUrl: './bankroll-edit.component.html',
  styleUrls: ['./bankroll-edit.component.css'],
  providers: [MessageService],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    ButtonModule,
    CardModule,
    ToastModule
  ],
})
export class BankrollEditComponent implements OnInit {
  bankroll: Bankroll = {
    id: 0,
    name: '',
    total: 0,
  };

  loading: boolean = false;
  bankrollId: number = 0;

  constructor(
    private bankrollService: BankrollService,
    private tipsterService: TipsterService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.bankrollId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadBankroll();
  }


  /**
   * Carrega os detalhes do bankroll a ser editado.
   */
  loadBankroll(): void {
    this.loading = true;
    this.bankrollService.getBankrollById(this.bankrollId).subscribe({
      next: (bankroll) => {
        this.bankroll = bankroll;
        this.loading = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao carregar o bankroll.',
        });
        this.loading = false;
        console.error(err);
      },
    });
  }

  /**
   * Atualiza um bankroll existente.
   */
  updateBankroll(): void {
    if (this.bankroll) {
      this.loading = true;
      this.bankrollService.updateBankroll(this.bankroll.id, this.bankroll).subscribe({
        next: (updatedBankroll) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Bankroll atualizado com sucesso!',
          });
          setTimeout(() => {
            this.loading = false;
          this.router.navigate(['/bankrolls']); // Navega para a lista de bankrolls após atualização
          }, 1000);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Falha ao atualizar o bankroll.',
          });
          this.loading = false;
          console.error(err);
        },
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Selecione um tipster válido.',
      });
    }
  }

  /**
   * Navega para a página anterior.
   */
  goBack(): void {
    this.router.navigate(['/bankrolls']); // Ajuste conforme a estrutura de rotas
  }
}
