import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../../services/competition.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { Competition } from '../../models/bet.model';

@Component({
  selector: 'app-competition-edit',
  templateUrl: './competition-edit.component.html',
  styleUrls: ['./competition-edit.component.css'],
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
export class CompetitionEditComponent implements OnInit {
  competition: Competition = {
    id: 0,
    name: '',
    // Inicialize outros campos conforme necessário
  };

  loading: boolean = false;
  competitionId: number = 0;

  constructor(
    private competitionService: CompetitionService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.competitionId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCompetition();
  }

  /**
   * Carrega os detalhes da competição a ser editada.
   */
  loadCompetition(): void {
    this.loading = true;
    this.competitionService.getCompetitionById(this.competitionId).subscribe({
      next: (competition) => {
        this.competition = competition;
        this.loading = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao carregar a Competição.',
        });
        this.loading = false;
        console.error(err);
      },
    });
  }

  /**
   * Atualiza uma competição existente.
   */
  updateCompetition(): void {
    if (this.competition.name.trim() === '') {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'O campo Nome não pode estar vazio.',
      });
      return;
    }

    this.loading = true;
    this.competitionService.updateCompetition(this.competition.id, this.competition).subscribe({
      next: (updatedCompetition) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Competição atualizada com sucesso!',
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
          detail: 'Falha ao atualizar a Competição.',
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
