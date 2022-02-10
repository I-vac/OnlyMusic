describe("The Login", ()=>{
    it("successfull loads", ()=>{
        cy.visit("/")
        
        cy.contains('LOG IN').click()
        
        cy.contains("Email address or username").click()
        .type("ivo_nikolov00@abv.bg")

        cy.contains("Password").click()
        .type("password that works and wont show here")

        cy.contains("Log In").click()
    })
})