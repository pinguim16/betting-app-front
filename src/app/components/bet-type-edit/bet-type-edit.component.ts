import { Component, OnInit } from '@angular/core';
import { BetTypeService } from '../../services/bet-type.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { BetType } from '../../models/bet.model';

@Component({
  selector: 'app-bet-type-edit',
  templateUrl: './bet-type-edit.component.html',
  styleUrls: ['./bet-type-edit.component.css'],
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
export class BetTypeEditComponent implements OnInit {
  betType: BetType = {
    id: 0,
    name: '',
    // Inicialize outros campos conforme necessário
  };

  loading: boolean = false;
  betTypeId: number = 0;

  constructor(
    private betTypeService: BetTypeService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.betTypeId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadBetType();
  }

  /**
   * Carrega os detalhes do tipo de aposta a ser editado.
   */
  loadBetType(): void {
    this.loading = true;
    this.betTypeService.getBetTypeById(this.betTypeId).subscribe({
      next: (betType) => {
        this.betType = betType;
        this.loading = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao carregar o tipo de aposta.',
        });
        this.loading = false;
        console.error(err);
      },
    });
  }

  /**
   * Atualiza um tipo de aposta existente.
   */
  updateBetType(): void {
    if (this.betType.name.trim() === '') {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'O campo Nome não pode estar vazio.',
      });
      return;
    }

    this.loading = true;
    this.betTypeService.updateBetType(this.betType.id, this.betType).subscribe({
      next: (updatedBetType) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Tipo de Aposta atualizado com sucesso!',
        });
        setTimeout(() => {
          this.loading = false;
          this.router.navigate(['/bet-types']); // Navega para a lista de tipos de aposta após atualização
        }, 1000);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao atualizar o tipo de aposta.',
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
    this.router.navigate(['/bet-types']); // Ajuste conforme a estrutura de rotas
  }
}
