import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  private apiUrl = "http://localhost:8080/api/relatorios";

  constructor(private http: HttpClient) { }


  gerarRelatorioAtores(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/autores-pdf`, { responseType: 'blob' });
  }

}
