/// <reference types="Cypress" />

describe('Start Button', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('The game starts when a player touches or clicks the Start button', () => {
    cy.log('Game should not be started yet')
      .get('[data-testid=dot]')
      .should('not.exist');

    cy.contains('button', 'START')
      .click()
      .then($el => {
        cy.log('the Start button changes to a Pause button').then(() => {
          expect($el.text()).equal('PAUSE');
        });
      });
    cy.log('Game should have started now');
    cy.get('[data-testid=dot]').then($elements => {
      cy.log('Dots should be added to screen').then(() => {
        expect($elements.length).be.above(0);
      });
      cy.log(`Dots' position should change over time`).then(() => {
        const dotPositions = $elements
          .map((idx, val) => {
            return val.offsetTop;
          })
          .get();
        cy.wait(1000).then(() => {
          dotPositions.forEach((val, idx) => {
            expect($elements[idx].offsetTop).be.above(val);
          });
        });
      });
    });

    cy.wait(3000)
      .contains('button', 'PAUSE')
      .click()
      .then($el => {
        cy.log('the Pause button changes to a Start button').then(() => {
          expect($el.text()).equal('START');
        });
      });
    cy.log('Game should have stopped now');
    cy.get('[data-testid=dot]').then($elements => {
      cy.log(`Dots' position should not change over time`).then(() => {
        const dotPositions = $elements
          .map((idx, val) => {
            return val.offsetTop;
          })
          .get();
        cy.wait(1000).then(() => {
          dotPositions.forEach((val, idx) => {
            expect($elements[idx].offsetTop).equal(val);
          });
        });
      });
    });
  });
});
