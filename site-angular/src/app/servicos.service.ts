import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicosService {

  constructor(
    private _http: HttpClient
  ) { }

  viaCEP(cep:string) {

    let url = 'https://viacep.com.br/ws/' + cep + '/json/'

    return this._http.get(url)

  }
}
