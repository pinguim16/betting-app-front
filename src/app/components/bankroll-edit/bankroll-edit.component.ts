import { Component, OnInit } from '@angular/core';
import { BankrollService } from '../../services/bankroll.service';
import { Bankroll } from '../../models/bet.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-bankroll-edit',
  templateUrl: './bankroll-edit.component.html',
  styleUrls: ['./bankroll-edit.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
  ],
  providers: [BankrollService],
})
export class BankrollEditComponent implements OnInit {
  bankroll: Bankroll = {
    id: 0,
    name: '',
    total: 0,
    date: ''
  };

  constructor(
    private bankrollService: BankrollService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadBankroll(id);
  }

  loadBankroll(id: number): void {
    this.bankrollService.getBankroll(id).subscribe((data) => {
      this.bankroll = data;
      console.log(data)
      console.log(this.bankroll)
    });
  }

  updateBankroll(): void {
    this.bankrollService.updateBankroll(this.bankroll.id, this.bankroll).subscribe(() => {
      alert('Bankroll atualizado com sucesso!');
      this.router.navigate(['/bankrolls']);
    });
  }

  goBack(): void {
    this.router.navigate(['/bankrolls']);
  }
}
