import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private apiUrl = "http://localhost:8080/api/livros";

constructor(private http: HttpClient) { }

  buscarTodos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

}
