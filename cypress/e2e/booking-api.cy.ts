describe('Bokning API', () => {
    beforeEach(() => {
        cy.task("reseed"); // Återställ dababasen till definierat grundläge
    });

    it('should return three booknings by default', () => {
        cy.request("GET", "/api/bookings").then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.be.an("array").and.have.length(3);
            expect(res.body[0]).to.have.property("name");
        });
    });

    it('should create a new booking', () => {
        cy.request("POST", "/api/bookings", {
            name: "Ahmad",
            date: "2025-08-30",
            time: "11:00",
            service: "Klippning"
        }).then((res) => {
            expect(res.status).to.eq(201);
            expect(res.body).to.have.property("_id");
            expect(res.body.name).to.eq("Ahmad");
        });
    });

    it("should not create a booking with missing data", () => {
        cy.request({
            method: "POST",
            url: "/api/bookings",
            body: {
                name: "",
                date: "",
                time: "",
                service: ""
            },
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eq(400);
            expect(res.body).to.have.property("error");
        });
    });

    it("should delete a booking", () => {
        cy.request("GET", "/api/bookings").then((res) => {
            const booking = res.body.find((b) => b.name === "Testperson");
            expect(booking).to.exist;

            cy.request("DELET", `/api/bookings/${booking._id}`).then((deleteRes) => {
                expect(deleteRes.status).to.eq(200);
                expect(deleteRes.body).to.have.property("message");
            });
        });
    })
});