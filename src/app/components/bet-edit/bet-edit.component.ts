import { TipsterService } from './../../services/tipster.service';
import { SportService } from './../../services/sport.service';
import { BookmakerService } from './../../services/bookmaker.service';
import { CategoryService } from './../../services/category.service';
import { BetTypeService } from './../../services/bet-type.service';
import { CompetitionService } from './../../services/competition.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BetService } from '../../services/bet.service';
import { Bankroll, Bet, BetState, BetType, Bookmaker, Category, Competition, Sport, Tipster } from '../../models/bet.model';

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
  selector: 'app-bet-edit',
  templateUrl: './bet-edit.component.html',
  styleUrls: ['./bet-edit.component.css'],
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
export class BetEditComponent implements OnInit {
  bet: Bet = {
    id: null,
    date: null,
    competitionId: null,
    categoryId: null,
    bookmakerId: null,
    bookmakerBetId: '',
    state: null,
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
  betTypes: BetType[] = [];

  betStates: { label: string, value: string }[] = [
    { label: 'Pendente', value: 'P' },
    { label: 'Ganha', value: 'W' },
    { label: 'Perdida', value: 'L' },
    { label: 'Meio Ganha', value: 'HW' },
    { label: 'Meio Perdida', value: 'HL' },
    { label: 'Cashout', value: 'CASH' },
    { label: 'Reembolsada', value: 'R' },
    { label: 'Cancelada', value: 'C' }
  ];

  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private betService: BetService,
    private bankrollService: BankrollService, 
    private tipsterService: TipsterService,
    private sportService: SportService,
    private bookmakerService: BookmakerService,
    private categoryService: CategoryService,
    private betTypeService: BetTypeService,
    private competitionService: CompetitionService
  ) { }

  ngOnInit(): void {
    // Carregar os dados necessários para os dropdowns
    this.loadBankrolls();
    this.loadTipsters();
    this.loadSports();
    this.loadBookmakers();
    this.loadCategories();
    this.loadCompetitions();
    this.loadBetTypes();

    // Obter o ID da aposta a partir dos parâmetros da rota
    const betId = this.route.snapshot.paramMap.get('id');
    if (betId) {
      this.betService.getBet(+betId).subscribe(
        data => {
          this.bet = data;
        },
        error => {
          console.error('Erro ao carregar a aposta', error);
          this.errorMessage = 'Erro ao carregar a aposta. Por favor, tente novamente.';
        }
      );
    }
  }

  // Métodos para carregar os dados dos dropdowns
  loadBankrolls(): void {
    this.bankrollService.getBankrolls().subscribe(data => this.bankrolls = data);
  }

  loadTipsters(): void {
    this.tipsterService.getTipsters().subscribe(data => this.tipsters = data);
  }

  loadSports(): void {
    this.sportService.getSports().subscribe(data => this.sports = data);
  }

  loadBookmakers(): void {
    this.bookmakerService.getBookmakers().subscribe(data => this.bookmakers = data);
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(data => this.categories = data);
  }

  loadCompetitions(): void {
    this.competitionService.getCompetitions().subscribe(data => this.competitions = data);
  }

  loadBetTypes(): void {
    this.betTypeService.getBetTypes().subscribe(data => this.betTypes = data);
  }

  // Método para atualizar a aposta
  updateBet(): void {
    if (this.bet.id) {
      this.betService.updateBet(this.bet.id,this.bet).subscribe(
        response => {
          console.log('Aposta atualizada com sucesso!', response);
          this.router.navigate(['/bets']); // Redirecionar para a lista de apostas
        },
        error => {
          console.error('Erro ao atualizar a aposta', error);
          this.errorMessage = 'Falha ao atualizar a aposta. Por favor, verifique os dados e tente novamente.';
        }
      );
    } else {
      this.errorMessage = 'ID da aposta não encontrado.';
    }
  }

  // Método para cancelar e voltar
  goBack(): void {
    this.router.navigate(['/bets']); // Ajuste a rota conforme necessário
  }
}
