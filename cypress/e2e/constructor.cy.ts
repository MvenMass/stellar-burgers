// Константы для селекторов
const selectors = {
  topBunPlaceholder: '[data-cy="noTopBun"]',
  bottomBunPlaceholder: '[data-cy="noBottomBun"]',
  fillerPlaceholder: '[data-cy="noFiller"]',
  topBun: '[data-cy="TopBun"]',
  bottomBun: '[data-cy="BottomBun"]',
  filler: '[data-cy="Filler"]',
  modal: '[data-cy="modal"]',
  modalClose: '[data-cy="modal-close"]',
  modalOverlay: '[data-cy="modal-overlay"]',
  bunCard: '[data-cy="Флюоресцентная булка R2-D3"]',
  sauceCard: '[data-cy="Соус фирменный Space Sauce"]',
  mainFillingCard: '[data-cy="Биокотлета из марсианской Магнолии"]',
  orderButton: 'button:contains("Оформить заказ")'
};

// Переменные для текста
const addIngredientText = 'Добавить';
const bunText = 'Флюоресцентная булка R2-D3';
const mainFillingText = 'Биокотлета из марсианской Магнолии';
const sauceText = 'Соус фирменный Space Sauce';
const orderNumber = '60719';

// Общий блок
describe('E2E Тесты на главной странице', function () {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('/');
  });

  describe('Добавление ингредиентов в конструктор', function () {
    it('Флюоресцентная булка R2-D3 должна добавиться в конструктор', function () {
      cy.get(selectors.topBunPlaceholder).should('be.visible');
      cy.get(selectors.bottomBunPlaceholder).should('be.visible');
      cy.get(selectors.bunCard).contains(addIngredientText).click();
      cy.get(selectors.topBun).contains(bunText);
      cy.get(selectors.bottomBun).contains(bunText);
    });

    it('Соус фирменный Space Sauce должен добавиться в конструктор', function () {
      cy.get(selectors.fillerPlaceholder).should('be.visible');
      cy.get(selectors.sauceCard).contains(addIngredientText).click();
      cy.get(selectors.filler).contains(sauceText);
    });

    it('Биокотлета из марсианской Магнолии должна добавиться в конструктор', function () {
      cy.get(selectors.fillerPlaceholder).should('be.visible');
      cy.get(selectors.mainFillingCard).contains(addIngredientText).click();
      cy.get(selectors.filler).contains(mainFillingText);
    });
  });

  describe('Проверка модальных окон', function () {
    it('Открытие модального окна', function () {
      cy.get(selectors.modal).should('not.exist');
      cy.get(selectors.sauceCard).click();
      cy.get(selectors.modal).contains(sauceText).should('be.visible');
    });

    it('Закрытие модального окна по крестику', function () {
      cy.get(selectors.sauceCard).click();
      cy.get(selectors.modal)
        .should('exist')
        .contains(sauceText)
        .should('be.visible');
      cy.get(selectors.modalClose).click();
      cy.get(selectors.modal).should('not.exist');
    });

    it('Закрытие модального окна по оверлею', function () {
      cy.get(selectors.sauceCard).click();
      cy.get(selectors.modal)
        .should('exist')
        .contains(sauceText)
        .should('be.visible');
      cy.get(selectors.modalOverlay).click({ force: true });
      cy.get(selectors.modal).should('not.exist');
    });
  });

  describe('Оформление заказа', function () {
    it('Проверяем успешное оформление заказа', function () {
      cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
      cy.intercept('POST', '/api/orders', { fixture: 'order.json' });
      cy.setCookie('accessToken', 'mockAccessToken');
      window.localStorage.setItem('refreshToken', 'mockRefreshToken');
      cy.visit('/');

      // Проверяем, что конструктор пуст
      cy.get(selectors.topBunPlaceholder).should('be.visible');
      cy.get(selectors.bottomBunPlaceholder).should('be.visible');
      cy.get(selectors.fillerPlaceholder).should('be.visible');

      // Добавляем ингредиенты в конструктор
      cy.get(selectors.bunCard).contains(addIngredientText).click();
      cy.get(selectors.sauceCard).contains(addIngredientText).click();
      cy.get(selectors.mainFillingCard).contains(addIngredientText).click();

      // Нажимаем кнопку оформления заказа
      cy.get(selectors.orderButton).click();

      // Проверяем, что открылась модалка с номером заказа
      cy.get(selectors.modal).contains(orderNumber).should('be.visible');

      // Закрываем модалку
      cy.get(selectors.modalClose).click();
      cy.get(selectors.modal).should('not.exist');

      // Проверяем, что конструктор очистился
      cy.get(selectors.topBunPlaceholder).should('be.visible');
      cy.get(selectors.bottomBunPlaceholder).should('be.visible');
      cy.get(selectors.fillerPlaceholder).should('be.visible');

      // Удаляем токены и проверяем, что тест завершился успешно
      cy.clearCookie('accessToken');
      window.localStorage.removeItem('refreshToken');
    });
  });
});
