import { Component, OnInit } from '@angular/core';
import { AutorService } from '../../services/autor.service';
import { AutorDto } from 'src/app/dto/autor-dto';

@Component({
  selector: 'app-autor-lista',  
  templateUrl: './autor-lista.component.html',
  styleUrls: ['./autor-lista.component.css']  
  
})
export class AutorListaComponent implements OnInit{

  autores: AutorDto[] = [];

  constructor(private autorService: AutorService) {}

  ngOnInit(): void {
    this.autorService.buscarTodos().subscribe({
      next: (data) => {        
        this.autores = data;
      },
      error: (error) => console.error('Erro ao buscar autores:', error)
    });
  }
}
