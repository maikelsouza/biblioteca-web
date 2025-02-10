import { AssuntoDto } from 'src/app/dto/assunto-dto';

import { Component, OnInit } from '@angular/core';
import { AssuntoService } from 'src/app/services/assunto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assunto-lista',
  templateUrl: './assunto-lista.component.html',
  styleUrls: ['./assunto-lista.component.scss']
})
export class AssuntoListaComponent implements OnInit {


  assuntos: AssuntoDto[] = [];

  constructor(private assuntoService: AssuntoService,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.bucarTodos();
  }

  bucarTodos(){
    this.assuntoService.buscarTodos().subscribe({
      next: (data) => {        
        this.assuntos = data;
      },
      error: (error) => console.error('Erro ao buscar assunto:', error)
    });
  }

  novo(){
    this.router.navigate(['/assuntos/novo']);
  }

  editar(id: number){    
    this.router.navigate(['/assuntos/editar/',id]);
  }

  excluir(id: number){
    this.assuntoService.excluir(id).subscribe(response =>{
      this.bucarTodos();
    })
  }

  confirmarExclusao(id: number) {
    const confirmacao = window.confirm('Tem certeza de que deseja excluir este assunto?');
    if (confirmacao) {
      this.excluir(id);      
    }
  }

}
