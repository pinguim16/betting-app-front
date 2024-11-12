import { Component, OnInit } from '@angular/core';
import { BookmakerService } from '../../services/bookmaker.service';
import { Bookmaker } from '../../models/bet.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-bookmaker-list',
  templateUrl: './bookmaker-list.component.html',
  styleUrls: ['./bookmaker-list.component.css'],
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
})
export class BookmakerListComponent implements OnInit {
  bookmakers: Bookmaker[] = [];

  constructor(private bookmakerService: BookmakerService, private router: Router) {}

  ngOnInit(): void {
    this.loadBookmakers();
  }

  loadBookmakers(): void {
    this.bookmakerService.getBookmakers().subscribe((data) => {
      this.bookmakers = data;
    });
  }

  deleteBookmaker(id: number): void {
    if (confirm('Deseja realmente excluir esta casa de apostas?')) {
      this.bookmakerService.deleteBookmaker(id).subscribe(() => {
        this.bookmakers = this.bookmakers.filter((bookmaker) => bookmaker.id !== id);
      });
    }
  }

  editBookmaker(id: number): void {
    this.router.navigate(['/bookmakers/edit', id]);
  }

  createBookmaker(): void {
    this.router.navigate(['/bookmakers/create']);
  }
}
