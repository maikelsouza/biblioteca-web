import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LivroDto } from '../dto/livro-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  
  private apiUrl = `${environment.apiBaseUrl}/livros`;

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
