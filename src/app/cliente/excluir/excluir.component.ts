import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/cliente';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent {

  cliente: Cliente = new Cliente();
  errors: any[] = [];
  sexo: string;

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {

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


  excluirEvento() {
    this.clienteService.excluirCliente(this.cliente.id)
      .subscribe(
        cliente => { this.sucessoExclusao(cliente) },
        error => { this.falha(error) }
      );
  }

  sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Cliente excluido com Sucesso!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/clientes/listar-todos']);
      });
    }
  }

  falha(fail) {
    this.errors = fail.error.errors;
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }
}
