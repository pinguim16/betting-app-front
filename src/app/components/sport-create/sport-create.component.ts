import { Component, OnInit } from '@angular/core';
import { SportService } from '../../services/sport.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { Sport } from '../../models/bet.model';

@Component({
  selector: 'app-sport-create',
  templateUrl: './sport-create.component.html',
  styleUrls: ['./sport-create.component.css'],
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
export class SportCreateComponent implements OnInit {
  sport: Sport = {
    id: 0,
    name: '',
    // Inicialize outros campos conforme necessário
  };

  loading: boolean = false;

  constructor(
    private sportService: SportService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void { }

  /**
   * Cria um novo esporte.
   */
  createSport(): void {
    if (this.sport.name.trim() === '') {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'O campo Nome não pode estar vazio.',
      });
      return;
    }

    this.loading = true;
    this.sportService.createSport(this.sport).subscribe({
      next: (createdSport) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Esporte criado com sucesso!',
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
          detail: 'Falha ao criar o Esporte.',
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
