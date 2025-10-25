describe("todo", () => {
  beforeEach(() => {
    cy.task("reseed");
  });

  it("should display three bookings by default", () => {
    cy.visit("http://localhost:3000");
    cy.get("li.border.p-4.rounded").should("have.length", 3);

    cy.get("li.border.p-4.rounded").first().within(() => {
      cy.contains("Testperson");
      cy.contains("Klippning");
      // ensure the date is rendered and not the literal "Invalid date"
      cy.contains(/invalid date/i).should("not.exist");
    });
  });

  it("should be able to delete a booking", () => {
    cy.visit("http://localhost:3000");
    cy.get("li.border.p-4.rounded").first().within(() => {
      cy.contains("Delete").click();
    });
    cy.get("li.border.p-4.rounded").should("have.length", 2);
    cy.contains("Testperson").should("not.exist");
  });
});
