import { Component, OnInit } from '@angular/core';
import { BetTypeService } from '../../services/bet-type.service';
import { BetType } from '../../models/bet.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-bet-type-list',
  templateUrl: './bet-type-list.component.html',
  styleUrls: ['./bet-type-list.component.css'],
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
})
export class BetTypeListComponent implements OnInit {
  betTypes: BetType[] = [];

  constructor(private betTypeService: BetTypeService, private router: Router) {}

  ngOnInit(): void {
    this.loadBetTypes();
  }

  loadBetTypes(): void {
    this.betTypeService.getBetTypes().subscribe((data) => {
      this.betTypes = data;
    });
  }

  deleteBetType(id: number): void {
    if (confirm('Deseja realmente excluir este tipo de aposta?')) {
      this.betTypeService.deleteBetType(id).subscribe(() => {
        this.betTypes = this.betTypes.filter((betType) => betType.id !== id);
      });
    }
  }

  editBetType(id: number): void {
    this.router.navigate(['/bet-types/edit', id]);
  }

  createBetType(): void {
    this.router.navigate(['/bet-types/create']);
  }
}
