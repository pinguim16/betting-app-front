import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/bet.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  deleteCategory(id: number): void {
    if (confirm('Deseja realmente excluir esta categoria?')) {
      this.categoryService.deleteCategory(id).subscribe(() => {
        this.categories = this.categories.filter((category) => category.id !== id);
      });
    }
  }

  editCategory(id: number): void {
    this.router.navigate(['/categories/edit', id]);
  }

  createCategory(): void {
    this.router.navigate(['/categories/create']);
  }
}
