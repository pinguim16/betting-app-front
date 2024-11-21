// unit-list.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { UnitService } from '../../services/unit.service';
import { TipsterService } from '../../services/tipster.service';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Table, TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Tipster, Unit } from '../../models/bet.model';

@Component({
  selector: 'app-unit-list-tipster',
  templateUrl: './unit-list-tipster.component.html',
  styleUrls: ['./unit-list-tipster.component.css'],
  providers: [MessageService, ConfirmationService],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    MultiSelectModule,
    ButtonModule,
    CardModule,
    ToastModule,
    ConfirmDialogModule
  ],
})
export class UnitListTipsterComponent implements OnInit {
  units: Unit[] = [];
  filteredUnits: Unit[] = [];
  tipsters: Tipster[] = []; // Tipster interface pode ser definida conforme necessário
  selectedTipsters: string[] = [];
  loading: boolean = false;
  @ViewChild('dt') table!: Table;

  constructor(
    private unitService: UnitService,
    private tipsterService: TipsterService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadUnits();
    this.loadTipsters();
  }

  /**
   * Carrega a lista de Units.
   */
  loadUnits(): void {
    this.loading = true;
    this.unitService.getUnits().subscribe({
      next: (units) => {
        this.units = units;
        this.filteredUnits = units;
        this.loading = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao carregar as Units.',
        });
        this.loading = false;
        console.error(err);
      },
    });
  }

  /**
   * Carrega a lista de Tipsters para o filtro.
   */
  loadTipsters(): void {
    this.tipsterService.getTipsters().subscribe({
      next: (tipsters) => {
        this.tipsters = tipsters;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao carregar os Tipsters.',
        });
        console.error(err);
      },
    });
  }

  /**
   * Aplica o filtro baseado nos Tipsters selecionados.
   */
  applyFilter(): void {
    if (this.selectedTipsters.length === 0) {
      this.filteredUnits = this.units;
    } else {
      this.filteredUnits = this.units.filter((unit) =>
        this.selectedTipsters.includes(unit.tipster.name)
      );
    }
  }

  /**
   * Reseta todos os filtros aplicados.
   */
  resetFilters(): void {
    this.selectedTipsters = [];
    this.filteredUnits = this.units;
  }

  /**
   * Confirma a exclusão de uma Unit.
   * @param unitId ID da Unit a ser excluída.
   */
  confirmDelete(unitId: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir esta Unit?',
      header: 'Confirmação de Exclusão',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteUnit(unitId);
      },
    });
  }

  /**
   * Exclui uma Unit.
   * @param unitId ID da Unit a ser excluída.
   */
  deleteUnit(unitId: number): void {
    this.unitService.deleteUnit(unitId).subscribe({
      next: () => {
        this.units = this.units.filter((unit) => unit.id !== unitId);
        this.applyFilter();
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Unit excluída com sucesso!',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao excluir a Unit.',
        });
        console.error(err);
      },
    });
  }

  /**
   * Navega para a lista de Units.
   */
  navigateToUnits(): void {
    this.router.navigate(['/units']);
  }
}
