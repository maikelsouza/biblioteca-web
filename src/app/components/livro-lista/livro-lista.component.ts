import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LivroDto } from 'src/app/dto/livro-dto';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.scss']
})
export class LivroListaComponent implements OnInit {

  livros: LivroDto[] = [];

  constructor(private livroService: LivroService,
            private router: Router
  ) { }

  ngOnInit(): void {
    this.bucarTodos();
  }

  novo(){
    this.router.navigate(['/livros/novo']);
  }

  bucarTodos(){
    this.livroService.buscarTodos().subscribe({
      next: (data) => {        
        this.livros = data;
      },
      error: (error) => console.error('Erro ao buscar livros:', error)
    });
  }

  editar(id: number){    
    this.router.navigate(['/livros/editar/',id]);
  }

  excluir(id: number){
    this.livroService.excluir(id).subscribe(response =>{
      this.bucarTodos();
    })
  }

  confirmarExclusao(id: number) {
    const confirmacao = window.confirm('Tem certeza de que deseja excluir este livro?');
    if (confirmacao) {
      this.excluir(id);      
    }
  }


}
