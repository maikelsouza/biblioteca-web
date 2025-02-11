import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssuntoDto } from '../dto/assunto-dto';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AssuntoService {

  private apiUrl = `${environment.apiBaseUrl}/assuntos`;

  constructor(private http: HttpClient) { }
 

  buscarTodos(): Observable<AssuntoDto[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  
  salvar(assuntoDTO: AssuntoDto): Observable<void>{
    return this.http.post<any>(`${this.apiUrl}`, assuntoDTO);
  }

  atualizar(assuntoDTO: AssuntoDto, id: number): Observable<void>{
    return this.http.put<any>(`${this.apiUrl}/${id}`, assuntoDTO);
  }

  excluir(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }  

  buscarPorId(id: number): Observable<AssuntoDto> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }  

}
