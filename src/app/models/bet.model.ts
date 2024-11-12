export interface Bet {
  id?: number;
  date: Date;
  competition: Competition;
  category: Category;
  bookmaker: Bookmaker;
  bookmakerBetId?: string;
  state?: string;
  betType: BetType;
  label?: string;
  odds?: number;
  stake?: number;
  tipster: Tipster;
  sport: Sport;
  profit?: number;
  totalValue?: number;
  closing?: number;
  commission?: number;
  live?: boolean;
  freebet?: boolean;
  cashout?: boolean;
  eachWay?: boolean;
  comment?: string;
  bankroll: Bankroll;
}

//Pronto
export interface Competition {
  id: number;
  name: string;
  bets?: Bet[]; // Relacionamento One-to-Many com Bet (opcional)
}

//Pronto
export interface Category {
  id: number;
  name: string; // Nome da categoria (ex.: ML, MS)
  bets?: Bet[]; // Relacionamento One-to-Many com Bet (opcional)
}

//Pronto
export interface Bookmaker {
  id: number;
  name: string;
  bets?: Bet[]; // Relacionamento One-to-Many com Bet (opcional)
}

//Pronto
export interface BetType {
  id: number;
  name: string; // Simples ou Múltipla
  bets?: Bet[]; // Relacionamento One-to-Many com Bet (opcional)
}

//Pronto
export interface Tipster {
  id: number;
  name: string;
  bingos: number;
  sport: Sport; // Relacionamento Many-to-One com Sport
  units: Unit[]; // Relacionamento One-to-Many com Unit
}

//Pronto
export interface Sport {
  id: number;
  name: string;
  bets?: Bet[]; // Relacionamento One-to-Many com Bet (opcional)
}

//Pronto
export interface Unit {
  id: number;
  value: number;
  tipster: Tipster; // Associação com Tipster
}

//Pronto
export interface Bankroll {
  id: number;
  name: string;
  total: number;
  bets?: Bet[]; // Opcional, dependendo das necessidades
}

export interface DashboardMetrics {
  totalBankroll: number;
  totalProfitLoss: number;
  roi: number;
  yield: number;
  successRate: number;
  averageOdds: number;
  averageStake: number;
}

export interface BankrollEvolution {
  date: string; // Formato ISO ou outro adequado
  total: number;
}

export interface Distribution {
  name: string;
  count: number;
}

export interface TipsterMetrics {
  id: number;
  name: string;
  totalProfitLoss: number;
  roi: number;
  successRate: number;
  averageOdds: number;
  averageStake: number;
}