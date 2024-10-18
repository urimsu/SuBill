// daten.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatenService {
  private apiUrl = 'http://127.0.0.1:5000/'; // Die URL deiner API

  constructor(private http: HttpClient) {}

  // Methode zum Senden von Daten
  sendDaten(daten: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, daten);
  }
}
