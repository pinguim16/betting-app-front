import { Component, OnInit } from '@angular/core';
import { TipsterService } from '../../services/tipster.service';
import { Sport, Tipster } from '../../models/bet.model';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SportService } from '../../services/sport.service';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-tipster-create',
  templateUrl: './tipster-create.component.html',
  styleUrls: ['./tipster-create.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    DropdownModule
  ],
})
export class TipsterCreateComponent implements OnInit {
  tipster: Tipster = {
    id: 0,
    name: '',
    bingos: 0,
    sport: {} as Sport,
    units: [],
  };

  sports: Sport[] = [];

  constructor(
    private tipsterService: TipsterService,
    private sportService: SportService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSports();
  }

  loadSports(): void {
    this.sportService.getSports().subscribe((data) => {
      this.sports = data;
    });
  }

  createTipster(): void {
    this.tipsterService.createTipster(this.tipster).subscribe(() => {
      alert('Tipster criado com sucesso!');
      this.router.navigate(['/tipsters']);
    });
  }

  goBack(): void {
    this.router.navigate(['/tipsters']);
  }
}
