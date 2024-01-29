
import { Component, Input, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';


import { ApiService } from 'src/app/services/ApiService';

import { IColumnType, LocalDataSource, Settings } from 'angular2-smart-table';

import { ModalServicosComponent } from '../../modal/modal-servicos/modal-servicos.component';

type NewType = number;

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.scss']
})
export class ServicosComponent {

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
      addButtonContent: '<i class="bi bi-plus"></i>',
    },
    actions: {
      columnTitle: '',
      position: 'right',
      edit: false,
      delete: false,
      custom: [
        {
          name: 'edit',
          title: '<i class="bi bi-pencil mb-2"></i>',
        },
      ],
    },
    columns: {
      nome: {
        title: 'NOME',
        sortDirection: 'asc',
      },
      cpf: {
        title: 'CPF',
        classContent: 'text-center',
      },
      telefone: {
        title: 'TELEFONE',
        classContent: 'text-center',
      },
      status: {
        title: 'STATUS',
        width: '50px',
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
    
    let url = 'lista_clientes.php';

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
      this.showDialog(event.data.id_cliente,'PUT');
    }

  }

  showDialog(id: NewType, metodo: string) {
    this._dialogService.open(ModalServicosComponent, {
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