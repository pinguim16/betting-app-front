import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../../services/competition.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { Competition } from '../../models/bet.model';

@Component({
  selector: 'app-competition-create',
  templateUrl: './competition-create.component.html',
  styleUrls: ['./competition-create.component.css'],
  providers: [MessageService],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    ToastModule
  ],
})
export class CompetitionCreateComponent implements OnInit {
  competition: Competition = {
    id: 0,
    name: '',
    // Inicialize outros campos conforme necessário
  };

  loading: boolean = false;

  constructor(
    private competitionService: CompetitionService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void { }

  /**
   * Cria uma nova competição.
   */
  createCompetition(): void {
    if (this.competition.name.trim() === '') {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'O campo Nome não pode estar vazio.',
      });
      return;
    }

    this.loading = true;
    this.competitionService.createCompetition(this.competition).subscribe({
      next: (createdCompetition) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Competição criada com sucesso!',
        });
        setTimeout(() => {
          this.loading = false;
          this.router.navigate(['/competitions']); // Navega para a lista de competições após criação
        }, 1000);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao criar a Competição.',
        });
        this.loading = false;
        console.error(err);
      },
    });
  }

  /**
   * Navega para a página anterior.
   */
  goBack(): void {
    this.router.navigate(['/competitions']); // Ajuste conforme a estrutura de rotas
  }
}
