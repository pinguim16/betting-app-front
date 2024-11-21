import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Router, RouterModule } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { Category } from '../../models/bet.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
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
export class CategoryListComponent implements OnInit {
  @ViewChild('dt') dt!: Table;

  categories: Category[] = [];
  loading: boolean = true;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  /**
   * Busca a lista de categorias do backend.
   */
  getCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.loading = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao carregar as categorias.',
        });
        this.loading = false;
        console.error(err);
      },
    });
  }

  /**
   * Navega para a página de criação de uma nova categoria.
   */
  createCategory(): void {
    this.router.navigate(['/categories/create']);
  }

  /**
   * Navega para a página de edição de uma categoria específica.
   * @param id ID da categoria a ser editada.
   */
  editCategory(id: number): void {
    this.router.navigate(['/categories/edit', id]);
  }

  /**
   * Abre um diálogo de confirmação antes de excluir uma categoria.
   * @param id ID da categoria a ser excluída.
   */
  confirmDelete(id: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza de que deseja excluir esta categoria?',
      accept: () => {
        this.deleteCategory(id);
      },
    });
  }

  /**
   * Exclui uma categoria e atualiza a lista.
   * @param id ID da categoria a ser excluída.
   */
  deleteCategory(id: number): void {
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Categoria excluída com sucesso!',
        });
        this.getCategories(); // Atualiza a lista após a exclusão
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao excluir a categoria.',
        });
        console.error(err);
      },
    });
  }

  /**
   * Exporta a lista de categorias para um arquivo CSV.
   */
  exportExcel(): void {
    const headers = ['ID', 'Nome'];
    const rows = this.categories.map((category) => [
      category.id,
      category.name,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers, ...rows].map((e) => e.join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'categorias.csv');
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
