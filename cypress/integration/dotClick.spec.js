/// <reference types="Cypress" />

describe('Click Dot', () => {
  function getScoreIncrease(dotSize, dotSizeMax, dotSizeMin) {
    const minPoint = 1;
    const maxPoint = 10;
    const pointRange = maxPoint - minPoint;
    const pointPerOneRange = (dotSizeMax - dotSizeMin) / pointRange;
    return maxPoint - Math.ceil((dotSize - dotSizeMin) / pointPerOneRange);
  }

  beforeEach(() => {
    cy.visit('/');
  });

  it(`When a player touches or clicks a dot, the dot should disappear from the box,
  and the score should be increased based on the dot's value. A dot's value is
  inversely proportional to its size, with the smallest dots worth 10 points,
  and the largest dots worth 1 point.`, () => {
    cy.contains('button', 'START').click();
    cy.wait(2000)
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

        let dotIdxToClick = dotsData.length - 1;
        cy.wrap($dots[dotIdxToClick]).click();
        cy.log('Clicked Dot should disappear')
          .get(dotsData[dotIdxToClick].selector)
          .should('not.exist');
        cy.log(`score should be increased based on the dot's value`)
          .get('[data-testid=score-value]')
          .should('have.text', dotsData[dotIdxToClick].point.toString());

        dotIdxToClick = dotIdxToClick - 1;
        cy.wrap($dots[dotIdxToClick]).click();
        cy.log('Clicked Dot should disappear')
          .get(dotsData[dotIdxToClick].selector)
          .should('not.exist');

        cy.log(`score should be increased based on the dot's value`)
          .get('[data-testid=score-value]')
          .should(
            'have.text',
            dotsData
              .filter((val, idx) => {
                return !(idx < dotIdxToClick);
              })
              .reduce((accumulator, currentValue) => {
                return accumulator + currentValue.point;
              }, 0)
              .toString()
          );
      });
  });
});
