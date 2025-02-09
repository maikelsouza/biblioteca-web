import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AssuntoDto } from 'src/app/dto/assunto-dto';
import { AssuntoService } from 'src/app/services/assunto.service';

@Component({
  selector: 'app-assunto-formulario',
  templateUrl: './assunto-formulario.component.html',
  styleUrls: ['./assunto-formulario.component.scss']
})
export class AssuntoFormularioComponent implements OnInit {

    formulario: FormGroup;
  
    assuntoDto: AssuntoDto = new AssuntoDto();
  
    isSalvar: boolean = true;
  
    constructor(private fb: FormBuilder,
      private assuntoService: AssuntoService,
      private router: Router,
      private route: ActivatedRoute,
    ) { }
  
    ngOnInit() {
      const id = this.route.snapshot.paramMap.get('id');
      
      this.formulario = this.fb.group({
        descricao: ['', [Validators.required, Validators.maxLength(20)]]  
      });
  
      if (id) {
        this.isSalvar = false;
        this.assuntoService.buscarPorId(Number(id)).subscribe(autor => {
          this.formulario.patchValue(autor); 
        }, error => {
          console.error('Erro ao buscar assunto:', error);
        });
      }
    }
  
    salvar(){
      if (this.formulario.valid) {
        this.assuntoDto.descricao = this.formulario.value.descricao;
        if (this.isSalvar){        
          this.assuntoService.salvar(this.assuntoDto).subscribe(
            response => {
              console.log("Autor salvo com sucesso!", response);
              this.router.navigate(['/assuntos']);
            },
            error => {
              console.error("Erro ao salvar autor:", error);
            }
          );
        }else{        
          this.assuntoService.atualizar(this.assuntoDto,Number(this.route.snapshot.paramMap.get('id'))).subscribe(
            response => {
              console.log("Autor atualizado com sucesso!", response);
              this.router.navigate(['/assuntos']);
            },
            error => {
              console.error("Erro ao atualizar autor:", error);
            }
          );
        }
        
      }else{      
          console.log('Formulário inválido');
      }
    }
  

}
