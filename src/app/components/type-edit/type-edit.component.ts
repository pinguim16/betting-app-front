import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TypeService } from '../../services/type.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Type } from '../../models/bet.model';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-type-edit',
  templateUrl: './type-edit.component.html',
  styleUrls: ['./type-edit.component.css'],
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
  providers: [MessageService, TypeService]
  // Remova o providers: [MessageService] se estiver presente
})
export class TypeEditComponent implements OnInit {
  @ViewChild('typeForm') typeForm!: NgForm;

  type: Type = {
    id: 0,
    name: '',
  };

  constructor(
    private typeService: TypeService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.typeService.getType(id).subscribe((type) => {
      this.type = type;
    });
  }

  updateType(): void {
    if (this.typeForm.invalid) {
      // Opcional: exibir uma mensagem de erro ou focar no campo inválido
      return;
    }

    if (this.type.name.trim()) {
      this.typeService.updateType(this.type).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Tipo atualizado com sucesso!',
          });
          setTimeout(() => {
            this.router.navigate(['/types']);
          }, 1000);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Falha ao atualizar o tipo.',
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
