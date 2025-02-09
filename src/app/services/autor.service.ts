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

  salvar(autorDTO: AutorDto): Observable<void>{
    return this.http.post<any>(`${this.apiUrl}`, autorDTO);
  }

  atualizar(autorDTO: AutorDto, id: number): Observable<void>{
    return this.http.put<any>(`${this.apiUrl}/${id}`, autorDTO);
  }

  excluir(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }  

  buscarPorId(id: number): Observable<AutorDto> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }  



}
