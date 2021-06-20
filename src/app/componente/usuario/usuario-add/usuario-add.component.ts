import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Telefone } from 'src/app/model/telefone';


@Component({
  selector: 'app-usuario-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {

  usuario = new User();

  telefone = new Telefone();

  constructor(private routeActive: ActivatedRoute, private userService: UsuarioService) { }

  ngOnInit() {
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
