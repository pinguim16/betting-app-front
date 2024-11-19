import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TypeService } from '../../services/type.service';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { Table } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { Type } from '../../models/bet.model';

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.css'],
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
  ],
  providers: [ConfirmationService, MessageService],
})
export class TypeListComponent implements OnInit {
  types: Type[] = [];
  loading: boolean = true;

  @ViewChild('dt') dt: Table | undefined;

  constructor(
    private typeService: TypeService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadTypes();
  }

  loadTypes(): void {
    this.loading = true;
    this.typeService.getTypes().subscribe((data) => {
      this.types = data;
      this.loading = false;
    });
  }

  createType(): void {
    this.router.navigate(['/types/create']);
  }

  editType(id: number): void {
    this.router.navigate(['/types/edit', id]);
  }

  confirmDelete(id: number): void {
    this.confirmationService.confirm({
      message: 'Deseja realmente excluir este tipo?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.deleteType(id);
      },
    });
  }

  deleteType(id: number): void {
    this.typeService.deleteType(id).subscribe(() => {
      this.loadTypes();
    });
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.types);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'types');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then((FileSaver) => {
      const data: Blob = new Blob([buffer], {
        type: 'application/octet-stream',
      });
      FileSaver.saveAs(
        data,
        fileName + '_export_' + new Date().getTime() + '.xlsx'
      );
    });
  }

  onGlobalFilter(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.dt?.filterGlobal(target.value, 'contains');
  }
}
