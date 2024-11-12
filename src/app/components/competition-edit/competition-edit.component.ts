import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../../services/competition.service';
import { Competition } from '../../models/bet.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-competition-edit',
  templateUrl: './competition-edit.component.html',
  styleUrls: ['./competition-edit.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
  ],
})
export class CompetitionEditComponent implements OnInit {
  competition: Competition = {
    id: 0,
    name: '',
  };

  constructor(
    private competitionService: CompetitionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCompetition(id);
  }

  loadCompetition(id: number): void {
    this.competitionService.getCompetition(id).subscribe((data) => {
      this.competition = data;
    });
  }

  updateCompetition(): void {
    this.competitionService.updateCompetition(this.competition.id, this.competition).subscribe(() => {
      alert('Competição atualizada com sucesso!');
      this.router.navigate(['/competitions']);
    });
  }

  goBack(): void {
    this.router.navigate(['/competitions']);
  }
}
