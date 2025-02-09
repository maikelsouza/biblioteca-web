import { AutorService } from './../../services/autor.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutorDto } from 'src/app/dto/autor-dto';

@Component({
  selector: 'app-autor-formulario',
  templateUrl: './autor-formulario.component.html',
  styleUrls: ['./autor-formulario.component.scss']
})
export class AutorFormularioComponent implements OnInit {

  formulario: FormGroup;

  autorDto: AutorDto = new AutorDto();

  isSalvar: boolean = true;

  constructor(private fb: FormBuilder,
    private autorService: AutorService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    
    this.formulario = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(40)]] 
    });

    if (id) {
      this.isSalvar = false;
      this.autorService.buscarPorId(Number(id)).subscribe(autor => {
        this.formulario.patchValue(autor); 
      }, error => {
        console.error('Erro ao buscar autor:', error);
      });
    }
  }

  salvar(){
    if (this.formulario.valid) {
      this.autorDto.nome = this.formulario.value.nome;
      if (this.isSalvar){        
        this.autorService.salvar(this.autorDto).subscribe(
          response => {
            console.log("Autor salvo com sucesso!", response);
            this.router.navigate(['/autores']);
          },
          error => {
            console.error("Erro ao salvar autor:", error);
          }
        );
      }else{        
        this.autorService.atualizar(this.autorDto,Number(this.route.snapshot.paramMap.get('id'))).subscribe(
          response => {
            console.log("Autor atualizado com sucesso!", response);
            this.router.navigate(['/autores']);
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
