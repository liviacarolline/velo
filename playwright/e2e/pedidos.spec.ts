import { test, expect } from '@playwright/test';

import { generateOrderCode } from '../support/helpers';

///AAA - Arrange, Act, Assert

///PAV - Preparar, Agir, Validar

test.describe('Consultar Pedido', () => {


  // test.beforeAll(async ({ page }) => {
  //   console.log(
  //     'beforeAll: roda uma vez antes de todos os testes');
  // });

  test.beforeEach(async ({ page }) => {

    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');

    await page.getByRole('link', { name: 'Consultar Pedido' }).click();
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido');


  });

  // test.afterEach(async ({ page }) => {
  //   console.log(
  //     'afterEach: roda depois de cada teste');
  // });

  // test.afterAll(async ({ page }) => {
  //   console.log(
  //     'afterAll: roda uma vez depois de todos os testes');
  // });



  test('deve consultar pedido aprovado', async ({ page }) => {

    //Test Data

    //const order = 'VLO-P59YVP';

    const order = {
      number: 'VLO-P59YVP',
      status: 'APROVADO',
      color: 'Midnight Black',
      wheelType: 'sport Wheels',
      customer: {
        name: 'Lívia Teste',
        email: 'teste@teste.com',
      },
      payment: 'À Vista'
    }

    //Arrange - dado que o usuário está na página de consulta de pedido - implementado no beforeEach


    //Act

    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.number);
    await page.getByRole('button', { name: 'Buscar Pedido' }).click();

    //Assert

    // abordagem 1 -  em caso de ter o TestId

    // await expect(page.getByTestId('order-result-id')).toBeVisible({ timeout: 10_000 });
    // await expect(page.getByTestId('order-result-id')).toContainText(order);
    // await expect(page.getByTestId('order-result-status')).toBeVisible();
    // await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');

    //abordagem 2

    // const orderCode = page.locator('//p[text()="Pedido"]/..//p[text()="VLO-P59YVP"]');
    // await expect(orderCode).toBeVisible({ timeout: 10_000 });

    //abordagem 3

    // const containerPedido = page.getByRole('paragraph')
    //   .filter({ hasText: /^Pedido$/ })
    //   .locator('..') //vai para o elemento pai

    // await expect(containerPedido).toContainText(order, { timeout: 10_000 });
    // await expect(page.getByText('APROVADO')).toBeVisible();

    //abordagem 4

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


    const statusBadge = page.getByRole('status').filter({ hasText: order.status });

    await expect(statusBadge).toHaveClass(/bg-green-100/);
    await expect(statusBadge).toHaveClass(/text-green-700/);

    const statusIcon = statusBadge.locator('svg');

    await expect(statusIcon).toHaveClass(/lucide-circle-check-big/);

  });

  test('deve consultar pedido reprovado', async ({ page }) => {

    //Test Data

    const order = {
      number: 'VLO-K87II2',
      status: 'REPROVADO',
      color: 'Midnight Black',
      wheelType: 'sport Wheels',
      customer: {
        name: 'Ana Maria',
        email: 'anamaria@teste.com',
      },
      payment: 'À Vista'
    }

    //Arrange - dado que o usuário está na página de consulta de pedido - implementado no beforeEach


    //Act

    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.number);
    await page.getByRole('button', { name: 'Buscar Pedido' }).click();

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


    const statusBadge = page.getByRole('status').filter({ hasText: order.status });

    await expect(statusBadge).toHaveClass(/bg-red-100/);
    await expect(statusBadge).toHaveClass(/text-red-700/);

    const statusIcon = statusBadge.locator('svg');

    await expect(statusIcon).toHaveClass(/lucide-circle-x/);

  });

  test('deve consultar pedido em análise', async ({ page }) => {

    //Test Data

    const order = {
      number: 'VLO-XFKFYZ',
      status: 'EM_ANALISE',
      color: 'Glacier Blue',
      wheelType: 'aero Wheels',
      customer: {
        name: 'João da Silva',
        email: 'joao@teste.com',
      },
      payment: 'À Vista'
    }

    //Arrange - dado que o usuário está na página de consulta de pedido - implementado no beforeEach


    //Act

    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.number);
    await page.getByRole('button', { name: 'Buscar Pedido' }).click();

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

    const statusBadge = page.getByRole('status').filter({ hasText: order.status });

    await expect(statusBadge).toHaveClass(/bg-amber-100/);
    await expect(statusBadge).toHaveClass(/text-amber-700/);

    const statusIcon = statusBadge.locator('svg');

    await expect(statusIcon).toHaveClass(/lucide-clock/);


  });



  test('deve exibir mensagem quando o pedido não for encontrado', async ({ page }) => {

    const order = generateOrderCode();

    //Arrange - dado que o usuário está na página de consulta de pedido - implementado no beforeEach


    //Act

    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order);
    await page.getByRole('button', { name: 'Buscar Pedido' }).click();

    //Assert

    // abordagem 1 - gerado pelo codegen

    // await expect(page.locator('#root')).toContainText('Pedido não encontrado');
    // await expect(page.locator('#root')).toContainText('Verifique o número do pedido e tente novamente');

    // abordagem 2 - usando locators

    // const title  = page.getByRole('heading', { name: 'Pedido não encontrado', level: 3 });
    // await expect(title).toBeVisible({ timeout: 10_000 });

    // const message = page.getByRole('paragraph').filter({ hasText: /^Verifique o número do pedido e tente novamente$/ });
    //ou
    // const message = page.locator('p', { hasText: 'Verifique o número do pedido e tente novamente' });

    // await expect(message).toBeVisible();

    // abordagem 3 - usando aria snapshot

    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - img
      - heading "Pedido não encontrado" [level=3]
      - paragraph: Verifique o número do pedido e tente novamente
      `);

  });

});