// src/app/components/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { NgChartsModule } from 'ng2-charts';
import { ChartType, ChartOptions } from 'chart.js';
import { DashboardService } from '../../services/dashboard.service'; // Ajuste o caminho conforme necessário
import { Bankroll, BankrollEvolution, DashboardMetrics, Distribution, TipsterMetrics } from '../../models/bet.model';
import { BankrollService } from '../../services/bankroll.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    NgChartsModule,
    FormsModule
    // Outros módulos PrimeNG se necessário
  ],
})
export class DashboardComponent implements OnInit {
  // Métricas do Dashboard
  tipstersMetrics: TipsterMetrics[] = [];
  // Defina o bankrollId aqui. Pode ser dinâmico conforme necessário.
  // Se houver apenas um Bankroll, você pode definir um ID fixo.
  bankrollId: number = 1; // Ajuste conforme necessário
  // Lista de Bankrolls para seleção
  bankrolls: Bankroll[] = [];


  metrics: DashboardMetrics = {
    totalBankroll: 0,
    totalProfitLoss: 0,
    roi: 0,
    yield: 0,
    successRate: 0,
    averageOdds: 0,
    averageStake: 0
  };

  // Dados para os gráficos
  bankrollEvolutionChartType: ChartType = 'line';
  bankrollEvolutionChartData: any;
  bankrollEvolutionChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true, // Exibe a legenda
        position: 'top', // Posição da legenda
      },
    },
  };

  distributionSportChartType: ChartType = 'doughnut';
  distributionSportChartData: any;
  distributionSportChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  distributionTipsterChartType: ChartType = 'doughnut';
  distributionTipsterChartData: any;
  distributionTipsterChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  distributionCategoryChartType: ChartType = 'doughnut';
  distributionCategoryChartData: any;
  distributionCategoryChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  constructor(private dashboardService: DashboardService,
    private bankrollService: BankrollService) { }

  ngOnInit(): void {
    this.loadMetrics();
    this.loadDistributionBySport();
    this.loadDistributionByTipster();
    this.loadDistributionByCategory();
    this.loadTipstersMetrics();

    this.loadBankrollEvolutionChart();
    this.loadBankrolls();
  }

  // Carregar Métricas
  loadMetrics(): void {
    this.dashboardService.getMetrics().subscribe(
      (data: DashboardMetrics) => {
        console.log('Métricas Recebidas:', data);
        this.metrics = data;
      },
      (error) => {
        console.error('Erro ao carregar métricas', error);
      }
    );
  }

  loadBankrolls(): void {
    // Implemente o método no BankrollService para obter todos os bankrolls
    this.bankrollService.getAllBankrolls().subscribe(
      data => {
        this.bankrolls = data;
        if (this.bankrolls.length > 0) {
          this.bankrollId = this.bankrolls[0].id; // Define o primeiro Bankroll como padrão
          this.loadMetrics();
          this.loadBankrollEvolutionChart();
          //this.loadOtherCharts();
          this.loadTipstersMetrics();
        } else {
          // Lidar com a ausência de Bankrolls
          console.warn('Nenhum Bankroll encontrado.');
        }
      },
      error => {
        console.error('Erro ao carregar os Bankrolls', error);
        // Opcional: Exiba uma mensagem de erro no frontend
      }
    );
  }

  loadBankrollEvolutionChart(): void {
    this.bankrollService.getBankrollEvolution(this.bankrollId).subscribe(
      data => {
        const labels = data.map(entry => entry.date);
        const totals = data.map(entry => entry.total);

        this.bankrollEvolutionChartData = {
          labels: labels,
          datasets: [{
            label: 'Evolução do Bankroll',
            data: totals,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
            tension: 0.4
          }]
        };

        this.bankrollEvolutionChartOptions = {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Evolução do Bankroll ao Longo do Tempo'
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Data'
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 20
              }
            },
            y: {
              title: {
                display: true,
                text: 'Total Bankroll (BRL)'
              },
              beginAtZero: true
            }
          }
        };
      },
      error => {
        console.error('Erro ao buscar evolução do bankroll', error);
        // Opcional: Exiba uma mensagem de erro no frontend
      }
    );
  }

  // Carregar Distribuição por Esporte
  loadDistributionBySport(): void {
    this.dashboardService.getDistributionBySport().subscribe(
      (data: Distribution[]) => {
        this.prepareDistributionSportChart(data);
      },
      (error) => {
        console.error('Erro ao carregar distribuição por esporte', error);
      }
    );
  }

  // Carregar Distribuição por Tipster
  loadDistributionByTipster(): void {
    this.dashboardService.getDistributionByTipster().subscribe(
      (data: Distribution[]) => {
        this.prepareDistributionTipsterChart(data);
      },
      (error) => {
        console.error('Erro ao carregar distribuição por tipster', error);
      }
    );
  }

  // Carregar Distribuição por Categoria
  loadDistributionByCategory(): void {
    this.dashboardService.getDistributionByCategory().subscribe(
      (data: Distribution[]) => {
        this.prepareDistributionCategoryChart(data);
      },
      (error) => {
        console.error('Erro ao carregar distribuição por categoria', error);
      }
    );
  }

  // Preparar Dados para o Gráfico de Evolução do Bankroll
  prepareBankrollEvolutionChart(data: BankrollEvolution[]): void {
    const labels = data.map(e => new Date(e.date).toLocaleDateString());
    const chartData = data.map(e => e.total);

    this.bankrollEvolutionChartData = {
      labels: labels,
      datasets: [
        {
          data: chartData,
          label: 'Evolução do Bankroll',
          fill: false,
          borderColor: '#42A5F5',
          backgroundColor: '#42A5F5',
          tension: 0.1, // Suaviza a linha
        },
      ],
    };
  }

  // Preparar Dados para Distribuição por Esporte
  prepareDistributionSportChart(data: Distribution[]): void {
    const labels = data.map(d => d.name);
    const chartData = data.map(d => d.count);
    const colors = this.generateColors(labels.length);

    this.distributionSportChartData = {
      labels: labels,
      datasets: [
        {
          data: chartData,
          backgroundColor: colors,
          hoverBackgroundColor: colors,
        },
      ],
    };
  }

  // Preparar Dados para Distribuição por Tipster
  prepareDistributionTipsterChart(data: Distribution[]): void {
    const labels = data.map(d => d.name);
    const chartData = data.map(d => d.count);
    const colors = this.generateColors(labels.length);

    this.distributionTipsterChartData = {
      labels: labels,
      datasets: [
        {
          data: chartData,
          backgroundColor: colors,
          hoverBackgroundColor: colors,
        },
      ],
    };
  }

  // Preparar Dados para Distribuição por Categoria
  prepareDistributionCategoryChart(data: Distribution[]): void {
    const labels = data.map(d => d.name);
    const chartData = data.map(d => d.count);
    const colors = this.generateColors(labels.length);

    this.distributionCategoryChartData = {
      labels: labels,
      datasets: [
        {
          data: chartData,
          backgroundColor: colors,
          hoverBackgroundColor: colors,
        },
      ],
    };
  }

  // Método para Gerar Cores Aleatórias
  generateColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      const color = `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;
      colors.push(color);
    }
    return colors;
  }

  // Método Auxiliar para Determinar Classe CSS com Base no Lucro/Prejuízo
  getProfitClass(): string {
    return this.metrics.totalProfitLoss >= 0 ? 'profit' : 'loss';
  }

  // Carregar Métricas dos Tipsters
  loadTipstersMetrics(): void {
    this.dashboardService.getTipsterMetrics().subscribe(
      (data: TipsterMetrics[]) => {
        console.log('Métricas dos Tipsters Recebidas:', data);
        this.tipstersMetrics = data;
      },
      (error) => {
        console.error('Erro ao carregar métricas dos tipsters', error);
      }
    );
  }
}
