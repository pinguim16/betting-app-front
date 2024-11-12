import { Component, OnInit } from '@angular/core';
import { BetTypeService } from '../../services/bet-type.service';
import { BetType } from '../../models/bet.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-bet-type-edit',
  templateUrl: './bet-type-edit.component.html',
  styleUrls: ['./bet-type-edit.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
  ],
})
export class BetTypeEditComponent implements OnInit {
  betType: BetType = {
    id: 0,
    name: '',
  };

  constructor(
    private betTypeService: BetTypeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadBetType(id);
  }

  loadBetType(id: number): void {
    this.betTypeService.getBetType(id).subscribe((data) => {
      this.betType = data;
    });
  }

  updateBetType(): void {
    this.betTypeService.updateBetType(this.betType.id, this.betType).subscribe(() => {
      alert('Tipo de aposta atualizado com sucesso!');
      this.router.navigate(['/bet-types']);
    });
  }

  goBack(): void {
    this.router.navigate(['/bet-types']);
  }
}
