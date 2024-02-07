import { Component, Input } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'angular2-smart-table';
import { IColumnType, Settings } from 'angular2-smart-table';
import { ApiService } from 'src/app/services/ApiService';

@Component({
  selector: 'app-modal-rl-colaboradores-servicos',
  templateUrl: './modal-rl-colaboradores-servicos.component.html',
  styleUrls: ['./modal-rl-colaboradores-servicos.component.scss']
})
export class ModalRlColaboradoresServicosComponent {

  @Input() id_colaborador: number | undefined;
  @Input() id: number = 0;
  @Input() metodo: string = 'POST';

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
    private _dialogService: NbDialogService,
    private _dialogRef: NbDialogRef<ModalRlColaboradoresServicosComponent>,
  ) {}

  ngOnInit(): void {
    // CARREGAR DADOS NA TABELA
    this.getDados(this.id_colaborador);
  }

  onOptions(event: any) {
    if (event.action == 'edit') {
      // OPÇÃO PARA EDITAR
      this.showDialog(event.data.id_servico, 'PUT');
    }
  }

  status(result: any[]) {
    for (let i = 0; i < result.length; i++) {
      if (result[i].status == 1) {
        result[i].status =
          "<div class='alert mb-0 alert-success text-center p-2' role='alert'>Ativo</div>";
      } else {
        result[i].status =
          "<div class='alert mb-0 alert-danger text-center p-2' role='alert'>Inativo</div>";
      }
    }
  }

  getDados(id: any) {
    console.log(id);
    this.loading = true;
    this.source = new LocalDataSource();

    var url = 'apiServicos.php';

    if (id > 0) {
      url = 'apiRelacaoColaboradorServico.php?id_colaborador=' + id;
    }

    return this._provider.getAPI(url).subscribe(
      (data) => {
        // CARREGAR DADOS NA TABELA
        if (data['status'] === 'success') {
          this.status(data['result']);
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

  showDialog(id: number, metodo: string) {
    this._dialogService
      .open(ModalRlColaboradoresServicosComponent, {
        context: {
          id: id,
          metodo: metodo,
        },
        closeOnEsc: true,
        hasBackdrop: true,
        closeOnBackdropClick: true,
        hasScroll: true,
      })
      .onClose.subscribe((update) => update && this.getDados(0));
  }

  // FECHA MODAL COLABORADORES-SERVIÇOS - INICIO
  close() {
    this._dialogRef.close();
  }
  // FECHA MODAL COLABORADORES-SERVIÇOS - FIM

}
