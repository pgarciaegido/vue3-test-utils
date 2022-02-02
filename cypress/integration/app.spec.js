describe('app', () => {
    it('should fill form and take me to user list afterwards', () => {
        cy.visit('http://localhost:3000/create');
        cy.get('[data-test="name"]').type('Pablo');
        cy.get('[data-test="city"]').type('Madrid');
        cy.get('[data-test="save"]').click();
        cy.get('[data-test="users-list"]');
    });
});
