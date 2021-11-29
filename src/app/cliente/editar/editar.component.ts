import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControlName,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { utilsBr } from 'js-brasil';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

import { FormBaseComponent } from 'src/app/base-components/form-base.component';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/cliente';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
})
export class EditarComponent extends FormBaseComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];

  errors: any[] = [];
  clienteForm: FormGroup;

  cliente: Cliente = new Cliente();

  textoDocumento: string = '';

  MASKS = utilsBr.MASKS;
  tipoCliente: number;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) {
    super();

    this.validationMessages = {
      nome: {
        required: 'Informe o Nome',
      },
      cpf: {
        required: 'Informe o CPF',
      },
      email: {
        required: 'Informe o E-mail',
      },
      sexo: {
        required: 'Informe o Sexo',
      },
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);

    this.cliente = this.route.snapshot.data['cliente'];
    // this.tipoCliente = this.cliente.tipoCliente;
  }

  ngOnInit() {

    this.clienteForm = this.fb.group({
      id: '',
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      email: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
    });


    this.preencherForm();


  }

  preencherForm() {
    this.clienteForm.patchValue({
      id: this.cliente.id,
      nome: this.cliente.nome,
      cpf: this.cliente.cpf,
      sexo: this.cliente.sexo,
      email: this.cliente.email
    });

  }

  ngAfterViewInit() {
    super.configurarValidacaoFormularioBase(
      this.formInputElements,
      this.clienteForm
    );
  }

  editarCliente() {
    if (this.clienteForm.dirty && this.clienteForm.valid) {
      this.cliente = Object.assign({}, this.cliente, this.clienteForm.value);

      this.clienteService.atualizarCliente(this.cliente).subscribe(
        (sucesso) => {
          this.processarSucesso(sucesso);
        },
        (falha) => {
          this.processarFalha(falha);
        }
      );
    }
  }

  processarSucesso(response: any) {
    this.errors = [];

    let toast = this.toastr.success(
      'Cliente atualizado com sucesso!',
      'Sucesso!'
    );
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/clientes/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  abrirModal(content) {
    this.modalService.open(content);
  }
}
