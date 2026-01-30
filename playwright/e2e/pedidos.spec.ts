import { test, expect } from '@playwright/test';

///AAA - Arrange, Act, Assert

test('deve consultar pedido aprovado', async ({ page }) => {

  //Test Data

  const order = 'VLO-P59YVP';

  //Arrange

  await page.goto('http://localhost:5173/');
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

  //Act

  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order);
  //await page.getByPlaceholder('Ex: VLO-ABC123').fill(order);
  //await page.getByLabel('Número do Pedido').fill(order);
  await page.getByRole('button', { name: 'Buscar Pedido' }).click();
  //await page.getByTestId('search-order-button').click();

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

  await expect(containerPedido).toContainText(order,{ timeout: 10_000 });


  await expect(page.getByText('APROVADO')).toBeVisible();

});