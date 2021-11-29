import { browser, by, element } from 'protractor';
import { AppBasePage } from '../app.base.po';
import * as path from 'path';

export class AppProdutoPage extends AppBasePage {
  constructor() {
    super();
  }

  navegarParaProdutos() {
    this.navegarPorLink('Produtos');
  }

  navegarParaNovoProduto() {
    this.navegarPorLink('Novo Produto');
  }

  iniciarNavegacao() {
    this.navegarParaHome();
    this.navegarParaProdutos();
  }

  obterTituloProdutos() {
    return this.obterElementoXpath(
      '/html/body/app-root/produto-app-root/app-lista/div/h1'
    ).getText();
  }
}
