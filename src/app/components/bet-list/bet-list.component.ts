import { Component, OnInit } from '@angular/core';
import { BetService } from '../../services/bet.service';
import { Bet } from '../../models/bet.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-bet-list',
  templateUrl: './bet-list.component.html',
  styleUrls: ['./bet-list.component.css'],
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
})
export class BetListComponent implements OnInit {
  bets: Bet[] = [];

  constructor(private betService: BetService, private router: Router) {}

  ngOnInit(): void {
    this.loadBets();
  }

  loadBets(): void {
    this.betService.getBets().subscribe((data) => {
      this.bets = data;
    });
  }

  deleteBet(id: number): void {
    if (confirm('Deseja realmente excluir esta aposta?')) {
      this.betService.deleteBet(id).subscribe(() => {
        this.bets = this.bets.filter((bet) => bet.id !== id);
      });
    }
  }

  editBet(id: number): void {
    this.router.navigate(['/bets/edit', id]);
  }

  createBet(): void {
    this.router.navigate(['/bets/create']);
  }
}
