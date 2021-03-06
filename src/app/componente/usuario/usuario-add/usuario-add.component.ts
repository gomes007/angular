import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Telefone } from 'src/app/model/telefone';
import { NgbDateParserFormatter, NgbDateStruct, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Profissao } from 'src/app/model/Profissao';

@Injectable()
export class FormatDateAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '/';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }

}


@Injectable()
export class FormataData extends NgbDateParserFormatter {

  readonly DELIMITER = '/';


  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? validarDia(date.day) + this.DELIMITER + validarDia(date.month) + this.DELIMITER + date.year : '';
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }


}

function validarDia(valor) {
  if (valor.toString !== '' && parseInt(valor) <= 9) {
    return '0' + valor;
  } else {
    return valor;
  }
}

@Component({
  selector: 'app-usuario-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css'],
  providers: [{ provide: NgbDateParserFormatter, useClass: FormataData }, { provide: NgbDateAdapter, useClass: FormatDateAdapter }]
})
export class UsuarioAddComponent implements OnInit {

  usuario = new User();

  telefone = new Telefone();

  profissoes: Array<Profissao>;

  constructor(private routeActive: ActivatedRoute, private userService: UsuarioService) { }

  ngOnInit() {

    this.userService.getProfissaoList().subscribe(data => {
      this.profissoes = data;
    });

    const id = this.routeActive.snapshot.paramMap.get('id');

    if (id != null) {
      this.userService.getStudent(id).subscribe(data => {
        this.usuario = data;
      });
    }
  }

  salvarUser() {
    if (this.usuario.id !== null || this.usuario.id.toString().trim() !== null) {
      this.userService.updateUsuario(this.usuario).subscribe(data => {
        this.novo();
        console.info('usuario atualizado: ' + data);
      });
    } else {
      this.userService.salvarUsuario(this.usuario).subscribe(data => {
        this.novo();
        console.info('usuario salvo: ' + data);
      });
    }
  }

  novo() {
    this.usuario = new User();
    this.telefone = new Telefone();
  }

  saveUser() {
    this.userService.salvarUsuario(this.usuario).subscribe(data => {
      console.info('usuario salvo: ' + data);
      this.novo();
    });
  }

  deletarTelefone(id, i) {

    if (id == null) {
      this.usuario.telefones.splice(i, 1);
      return;
    }

    if (id !== null && confirm('deseja remover?')) {
      this.userService.removerTelefone(id).subscribe(data => {
        this.usuario.telefones.splice(i, 1);
      });
    }
  }

  addFone() {
    if (this.usuario.telefones === undefined) {
      this.usuario.telefones = new Array<Telefone>();
    }
    this.usuario.telefones.push(this.telefone);
    this.telefone = new Telefone();
  }

  updateUser() {
    this.userService.updateUsuario(this.usuario).subscribe(data => {
      console.info('usuario atualizado: ' + data);
      this.novo();
    });
  }

}
