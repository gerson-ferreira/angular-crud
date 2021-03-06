import { Component, OnInit } from '@angular/core';
import { Cliente } from '../models/cliente';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
})
export class ListaComponent implements OnInit {
  public clientes: Cliente[];
  errorMessage: string;

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.clienteService.obterTodos().subscribe(
      (clientes) => (this.clientes = clientes['data']),
      (error) => this.errorMessage
    );
  }
}
