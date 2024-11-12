import { Routes } from '@angular/router';
import { BetListComponent } from './components/bet-list/bet-list.component';
import { BetCreateComponent } from './components/bet-create/bet-create.component';
import { BetEditComponent } from './components/bet-edit/bet-edit.component';
import { TipsterListComponent } from './components/tipster-list/tipster-list.component';
import { TipsterCreateComponent } from './components/tipster-create/tipster-create.component';
import { TipsterEditComponent } from './components/tipster-edit/tipster-edit.component';
import { UnitListComponent } from './components/unit-list/unit-list.component';
import { UnitCreateComponent } from './components/unit-create/unit-create.component';
import { UnitEditComponent } from './components/unit-edit/unit-edit.component';
import { SportListComponent } from './components/sport-list/sport-list.component';
import { SportCreateComponent } from './components/sport-create/sport-create.component';
import { SportEditComponent } from './components/sport-edit/sport-edit.component';
import { BetTypeListComponent } from './components/bet-type-list/bet-type-list.component';
import { BetTypeCreateComponent } from './components/bet-type-create/bet-type-create.component';
import { BetTypeEditComponent } from './components/bet-type-edit/bet-type-edit.component';
import { BookmakerListComponent } from './components/bookmaker-list/bookmaker-list.component';
import { BookmakerCreateComponent } from './components/bookmaker-create/bookmaker-create.component';
import { BookmakerEditComponent } from './components/bookmaker-edit/bookmaker-edit.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryCreateComponent } from './components/category-create/category-create.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';
import { CompetitionListComponent } from './components/competition-list/competition-list.component';
import { CompetitionCreateComponent } from './components/competition-create/competition-create.component';
import { CompetitionEditComponent } from './components/competition-edit/competition-edit.component';
import { BankrollListComponent } from './components/bankroll-list/bankroll-list.component';
import { BankrollCreateComponent } from './components/bankroll-create/bankroll-create.component';
import { BankrollEditComponent } from './components/bankroll-edit/bankroll-edit.component';
import { UnitListTipsterComponent } from './components/unit-list-tipster/unit-list-tipster.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },

  { path: 'bets', component: BetListComponent },
  { path: 'bets/create', component: BetCreateComponent },
  { path: 'bets/edit/:id', component: BetEditComponent },

  { path: 'tipsters', component: TipsterListComponent },
  { path: 'tipsters/create', component: TipsterCreateComponent },
  { path: 'tipsters/edit/:id', component: TipsterEditComponent },

  { path: 'units/:tipsterId', component: UnitListComponent },
  { path: 'units/create/:tipsterId', component: UnitCreateComponent },
  { path: 'units/edit/:id', component: UnitEditComponent },
  { path: 'units', component: UnitListTipsterComponent },

  { path: 'sports', component: SportListComponent },
  { path: 'sports/create', component: SportCreateComponent },
  { path: 'sports/edit/:id', component: SportEditComponent },

  { path: 'bet-types', component: BetTypeListComponent },
  { path: 'bet-types/create', component: BetTypeCreateComponent },
  { path: 'bet-types/edit/:id', component: BetTypeEditComponent },

  { path: 'bookmakers', component: BookmakerListComponent },
  { path: 'bookmakers/create', component: BookmakerCreateComponent },
  { path: 'bookmakers/edit/:id', component: BookmakerEditComponent },

  { path: 'categories', component: CategoryListComponent },
  { path: 'categories/create', component: CategoryCreateComponent },
  { path: 'categories/edit/:id', component: CategoryEditComponent },

  { path: 'competitions', component: CompetitionListComponent },
  { path: 'competitions/create', component: CompetitionCreateComponent },
  { path: 'competitions/edit/:id', component: CompetitionEditComponent },

  { path: 'bankrolls', component: BankrollListComponent },
  { path: 'bankrolls/create', component: BankrollCreateComponent },
  { path: 'bankrolls/edit/:id', component: BankrollEditComponent },
];