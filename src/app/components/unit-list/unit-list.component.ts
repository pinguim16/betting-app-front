import { Component, OnInit, ViewChild } from '@angular/core';
import { UnitService } from '../../services/unit.service';
import { Router, RouterModule } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Unit } from '../../models/bet.model';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    TooltipModule,
    InputTextModule,
    CardModule,
    ConfirmDialogModule,
    TooltipModule,
  ],
  providers: [MessageService, ConfirmationService],
})
export class UnitListComponent implements OnInit {
  @ViewChild('dt') dt!: Table;

  units: Unit[] = [];
  loading: boolean = true;

  constructor(
    private unitService: UnitService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getUnits();
  }

  /**
   * Busca a lista de units do backend.
   */
  getUnits(): void {
    this.unitService.getUnits().subscribe({
      next: (units) => {
        this.units = units;
        this.loading = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao carregar as units.',
        });
        this.loading = false;
        console.error(err);
      },
    });
  }

  /**
   * Navega para a página de criação de uma nova unit.
   */
  createUnit(): void {
    this.router.navigate(['/units/create']);
  }

  /**
   * Navega para a página de edição de uma unit específica.
   * @param id ID da unit a ser editada.
   */
  editUnit(id: number): void {
    this.router.navigate(['/units/edit', id]);
  }

  /**
   * Abre um diálogo de confirmação antes de excluir uma unit.
   * @param id ID da unit a ser excluída.
   */
  confirmDelete(id: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza de que deseja excluir esta unit?',
      accept: () => {
        this.deleteUnit(id);
      },
    });
  }

  /**
   * Exclui uma unit e atualiza a lista.
   * @param id ID da unit a ser excluída.
   */
  deleteUnit(id: number): void {
    this.unitService.deleteUnit(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Unit excluída com sucesso!',
        });
        this.getUnits(); // Atualiza a lista após a exclusão
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao excluir a unit.',
        });
        console.error(err);
      },
    });
  }

  /**
   * Exporta a lista de units para um arquivo CSV.
   */
  exportExcel(): void {
    const headers = ['ID', 'Valor', 'Tipster'];
    const rows = this.units.map((unit) => [
      unit.id,
      unit.value.toFixed(2),
      unit.tipster.name,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers, ...rows].map((e) => e.join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'units.csv');
    document.body.appendChild(link); // Necessário para Firefox

    link.click();
    document.body.removeChild(link);
  }

  /**
   * Aplica um filtro global na tabela com base no valor do input de busca.
   * @param event Evento de input do campo de busca.
   */
  onGlobalFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.dt.filterGlobal(input.value, 'contains');
  }

  /**
   * Navega para a página anterior.
   */
  goBack(): void {
    this.router.navigate(['../']); // Ajuste conforme a estrutura de rotas
  }
}
