import { Component, OnInit } from '@angular/core';
import { SportService } from '../../services/sport.service';
import { TipsterService } from '../../services/tipster.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { Sport, Tipster } from '../../models/bet.model';

@Component({
  selector: 'app-tipster-create',
  templateUrl: './tipster-create.component.html',
  styleUrls: ['./tipster-create.component.css'],
  providers: [MessageService],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    CardModule,
    ToastModule
  ],
})
export class TipsterCreateComponent implements OnInit {
  tipster: Tipster = {
    id: 0,
    name: '',
    bingos: 0,
    sport: null, // Inicialize conforme a estrutura do Tipster
    // Inicialize outros campos conforme necessário
  };

  sports: Sport[] = [];
  loading: boolean = false;

  constructor(
    private sportService: SportService,
    private tipsterService: TipsterService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadSports();
  }

  /**
   * Carrega a lista de esportes para o dropdown.
   */
  loadSports(): void {
    this.loading = true;
    this.sportService.getSports().subscribe({
      next: (sports) => {
        this.sports = sports;
        this.loading = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao carregar os Esportes.',
        });
        this.loading = false;
        console.error(err);
      },
    });
  }

  /**
   * Cria um novo tipster.
   */
  createTipster(): void {
    if (this.tipster.name.trim() === '') {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'O campo Nome não pode estar vazio.',
      });
      return;
    }

    if (this.tipster.bingos <= 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'O campo Bingos deve ser maior que zero.',
      });
      return;
    }

    if (!this.tipster.sport) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'O campo Esporte é obrigatório.',
      });
      return;
    }

    this.loading = true;
    this.tipsterService.createTipster(this.tipster).subscribe({
      next: (createdTipster) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Tipster criado com sucesso!',
        });
        setTimeout(() => {
          this.loading = false;
          this.router.navigate(['/tipsters']); // Navega para a lista de tipsters após criação
        }, 1000);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao criar o Tipster.',
        });
        this.loading = false;
        console.error(err);
      },
    });
  }

  /**
   * Navega para a página anterior.
   */
  goBack(): void {
    this.router.navigate(['/tipsters']); // Ajuste conforme a estrutura de rotas
  }
}
