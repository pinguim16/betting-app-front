import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../../services/competition.service';
import { Competition } from '../../models/bet.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-competition-list',
  templateUrl: './competition-list.component.html',
  styleUrls: ['./competition-list.component.css'],
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
})
export class CompetitionListComponent implements OnInit {
  competitions: Competition[] = [];

  constructor(private competitionService: CompetitionService, private router: Router) {}

  ngOnInit(): void {
    this.loadCompetitions();
  }

  loadCompetitions(): void {
    this.competitionService.getCompetitions().subscribe((data) => {
      this.competitions = data;
    });
  }

  deleteCompetition(id: number): void {
    if (confirm('Deseja realmente excluir esta competição?')) {
      this.competitionService.deleteCompetition(id).subscribe(() => {
        this.competitions = this.competitions.filter((competition) => competition.id !== id);
      });
    }
  }

  editCompetition(id: number): void {
    this.router.navigate(['/competitions/edit', id]);
  }

  createCompetition(): void {
    this.router.navigate(['/competitions/create']);
  }
}
