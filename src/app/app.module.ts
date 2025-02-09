import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { AssuntoListaComponent } from './components/assunto-lista/assunto-lista.component';
import { LivroListaComponent } from './components/livro-lista/livro-lista.component';
import { AutorListaComponent } from './components/autor-lista/autor-lista.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AutorFormularioComponent } from './components/autor-formulario/autor-formulario.component';

@NgModule({
  declarations: [
    AppComponent,
    AutorListaComponent,    
    AutorFormularioComponent,
    AssuntoListaComponent,
    LivroListaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
