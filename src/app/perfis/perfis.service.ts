import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PerfisService {

  perfil: string;

  constructor(private http: HttpClient) {
    this.perfil = `${environment.apiUrl}/perfis`;
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.perfil)
      .toPromise();
  }

}
