import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { Category } from '../../models/bet.model';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css'],
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
export class CategoryEditComponent implements OnInit {
  category: Category = {
    id: 0,
    name: '',
    // Inicialize outros campos conforme necessário
  };

  loading: boolean = false;
  categoryId: number = 0;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCategory();
  }

  /**
   * Carrega os detalhes da categoria a ser editada.
   */
  loadCategory(): void {
    this.loading = true;
    this.categoryService.getCategoryById(this.categoryId).subscribe({
      next: (category) => {
        this.category = category;
        this.loading = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao carregar a Categoria.',
        });
        this.loading = false;
        console.error(err);
      },
    });
  }

  /**
   * Atualiza uma categoria existente.
   */
  updateCategory(): void {
    if (this.category.name.trim() === '') {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'O campo Nome não pode estar vazio.',
      });
      return;
    }

    this.loading = true;
    this.categoryService.updateCategory(this.category.id, this.category).subscribe({
      next: (updatedCategory) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Categoria atualizada com sucesso!',
        });
        this.loading = false;
        this.router.navigate(['/categories']); // Navega para a lista de categorias após atualização
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao atualizar a Categoria.',
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
    this.router.navigate(['/categories']); // Ajuste conforme a estrutura de rotas
  }
}
