import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})

export class UsuarioComponent implements OnInit {

  students: Array<User[]>;
  nome: String;
  p: Number = 1;
  total: Number;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.getStudentList().subscribe(data => {
      this.students = data.content;
      this.total = data.totalElements;
    });
  }

  deleteUsuario(id: Number, index) {

    if (confirm('deseja mesmo remover?')) {

      this.usuarioService.deletarUsuario(id).subscribe(data => {

        this.students.splice(index, 1);

        // this.usuarioService.getStudentList().subscribe(data => {
        // this.students = data;
        // });

      });
    }
  }

  consultarUser() {

    if (this.nome === '') {
      this.usuarioService.getStudentList().subscribe(data => {
        this.students = data.content;
        this.total = data.totalElements;
      });
    } else {
      this.usuarioService.consultarUser(this.nome).subscribe(data => {
        this.students = data.content;
        this.total = data.totalElements;
      });
    }

  }


  carregarPagina(pagina: number) {

    if (this.nome !== '') {
      this.usuarioService.consultarUserPorPage(this.nome, pagina - 1).subscribe(data => {
        this.students = data.content;
        this.total = data.totalElements;
      });
    } else {
      this.usuarioService.getStudentListPage(pagina - 1).subscribe(data => {
        this.students = data.content;
        this.total = data.totalElements;
      });
    }
  }

  imprimeRelatorio() {
    return this.usuarioService.downloadPdfRelatorio();
  }

}
