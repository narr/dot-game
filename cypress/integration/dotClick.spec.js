/// <reference types="Cypress" />

import { getScoreIncrease } from '../../public/index.js';

describe('Click Dot', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it(`When a player touches or clicks a dot, the dot should disappear from the box,
  and the score should be increased based on the dot's value. A dot's value is
  inversely proportional to its size, with the smallest dots worth 10 points,
  and the largest dots worth 1 point.`, () => {
    cy.contains('button', 'START').click();
    cy.wait(3000)
      .get('[data-testid=dot]')
      .then($dots => {
        $dots.each((idx, val) => {
          val.setAttribute('data-tmp-testid', idx);
        });
        const dotsData = $dots
          .map((idx, val) => {
            return {
              selector: `[data-tmp-testid=${idx}]`,
              point: getScoreIncrease(val.offsetWidth, 100, 10),
            };
          })
          .get();

        cy.get(dotsData[0].selector)
          .click()
          .then(() => {
            cy.log(
              'Clicked Dot should disappear: selector is',
              dotsData[0].selector
            );
            cy.get(dotsData[0].selector).should('not.exist');

            cy.log(`Score should be increased based on the dot's value`)
              .get('[data-testid=score-value]')
              .should('have.text', dotsData[0].point.toString());
          });

        if (dotsData.length > 1) {
          cy.get(dotsData[1].selector)
            .click()
            .then(() => {
              cy.log(
                'Clicked Dot should disappear: selector is',
                dotsData[1].selector
              );
              cy.get(dotsData[1].selector).should('not.exist');

              cy.log(`Score should be increased based on the dot's value`)
                .get('[data-testid=score-value]')
                .should(
                  'have.text',
                  dotsData
                    .filter((val, idx) => {
                      return idx < 2;
                    })
                    .reduce((accumulator, currentValue) => {
                      return accumulator + currentValue.point;
                    }, 0)
                    .toString()
                );
            });
        }
      });
  });
});
