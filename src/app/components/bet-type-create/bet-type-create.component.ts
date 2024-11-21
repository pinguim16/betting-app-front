import { Component, OnInit } from '@angular/core';
import { BetTypeService } from '../../services/bet-type.service';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { BetType } from '../../models/bet.model';

@Component({
  selector: 'app-bet-type-create',
  templateUrl: './bet-type-create.component.html',
  styleUrls: ['./bet-type-create.component.css'],
  providers: [MessageService],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    ToastModule
  ],
})
export class BetTypeCreateComponent implements OnInit {
  betType: BetType = {
    id: 0,
    name: '',
  };

  constructor(
    private betTypeService: BetTypeService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  /**
   * Cria um novo tipo de aposta.
   */
  createBetType(): void {
    this.betTypeService.createBetType(this.betType).subscribe({
      next: (createdBetType) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Tipo de Aposta criado com sucesso!',
        });
        setTimeout(() => {
          this.router.navigate(['/bet-types']); // Navega para a lista de tipos de aposta após criação
        }, 1000);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao criar o tipo de aposta.',
        });
        console.error(err);
      },
    });
  }

  /**
   * Navega para a página anterior.
   */
  goBack(): void {
    this.router.navigate(['/bet-types']); // Ajuste conforme a estrutura de rotas
  }
}
