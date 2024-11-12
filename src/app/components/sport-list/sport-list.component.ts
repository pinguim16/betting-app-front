import { Component, OnInit } from '@angular/core';
import { SportService } from '../../services/sport.service';
import { Sport } from '../../models/bet.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-sport-list',
  templateUrl: './sport-list.component.html',
  styleUrls: ['./sport-list.component.css'],
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
})
export class SportListComponent implements OnInit {
  sports: Sport[] = [];

  constructor(private sportService: SportService, private router: Router) {}

  ngOnInit(): void {
    this.loadSports();
  }

  loadSports(): void {
    this.sportService.getSports().subscribe((data) => {
      this.sports = data;
    });
  }

  deleteSport(id: number): void {
    if (confirm('Deseja realmente excluir este esporte?')) {
      this.sportService.deleteSport(id).subscribe(() => {
        this.sports = this.sports.filter((sport) => sport.id !== id);
      });
    }
  }

  editSport(id: number): void {
    this.router.navigate(['/sports/edit', id]);
  }

  createSport(): void {
    this.router.navigate(['/sports/create']);
  }
}
