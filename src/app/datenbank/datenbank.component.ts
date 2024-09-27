import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-datenbank',
  standalone: true,
  imports: [],
  templateUrl: './datenbank.component.html',
  styleUrl: './datenbank.component.css'
})

@Injectable({
  providedIn: 'root'
})
export class DatenbankComponent {
  private apiUrl = 'localhost:4200/backend/index.php';

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
