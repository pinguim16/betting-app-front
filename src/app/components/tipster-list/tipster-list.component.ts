import { Component, OnInit } from '@angular/core';
import { TipsterService } from '../../services/tipster.service';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Tipster, Sport } from '../../models/bet.model';

@Component({
  selector: 'app-tipster-list',
  templateUrl: './tipster-list.component.html',
  styleUrls: ['./tipster-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, TableModule, ButtonModule],
})
export class TipsterListComponent implements OnInit {
  tipsters: Tipster[] = [];

  constructor(private tipsterService: TipsterService, private router: Router) {}

  ngOnInit(): void {
    this.loadTipsters();
  }

  loadTipsters(): void {
    this.tipsterService.getTipsters().subscribe((data) => {
      this.tipsters = data;
    });
  }

  deleteTipster(id: number): void {
    if (confirm('Deseja realmente excluir este tipster?')) {
      this.tipsterService.deleteTipster(id).subscribe(() => {
        this.tipsters = this.tipsters.filter((tipster) => tipster.id !== id);
      });
    }
  }

  editTipster(id: number): void {
    this.router.navigate(['/tipsters/edit', id]);
  }

  createTipster(): void {
    this.router.navigate(['/tipsters/create']);
  }

  viewUnits(tipsterId: number): void {
    this.router.navigate(['/units', tipsterId]);
  }
}
