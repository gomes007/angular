import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { User } from '../model/user';
import { UserReport } from '../model/UserReport';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getStudentList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl);
  }


  getStudentListPage(pagina): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl + 'page/' + pagina);
  }



  getProfissaoList(): Observable<any> {
    return this.http.get<any>(AppConstants.getBaseUrlPath + 'profissao/');
  }


  deletarUsuario(id: Number): Observable<any> {
    return this.http.delete(AppConstants.baseUrl + id, { responseType: 'text' });
  }

  consultarUser(nome: String): Observable<any> {
    return this.http.get(AppConstants.baseUrl + 'usuarioPorNome/' + nome);
  }


  consultarUserPorPage(nome: String, page: Number): Observable<any> {
    return this.http.get(AppConstants.baseUrl + 'usuarioPorNome/' + nome + '/page/' + page);
  }


  getStudent(id: string): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl + id);
  }

  salvarUsuario(user: User): Observable<any> {
    return this.http.post<any>(AppConstants.baseUrl, user);
  }

  updateUsuario(user: User): Observable<any> {
    return this.http.put<any>(AppConstants.baseUrl, user);
  }


  removerTelefone(id: Number): Observable<any> {
    return this.http.delete(AppConstants.baseUrl + 'removerTelefone/' + id, { responseType: 'text' });
  }


  userAutenticado() {
    if (localStorage.getItem('token') !== null && localStorage.getItem('token').toString().trim() !== null) {
      return true;
    } else {
      return false;
    }
  }


  downloadPdfRelatorio() {
    return this.http.get(AppConstants.baseUrl + 'relatorio', { responseType: 'text' }).subscribe(data => {
      document.querySelector('iframe').src = data;
    });
  }


    downloadPdfRelatorioParan(userreport: UserReport) {

    return this.http.post(AppConstants.baseUrl + 'relatorio/', userreport, { responseType: 'text' }).subscribe(data => {
      document.querySelector('iframe').src = data;

    });

  }


}
