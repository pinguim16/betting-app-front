import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../services/unit.service';
import { Unit, Tipster } from '../../models/bet.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.css'],
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
})
export class UnitListComponent implements OnInit {
  units: Unit[] = [];
  tipsterId: number = 0;

  constructor(
    private unitService: UnitService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tipsterId = Number(this.route.snapshot.paramMap.get('tipsterId'));
    this.loadUnits();
  }

  loadUnits(): void {
    this.unitService.getUnitsByTipster(this.tipsterId).subscribe((data) => {
      this.units = data;
    });
  }

  deleteUnit(id: number): void {
    if (confirm('Deseja realmente excluir esta Unit?')) {
      this.unitService.deleteUnit(id).subscribe(() => {
        this.units = this.units.filter((unit) => unit.id !== id);
      });
    }
  }

  editUnit(id: number): void {
    this.router.navigate(['/units/edit', id]);
  }

  createUnit(): void {
    this.router.navigate(['/units/create', this.tipsterId]);
  }

  goBack(): void {
    this.router.navigate(['/tipsters']);
  }
}
