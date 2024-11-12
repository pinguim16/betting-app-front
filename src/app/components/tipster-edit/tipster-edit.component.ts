import { Component, OnInit } from '@angular/core';
import { TipsterService } from '../../services/tipster.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SportService } from '../../services/sport.service';
import { Tipster, Sport } from '../../models/bet.model';
import { DropdownModule } from 'primeng/dropdown';


@Component({
  selector: 'app-tipster-edit',
  templateUrl: './tipster-edit.component.html',
  styleUrls: ['./tipster-edit.component.css'],
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
export class TipsterEditComponent implements OnInit {
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
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTipster(id);
    this.loadSports();
  }

  loadTipster(id: number): void {
    this.tipsterService.getTipster(id).subscribe((data) => {
      this.tipster = data;
    });
  }

  loadSports(): void {
    this.sportService.getSports().subscribe((data) => {
      this.sports = data;
    });
  }

  updateTipster(): void {
    this.tipsterService.updateTipster(this.tipster.id, this.tipster).subscribe(() => {
      alert('Tipster atualizado com sucesso!');
      this.router.navigate(['/tipsters']);
    });
  }

  goBack(): void {
    this.router.navigate(['/tipsters']);
  }
}
