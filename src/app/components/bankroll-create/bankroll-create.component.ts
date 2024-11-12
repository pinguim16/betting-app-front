import { Bankroll } from './../../models/bet.model';
import { Component } from '@angular/core';
import { BankrollService } from '../../services/bankroll.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-bankroll-create',
  templateUrl: './bankroll-create.component.html',
  styleUrls: ['./bankroll-create.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
  ],
})
export class BankrollCreateComponent {
  bankroll: Bankroll = {} as Bankroll;

  constructor(private bankrollService: BankrollService, private router: Router) {}

  createBankroll(): void {
    this.bankrollService.createBankroll(this.bankroll).subscribe(() => {
      alert('Bankroll criado com sucesso!');
      this.router.navigate(['/bankrolls']);
    });
  }

  goBack(): void {
    this.router.navigate(['/bankrolls']);
  }
}
