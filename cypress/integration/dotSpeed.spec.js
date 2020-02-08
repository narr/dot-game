/// <reference types="Cypress" />

describe('Dot Speed', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it(`At the slider's left-most position, dots should fall at a speed of 10px per second`, () => {
    cy.log(`Set speed at the slider's left-most position`)
      .get('input[type=range]')
      .as('slider')
      .invoke('val', 10)
      .trigger('input');
    cy.get('@slider')
      .siblings('label')
      .should('have.text', '10');

    cy.contains('button', 'START').click();
    cy.get('[data-testid=dot]').then($dots => {
      const initialPosition = $dots[0].offsetTop;
      cy.wait(2000).then(() => {
        const increasePerSec = 10;
        const seconds = 2;
        const increase = increasePerSec * seconds;
        const expected = initialPosition + increase;
        const tolerance = increasePerSec * (seconds - 1);
        expect($dots[0].offsetTop).within(
          expected - tolerance,
          expected + tolerance
        );
      });
    });
  });

  it(`At the slider's right-most position, dots should fall at a speed of 100px per second.`, () => {
    cy.log(`Set speed at the slider's right-most position`)
      .get('input[type=range]')
      .as('slider')
      .invoke('val', 100)
      .trigger('input');
    cy.get('@slider')
      .siblings('label')
      .should('have.text', '100');

    cy.contains('button', 'START').click();
    cy.get('[data-testid=dot]').then($dots => {
      const initialPosition = $dots[0].offsetTop;
      cy.wait(2000).then(() => {
        const increasePerSec = 100;
        const seconds = 2;
        const increase = increasePerSec * seconds;
        const expected = initialPosition + increase;
        const tolerance = increasePerSec * (seconds - 1);
        expect($dots[0].offsetTop).within(
          expected - tolerance,
          expected + tolerance
        );
      });
    });
  });
});
