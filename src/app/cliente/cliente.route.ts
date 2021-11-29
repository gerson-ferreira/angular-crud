import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NovoComponent } from './novo/novo.component';
import { ListaComponent } from './lista/lista.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { ClienteAppComponent } from './cliente.app.component';
import { ClienteResolve } from './services/cliente.resolve';
import { EditarComponent } from './editar/editar.component';

const ClienteRouterConfig: Routes = [
  {
    path: '',
    component: ClienteAppComponent,
    children: [
      { path: 'listar-todos', component: ListaComponent },
      {
        path: 'adicionar-novo',
        component: NovoComponent,
        data: [{ claim: { nome: 'Cliente', valor: 'Adicionar' } }],
      },
      {
        path: 'editar/:id',
        component: EditarComponent,
        data: [{ claim: { nome: 'Cliente', valor: 'Atualizar' } }],
        resolve: {
          cliente: ClienteResolve,
        },
      },
      {
        path: 'detalhes/:id',
        component: DetalhesComponent,
        resolve: {
          cliente: ClienteResolve,
        },
      },
      {
        path: 'excluir/:id',
        component: ExcluirComponent,
        data: [{ claim: { nome: 'Cliente', valor: 'Excluir' } }],
        resolve: {
          cliente: ClienteResolve,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ClienteRouterConfig)],
  exports: [RouterModule],
})
export class ClienteRoutingModule {}
