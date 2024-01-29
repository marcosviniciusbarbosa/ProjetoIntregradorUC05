import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { ApiService } from 'src/app/services/ApiService';

@Component({
  selector: 'app-modal-colaboradores',
  templateUrl: './modal-colaboradores.component.html',
  styleUrls: ['./modal-colaboradores.component.scss'],
})
export class ModalColaboradoresComponent {
  @Input() id: number = 0;
  metodo: string = 'POST';

  private api: string = 'apiColaboradoress.php';
  public loading: boolean = false;
  public mask_cpf: string = '000.000.000-00';
  public mask_cnpj: string = '00.000.000/0000-0';
  public formulario: FormGroup = this._formBuilder.group({
    id_cliente: [this.id, [Validators.required]],
    nome: [null, [Validators.required]],
    telefone: [null, [Validators.required]],
    genero: [null, [Validators.required]],
    data_nascimento: [null],
    cpf: [null, [Validators.required, Validators.minLength(11)]],
    cnpj: [null, [Validators.required, Validators.minLength(13)]],
    foto: [null],
    status: ['1', [Validators.required]],
    tipo: ['1', [Validators.required]],
    cep: [null],
    logradouro: [null],
    numero: [null],
    complemento: [null],
    bairro: [null],
    cidade: [null],
    uf: [null],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _dialogRef: NbDialogRef<ModalColaboradoresComponent>,
    private _provider: ApiService
  ) {}

  ngOnInit(): void {
    // CARREGA CADASTRO
    if (this.id > 0) {
      this.getColaboradores('', this.id);
    }
  }

  getCEP(cep: string) {
    if (cep.length === 8) {
      this.loading = true;

      this._provider.pesquisaCEP(cep).subscribe(
        (data: any) => {
          this.formulario.patchValue({
            logradouro: data['logradouro'],
            bairro: data['bairro'],
            cidade: data['localidade'],
            uf: data['uf'],
          });
        },
        (error: any) => {
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    } else {
      this.formulario.patchValue({
        logradouro: null,
        bairro: null,
        cidade: null,
        uf: null,
      });
    }
  }

  getColaboradores(cpf: string, id: number) {
    this.loading = true;

    let url = '';

    if (cpf.length > 0) {
      url = this.api + '?cpf=' + cpf;
    } else if (id > 0) {
      url = this.api + '?id_Colaboradores=' + id;
    }

    return this._provider.getAPI(url).subscribe(
      (data: any) => {
        if (data['status'] == 'fail' || data['result'] == false) {
          // this._provider.showToast('OPS!', 'CPF não é cadastrado!', 'warning');
        } else if (data['where'] == true) {
          if (this.metodo == 'POST') {
            this._provider.showToast('OPS!', 'CPF já cadastrado!', 'warning');
            this.formulario.reset();
          } else if (
            this.metodo == 'PUT' &&
            this.formulario.get(['nome'])?.value &&
            this.formulario.get(['nome'])?.value !== data['result'].nome
          ) {
            this._provider.showToast('OPS!', 'CPF já cadastrado!', 'warning');
            cpf = this.formulario.get(['cpf'])?.value;
            this.formulario.patchValue({
              cpf: '',
            });
          } else {
            this.formulario.patchValue({
              id_Colaboradores: data['result'].id_Colaboradores,
              nome: data['result'].nome,
              ng_dog: data['result'].cpf_cnpj,
              genero: data['result'].genero,
              telefone: data['result'].telefone,
              data_nascimento: data['result'].data_nascimento,
              foto: data['result'].foto,
              cep: data['result'].cep,
              logradouro: data['result'].logradouro,
              numero: data['result'].numero,
              complemento: data['result'].complemento,
              bairro: data['result'].bairro,
              cidade: data['result'].cidade,
              uf: data['result'].uf,
              status: data['result'].status.toString(),
              tipo: data['result'].status.toString(),
              // });
            });
          }
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
    this.loading = true;

    let dados = {
      form: this.formulario.value,
    };
    if (this.metodo == 'POST') {
      this._provider.postAPI(dados, this.api).subscribe(
        (data: any) => {
          if (data['status'] == 'success') {
            this._provider.showToast('OBA!', data['result'], 'success');
          } else {
            this._provider.showToast('OPS!', data['result'], 'danger');
          }
        },
        (error: any) => {
          this.loading = false;
        },
        () => {
          this.loading = false;
          this._dialogRef.close('update');
        }
      );
    } else {
      this._provider.putAPI(dados, this.api).subscribe(
        (data: any) => {
          if (data['status'] == 'success') {
            this._provider.showToast('OBA!', data['result'], 'success');
          } else {
            this._provider.showToast('OPS!', data['result'], 'danger');
          }
        },
        (error: any) => {
          this.loading = false;
        },
        () => {
          this.loading = false;
          this._dialogRef.close('update');
        }
      );
    }
  }
  close() {
    this._dialogRef.close();
  }
}
