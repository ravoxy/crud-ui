import {Injectable} from '@angular/core';

import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AparelhosService {

  aparelho: string;

  constructor(private http: HttpClient) {
    this.aparelho = `${environment.apiUrl}/aparelhos`;
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.aparelho)
      .toPromise();
  }

}
