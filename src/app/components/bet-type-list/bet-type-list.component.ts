import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BetTypeService } from '../../services/bet-type.service';
import { Router, RouterModule } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { BetType } from '../../models/bet.model';

@Component({
  selector: 'app-bet-type-list',
  templateUrl: './bet-type-list.component.html',
  styleUrls: ['./bet-type-list.component.css'],
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
export class BetTypeListComponent implements OnInit {
  @ViewChild('dt') dt!: Table;

  betTypes: BetType[] = [];
  loading: boolean = true;

  constructor(
    private betTypeService: BetTypeService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getBetTypes();
  }

  /**
   * Busca a lista de tipos de aposta do backend.
   */
  getBetTypes(): void {
    this.betTypeService.getBetTypes().subscribe({
      next: (betTypes) => {
        this.betTypes = betTypes;
        this.loading = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao carregar os tipos de aposta.',
        });
        this.loading = false;
        console.error(err);
      },
    });
  }

  /**
   * Navega para a página de criação de um novo tipo de aposta.
   */
  createBetType(): void {
    this.router.navigate(['/bet-types/create']);
  }

  /**
   * Navega para a página de edição de um tipo de aposta específico.
   * @param id ID do tipo de aposta a ser editado.
   */
  editBetType(id: number): void {
    this.router.navigate(['/bet-types/edit', id]);
  }

  /**
   * Abre um diálogo de confirmação antes de excluir um tipo de aposta.
   * @param id ID do tipo de aposta a ser excluído.
   */
  confirmDelete(id: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza de que deseja excluir este tipo de aposta?',
      accept: () => {
        this.deleteBetType(id);
      },
    });
  }

  /**
   * Exclui um tipo de aposta e atualiza a lista.
   * @param id ID do tipo de aposta a ser excluído.
   */
  deleteBetType(id: number): void {
    this.betTypeService.deleteBetType(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Tipo de aposta excluído com sucesso!',
        });
        this.getBetTypes(); // Atualiza a lista após a exclusão
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao excluir o tipo de aposta.',
        });
        console.error(err);
      },
    });
  }

  /**
   * Exporta a lista de tipos de aposta para um arquivo CSV.
   */
  exportExcel(): void {
    const headers = ['ID', 'Nome'];
    const rows = this.betTypes.map((betType) => [
      betType.id,
      betType.name,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers, ...rows].map((e) => e.join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'tipos_de_aposta.csv');
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
