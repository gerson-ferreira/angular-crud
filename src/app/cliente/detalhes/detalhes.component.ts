import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../models/cliente';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
})
export class DetalhesComponent {
  cliente: Cliente = new Cliente();
  sexo: string;

  constructor(private route: ActivatedRoute) {
    this.cliente = this.route.snapshot.data['cliente'];

    switch (this.cliente.sexo) {
      case 'F':
        this.sexo = 'Feminino';
        break;
      case 'M':
        this.sexo = 'Masculino';
        break;
    }
  }
}
