import { Component } from '@angular/core';
import { SportService } from '../../services/sport.service';
import { Sport } from '../../models/bet.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-sport-create',
  templateUrl: './sport-create.component.html',
  styleUrls: ['./sport-create.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
  ],
})
export class SportCreateComponent {
  sport: Sport = {
    id: 0,
    name: '',
  };

  constructor(private sportService: SportService, private router: Router) {}

  createSport(): void {
    this.sportService.createSport(this.sport).subscribe(() => {
      alert('Esporte criado com sucesso!');
      this.router.navigate(['/sports']);
    });
  }

  goBack(): void {
    this.router.navigate(['/sports']);
  }
}
