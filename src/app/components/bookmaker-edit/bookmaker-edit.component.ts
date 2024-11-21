import { Component, OnInit } from '@angular/core';
import { BookmakerService } from '../../services/bookmaker.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { Bookmaker } from '../../models/bet.model';

@Component({
  selector: 'app-bookmaker-edit',
  templateUrl: './bookmaker-edit.component.html',
  styleUrls: ['./bookmaker-edit.component.css'],
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
export class BookmakerEditComponent implements OnInit {
  bookmaker: Bookmaker = {
    id: 0,
    name: '',
    // Inicialize outros campos conforme necessário
  };

  loading: boolean = false;
  bookmakerId: number = 0;

  constructor(
    private bookmakerService: BookmakerService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.bookmakerId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadBookmaker();
  }

  /**
   * Carrega os detalhes da casa de apostas a ser editada.
   */
  loadBookmaker(): void {
    this.loading = true;
    this.bookmakerService.getBookmakerById(this.bookmakerId).subscribe({
      next: (bookmaker) => {
        this.bookmaker = bookmaker;
        this.loading = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao carregar a Casa de Apostas.',
        });
        this.loading = false;
        console.error(err);
      },
    });
  }

  /**
   * Atualiza uma casa de apostas existente.
   */
  updateBookmaker(): void {
    if (this.bookmaker.name.trim() === '') {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'O campo Nome não pode estar vazio.',
      });
      return;
    }

    this.loading = true;
    this.bookmakerService.updateBookmaker(this.bookmaker.id, this.bookmaker).subscribe({
      next: (updatedBookmaker) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Casa de Apostas atualizada com sucesso!',
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
          detail: 'Falha ao atualizar a Casa de Apostas.',
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
