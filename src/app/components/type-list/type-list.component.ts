import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TypeService } from '../../services/type.service';
import { Router, RouterModule } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { Type } from '../../models/bet.model';

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.css'],
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
export class TypeListComponent implements OnInit {
  @ViewChild('dt') dt!: Table;

  types: Type[] = [];
  loading: boolean = true;

  constructor(
    private typeService: TypeService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getTypes();
  }

  /**
   * Busca a lista de tipos do backend.
   */
  getTypes(): void {
    this.typeService.getTypes().subscribe({
      next: (types) => {
        this.types = types;
        this.loading = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao carregar os tipos.',
        });
        this.loading = false;
        console.error(err);
      },
    });
  }

  /**
   * Navega para a página de criação de um novo tipo.
   */
  createType(): void {
    this.router.navigate(['/types/create']);
  }

  /**
   * Navega para a página de edição de um tipo específico.
   * @param id ID do tipo a ser editado.
   */
  editType(id: number): void {
    this.router.navigate(['/types/edit', id]);
  }

  /**
   * Abre um diálogo de confirmação antes de excluir um tipo.
   * @param id ID do tipo a ser excluído.
   */
  confirmDelete(id: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza de que deseja excluir este tipo?',
      accept: () => {
        this.deleteType(id);
      },
    });
  }

  /**
   * Exclui um tipo e atualiza a lista.
   * @param id ID do tipo a ser excluído.
   */
  deleteType(id: number): void {
    this.typeService.deleteType(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Tipo excluído com sucesso!',
        });
        this.getTypes(); // Atualiza a lista após a exclusão
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao excluir o tipo.',
        });
        console.error(err);
      },
    });
  }

  /**
   * Exporta a lista de tipos para um arquivo CSV.
   */
  exportExcel(): void {
    const headers = ['ID', 'Nome'];
    const rows = this.types.map((type) => [
      type.id,
      type.name,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers, ...rows].map((e) => e.join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'tipos.csv');
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
