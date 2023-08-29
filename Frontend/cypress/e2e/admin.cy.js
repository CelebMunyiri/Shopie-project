describe('visiting Admin page', () => {
    it('should be able to log in as an admin', () => {
        cy.visit('http://127.0.0.1:5500/login.html'); 
        cy.get('input[name=email]').type('mjwachira4@gmail.com');
        cy.get('input[name=password]').type('12345678');
        cy.get('input[type=submit]').click();
        cy.url().should('not.include', '/login.html');
      });
    it('it passes if Admin.html is visited', () => {
        cy.visit('http://127.0.0.1:5500/admin.html')
       })
    // it('passes if divs exist', () => {
    //     cy.visit('http://127.0.0.1:5500/admin.html')
    //     cy.get('div')
    // })
})