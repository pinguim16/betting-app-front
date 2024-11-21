// unit-edit.component.ts
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
  selector: 'app-unit-edit',
  templateUrl: './unit-edit.component.html',
  styleUrls: ['./unit-edit.component.css'],
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
export class UnitEditComponent implements OnInit {
  unit: Unit = {
    id: 0,
    value: 0, // Inicialização correta conforme a interface
    tipster: {} as Tipster,
    // Inicialize outros campos conforme necessário
  };

  loading: boolean = false;
  unitId: number = 0;

  constructor(
    private unitService: UnitService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.unitId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadUnit();
  }

  /**
   * Carrega os detalhes da Unit a ser editada.
   */
  loadUnit(): void {
    this.loading = true;
    this.unitService.getUnitById(this.unitId).subscribe({
      next: (unit) => {
        this.unit = unit;
        this.loading = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao carregar a Unit.',
        });
        this.loading = false;
        console.error(err);
      },
    });
  }

  /**
   * Atualiza uma Unit existente.
   */
  updateUnit(): void {
    // Validações
    if (this.unit.value === null || this.unit.value <= 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'O campo Valor deve ser maior que zero.',
      });
      return;
    }

    this.loading = true;
    this.unitService.updateUnit(this.unit.id, this.unit).subscribe({
      next: (updatedUnit) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Unit atualizada com sucesso!',
        });
        this.loading = false;
        this.router.navigate(['/units', this.unit.tipster.id]); // Navega para a lista de Units após atualização
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao atualizar a Unit.',
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
    this.router.navigate(['/units', this.unit.tipster.id]); // Ajuste conforme a estrutura de rotas
  }
}
