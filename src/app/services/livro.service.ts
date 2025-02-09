import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LivroDto } from '../dto/livro-dto';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private apiUrl = "http://localhost:8080/api/livros";

constructor(private http: HttpClient) { }

  buscarTodos(): Observable<LivroDto[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  salvar(livroDTO: LivroDto): Observable<void>{
      return this.http.post<any>(`${this.apiUrl}`, livroDTO);
    }
  
  atualizar(livroDTO: LivroDto, id: number): Observable<void>{
    return this.http.put<any>(`${this.apiUrl}/${id}`, livroDTO);
  }
  
  excluir(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }  
  
  buscarPorId(id: number): Observable<LivroDto> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }  

}
