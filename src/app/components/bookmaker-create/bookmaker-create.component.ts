import { Component } from '@angular/core';
import { BookmakerService } from '../../services/bookmaker.service';
import { Bookmaker } from '../../models/bet.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-bookmaker-create',
  templateUrl: './bookmaker-create.component.html',
  styleUrls: ['./bookmaker-create.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
  ],
})
export class BookmakerCreateComponent {
  bookmaker: Bookmaker = {
    id: 0,
    name: '',
  };

  constructor(private bookmakerService: BookmakerService, private router: Router) {}

  createBookmaker(): void {
    this.bookmakerService.createBookmaker(this.bookmaker).subscribe(() => {
      alert('Casa de apostas criada com sucesso!');
      this.router.navigate(['/bookmakers']);
    });
  }

  goBack(): void {
    this.router.navigate(['/bookmakers']);
  }
}
