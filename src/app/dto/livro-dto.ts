
import { AssuntoDto } from "./assunto-dto";
import { AutorDto } from "./autor-dto";

export class LivroDto {

    codL: number;
    titulo: string;
    editora: string;
    edicao: number;
    anoPublicacao: string;
    valor: any;    
    autores: AutorDto[];
    assuntos: AssuntoDto[];
}
