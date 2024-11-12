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
  selector: 'app-unit-create',
  templateUrl: './unit-create.component.html',
  styleUrls: ['./unit-create.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    InputNumberModule,
    ButtonModule,
  ],
})
export class UnitCreateComponent implements OnInit {
  unit: Unit = {
    id: 0,
    value: 0,
    tipster: {} as Tipster,
  };

  tipsterId: number = 0;

  constructor(
    private unitService: UnitService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tipsterId = Number(this.route.snapshot.paramMap.get('tipsterId'));
    this.unit.tipster.id = this.tipsterId;
  }

  createUnit(): void {
    this.unitService.createUnit(this.unit).subscribe(() => {
      alert('Unit criada com sucesso!');
      this.router.navigate(['/units', this.tipsterId]);
    });
  }

  goBack(): void {
    this.router.navigate(['/units', this.tipsterId]);
  }
}
