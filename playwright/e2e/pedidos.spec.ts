import { test, expect } from '@playwright/test';
import { generateOrderCode } from '../support/helpers';
import { Navbar } from '../support/components/Navbar';
import { LandingPage } from '../support/pages/LandingPage';
import { OrderLookupPage, OrderDetails} from '../support/pages/OrderLookupPage';

///AAA - Arrange, Act, Assert

///PAV - Preparar, Agir, Validar

test.describe('Consultar Pedido', () => {

  let orderLookupPage: OrderLookupPage;

  test.beforeEach(async ({ page }) => {

    await new LandingPage(page).goto();
    await new Navbar(page).orderLookupLink();
    orderLookupPage = new OrderLookupPage(page);
    await new OrderLookupPage(page).validatePageLoaded();

  });

  test('deve consultar pedido aprovado', async ({ page }) => {

    //Test Data

    const order : OrderDetails = {
      number: 'VLO-P59YVP',
      status: 'APROVADO',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
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

    await orderLookupPage.validateOrderDetails(order);

    // Valida cor de fundo, cor do texto e ícone do badge — lógica encapsulada no Page Object

    await orderLookupPage.validateStatusBadge(order.status);

  });

  test('deve consultar pedido reprovado', async ({ page }) => {

    //Test Data

    const order: OrderDetails = {
      number: 'VLO-K87II2',
      status: 'REPROVADO',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
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

    await orderLookupPage.validateOrderDetails(order);

    // Valida cor de fundo, cor do texto e ícone do badge — lógica encapsulada no Page Object

    await orderLookupPage.validateStatusBadge(order.status);

  });

  test('deve consultar pedido em análise', async ({ page }) => {

    //Test Data

    const order: OrderDetails = {
      number: 'VLO-XFKFYZ',
      status: 'EM_ANALISE',
      color: 'Glacier Blue',
      wheels: 'aero Wheels',
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

    await orderLookupPage.validateOrderDetails(order);

    // Valida cor de fundo, cor do texto e ícone do badge — lógica encapsulada no Page Object

    await orderLookupPage.validateStatusBadge(order.status);

  });

  test('deve exibir mensagem quando o pedido não for encontrado', async ({ page }) => {

    const order = generateOrderCode();

    //Arrange - dado que o usuário está na página de consulta de pedido - implementado no beforeEach

    //Act

    await orderLookupPage.searchOrder(order);

    //Assert

    await orderLookupPage.validateOrderNotFound();

  });


  test('deve exibir mensagem quando o código do pedido está fora do padrão', async ({ page }) => {
    
    const orderCode = 'XYZ-999-INVALIDO'

    await orderLookupPage.searchOrder(orderCode)
    await orderLookupPage.validateOrderNotFound()
  })

});