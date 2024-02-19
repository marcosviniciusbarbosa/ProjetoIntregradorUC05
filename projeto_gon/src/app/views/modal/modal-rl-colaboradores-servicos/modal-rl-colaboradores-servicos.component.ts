import { Component, Input } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'angular2-smart-table';
import { IColumnType, Settings } from 'angular2-smart-table';
import { ApiService } from 'src/app/services/ApiService';
import { ModalRlColabServFormComponent } from '../modal-rl-colab-serv-form/modal-rl-colab-serv-form.component';

@Component({
  selector: 'app-modal-rl-colaboradores-servicos',
  templateUrl: './modal-rl-colaboradores-servicos.component.html',
  styleUrls: ['./modal-rl-colaboradores-servicos.component.scss']
})
export class ModalRlColaboradoresServicosComponent {

  @Input() id_colaborador: number | undefined;
  @Input() id: number = 0;
  @Input() metodo: string = 'POST';
  
  private api: string = 'apiRelacaoColaboradorServico.php';

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
        width: '45%',
        sortDirection: 'asc',
      },
      temp_format: {
        title: 'MINUTOS',
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
    // console.log(event);
    if (event.action == 'edit') {
      // OPÇÃO PARA EDITAR
      this.showDialog('PUT');
    }
  }

  status(result: any[]) {
    for (let i = 0; i < result.length; i++) {
      if (result[i].status == 1) {
        result[i].status =
          "<div class='text-center'><a class='d-flex justify-content-center align-items-center text-success'><i class='bi bi-check-circle fs-3'></i></a></div>";
      } else {
        result[i].status =
          "<div class='text-center'><a class='d-flex justify-content-center align-items-center text-danger'><i class='bi bi-x-circle fs-3'></i></a></div>";
      }
    }
  }

  public getDados(id_colaborador: any) {
    this.loading = true;
    this.source = new LocalDataSource();

    var url = this.api;

    if (id_colaborador > 0) {
      url = this.api + '?id_colaborador=' + id_colaborador + '&filtro=0';
    }else{
      url = this.api + '?id_colaborador=' + this.id_colaborador + '&filtro=0';
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
  

  showDialog(metodo: string) {
    this._dialogService
      .open(ModalRlColabServFormComponent, {
        context: {
          id_colaborador: this.id_colaborador,
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
