import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TipsterService } from '../../services/tipster.service';
import { Router, RouterModule } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { Tipster } from '../../models/bet.model';

@Component({
  selector: 'app-tipster-list',
  templateUrl: './tipster-list.component.html',
  styleUrls: ['./tipster-list.component.css'],
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
export class TipsterListComponent implements OnInit {
  @ViewChild('dt') dt!: Table;

  tipsters: Tipster[] = [];
  loading: boolean = true;

  constructor(
    private tipsterService: TipsterService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getTipsters();
  }

  /**
   * Busca a lista de tipsters do backend.
   */
  getTipsters(): void {
    this.tipsterService.getTipsters().subscribe({
      next: (tipsters) => {
        this.tipsters = tipsters;
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
   * Navega para a página de criação de um novo tipster.
   */
  createTipster(): void {
    this.router.navigate(['/tipsters/create']);
  }

  /**
   * Navega para a página de edição de um tipster específico.
   * @param id ID do tipster a ser editado.
   */
  editTipster(id: number): void {
    this.router.navigate(['/tipsters/edit', id]);
  }

  /**
   * Abre um diálogo de confirmação antes de excluir um tipster.
   * @param id ID do tipster a ser excluído.
   */
  confirmDelete(id: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza de que deseja excluir este tipster?',
      accept: () => {
        this.deleteTipster(id);
      },
    });
  }

  /**
   * Exclui um tipster e atualiza a lista.
   * @param id ID do tipster a ser excluído.
   */
  deleteTipster(id: number): void {
    this.tipsterService.deleteTipster(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Tipster excluído com sucesso!',
        });
        this.getTipsters(); // Atualiza a lista após a exclusão
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao excluir o tipster.',
        });
        console.error(err);
      },
    });
  }

  /**
   * Exporta a lista de tipsters para um arquivo CSV.
   */
  exportExcel(): void {
    const headers = ['ID', 'Nome', 'Bingos', 'Esporte'];
    const rows = this.tipsters.map((tipster) => [
      tipster.id,
      tipster.name,
      tipster.bingos,
      tipster.sport.name,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers, ...rows].map((e) => e.join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'tipsters.csv');
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

  /**
   * Navega para a página de visualização de units de um tipster.
   * @param id ID do tipster cujas units serão visualizadas.
   */
  viewUnits(id: number): void {
    this.router.navigate(['/units', id]);
  }
}
