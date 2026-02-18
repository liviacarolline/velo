import { test, expect } from '@playwright/test';
import { generateOrderCode } from '../support/helpers';
import { OrderLookupPage } from '../support/pages/OrderLookupPage';

///AAA - Arrange, Act, Assert

///PAV - Preparar, Agir, Validar

test.describe('Consultar Pedido', () => {

  let orderLookupPage: OrderLookupPage;

  test.beforeEach(async ({ page }) => {

    orderLookupPage = new OrderLookupPage(page);

    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');

    await page.getByRole('link', { name: 'Consultar Pedido' }).click();
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

  });

  test('deve consultar pedido aprovado', async ({ page }) => {

    //Test Data

    const order = {
      number: 'VLO-P59YVP',
      status: 'APROVADO' as const,
      color: 'Midnight Black',
      wheelType: 'sport Wheels',
      customer: {
        name: 'Lívia Teste',
        email: 'teste@teste.com',
      },
      payment: 'À Vista',
    };

    //Arrange - dado que o usuário está na página de consulta de pedido - implementado no beforeEach

    //Act

    await orderLookupPage.searchOrder(order.number);

    //Assert

    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheelType}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);

    // Valida cor de fundo, cor do texto e ícone do badge — lógica encapsulada no Page Object

    await orderLookupPage.validateStatusBadge(order.status);

  });

  test('deve consultar pedido reprovado', async ({ page }) => {

    //Test Data

    const order = {
      number: 'VLO-K87II2',
      status: 'REPROVADO' as const,
      color: 'Midnight Black',
      wheelType: 'sport Wheels',
      customer: {
        name: 'Ana Maria',
        email: 'anamaria@teste.com',
      },
      payment: 'À Vista',
    };

    //Arrange - dado que o usuário está na página de consulta de pedido - implementado no beforeEach

    //Act

    await orderLookupPage.searchOrder(order.number);

    //Assert

    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheelType}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: À Vista
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);

    // Valida cor de fundo, cor do texto e ícone do badge — lógica encapsulada no Page Object

    await orderLookupPage.validateStatusBadge(order.status);

  });

  test('deve consultar pedido em análise', async ({ page }) => {

    //Test Data

    const order = {
      number: 'VLO-XFKFYZ',
      status: 'EM_ANALISE' as const,
      color: 'Glacier Blue',
      wheelType: 'aero Wheels',
      customer: {
        name: 'João da Silva',
        email: 'joao@teste.com',
      },
      payment: 'À Vista',
    };

    //Arrange - dado que o usuário está na página de consulta de pedido - implementado no beforeEach

    //Act

    await orderLookupPage.searchOrder(order.number);

    //Assert

    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheelType}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: À Vista
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);

    // Valida cor de fundo, cor do texto e ícone do badge — lógica encapsulada no Page Object

    await orderLookupPage.validateStatusBadge(order.status);

  });

  test('deve exibir mensagem quando o pedido não for encontrado', async ({ page }) => {

    const order = generateOrderCode();

    //Arrange - dado que o usuário está na página de consulta de pedido - implementado no beforeEach

    //Act

    await orderLookupPage.searchOrder(order);

    //Assert

    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - img
      - heading "Pedido não encontrado" [level=3]
      - paragraph: Verifique o número do pedido e tente novamente
      `);

  });

});