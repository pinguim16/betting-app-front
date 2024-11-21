import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { Category } from '../../models/bet.model';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css'],
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
export class CategoryCreateComponent implements OnInit {
  category: Category = {
    id: 0,
    name: '',
    // Inicialize outros campos conforme necessário
  };

  loading: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  /**
   * Cria uma nova categoria.
   */
  createCategory(): void {
    if (this.category.name.trim() === '') {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'O campo Nome não pode estar vazio.',
      });
      return;
    }

    this.loading = true;
    this.categoryService.createCategory(this.category).subscribe({
      next: (createdCategory) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Categoria criada com sucesso!',
        });
        this.loading = false;
        this.router.navigate(['/categories']); // Navega para a lista de categorias após criação
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao criar a Categoria.',
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
