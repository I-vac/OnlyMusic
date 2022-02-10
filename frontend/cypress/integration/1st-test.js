describe("My First Test", function (){
    it("Doesnt do much", function (){
        expect(true).to.equal(true)
    })
})


describe("My Second Test", function () {
    it("Visits the kitchen sink", function () {
        cy.visit("https://example.cypress.io")
    })
})

describe("My Third Test", function(){
    it("Finds element", function (){
        cy.visit("https://example.cypress.io")

        cy.contains("type")
    })
})

describe("My 4th Test", function(){
    it("Finds element", function (){
        cy.visit("https://example.cypress.io")

        cy.contains("type").click()

        cy.url()
        .should("include","/commands/actions")

        cy.get(".action-email")
        .type("test@email.com")
        .should("have.value","test@email.com")
    })
})