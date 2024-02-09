import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { IColumnType, LocalDataSource, Settings } from 'angular2-smart-table';
import { ApiService } from 'src/app/services/ApiService';
import { ModalServicosComponent } from '../modal-servicos/modal-servicos.component';

@Component({
  selector: 'app-modal-rl-colab-serv-form',
  templateUrl: './modal-rl-colab-serv-form.component.html',
  styleUrls: ['./modal-rl-colab-serv-form.component.scss']
})
export class ModalRlColabServFormComponent {

  constructor(
    private _provider: ApiService,
    private _dialogService: NbDialogService,
    private _dialogRef: NbDialogRef<ModalServicosComponent>,
    private _formBuilder: FormBuilder
  ) {}

  @Input() id_colaborador: number | undefined;
  @Input() id: number = 0;
  @Input() metodo: string = 'POST';

  private api: string = 'apiServicos.php';

  public formulario: FormGroup = this._formBuilder.group({
    servico: [null,[Validators.required]]
    });
  public source: LocalDataSource = new LocalDataSource();
  public loading: boolean = true;
  public comboServicos: any [] = []

  selectedItem: any;

  ngOnInit(): void {
    // CARREGAR DADOS NA TABELA
    this.getServicos(this.id_colaborador);
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

  onSubmit() {
    throw new Error('Method not implemented.');
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

  getServicos(id_colaborador: any) {
    this.loading = true;

    let url = this.api + '?id_colaborador=' + id_colaborador;

    return this._provider.getAPI(url).subscribe(
      (data: any) => {
        if (data['status'] == 'success') {
          data['result'].forEach((element: any) => {
            this.comboServicos.push(element)
          });
        }
      },
      (erro: any) => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  close() {
    this._dialogRef.close();
  }

}
