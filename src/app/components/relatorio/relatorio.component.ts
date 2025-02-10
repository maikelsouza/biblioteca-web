import { RelatorioService } from './../../services/relatorio.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.scss']
})
export class RelatorioComponent implements OnInit {

  constructor(private relatorioService: RelatorioService) { }

  ngOnInit() {
  }


  gerarAutores(): void {
    this.relatorioService.gerarRelatorioAtores().subscribe((data) => {
      const blob = new Blob([data], { type: 'application/pdf' }); 
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'relatorio_autores.pdf'; 
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }

}
