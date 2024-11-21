// unit-create.component.ts
import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../services/unit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { Tipster, Unit } from '../../models/bet.model';

@Component({
  selector: 'app-unit-create',
  templateUrl: './unit-create.component.html',
  styleUrls: ['./unit-create.component.css'],
  providers: [MessageService],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputNumberModule,
    ButtonModule,
    CardModule,
    ToastModule
  ],
})
export class UnitCreateComponent implements OnInit {
  unit: Unit = {
    id: 0,
    value: 0, // Inicialização permitida conforme a interface
    tipster: {} as Tipster,
    // Inicialize outros campos conforme necessário
  };

  loading: boolean = false;
  tipsterId: number = 0;

  constructor(
    private unitService: UnitService,
    private router: Router,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.tipsterId = Number(this.route.snapshot.paramMap.get('tipsterId'));
    this.unit.tipster.id = this.tipsterId;
  }

  /**
   * Cria uma nova Unit.
   */
  createUnit(): void {
    // Validações
    if (this.unit.value === null || this.unit.value <= 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'O campo Valor deve ser preenchido e maior que zero.',
      });
      return;
    }

    this.loading = true;
    this.unitService.createUnit(this.unit).subscribe({
      next: (createdUnit) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Unit criada com sucesso!',
        });
        this.loading = false;
        this.router.navigate(['/units', this.tipsterId]); // Navega para a lista de Units após criação
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao criar a Unit.',
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
    this.router.navigate(['/units', this.tipsterId]); // Ajuste conforme a estrutura de rotas
  }
}
