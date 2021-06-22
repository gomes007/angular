import { Telefone } from './telefone';
import { Profissao } from './Profissao';

export class User {
id: Number;
login: String;
nome: String;
cpf: String;
senha: String;
dataNascimento: String;

telefones: Array<Telefone>;

profissao: Profissao = new Profissao();

}

