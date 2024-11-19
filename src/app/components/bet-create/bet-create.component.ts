import { TipsterService } from './../../services/tipster.service';
import { SportService } from './../../services/sport.service';
import { BookmakerService } from './../../services/bookmaker.service';
import { CategoryService } from './../../services/category.service';
import { BetTypeService } from './../../services/bet-type.service';
import { CompetitionService } from './../../services/competition.service';
import { v4 as uuidv4 } from 'uuid';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BetService } from '../../services/bet.service';
import { Bankroll, Bet, BetCreate, BetState, BetType, Bookmaker, Category, Competition, Sport, Tipster } from '../../models/bet.model';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { BankrollService } from '../../services/bankroll.service';

@Component({
  selector: 'app-bet-create',
  templateUrl: './bet-create.component.html',
  styleUrls: ['./bet-create.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule,
    DropdownModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    RouterModule,
  ],
})
export class BetCreateComponent implements OnInit {
  bet: Bet = {
    id: null,
    date: null,
    competitionId: null,
    categoryId: null,
    bookmakerId: null,
    bookmakerBetId: '',
    state: '',
    betTypeId: null,
    tipsterId: null,
    sportId: null,
    bankrollId: null,
    odds: null,
    stake: null
  };

  bankrolls: Bankroll[] = [];
  tipsters: Tipster[] = [];
  sports: Sport[] = [];
  bookmakers: Bookmaker[] = [];
  categories: Category[] = [];
  competitions: Competition[] = [];
  betTypes: BetType[] = []

  // Definição dos estados da aposta
  betStates: any[] = [
    { label: 'Pendente', value: BetState.PENDING },
    { label: 'Ganha', value: BetState.WON },
    { label: 'Perdida', value: BetState.LOST },
    { label: 'Meio Ganha', value: BetState.HALF_WON },
    { label: 'Meio Perdida', value: BetState.HALF_LOST },
    { label: 'Cashout', value: BetState.CASHOUT },
    { label: 'Reembolsada', value: BetState.REFUNDED },
    { label: 'Cancelada', value: BetState.CANCELED }
  ];

  errorMessage: string = '';


  constructor(
    private betService: BetService,
    private router: Router,
    private tipsterService: TipsterService,
    private sportService: SportService,
    private bookmakerService: BookmakerService,
    private categoryService: CategoryService,
    private competitionService: CompetitionService,
    private betTypeService: BetTypeService,
    private bankrollService: BankrollService
  ) { }

  ngOnInit(): void {
    this.loadTipsters();
    this.loadSports();
    this.loadBookmakers();
    this.loadCategories();
    this.loadCompetitions();
    this.loadBetTypes();
    this.loadBankrolls();
  }

  // Função para gerar um UUID
  generateRandomId(): string {
    return uuidv4();
  }

  // Método para criar a aposta
  formatDate(date: Date | null): string | null {
    if (!date) {
      return null;
    }
    const pad = (n: number) => n < 10 ? '0' + n : n;
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    const milliseconds = date.getMilliseconds();
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  // Método para criar a aposta
  createBet(): void {
    const formattedDate = this.formatDate(this.bet.date);
    const betToCreate: BetCreate = { ...this.bet, date: formattedDate };

    // Verificar se bookmakerBetId está vazio ou nulo e gerar um UUID se necessário
    if (!betToCreate.bookmakerBetId || betToCreate.bookmakerBetId.trim() === '') {
      betToCreate.bookmakerBetId = this.generateRandomId(); // Gerar um UUID
    }

    this.betService.createBet(betToCreate).subscribe(
      response => {
        console.log('Aposta criada com sucesso!', response);
        this.router.navigate(['/bets']); // Redirecionar para a lista de apostas
      },
      error => {
        console.error('Erro ao criar aposta', error);
        this.errorMessage = 'Falha ao criar a aposta. Por favor, verifique os dados e tente novamente.';
      }
    );
  }

  loadTipsters(): void {
    this.tipsterService.getTipsters().subscribe((data) => {
      this.tipsters = data;
    });
  }

  loadSports(): void {
    this.sportService.getSports().subscribe((data) => {
      this.sports = data;
    });
  }

  loadBookmakers(): void {
    this.bookmakerService.getBookmakers().subscribe((data) => {
      this.bookmakers = data;
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  loadCompetitions(): void {
    this.competitionService.getCompetitions().subscribe((data) => {
      this.competitions = data;
    });
  }

  loadBankrolls(): void {
    this.bankrollService.getBankrolls().subscribe((data) => {
      this.bankrolls = data;
    });
  }

  loadBetTypes(): void {
    this.betTypeService.getBetTypes().subscribe((data) => {
      this.betTypes = data;
    });
  }

  goBack(): void {
    this.router.navigate(['/bets']);
  }
}
