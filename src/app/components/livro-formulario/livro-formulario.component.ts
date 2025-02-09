import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AssuntoDto } from 'src/app/dto/assunto-dto';
import { AutorDto } from 'src/app/dto/autor-dto';
import { LivroDto } from 'src/app/dto/livro-dto';
import { AssuntoService } from 'src/app/services/assunto.service';
import { AutorService } from 'src/app/services/autor.service';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-livro-formulario',
  templateUrl: './livro-formulario.component.html',
  styleUrls: ['./livro-formulario.component.scss']
})
export class LivroFormularioComponent implements OnInit {

      formulario: FormGroup;
    
      livroDto: LivroDto = new LivroDto();

      autores: AutorDto[] = [];

      assuntos: AssuntoDto[] = [];
    
      isSalvar: boolean = true;
    
      constructor(private fb: FormBuilder,
        private livroService: LivroService,
        private router: Router,
        private route: ActivatedRoute,
        private autorService: AutorService,
        private assuntoService: AssuntoService
      ) { }
    
      ngOnInit() {
        this.bucarTodosAutores();
        this.bucarTodosAssuntos();
        const id = this.route.snapshot.paramMap.get('id');
        
        this.formulario = this.fb.group({
          titulo: ['', [Validators.required, Validators.maxLength(40)]],  
          editora: ['', [Validators.required, Validators.maxLength(40)]],            
          edicao: [''],  
          anoPublicacao: [''],  
          valor: ['', [Validators.required]],  
          autores: [[]],
          assuntos: [[]]
        });
    
        if (id) {
          this.isSalvar = false;
          this.livroService.buscarPorId(Number(id)).subscribe(livro => {
            this.formulario.patchValue(livro);             
            const autoresSelecionados = livro.autores.map(a => a.codAu); 
            this.formulario.patchValue({ autores: autoresSelecionados });            
            const assuntosSelecionados = livro.assuntos.map(a => a.codAs); 
            this.formulario.patchValue({ assuntos: assuntosSelecionados });            
          }, error => {
            console.error('Erro ao buscar livro:', error);
          });
        }
      }
    
      salvar(){
        if (this.formulario.valid) {
          this.livroDto.titulo = this.formulario.value.titulo;
          if (this.isSalvar){        
            this.livroService.salvar(this.livroDto).subscribe(
              response => {
                console.log("Livro salvo com sucesso!", response);
                this.router.navigate(['/livros']);
              },
              error => {
                console.error("Erro ao salvar livro:", error);
              }
            );
          }else{        
            this.livroService.atualizar(this.livroDto,Number(this.route.snapshot.paramMap.get('id'))).subscribe(
              response => {
                console.log("Livro atualizado com sucesso!", response);
                this.router.navigate(['/livros']);
              },
              error => {
                console.error("Erro ao atualizar livros:", error);
              }
            );
          }          
        }else{      
            console.log('Formulário inválido');
        }
      }


    bucarTodosAutores(){
      this.autorService.buscarTodos().subscribe({
        next: (data) => {        
          this.autores = data;
        },
        error: (error) => console.error('Erro ao buscar autores:', error)
      });
    }

    bucarTodosAssuntos(){
      this.assuntoService.buscarTodos().subscribe({
        next: (data) => {        
          this.assuntos = data;
        },
        error: (error) => console.error('Erro ao buscar autores:', error)
      });
    }
  

}
