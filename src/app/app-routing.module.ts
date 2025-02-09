import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutorListaComponent } from './components/autor-lista/autor-lista.component';
import { AssuntoListaComponent } from './components/assunto-lista/assunto-lista.component';
import { LivroListaComponent } from './components/livro-lista/livro-lista.component';
import { AppComponent } from './app.component';
import { AutorFormularioComponent } from './components/autor-formulario/autor-formulario.component';
import { AssuntoFormularioComponent } from './components/assunto-formulario/assunto-formulario.component';
import { LivroFormularioComponent } from './components/livro-formulario/livro-formulario.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: AppComponent },
  { path: 'autores', component: AutorListaComponent },
  { path: 'autores/novo', component: AutorFormularioComponent },
  { path: 'autores/editar/:id', component: AutorFormularioComponent },
  { path: 'assuntos', component: AssuntoListaComponent },
  { path: 'assuntos/novo', component: AssuntoFormularioComponent },
  { path: 'assuntos/editar/:id', component: AssuntoFormularioComponent },
  { path: 'livros', component: LivroListaComponent },
  { path: 'livros/novo', component: LivroFormularioComponent },
  { path: 'livros/editar/:id', component: LivroFormularioComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
