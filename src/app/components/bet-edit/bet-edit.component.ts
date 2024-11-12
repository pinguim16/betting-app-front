
import { Component, OnInit } from '@angular/core';
import { BetService } from '../../services/bet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TipsterService } from './../../services/tipster.service';
import { SportService } from './../../services/sport.service';
import { BookmakerService } from './../../services/bookmaker.service';
import { CategoryService } from './../../services/category.service';
import { BetTypeService } from './../../services/bet-type.service';
import { CompetitionService } from './../../services/competition.service';

import { Bet, Tipster, Sport, Bookmaker, Category, Competition, BetType, Bankroll } from '../../models/bet.model';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
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
    date: new Date(),
    competition: {} as Competition,
    category: {} as Category,
    bookmaker: {} as Bookmaker,
    betType: {} as BetType,
    tipster: {} as Tipster,
    sport: {} as Sport,
    bankroll: {} as Bankroll,
    odds: 0,
    stake: 0,
  };

  tipsters: Tipster[] = [];
  sports: Sport[] = [];
  bookmakers: Bookmaker[] = [];
  categories: Category[] = [];
  competitions: Competition[] = [];
  betTypes: BetType[] = [];
  bankrolls: Bankroll[] = [];

  constructor(
    private betService: BetService,
    private route: ActivatedRoute,
    private router: Router,
    private tipsterService: TipsterService,
    private sportService: SportService,
    private bookmakerService: BookmakerService,
    private categoryService: CategoryService,
    private competitionService: CompetitionService,
    private betTypeService: BetTypeService,
    private bankrollService: BankrollService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadBet(id);
    this.loadTipsters();
    this.loadSports();
    this.loadBookmakers();
    this.loadCategories();
    this.loadCompetitions();
    this.loadBetTypes();
    this.loadBankrolls();
  }

  loadBet(id: number): void {
    this.betService.getBet(id).subscribe((data) => {
      this.bet = data;
      this.bet.date = new Date(this.bet.date);
    });
  }

  updateBet(): void {
    this.betService.updateBet(this.bet.id!, this.bet).subscribe(() => {
      alert('Aposta atualizada com sucesso!');
      this.router.navigate(['/bets']);
    });
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

  loadBetTypes(): void {
    this.betTypeService.getBetTypes().subscribe((data) => {
      this.betTypes = data;
    });
  }

  loadBankrolls(): void {
    this.bankrollService.getBankrolls().subscribe((data) => {
      this.bankrolls = data;
    });
  }

  goBack(): void {
    this.router.navigate(['/bets']);
  }
}
