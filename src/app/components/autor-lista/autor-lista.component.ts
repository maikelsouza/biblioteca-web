import { Component, OnInit } from '@angular/core';
import { AutorService } from '../../services/autor.service';
import { AutorDto } from 'src/app/dto/autor-dto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-autor-lista',  
  templateUrl: './autor-lista.component.html',
  styleUrls: ['./autor-lista.component.css']  
  
})
export class AutorListaComponent implements OnInit{

  autores: AutorDto[] = [];

  constructor(private autorService: AutorService,
              private route: ActivatedRoute,
              private router: Router
  ) {}

  ngOnInit(): void {
    this.bucarTodos();
  }

  bucarTodos(){
    this.autorService.buscarTodos().subscribe({
      next: (data) => {        
        this.autores = data;
      },
      error: (error) => console.error('Erro ao buscar autores:', error)
    });
  }

  novo(){
    this.router.navigate(['/autores/novo']);
  }

  excluir(id: number){
    this.autorService.excluir(id).subscribe(response =>{
      this.bucarTodos();
    })
  }

  confirmarExclusao(id: number) {
    const confirmacao = window.confirm('Tem certeza de que deseja excluir este ator?');
    if (confirmacao) {
      this.excluir(id);      
    }
  }

}
