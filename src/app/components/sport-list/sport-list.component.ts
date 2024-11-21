import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SportService } from '../../services/sport.service';
import { Router, RouterModule } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { Sport } from '../../models/bet.model';

@Component({
  selector: 'app-sport-list',
  templateUrl: './sport-list.component.html',
  styleUrls: ['./sport-list.component.css'],
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
export class SportListComponent implements OnInit {
  @ViewChild('dt') dt!: Table;

  sports: Sport[] = [];
  loading: boolean = true;

  constructor(
    private sportService: SportService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getSports();
  }

  /**
   * Busca a lista de esportes do backend.
   */
  getSports(): void {
    this.sportService.getSports().subscribe({
      next: (sports) => {
        this.sports = sports;
        this.loading = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao carregar os esportes.',
        });
        this.loading = false;
        console.error(err);
      },
    });
  }

  /**
   * Navega para a página de criação de um novo esporte.
   */
  createSport(): void {
    this.router.navigate(['/sports/create']);
  }

  /**
   * Navega para a página de edição de um esporte específico.
   * @param id ID do esporte a ser editado.
   */
  editSport(id: number): void {
    this.router.navigate(['/sports/edit', id]);
  }

  /**
   * Abre um diálogo de confirmação antes de excluir um esporte.
   * @param id ID do esporte a ser excluído.
   */
  confirmDelete(id: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza de que deseja excluir este esporte?',
      accept: () => {
        this.deleteSport(id);
      },
    });
  }

  /**
   * Exclui um esporte e atualiza a lista.
   * @param id ID do esporte a ser excluído.
   */
  deleteSport(id: number): void {
    this.sportService.deleteSport(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Esporte excluído com sucesso!',
        });
        this.getSports(); // Atualiza a lista após a exclusão
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao excluir o esporte.',
        });
        console.error(err);
      },
    });
  }

  /**
   * Exporta a lista de esportes para um arquivo CSV.
   */
  exportExcel(): void {
    const headers = ['ID', 'Nome'];
    const rows = this.sports.map((sport) => [
      sport.id,
      sport.name,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers, ...rows].map((e) => e.join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'esportes.csv');
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
