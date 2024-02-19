import { Component, Inject, Input } from '@angular/core';

import { NbDialogRef, NbDialogService } from '@nebular/theme';

import { ApiService } from 'src/app/services/ApiService';

import { LocalDataSource, Settings } from 'angular2-smart-table';
import { ModalColaboradoresComponent } from '../../modal/modal-colaboradores/modal-colaboradores.component';

@Component({
  selector: 'app-modal-colaborador-local',
  templateUrl: './modal-colaborador-local.component.html',
  styleUrls: ['./modal-colaborador-local.component.scss'],
})
export class ModalColaboradorLocalComponent {

  public source: LocalDataSource = new LocalDataSource();
  public loading: boolean = true;
  public id_local: number = 0;

  public settings: Settings = {
    mode: 'external',
    noDataMessage: 'Nenhum registro foi encontrado.',
    pager: {
      perPage: 5,
      perPageSelect: [5, 10, 20, 40, 80, 160],
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
          title:
            '<div class="text-center"><i class="bi bi-pencil-square"></i></div>',
        },
      ],
    },
    columns: {
      nome: {
        title: 'NOME',
        width: '45%',
        sortDirection: 'asc',
      },
      cpf_cnpj: {
        title: 'CPF/CNPJ',
        classContent: 'text-center',
      },
      telefome: {
        title: 'TELEFONE',
        classContent: 'text-center',
      },
    },
  };

  constructor(
    private _provider: ApiService,
    private _dialogService: NbDialogService,
    private _dialogRef: NbDialogRef<ModalColaboradorLocalComponent>
  ) {
    // CARREGAR DADOS NA TABELA
    this.getDados(this.id_local);

    console.log(this.id_local);
  }

  getDados(id_local: any) {
    this.loading = true;
    this.source = new LocalDataSource();

    let url = 'apiColaboradores.php?id_local=' + id_local;

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

  ngOnInit(): void {}

  onOptions(event: any) {
    if (event.action == 'edit') {
      // OPÇÃO PARA EDITAR
      this.showDialog(event.data.id_colaborador, 'PUT');
    }
  }

  showDialog(id: any, metodo: string) {
    this._dialogService
      .open(ModalColaboradoresComponent, {
        context: {
          id: id,
          metodo: metodo,
        },
        closeOnEsc: true,
        hasBackdrop: true,
        closeOnBackdropClick: true,
        hasScroll: true,
      })
      .onClose.subscribe((update) => update && this.getDados(this.id_local));
  }

  close() {
    this._dialogRef.close();
  }
}
