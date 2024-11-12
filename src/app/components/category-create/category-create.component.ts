import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/bet.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
  ],
})
export class CategoryCreateComponent {
  category: Category = {
    id: 0,
    name: '',
  };

  constructor(private categoryService: CategoryService, private router: Router) {}

  createCategory(): void {
    this.categoryService.createCategory(this.category).subscribe(() => {
      alert('Categoria criada com sucesso!');
      this.router.navigate(['/categories']);
    });
  }

  goBack(): void {
    this.router.navigate(['/categories']);
  }
}
