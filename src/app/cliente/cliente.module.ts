import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovoComponent } from './novo/novo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaComponent } from './lista/lista.component';

import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from 'ngx-spinner';

import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ClienteAppComponent } from './cliente.app.component';
import { ClienteGuard } from './services/cliente.guard';
import { ClienteResolve } from './services/cliente.resolve';
import { ClienteService } from './services/cliente.service';
import { ClienteRoutingModule } from './cliente.route';

@NgModule({
  declarations: [
    ClienteAppComponent,
    NovoComponent,
    ListaComponent,
    EditarComponent,
    ExcluirComponent,
    DetalhesComponent,
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgBrazil,
    TextMaskModule,
    NgxSpinnerModule,
  ],
  providers: [ClienteService, ClienteResolve, ClienteGuard],
})
export class ClienteModule {}
