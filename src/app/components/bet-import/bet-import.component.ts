import { BetCsvDTO, BetWithExpanded } from './../../models/bet.model';
// src/app/components/bet-import/bet-import.component.ts

import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BetImportService } from '../../services/bet-import.service';

// PrimeNG Modules
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { FileUploadModule } from 'primeng/fileupload';
import { fileValidator } from '../../util/file.validator';
import { Bankroll, BetImportResponseDTO } from '../../models/bet.model';
import { BankrollService } from '../../services/bankroll.service';
import { TooltipModule } from 'primeng/tooltip';
import { Table } from 'primeng/table';
import { BetStatePipe } from '../../pipes/bet-state.pipe';
import { BetTypePipe } from '../../pipes/bet-type.pipe';

@Component({
  selector: 'app-bet-import',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    // PrimeNG Modules
    DropdownModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    CheckboxModule,
    CardModule,
    MessagesModule,
    MessageModule,
    FileUploadModule,
    TooltipModule,
    BetStatePipe,
    BetTypePipe
  ],
  templateUrl: './bet-import.component.html',
  styleUrls: ['./bet-import.component.css'],
})
export class BetImportComponent implements OnInit {
  importForm: FormGroup;
  selectedFile: File | null = null;
  uploadProgress: number = 0;
  message: string = '';
  isError: boolean = false;
  bankrolls: Bankroll[] = [];
  response: BetImportResponseDTO = { bets: [], errors: [], message: '' };
  canSave: boolean = false;

  @ViewChild('dt') dt!: Table;

  constructor(
    private fb: FormBuilder,
    private betImportService: BetImportService,
    private bankrollService: BankrollService
  ) {
    this.importForm = this.fb.group({
      bankroll: [null, Validators.required],
      file: [null, [Validators.required, fileValidator()]], // Validador personalizado
    });
  }

  ngOnInit(): void {
    this.loadBankrolls();
  }

  onFilter(event: Event, field: string, matchMode: string) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    this.dt.filter(value, field, matchMode);
  }

  /**
   * Getter para o controle de 'file'.
   */
  get fileControl(): FormControl {
    return this.importForm.get('file') as FormControl;
  }

  /**
   * Carrega a lista de bankrolls disponíveis.
   */
  loadBankrolls(): void {
    this.bankrollService.getBankrolls().subscribe({
      next: (data: Bankroll[]) => {
        this.bankrolls = data;
      },
      error: (err) => {
        this.message = 'Erro ao carregar bankrolls.';
        this.isError = true;
      },
    });
  }

  /**
   * Método chamado quando um arquivo é selecionado via p-fileUpload.
   * @param event Evento de seleção.
   */
  onFileSelect(event: any): void {
    const file = event.files[0];
    if (file) {
      const isCsv =
        file.type === 'text/csv' || file.name.toLowerCase().endsWith('.csv');
      if (isCsv) {
        this.selectedFile = file;
        // Marcar o controle 'file' como válido
        this.importForm.get('file')?.setValue(file);
        this.importForm.get('file')?.setErrors(null);
        this.importForm.get('file')?.markAsTouched();
        this.importForm.get('file')?.updateValueAndValidity();
        // Restante do código...
      } else {
        this.message = 'Por favor, selecione um arquivo CSV.';
        this.isError = true;
        this.selectedFile = null;
        // Marcar o controle 'file' como inválido
        this.importForm.get('file')?.setErrors({ invalidFile: true });
        this.importForm.get('file')?.markAsTouched();
        this.importForm.get('file')?.updateValueAndValidity();
        // Restante do código...
      }
    }
  }


  /**
   * Método para importar e validar as apostas do arquivo selecionado.
   */
  importBets(): void {
    if (this.importForm.invalid) {
      this.message = 'Por favor, preencha todos os campos obrigatórios.';
      this.isError = true;
      return;
    }

    const bankrollId = this.importForm.get('bankroll')?.value;

    if (this.selectedFile) {
      this.betImportService.importBetsFromCsv(this.selectedFile, bankrollId).subscribe({
        next: (response: BetImportResponseDTO) => {
          // Mapear as apostas para incluir a propriedade 'expanded'
          const betsWithExpanded: BetWithExpanded[] = response.bets.map((bet) => ({
            ...bet,
            expanded: false,
          }));
          this.response = {
            bets: betsWithExpanded,
            errors: response.errors,
            message: response.message,
          };
          if (response.errors && response.errors.length > 0) {
            this.message = 'Apostas processadas com alguns erros.';
            this.isError = true;
          } else if (response.message) {
            this.message = response.message;
            this.isError = false;
          } else {
            this.message = 'Nenhum arquivo selecionado.';
            this.isError = true;
          }
          this.canSave = this.checkCanSave();
        },
        error: (err: any) => {
          this.message = 'Erro ao importar apostas.';
          this.isError = true;
          this.canSave = false;
        },
      });
    } else {
      this.message = 'Nenhum arquivo selecionado.';
      this.isError = true;
    }
  }


  /**
   * Verifica se todos os registros são válidos e podem ser salvos.
   * @returns True se puder salvar, caso contrário, false.
   */
  checkCanSave(): boolean {
    if (this.response.bets && this.response.bets.length > 0) {
      for (let bet of this.response.bets) {
        if (bet.errors && bet.errors.length > 0) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  /**
   * Método para salvar as apostas validadas.
   */
  saveBets(): void {
    if (!this.canSave || !this.importForm.get('bankroll')?.value) {
      this.message = 'Não há apostas válidas para salvar.';
      this.isError = true;
      return;
    }

    const bankrollId = this.importForm.get('bankroll')?.value;
    const validBets = this.response.bets.filter(
      (bet) => !(bet.errors && bet.errors.length > 0)
    );

    // Excluir as propriedades 'errors' e 'expanded' ao preparar os dados para salvar
    const betsToSave = validBets.map((bet) => {
      const { errors, expanded, ...betData } = bet;
      return betData;
    });

    this.betImportService.saveBets(betsToSave, bankrollId).subscribe({
      next: (res: string) => {
        this.message = res;
        this.isError = false;
        this.importForm.reset();
        this.selectedFile = null;
        this.response = { bets: [], errors: [], message: '' };
        this.canSave = false;
      },
      error: (err: any) => {
        this.message = 'Erro ao salvar apostas.';
        this.isError = true;
      },
    });
  }
}  
