import { Component, OnInit } from '@angular/core';
import { DatenbankComponent } from '../datenbank/datenbank.component';

@Component({
  selector: 'app-datenbank-display',
  standalone: true,
  imports: [],
  templateUrl: './datenbank-display.component.html',
  styleUrl: './datenbank-display.component.css'
})
export class DatenbankDisplayComponent implements OnInit {
  data: any[] = [];

  constructor(private apiService: DatenbankComponent) { }

  ngOnInit(): void {
    this.apiService.getData().subscribe(response => {
      this.data = response;
    });
  }
}
