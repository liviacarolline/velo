export function generateOrderCode() {

  const prefix = 'VLO';

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';

  const randomLetters = Array.from({ length: 3 }, () =>
    letters.charAt(Math.floor(Math.random() * letters.length))
  ).join('');

  const randomNumbers = Array.from({ length: 3 }, () =>
    numbers.charAt(Math.floor(Math.random() * numbers.length))
  ).join('');

  return `${prefix}-${randomLetters}${randomNumbers}`;
}


import { Page } from '@playwright/test'

export async function searchOrder(page: Page, orderNumber: string) {

  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(orderNumber)
  await page.getByRole('button', { name: 'Buscar Pedido' }).click()

}
