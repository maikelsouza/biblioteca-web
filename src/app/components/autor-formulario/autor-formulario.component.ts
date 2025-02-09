import { AutorService } from './../../services/autor.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutorDto } from 'src/app/dto/autor-dto';

@Component({
  selector: 'app-autor-formulario',
  templateUrl: './autor-formulario.component.html',
  styleUrls: ['./autor-formulario.component.scss']
})
export class AutorFormularioComponent implements OnInit {

  formulario: FormGroup;

  autorDto: AutorDto = new AutorDto();

  constructor(private fb: FormBuilder,
    private atorService: AutorService,
    private router: Router
  ) { }

  ngOnInit() {
    this.formulario = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(40)]]  // Criando um controle de texto
    });
  }

  salvar(){
    if (this.formulario.valid) {
      this.autorDto.nome = this.formulario.value.nome;
      this.atorService.salvar(this.autorDto).subscribe(
        response => {
          console.log("Autor salvo com sucesso!", response);
          this.router.navigate(['/autores']);
        },
        error => {
          console.error("Erro ao salvar autor:", error);
        }
      );
    }else{      
        console.log('Formulário inválido');
    }
  }

}
