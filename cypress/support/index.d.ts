declare namespace Cypress {
  interface Chainable<Subject> {
    addIngredientToBasket(title: string): Chainable<Subject>;
  }
}
