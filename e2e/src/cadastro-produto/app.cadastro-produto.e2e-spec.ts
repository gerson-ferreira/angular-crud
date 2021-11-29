import { AppProdutoPage } from './app.cadastro-produto.po';
import { browser, logging } from 'protractor';

describe('Testes do formulario de cadastro', () => {
  let page: AppProdutoPage;

  beforeEach(() => {
    page = new AppProdutoPage();
  });

  it('deve navegar até produtos', () => {
    page.iniciarNavegacao();
    expect(page.obterTituloProdutos()).toEqual('Lista de Produtos');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
