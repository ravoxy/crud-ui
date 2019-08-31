import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

import * as moment from 'moment';

import {environment} from '../../environments/environment';
import {Usuario} from '../core/model';

@Injectable()
export class UsuarioService {

  usuarioUrl: string;

  constructor(private http: HttpClient) {
    this.usuarioUrl = `${environment.apiUrl}/usuarios`;
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.usuarioUrl)
      .toPromise();
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.usuarioUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(usuario: Usuario): Promise<Usuario> {
    const headers = new HttpHeaders()
        headers.append('Content-Type', 'application/json');

    return this.http.post<Usuario>(this.usuarioUrl, usuario, {headers})
      .toPromise();
  }

  atualizar(usuario: Usuario): Promise<Usuario> {
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json');

    return this.http.put<Usuario>(`${this.usuarioUrl}/${usuario.id}`, usuario, {headers})
      .toPromise()
      .then(response => {
        const usuarioAlterado = response;

        this.converterStringsParaDatas([usuarioAlterado]);

        return usuarioAlterado;
      });
  }

  buscarPorCodigo(id: number): Promise<Usuario> {
    return this.http.get<Usuario>(`${this.usuarioUrl}/${id}`)
      .toPromise()
      .then(response => {
        const usuario = response;

        this.converterStringsParaDatas([usuario]);

        return usuario;
      });
  }

  private converterStringsParaDatas(usuarios: Usuario[]) {
    for (const usuario of usuarios) {
      usuario.dataCriacao = moment(usuario.dataCriacao,
        'YYYY-MM-DD HH:mm:ss').toDate();

        if (usuario.dataCriacao) {
          usuario.dataCriacao = moment(usuario.dataCriacao,
            'YYYY-MM-DD HH:mm:ss').toDate();
          }
          console.log(usuario.dataCriacao)
        }
  }

}
