import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicosService{

  constructor(
    private _http: HttpClient
  ) { }

  public getServicos() {
    let url = 'http://localhost/api/servicos_api.php';
    return this._http.get(url);
  }
}
