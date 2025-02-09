import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssuntoDto } from '../dto/Assunto-dto';



@Injectable({
  providedIn: 'root'
})
export class AssuntoService {

  private apiUrl = "http://localhost:8080/api/assuntos";

  constructor(private http: HttpClient) { }
 

  buscarTodos(): Observable<AssuntoDto[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

}
