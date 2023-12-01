import { Component } from '@angular/core';
import { ServicosService } from '../servicos.service';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.scss'],

})
export class ServicosComponent {

  public lista_servicos: any[] = []

  constructor(
    private _servicos: ServicosService
  ) {}

  ngOnInit(): void {
    this._servicos.getServicos().subscribe((data: any) => {
      if(data['status'] == 'success') {
        data['servicos'].forEach((element: any) => {
          this.lista_servicos.push(element)
        });
      }
    })
  }

}
