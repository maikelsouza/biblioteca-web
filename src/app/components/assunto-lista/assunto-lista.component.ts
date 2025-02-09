
import { Component, OnInit } from '@angular/core';
import { AssuntoService } from 'src/app/services/assunto.service';
import { AssuntoDto } from 'src/app/dto/Assunto-dto';

@Component({
  selector: 'app-assunto-lista',
  templateUrl: './assunto-lista.component.html',
  styleUrls: ['./assunto-lista.component.scss']
})
export class AssuntoListaComponent implements OnInit {


  assuntos: AssuntoDto[] = [];

  constructor(private assuntoService: AssuntoService) { }

    ngOnInit(): void {
      this.assuntoService.buscarTodos().subscribe({
      next: (data) => {        
        this.assuntos = data;
      },
      error: (error) => console.error('Erro ao buscar autores:', error)
    });
  }
}
