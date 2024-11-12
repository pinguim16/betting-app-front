import { Component, OnInit } from '@angular/core';
import { BookmakerService } from '../../services/bookmaker.service';
import { Bookmaker } from '../../models/bet.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-bookmaker-edit',
  templateUrl: './bookmaker-edit.component.html',
  styleUrls: ['./bookmaker-edit.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
  ],
})
export class BookmakerEditComponent implements OnInit {
  bookmaker: Bookmaker = {
    id: 0,
    name: '',
  };

  constructor(
    private bookmakerService: BookmakerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadBookmaker(id);
  }

  loadBookmaker(id: number): void {
    this.bookmakerService.getBookmaker(id).subscribe((data) => {
      this.bookmaker = data;
    });
  }

  updateBookmaker(): void {
    this.bookmakerService.updateBookmaker(this.bookmaker.id, this.bookmaker).subscribe(() => {
      alert('Casa de apostas atualizada com sucesso!');
      this.router.navigate(['/bookmakers']);
    });
  }

  goBack(): void {
    this.router.navigate(['/bookmakers']);
  }
}
