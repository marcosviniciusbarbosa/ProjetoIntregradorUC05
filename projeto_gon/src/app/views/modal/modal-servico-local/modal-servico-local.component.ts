import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';

import { ApiService } from 'src/app/services/ApiService';

import { IColumnType, LocalDataSource, Settings } from 'angular2-smart-table';

import { ModalServicosComponent } from '../../modal/modal-servicos/modal-servicos.component';

type NewType = number;

@Component({
  selector: 'app-modal-servico-local',
  templateUrl: './modal-servico-local.component.html',
  styleUrls: ['./modal-servico-local.component.scss']
})
export class ModalServicoLocalComponent {
  @Input() id_local: number | undefined;

  public source: LocalDataSource = new LocalDataSource();
  public loading: boolean = true;

  public settings: Settings = {
    mode: 'external',
    noDataMessage: 'Nenhum registro foi encontrado.',
    pager: {
      perPage: 5,
      perPageSelect: [5, 10, 20, 40, 80, 160],
      perPageSelectLabel: 'Total: ',
    },
    actions: {
      columnTitle: '',
      position: 'right',
      edit: false,
      delete: false,
      add: false
    },
    columns: {
      nome: {
        title: 'NOME',
        width: '50%',
        sortDirection: 'asc',
      },
      temp_format: {
        title: 'TEMPO MIN',
        classContent: 'text-center',
      },
      val_format: {
        title: 'VALOR',
        width: '90px',
        classContent: 'text-center',
      },
    },
  };

  constructor(
    private _provider: ApiService,
    private _dialogService: NbDialogService,
    private _dialogRef: NbDialogRef<ModalServicoLocalComponent>,
  ) {}
  ngOnInit(): void {
    // CARREGAR DADOS NA TABELA
    this.getDados(this.id_local);
  }

  getDados(id_local: any) {
    this.loading = true;
    this.source = new LocalDataSource();

    let url = 'apiServicos.php' + id_local;

    return this._provider.getAPI(url).subscribe(
      (data) => {
        // CARREGAR DADOS NA TABELA
        if (data['status'] === 'success') {
            this.source.load(data['result']);
        } else {
          this.loading = false;
        }
      },
      (error: any) => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }
  
  // FECHA MODAL COLABORADORES-SERVIÇOS - INICIO
  close() {
    this._dialogRef.close();
  }
  // FECHA MODAL COLABORADORES-SERVIÇOS - FIM
  
}
