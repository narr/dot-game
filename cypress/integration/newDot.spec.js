/// <reference types="Cypress" />

describe('New Dot', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('A new dot should also appear every 1000ms', () => {
    cy.contains('button', 'START').click();
    cy.log(`dot's count should be one after 1s`)
      .wait(1000)
      .get('[data-testid=dot]')
      .then($elements => {
        expect($elements.length).equal(1);
      });

    cy.log(`dot's count should be two after 2s`)
      .wait(1000)
      .get('[data-testid=dot]')
      .then($elements => {
        expect($elements.length).equal(2);
      });

    cy.log(`dot's count should be two after 3s`)
      .wait(1000)
      .get('[data-testid=dot]')
      .then($elements => {
        expect($elements.length).equal(3);
      });
  });

  it('Dots should vary randomly in size from 10px in diameter to 100px in diameter', () => {
    cy.contains('button', 'START').click();
    cy.wait(3000)
      .get('[data-testid=dot]')
      .then($elements => {
        $elements.each((idx, val) => {
          expect(val.offsetWidth).within(10, 100);
        });
      });
  });

  it(`A new dot appears at a random horizontal position at the top of the box every second.
  A dot should not "hang" off the left or right edge of the screen.`, () => {
    cy.contains('button', 'START').click();
    cy.wait(3000)
      .get('[data-testid=game-zone]')
      .then($elements => {
        const DOT_SIZE_MAX = 100;
        const gameZoneWidth = $elements[0].offsetWidth;
        $elements.find('[data-testid=dot]').each((idx, val) => {
          expect(val.offsetLeft).within(0, gameZoneWidth - DOT_SIZE_MAX);
        });
      });
  });
});
