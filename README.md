## Frisörbokning - Fullstack app
byggd me Next.js Prisma och Cypress.

## Beskrivning
Detta projekt är en fullstack webbapplikation för att hantera bokningar.
Användaren kan lägga till, redigera och ta bort bokningar me information om namn, service, datum och tid.

Applikationen är byggd med **Next.js**, **Tailwind CSS** och **Prisma** för databashantering.
E2E-tester för användarflöden är implementerade me **Cypress**.

---

## Funktioner
- Lista alla bokningar
- Lägga till nya bokningar
- Redigera befintliga bokningar
- Ta bort bokningar
- Fomaterad visning av datum och tid
- Validering av obligatoriska fält
- Automatiserade E2E-tester för alla huvudfunktioner

---

## Teknologier
- **Frontend:** React, Next.js, Tailwind CSS
- **Backend:** Next.js API routes
- **Databas:** Prisma / MongoDB 

---

## Insallation och körning

1. Klona projektet:
```bash
git clone <din-repo-url>
cd <projekt-mapp>

2. npm install

3. npx prisma migrate dev

3. npm run dev

4. Öppna webbläsaren på:
http://localhost:3000


## Kör testerna
5. npm run test



# NextJS + Cypress boilerplate

## Kom igång

1. Lägg till atlas url till din databas i `.env` filen
2. Kör `npm install` för att installera dependencies
3. Publicera databasen med `npm run push`
4. Seeda sedan databasen med `npm run seed`
5. Starta utvecklingsservern med `npm run dev`
6. Öppna en ny terminal och kör `npm test`

Nu borde du vara reda att skriva nya tester och bygga ut din app.
