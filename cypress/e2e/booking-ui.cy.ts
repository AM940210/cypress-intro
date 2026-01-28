describe("Frisörbokning – UI flöden", () => {
  beforeEach(() => {
    cy.task("reseed");
    cy.visit("/");
  });

    it("should allow user to create a booking via the UI", () => {
        cy.get('input[placeholder="Namn"]').type("Ahmad");
        cy.get("select").select("Klippning");
        cy.get('input[type="date"]').type("2025-08-30");
        cy.get('input[type="time"]').type("11:00");

        cy.contains("Boka tid").click();

        // Cypress väntar automatiskt tills DOM uppdateras
        cy.contains("Ahmad", { timeout: 10000 }).should("exist");
        cy.contains("Klippning").should("exist");
    });
});
