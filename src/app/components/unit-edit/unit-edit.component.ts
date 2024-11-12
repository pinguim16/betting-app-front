import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../services/unit.service';
import { Unit, Tipster } from '../../models/bet.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-unit-edit',
  templateUrl: './unit-edit.component.html',
  styleUrls: ['./unit-edit.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    InputNumberModule,
    ButtonModule,
  ],
})
export class UnitEditComponent implements OnInit {
  unit: Unit = {
    id: 0,
    value: 0,
    tipster: {} as Tipster,
  };

  constructor(
    private unitService: UnitService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadUnit(id);
  }

  loadUnit(id: number): void {
    this.unitService.getUnit(id).subscribe((data) => {
      this.unit = data;
    });
  }

  updateUnit(): void {
    this.unitService.updateUnit(this.unit.id, this.unit).subscribe(() => {
      alert('Unit atualizada com sucesso!');
      this.router.navigate(['/units', this.unit.tipster.id]);
    });
  }

  goBack(): void {
    this.router.navigate(['/units', this.unit.tipster.id]);
  }
}
