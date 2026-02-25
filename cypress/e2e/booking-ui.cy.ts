describe("Frisörbokning – UI användarflöden", () => {
  beforeEach(() => {
    cy.task("reseed");
    cy.visit("/");
  });

  // kontrollera att seed-data laddas
  it("should load existing booking on page load", () => {
    cy.contains("Testperson").should("exist");
    cy.contains("Anna").should("exist");
    cy.contains("Jonas").should("exist");
  });
  
  // skapa flera bokningar
  it("should allow creating multiple bookings", () => {
    // Första bokningen
    cy.get('input[placeholder="Namn"]').type("Ahmad");
    cy.get("select").select("Klippning");
    cy.get('input[type="date"]').type("2026-02-24");
    cy.get('input[type="time"]').type("11:00");
    cy.contains("Boka tid").click();

    cy.contains("Ahmad").should("exist");

    // Andra bokningen
    cy.get('input[placeholder="Namn"]').type("Sara");
    cy.get("select").select("Färgning");
    cy.get('input[type="date"]').type("2026-02-25");
    cy.get('input[time]').type("13:00");
    cy.contains("Boka tid").click();

    cy.contains("Sara").should("exist");
    cy.contains("Ahmad").should("exist");
  });

  // Ta bort rätt bokning
  it("should delete the correct booking", () => {
    cy.contains("Anna").should("exist");
    cy.contains("Jonas").should("exist");

    cy.contains("Anna")
      .closest("li")
      .within(() => {
        cy.contains("Ta bort").click();
      });

    cy.contains("Anna").should("not.exist");
    cy.contains("Jonas").should("exist");
  });

  // Uppdatera en bokning
  it("should update a booking", () => {
    cy.contains("Testperson")
      .closest("li")
      .within(() => {
        cy.contains("Ändra").click();
      });

    cy.get('input[type="text"]').clear().type("Uppdaterad");

    cy.contains("Spara").click();

    cy.contains("Uppdaterad").should("exist");
  });

  // Felhantering
  it("should show validation error when field are empty", () => {
    cy.contains("Boka tid").click();
    cy.contains("Fyll i alla fält").should("exist");
  });
});
