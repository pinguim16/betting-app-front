import { Component, OnInit } from '@angular/core';
import { SportService } from '../../services/sport.service';
import { Sport } from '../../models/bet.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-sport-edit',
  templateUrl: './sport-edit.component.html',
  styleUrls: ['./sport-edit.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
  ],
})
export class SportEditComponent implements OnInit {
  sport: Sport = {
    id: 0,
    name: '',
  };

  constructor(
    private sportService: SportService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadSport(id);
  }

  loadSport(id: number): void {
    this.sportService.getSport(id).subscribe((data) => {
      this.sport = data;
    });
  }

  updateSport(): void {
    this.sportService.updateSport(this.sport.id, this.sport).subscribe(() => {
      alert('Esporte atualizado com sucesso!');
      this.router.navigate(['/sports']);
    });
  }

  goBack(): void {
    this.router.navigate(['/sports']);
  }
}
