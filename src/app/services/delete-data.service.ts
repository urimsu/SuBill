import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteDataService {

  private apiUrl = 'https://subill-backend.onrender.com/deleteData'; // Die URL deiner API

  constructor(private http: HttpClient) {}
  deleteDaten(daten:any):Observable<any>{
    return this.http.post<any>(this.apiUrl,daten);
  }
}
