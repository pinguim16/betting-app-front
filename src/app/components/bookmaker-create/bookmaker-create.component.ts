import { Component, OnInit } from '@angular/core';
import { BookmakerService } from '../../services/bookmaker.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { Bookmaker } from '../../models/bet.model';

@Component({
  selector: 'app-bookmaker-create',
  templateUrl: './bookmaker-create.component.html',
  styleUrls: ['./bookmaker-create.component.css'],
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
export class BookmakerCreateComponent implements OnInit {
  bookmaker: Bookmaker = {
    id: 0,
    name: '',
  };

  loading: boolean = false;

  constructor(
    private bookmakerService: BookmakerService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  /**
   * Cria uma nova casa de apostas.
   */
  createBookmaker(): void {
    if (this.bookmaker.name.trim() === '') {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'O campo Nome não pode estar vazio.',
      });
      return;
    }

    this.loading = true;
    this.bookmakerService.createBookmaker(this.bookmaker).subscribe({
      next: (createdBookmaker) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Casa de Apostas criada com sucesso!',
        });
        setTimeout(() => {
          this.loading = false;
          this.router.navigate(['/bookmakers']); // Navega para a lista de casas de apostas após atualização
        }, 1000);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao criar a Casa de Apostas.',
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
    this.router.navigate(['/bookmakers']); // Ajuste conforme a estrutura de rotas
  }
}
