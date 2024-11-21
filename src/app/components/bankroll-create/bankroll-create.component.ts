import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BankrollService } from '../../services/bankroll.service';
import { TipsterService } from '../../services/tipster.service';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { Bankroll } from '../../models/bet.model';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-bankroll-create',
  templateUrl: './bankroll-create.component.html',
  styleUrls: ['./bankroll-create.component.css'],
  providers: [MessageService],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    InputNumberModule,
    ToastModule,
  ],
})
export class BankrollCreateComponent implements OnInit {
  bankroll: Bankroll = {
    id: 0,
    name: '',
    total: 0,
  };

  loading: boolean = false;

  constructor(
    private bankrollService: BankrollService,
    private tipsterService: TipsterService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadTipsters();
  }

  /**
   * Carrega a lista de tipsters para o dropdown.
   */
  loadTipsters(): void {
    this.loading = true;
    this.tipsterService.getTipsters().subscribe({
      next: (tipsters) => {
        this.loading = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao carregar os tipsters.',
        });
        this.loading = false;
        console.error(err);
      },
    });
  }

  /**
   * Cria um novo bankroll.
   */
  createBankroll(): void {
    if (this.bankroll) {
      this.loading = true;
      this.bankrollService.createBankroll(this.bankroll).subscribe({
        next: (createdBankroll) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Bankroll criado com sucesso!',
          });
          setTimeout(() => {
            this.loading = false;
          this.router.navigate(['/bankrolls']); // Navega para a lista de bankrolls após criação
          }, 1000);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Falha ao criar o bankroll.',
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
