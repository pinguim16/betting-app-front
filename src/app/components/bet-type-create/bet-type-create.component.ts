import { Component } from '@angular/core';
import { BetTypeService } from '../../services/bet-type.service';
import { BetType } from '../../models/bet.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-bet-type-create',
  templateUrl: './bet-type-create.component.html',
  styleUrls: ['./bet-type-create.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
  ],
})
export class BetTypeCreateComponent {
  betType: BetType = {
    id: 0,
    name: '',
  };

  constructor(private betTypeService: BetTypeService, private router: Router) {}

  createBetType(): void {
    this.betTypeService.createBetType(this.betType).subscribe(() => {
      alert('Tipo de aposta criado com sucesso!');
      this.router.navigate(['/bet-types']);
    });
  }

  goBack(): void {
    this.router.navigate(['/bet-types']);
  }
}
