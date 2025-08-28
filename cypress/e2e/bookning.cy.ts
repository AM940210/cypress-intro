describe('Bokningssystem', () => {
    it('kan boka en tid', () => {
        cy.visit('http://localhost:3000/book');
        cy.get('input[placeholder="Namn"]').type('Ahmad');
        cy.get('input[placeholder="Telefonnummer"]').type('0727191174');
        cy.get('select').select('Klippning');
        cy.get('input[type="datetime-local"]').type('2025-08-30T14:00');
        cy.get('button').contains('Boka').click();
        cy.url().should('eq', 'http://localhost:3000/');
    });

    it('visar fel om namn saknas', () => {
        cy.visit('http://localhost:3000/book');
        cy.get('input[placeholder="Telefonnummer"]').type('0727191174');
        cy.get('input[type="datetime-local"]').type('2025-08-30T14:00');
        cy.get('button').contains('Boka').click();
        cy.contains('Alla fält måste fyllas i').should('exist');
    });
});