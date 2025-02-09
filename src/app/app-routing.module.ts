import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutorListaComponent } from './components/autor-lista/autor-lista.component';
import { AssuntoListaComponent } from './components/assunto-lista/assunto-lista.component';
import { LivroListaComponent } from './components/livro-lista/livro-lista.component';

const routes: Routes = [
  { path: 'autores', component: AutorListaComponent },
  //{ path: 'autores/editar/:id', component: EditarAutorComponent },
  { path: 'livros', component: LivroListaComponent },
  //{ path: 'livros/editar/:id', component: EditarLivroComponent },
  { path: 'assuntos', component: AssuntoListaComponent },
  //{ path: 'assunto/editar/:id', component: EditarAssuntoComponent },
  { path: '', redirectTo: '/autores', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
