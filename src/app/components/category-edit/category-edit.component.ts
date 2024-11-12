import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/bet.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
  ],
})
export class CategoryEditComponent implements OnInit {
  category: Category = {
    id: 0,
    name: '',
  };

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCategory(id);
  }

  loadCategory(id: number): void {
    this.categoryService.getCategory(id).subscribe((data) => {
      this.category = data;
    });
  }

  updateCategory(): void {
    this.categoryService.updateCategory(this.category.id, this.category).subscribe(() => {
      alert('Categoria atualizada com sucesso!');
      this.router.navigate(['/categories']);
    });
  }

  goBack(): void {
    this.router.navigate(['/categories']);
  }
}
