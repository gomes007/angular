import { Injectable, NgModule } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()

export class HeaderInterceptorService implements HttpInterceptor {


  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (localStorage.getItem('token') !== null) {
      const token = 'Bearer ' + localStorage.getItem('token');

      const tokenRequest = req.clone({
        headers: req.headers.set('Authorization', token)
      });

      return next.handle(tokenRequest).pipe(

        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse && (event.status === 200 || event.status === 201)) {
            console.info('Sucesso na operação');
          }
        })

        , catchError(this.processaError));
    } else {
      return next.handle(req).pipe(catchError(this.processaError));
    }
  }

  processaError(error: HttpErrorResponse) {
    let errorMessage = 'Erro desconhecido';

    console.log(error);
    if (error.error instanceof ErrorEvent) {
      console.error(error.error);
      errorMessage = 'Error: ' + error.error.error;
    } else {
      if (error.status == 403) {
        errorMessage = 'Acesso negado: Faça o login novamente.'
      } else {
        errorMessage = 'Código: ' + error.error.code + '\nMensagem: ' + error.error.error;
      }
    }
    window.alert(errorMessage)
    return throwError(errorMessage);
  }

}

@NgModule({
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderInterceptorService,
    multi: true,
  }]
})

export class HttpInterceptorModule {

}
