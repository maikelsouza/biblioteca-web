import { Component, OnInit } from '@angular/core';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.scss']
})
export class LivroListaComponent implements OnInit {

  livros: any[] = [];

  constructor(private livroService: LivroService) { }

  ngOnInit(): void {
    this.livroService.buscarTodos().subscribe({
    next: (data) => {
      console.log('Autores recebidos:', data); // Verifica o formato da resposta
      this.livros = data;
    },
    error: (error) => console.error('Erro ao buscar autores:', error)
  });

}
}
