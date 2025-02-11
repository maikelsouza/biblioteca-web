import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {  

  private apiUrl = `${environment.apiBaseUrl}/relatorios`;

  constructor(private http: HttpClient) { }


  gerarRelatorioAtores(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/autores-pdf`, { responseType: 'blob' });
  }

}
