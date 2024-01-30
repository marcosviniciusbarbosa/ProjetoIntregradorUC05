import { Component, Input, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';


import { ApiService } from 'src/app/services/ApiService';

import { IColumnType, LocalDataSource, Settings } from 'angular2-smart-table';
import { ModalColaboradoresComponent } from '../../modal/modal-colaboradores/modal-colaboradores.component';

type NewType = number;

@Component({
  selector: 'app-colaboreadores',
  templateUrl: './colaboreadores.component.html',
  styleUrls: ['./colaboreadores.component.scss']
})
export class ColaboreadoresComponent {

  public source: LocalDataSource = new LocalDataSource();
  public loading: boolean = true;

  public settings: Settings = {
    mode: 'external',
    noDataMessage: 'Nenhum registro foi encontrado.',
    pager: {
      perPage: 5,
      perPageSelect: [5, 10, 20, 40,80,160],
      perPageSelectLabel: 'Total: ',
    },
    add: {
      addButtonContent: '<i class="bi bi-plus-square fs-5"></i>',
    },
    actions: {
      columnTitle: '',
      position: 'right',
      edit: false,
      delete: false,
      custom: [
        {
          name: 'edit',
          title: '<div class="text-center"><i class="bi bi-pencil-square"></i></div>',
        },
      ],
    },
    columns: {
      nome: {
        title: 'NOME',
        width: '55%',
        sortDirection: 'asc',
      },
      cpf_cnpj: {
        title: 'CPF/CNPJ',
        classContent: 'text-center',
      },
      telefone: {
        title: 'TELEFONE',
        width: '90px',
        classContent: 'text-center',
      },
      status: {
        title: 'STATUS',
        classContent: 'text-center',
        sortDirection: 'desc',
        type: IColumnType.Html,
      },
    },
  };

  constructor(
    private _provider: ApiService,
    private _dialogService: NbDialogService
  ) {
    // CARREGAR DADOS NA TABELA
    this.getDados();
  }

  getDados() {
    this.loading = true;
    this.source = new LocalDataSource();

    let url = 'apiColaboradores.php';

    return this._provider.getAPI(url).subscribe(data => {
        // CARREGAR DADOS NA TABELA
        if (data['status'] === 'success') {
          this.status(data['result']);
          this.source.load(data['result']);
        } else {
          this.loading = false;
        }
      }, (error: any) => {
        this.loading = false;
      }, () => {
        this.loading = false;
      }
      );
  }

  status(result: any[]) {
    for (let i = 0; i < result.length; i++) {
      if(result[i].status == 1){
        result[i].status = "<div class='alert mb-0 alert-success text-center p-2' role='alert'>Ativo</div>"
      }else{
        result[i].status = "<div class='alert mb-0 alert-danger text-center p-2' role='alert'>Inativo</div>"
      };
    }
  }

  ngOnInit(): void {

  }


  onOptions(event: any) {

    if (event.action == 'edit') {
      // OPÇÃO PARA EDITAR
      this.showDialog(event.data.id_colaborador,'PUT');
    }

  }

  showDialog(id: NewType, metodo: string) {
    this._dialogService.open(ModalColaboradoresComponent, {
      context: {
        id: id,
        metodo: metodo,
      },
      closeOnEsc: true,
      hasBackdrop: true,
      closeOnBackdropClick: false,
      hasScroll: true
    })
      .onClose.subscribe(update => update && this.getDados()
      );
  }

}
