import { Component, OnInit, ViewChild } from '@angular/core';
import { UnitService } from '../../services/unit.service';
import { Tipster, Unit } from '../../models/bet.model';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Table } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { TipsterService } from '../../services/tipster.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-unit-list-tipster',
  templateUrl: './unit-list-tipster.component.html',
  styleUrls: ['./unit-list-tipster.component.css'],
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, InputTextModule, TagModule, DropdownModule, MultiSelectModule, ButtonModule, FormsModule],
})
export class UnitListTipsterComponent implements OnInit {
  units: Unit[] = [];
  filteredUnits: Unit[] = [];
  tipsters: Tipster[] = [];
  selectedTipsters: string[] = [];

  @ViewChild('dt') table!: Table;

  constructor(private unitService: UnitService,
    private tipsterService: TipsterService) { }

  ngOnInit(): void {
    this.loadUnits();
    this.loadTipster();
  }

  loadTipster(): void {
    this.tipsterService.getTipsters().subscribe((data) => {
      this.tipsters = data;
    });
  }

  loadUnits(): void {
    this.unitService.getUnits().subscribe((data) => {
      this.units = data;
      this.applyFilter(); // Chama applyFilter após carregar os dados
    });
    
  }

  applyFilter(): void {
    if (!this.units || this.units.length === 0) {
      this.filteredUnits = [];
      return;
    }
    if (!this.selectedTipsters || this.selectedTipsters.length === 0) {
      this.filteredUnits = this.units;
    } else {
      this.filteredUnits = this.units.filter((unit) =>
        unit.tipster && this.selectedTipsters.includes(unit.tipster.name)
      );
    }
  }
}