import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-solicita-senha',
  templateUrl: './solicita-senha.component.html',
  styleUrls: ['./solicita-senha.component.scss'],
})
export class SolicitaSenhaComponent {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    // Implementação específica da inicialização da página de login
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
