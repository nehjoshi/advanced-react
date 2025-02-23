import { products } from "../../src/data.json";
describe('template spec', () => {

  it("displays all items in shop", () => {
    cy.visit("/shop");
    products.forEach((product) => {
      cy.get(`[data-testid="cy-item-${product.name}"]`).should("exist");
    })
  })

  it("adds an item to the cart", () => {
    cy.visit("/shop");
    cy.get('[data-testid="cy-item-Apple Airpods 3-add"]').click();
    cy.get('[data-testid="cy-item-Apple Airpods 3-quantity"]').should("have.text", "1");
  })
})