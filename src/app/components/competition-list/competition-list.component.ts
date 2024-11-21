import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CompetitionService } from '../../services/competition.service';
import { Router, RouterModule } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { Competition } from '../../models/bet.model';

@Component({
  selector: 'app-competition-list',
  templateUrl: './competition-list.component.html',
  styleUrls: ['./competition-list.component.css'],
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
export class CompetitionListComponent implements OnInit {
  @ViewChild('dt') dt!: Table;

  competitions: Competition[] = [];
  loading: boolean = true;

  constructor(
    private competitionService: CompetitionService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getCompetitions();
  }

  /**
   * Busca a lista de competições do backend.
   */
  getCompetitions(): void {
    this.competitionService.getCompetitions().subscribe({
      next: (competitions) => {
        this.competitions = competitions;
        this.loading = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao carregar as competições.',
        });
        this.loading = false;
        console.error(err);
      },
    });
  }

  /**
   * Navega para a página de criação de uma nova competição.
   */
  createCompetition(): void {
    this.router.navigate(['/competitions/create']);
  }

  /**
   * Navega para a página de edição de uma competição específica.
   * @param id ID da competição a ser editada.
   */
  editCompetition(id: number): void {
    this.router.navigate(['/competitions/edit', id]);
  }

  /**
   * Abre um diálogo de confirmação antes de excluir uma competição.
   * @param id ID da competição a ser excluída.
   */
  confirmDelete(id: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza de que deseja excluir esta competição?',
      accept: () => {
        this.deleteCompetition(id);
      },
    });
  }

  /**
   * Exclui uma competição e atualiza a lista.
   * @param id ID da competição a ser excluída.
   */
  deleteCompetition(id: number): void {
    this.competitionService.deleteCompetition(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Competição excluída com sucesso!',
        });
        this.getCompetitions(); // Atualiza a lista após a exclusão
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao excluir a competição.',
        });
        console.error(err);
      },
    });
  }

  /**
   * Exporta a lista de competições para um arquivo CSV.
   */
  exportExcel(): void {
    const headers = ['ID', 'Nome'];
    const rows = this.competitions.map((competition) => [
      competition.id,
      competition.name,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers, ...rows].map((e) => e.join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'competições.csv');
    document.body.appendChild(link); // Necessário para Firefox

    link.click();
    document.body.removeChild(link);
  }

  /**
   * Aplica um filtro global na tabela com base no valor do input de busca.
   * @param event Evento de input do campo de busca.
   */
  onGlobalFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.dt.filterGlobal(input.value, 'contains');
  }
}
