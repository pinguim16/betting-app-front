import { Component } from '@angular/core';
import { CompetitionService } from '../../services/competition.service';
import { Competition } from '../../models/bet.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-competition-create',
  templateUrl: './competition-create.component.html',
  styleUrls: ['./competition-create.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
  ],
})
export class CompetitionCreateComponent {
  competition: Competition = {
    id: 0,
    name: '',
  };

  constructor(private competitionService: CompetitionService, private router: Router) {}

  createCompetition(): void {
    this.competitionService.createCompetition(this.competition).subscribe(() => {
      alert('Competição criada com sucesso!');
      this.router.navigate(['/competitions']);
    });
  }

  goBack(): void {
    this.router.navigate(['/competitions']);
  }
}
