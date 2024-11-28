import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EntrenoService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Base URL

  constructor(private http: HttpClient) {}

  getEntrenoPorFecha(fecha: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/entrenos/fecha/${fecha}`); // Asegúrate de no duplicar
  }
}
