import { Booking } from "@/generated/prisma";

describe('Bokning API', () => {
    beforeEach(() => {
        cy.task("reseed"); // Återställ dababasen till definierat grundläge
    });

    it('should return three bookings by default', () => {
        cy.request("GET", "/api/bookings").then((res) => {
            const bookings = res.body as Booking[];

            expect(res.status).to.eq(200);
            expect(bookings).to.be.an("array").and.have.length(3);
            expect(bookings[0]).to.have.property("name");
        });
    });

    it('should create a new booking', () => {
        cy.request("POST", "/api/bookings", {
            name: "Ahmad",
            date: "2025-08-30",
            time: "11:00",
            service: "Klippning"
        }).then((res) => {
            const booking = res.body as Booking;

            expect(res.status).to.eq(201);
            expect(booking).to.have.property("id");
            expect(booking.name).to.eq("Ahmad");
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
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.eq(400);
            expect(res.body).to.have.property("error");
        });
    });

    it("should delete a booking", () => {
        cy.request("GET", "/api/bookings").then((res) => {
            const bookings = res.body as Booking[];
            const booking = bookings.find((b) => b.name === "Testperson");
            expect(booking).to.exist;

            cy.request("DELETE", `/api/bookings/${booking!.id}`).then((deleteRes) => {
                expect(deleteRes.status).to.eq(200);
                expect(deleteRes.body).to.have.property("message");
            });
        });
    });

    it("should return a specific booking by ID", () => {
        cy.request("GET", "/api/bookings").then((res) => {
            const bookings = res.body as Booking[];
            const booking = bookings.find((b) => b.name === "Testperson");
            expect(booking).to.exist;

            cy.request("GET", `/api/bookings/${booking!.id}`).then((singleRes) => {
                expect(singleRes.status).to.eq(200);
                expect(singleRes.body).to.have.property("name", "Testperson");
                expect(singleRes.body).to.have.property("service");
            });
        });
    });
});