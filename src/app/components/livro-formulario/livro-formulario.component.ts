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

      titulo: string = "";
    
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
        this.titulo = "Cadastrar Livro";
        
        this.formulario = this.fb.group({
          titulo: ['', [Validators.required, Validators.maxLength(40)]],  
          editora: ['', [Validators.required, Validators.maxLength(40)]],            
          edicao: [''],  
          anoPublicacao: ['',[Validators.required,Validators.pattern('^[0-9]{4}$')]],  
          valor: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]], 
          autores: [[], [Validators.required]],
          assuntos: [[], [Validators.required]]
        });
    
        if (id) {
          this.titulo = "Atualizar Livro";
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
        console.log(this.formulario.get('valor')?.errors);    
        if (this.formulario.invalid) {
          this.formulario.markAllAsTouched(); 
          return;
        }       
        this.livroDto = {            
          ...this.formulario.value, 
          autores: this.autores.filter(a => this.formulario.value.autores.includes(a.codAu)),
          assuntos: this.assuntos.filter(a => this.formulario.value.assuntos.includes(a.codAs))
      };

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
      }

      voltar(){
        this.router.navigate(['/livros']);
      }

    onAnoPublicacaoInput() {
      const anoPublicacaoControl = this.formulario.get('anoPublicacao');
      let value = anoPublicacaoControl.value;
      value = value.replace(/[^0-9]/g, '').slice(0, 4);
      anoPublicacaoControl.setValue(value);
    }

    onValorInput() {
      const valorControl = this.formulario.get('valor');
      let value = valorControl?.value;
  
      if (value) {
        // Remove qualquer coisa que não seja número ou ponto decimal
        value = value.replace(/[^0-9.,]/g, '').replace(/,/g, '.'); // Substitui a vírgula por ponto decimal
  
        // Limita a 2 casas decimais
        let [integer, decimal] = value.split('.');
        if (decimal) {
          decimal = decimal.substring(0, 2); // Limita a 2 casas decimais
        }
        value = decimal ? `${integer}.${decimal}` : integer;
  
        valorControl?.setValue(value);
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
        error: (error) => console.error('Erro ao buscar assuntos:', error)
      });
    }
  

}
