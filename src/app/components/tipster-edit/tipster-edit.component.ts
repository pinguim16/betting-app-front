import { CommonModule } from '@angular/common';
// tipster-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { SportService } from '../../services/sport.service';
import { TipsterService } from '../../services/tipster.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Sport, Tipster } from '../../models/bet.model';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
// Outras importações...

@Component({
  selector: 'app-tipster-edit',
  templateUrl: './tipster-edit.component.html',
  styleUrls: ['./tipster-edit.component.css'],
  providers: [MessageService],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    CardModule,
    ToastModule
  ],
})
export class TipsterEditComponent implements OnInit {
  tipster: Tipster = {
    id: 0,
    name: '',
    bingos: 0,
    sport: null, // Inicialização correta
    // Outros campos...
  };

  sports: Sport[] = [];
  loading: boolean = false;
  tipsterId: number = 0;

  constructor(
    private sportService: SportService,
    private tipsterService: TipsterService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.tipsterId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadSports();
    this.loadTipster();
  }

  loadSports(): void {
    this.loading = true;
    this.sportService.getSports().subscribe({
      next: (sports) => {
        this.sports = sports;
        this.loading = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao carregar os Esportes.',
        });
        this.loading = false;
        console.error(err);
      },
    });
  }

  loadTipster(): void {
    this.loading = true;
    this.tipsterService.getTipsterById(this.tipsterId).subscribe({
      next: (tipster) => {
        this.tipster = tipster;
        this.loading = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao carregar o Tipster.',
        });
        this.loading = false;
        console.error(err);
      },
    });
  }

  updateTipster(): void {
    // Validações...
    this.loading = true;
    this.tipsterService.updateTipster(this.tipster.id, this.tipster).subscribe({
      next: (updatedTipster) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Tipster atualizado com sucesso!',
        });
        setTimeout(() => {
          this.loading = false;
          this.router.navigate(['/tipsters']); // Navega para a lista de tipsters após criação
        }, 1000);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao atualizar o Tipster.',
        });
        this.loading = false;
        console.error(err);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/tipsters']);
  }
}
