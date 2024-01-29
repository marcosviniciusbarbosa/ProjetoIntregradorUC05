import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NbAutocompleteModule, NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbListModule, NbSelectModule, NbSpinnerModule, NbTabsetModule, NbToggleModule } from '@nebular/theme';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { Angular2SmartTableModule } from 'angular2-smart-table';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ModalClientesComponent } from './modal-clientes/modal-clientes.component';
import { ModalColaboradoresComponent } from './modal-colaboradores/modal-colaboradores.component';
import { ModalServicosComponent } from './modal-servicos/modal-servicos.component';
import { ModalLocaisComponent } from './modal-locais/modal-locais.component';


@NgModule({
  declarations: [
    ModalClientesComponent,
    ModalColaboradoresComponent,
    ModalServicosComponent,
    ModalLocaisComponent,
  ],
  imports: [
    Angular2SmartTableModule,
    CKEditorModule,
    CommonModule,
    NbAutocompleteModule,
    NbButtonModule,
    NbCardModule,
    NbFormFieldModule,
    NbIconModule,
    NbInputModule,
    NbListModule,
    NbSelectModule,
    NbSpinnerModule,
    NbTabsetModule,
    NbToggleModule,
    NgxMaskDirective, NgxMaskPipe,
    ReactiveFormsModule,
  ],
  exports: [
    ModalClientesComponent,
  ],
  providers: [
    provideNgxMask()
  ]
})
export class ModalModule { }
