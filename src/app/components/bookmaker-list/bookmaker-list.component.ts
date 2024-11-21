import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BookmakerService } from '../../services/bookmaker.service';
import { Router, RouterModule } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { Bookmaker } from '../../models/bet.model';

@Component({
  selector: 'app-bookmaker-list',
  templateUrl: './bookmaker-list.component.html',
  styleUrls: ['./bookmaker-list.component.css'],
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
export class BookmakerListComponent implements OnInit {
  @ViewChild('dt') dt!: Table;

  bookmakers: Bookmaker[] = [];
  loading: boolean = true;

  constructor(
    private bookmakerService: BookmakerService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getBookmakers();
  }

  /**
   * Busca a lista de casas de apostas do backend.
   */
  getBookmakers(): void {
    this.bookmakerService.getBookmakers().subscribe({
      next: (bookmakers) => {
        this.bookmakers = bookmakers;
        this.loading = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao carregar as casas de apostas.',
        });
        this.loading = false;
        console.error(err);
      },
    });
  }

  /**
   * Navega para a página de criação de uma nova casa de apostas.
   */
  createBookmaker(): void {
    this.router.navigate(['/bookmakers/create']);
  }

  /**
   * Navega para a página de edição de uma casa de apostas específica.
   * @param id ID da casa de apostas a ser editada.
   */
  editBookmaker(id: number): void {
    this.router.navigate(['/bookmakers/edit', id]);
  }

  /**
   * Abre um diálogo de confirmação antes de excluir uma casa de apostas.
   * @param id ID da casa de apostas a ser excluída.
   */
  confirmDelete(id: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza de que deseja excluir esta casa de apostas?',
      accept: () => {
        this.deleteBookmaker(id);
      },
    });
  }

  /**
   * Exclui uma casa de apostas e atualiza a lista.
   * @param id ID da casa de apostas a ser excluída.
   */
  deleteBookmaker(id: number): void {
    this.bookmakerService.deleteBookmaker(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Casa de apostas excluída com sucesso!',
        });
        this.getBookmakers(); // Atualiza a lista após a exclusão
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao excluir a casa de apostas.',
        });
        console.error(err);
      },
    });
  }

  /**
   * Exporta a lista de casas de apostas para um arquivo CSV.
   */
  exportExcel(): void {
    const headers = ['ID', 'Nome'];
    const rows = this.bookmakers.map((bookmaker) => [
      bookmaker.id,
      bookmaker.name,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers, ...rows].map((e) => e.join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'casas_de_apostas.csv');
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
