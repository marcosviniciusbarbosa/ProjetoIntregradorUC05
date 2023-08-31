import { Component } from '@angular/core';
import { ServicosService } from '../servicos.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './cadastre-se.component.html',
  styleUrls: ['./cadastre-se.component.scss']
})
export class CadastreSeComponent {

  public nome: string = ""
  public cpf: string = ""
  public senha: string = ""
  public senha2: string = ""
  public data_nascimento: string = ""
  public email: string = ""
  public cep: string = ""
  public logradouro: string = ""
  public numero: string = ""
  public complemento: string = ""
  public bairro: string = ""
  public cidade: string = ""
  public estado: string = ""

  constructor(
    private _servicos: ServicosService
  ) {

  }

  buscaCEP(cep: string) {
    this._servicos.viaCEP(cep).subscribe((data:any) => {
      console.log(data);
    })
  }

  enviaFormulario() {
    if(this.nome == "")
      alert("Favor preencher o campo NOME")
      return
  }
}
