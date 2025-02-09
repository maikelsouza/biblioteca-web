import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutorDto } from 'src/app/dto/autor-dto';
import { AutorService } from '../../services/autor.service';

@Component({
  selector: 'app-autor-lista',  
  templateUrl: './autor-lista.component.html',
  styleUrls: ['./autor-lista.component.css']  
  
})
export class AutorListaComponent implements OnInit{

  autores: AutorDto[] = [];

  constructor(private autorService: AutorService,              
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

  editar(id: number){    
    this.router.navigate(['/autores/editar/',id]);
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
