import { Component, OnInit } from '@angular/core';
import { BankrollService } from '../../services/bankroll.service';
import { Bankroll } from '../../models/bet.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-bankroll-list',
  templateUrl: './bankroll-list.component.html',
  styleUrls: ['./bankroll-list.component.css'],
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
})
export class BankrollListComponent implements OnInit {
  bankrolls: Bankroll[] = [];

  constructor(private bankrollService: BankrollService, private router: Router) {}

  ngOnInit(): void {
    this.loadBankrolls();
  }

  loadBankrolls(): void {
    this.bankrollService.getBankrolls().subscribe((data) => {
      this.bankrolls = data;
    });
  }

  deleteBankroll(id: number): void {
    if (confirm('Deseja realmente excluir este bankroll?')) {
      this.bankrollService.deleteBankroll(id).subscribe(() => {
        this.bankrolls = this.bankrolls.filter((b) => b.id !== id);
      });
    }
  }

  editBankroll(id: number): void {
    this.router.navigate(['/bankrolls/edit', id]);
  }

  createBankroll(): void {
    this.router.navigate(['/bankrolls/create']);
  }
}
