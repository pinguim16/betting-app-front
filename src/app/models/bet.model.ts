export interface Bet {
  id: number | null;
  date: Date | null;
  competitionId: number | null;
  categoryId: number | null;
  bookmakerId: number | null;
  bookmakerBetId?: string;
  state: string | null; // Ou use o enum correspondente
  betTypeId: number | null;
  tipsterId: number | null;
  sportId: number | null;
  bankrollId: number | null;
  odds: number | null;
  stake: number | null;
  profit?: number;
  totalValue?: number;
  closing?: number;
  commission?: number;
  live?: boolean;
  freebet?: boolean;
  cashout?: boolean;
  eachWay?: boolean;
  comment?: string;
  label?: string;
  tipster?:Tipster;
  sport?:Sport;
  // Remover profitLoss se não for necessário
}

export interface BetCreate {
  date: string | null;
  competitionId: number | null;
  categoryId: number | null;
  bookmakerId: number | null;
  bookmakerBetId?: string;
  state: string | null;
  betTypeId: number | null;
  tipsterId: number | null;
  sportId: number | null;
  bankrollId: number | null;
  odds: number | null;
  stake: number | null;
  profit?: number;
  totalValue?: number;
  closing?: number;
  commission?: number;
  live?: boolean;
  freebet?: boolean;
  cashout?: boolean;
  eachWay?: boolean;
  comment?: string;
  label?: string;
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
  date?: string; // para atualização
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

export interface BankrollEvolutionDTO {
  date: string; // Formato 'yyyy-MM-dd'
  total: number;
}

export interface Type {
  id: number;
  name: string;
}

export enum BetState {
  PENDING = 'P',
  WON = 'W',
  LOST = 'L',
  HALF_WON = 'HW',
  HALF_LOST = 'HL',
  CASHOUT = 'CASH',
  REFUNDED = 'R',
  CANCELED = 'C'
}

export interface BetCsvDTO {
  id: string;
  date: string;
  type: string;
  sport: string;
  label: string;
  odds: number;
  stake: number;
  state: string;
  bookmaker: string;
  tipster: string;
  category: string;
  competition: string;
  betType: string;
  closing: string;
  comment: string;
  live?: boolean;
  freebet?: boolean;
  cashout?: boolean;
  eachWay?: boolean;
  errors?: string[]; // Campo para armazenar erros específicos do registro
}

export interface BetWithExpanded extends BetCsvDTO {
  expanded?: boolean;
}

export interface BetImportResponseDTO {
  bets: BetWithExpanded[];
  errors?: string[];
  message?: string;
}