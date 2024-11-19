import { ToastModule } from 'primeng/toast';
import { Component } from '@angular/core';
import { TypeService } from '../../services/type.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { Type } from '../../models/bet.model';

@Component({
  selector: 'app-type-create',
  templateUrl: './type-create.component.html',
  styleUrls: ['./type-create.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
  ],
  providers: [MessageService, TypeService]
})
export class TypeCreateComponent {
  type: Type = {
    id: 0,
    name: '',
  };

  constructor(
    private typeService: TypeService,
    private router: Router,
    private messageService: MessageService
  ) { }

  createType(): void {
    if (this.type.name.trim()) {
      this.typeService.createType(this.type).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Tipo criado com sucesso!',
          });
          setTimeout(() => {
            this.router.navigate(['/types']);
          }, 1000); // Atraso de 1 segundo
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Falha ao criar tipo.',
          });
          console.error(err);
        },
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/types']);
  }
}
