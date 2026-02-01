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

  const order = 'VLO-P59YVP';

  //Arrange - dado que o usuário está na página de consulta de pedido - implementado no beforeEach


  //Act

  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order);
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

  const containerPedido = page.getByRole('paragraph')
    .filter({ hasText: /^Pedido$/ })
    .locator('..') //vai para o elemento pai

  await expect(containerPedido).toContainText(order, { timeout: 10_000 });
  await expect(page.getByText('APROVADO')).toBeVisible();

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