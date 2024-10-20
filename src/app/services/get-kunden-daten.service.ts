import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetKundenDatenService {
  private apiUrl = 'http://127.0.0.1:5000/kundenData'; // Die URL deiner API

  constructor(private http: HttpClient) {}

  // Methode zum Senden von Daten
  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
