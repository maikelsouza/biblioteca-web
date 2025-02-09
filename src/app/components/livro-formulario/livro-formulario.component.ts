import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LivroDto } from 'src/app/dto/livro-dto';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-livro-formulario',
  templateUrl: './livro-formulario.component.html',
  styleUrls: ['./livro-formulario.component.scss']
})
export class LivroFormularioComponent implements OnInit {

      formulario: FormGroup;
    
      livroDto: LivroDto = new LivroDto();
    
      isSalvar: boolean = true;
    
      constructor(private fb: FormBuilder,
        private livroService: LivroService,
        private router: Router,
        private route: ActivatedRoute,
      ) { }
    
      ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        
        this.formulario = this.fb.group({
          titulo: ['', [Validators.required, Validators.maxLength(40)]],  
          editora: ['', [Validators.required, Validators.maxLength(40)]],            
          edicao: [''],  
          anoPublicacao: [''],  
          valor: ['', [Validators.required]],  
        });
    
        if (id) {
          this.isSalvar = false;
          this.livroService.buscarPorId(Number(id)).subscribe(autor => {
            this.formulario.patchValue(autor); 
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
  

}
