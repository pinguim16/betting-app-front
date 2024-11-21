import { Component, OnInit } from '@angular/core';
import { SportService } from '../../services/sport.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { Sport } from '../../models/bet.model';

@Component({
  selector: 'app-sport-edit',
  templateUrl: './sport-edit.component.html',
  styleUrls: ['./sport-edit.component.css'],
  providers: [MessageService],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    ToastModule
  ],
})
export class SportEditComponent implements OnInit {
  sport: Sport = {
    id: 0,
    name: '',
    // Inicialize outros campos conforme necessário
  };

  loading: boolean = false;
  sportId: number = 0;

  constructor(
    private sportService: SportService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.sportId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadSport();
  }

  /**
   * Carrega os detalhes do esporte a ser editado.
   */
  loadSport(): void {
    this.loading = true;
    this.sportService.getSportById(this.sportId).subscribe({
      next: (sport) => {
        this.sport = sport;
        this.loading = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao carregar o Esporte.',
        });
        this.loading = false;
        console.error(err);
      },
    });
  }

  /**
   * Atualiza um esporte existente.
   */
  updateSport(): void {
    if (this.sport.name.trim() === '') {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'O campo Nome não pode estar vazio.',
      });
      return;
    }

    this.loading = true;
    this.sportService.updateSport(this.sport.id, this.sport).subscribe({
      next: (updatedSport) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Esporte atualizado com sucesso!',
        });
        setTimeout(() => {
          this.loading = false;
          this.router.navigate(['/sports']); // Navega para a lista de esportes após criação

        }, 1000);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao atualizar o Esporte.',
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
    this.router.navigate(['/sports']); // Ajuste conforme a estrutura de rotas
  }
}
