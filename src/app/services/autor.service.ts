import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AutorDto } from '../dto/autor-dto';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  private apiUrl = "http://localhost:8080/api/autores";
  

  constructor(private http: HttpClient) {}

  buscarTodos(): Observable<AutorDto[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

}
