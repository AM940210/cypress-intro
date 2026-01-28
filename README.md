## Frisörbokning - Fullstack webbapplikation med Cypress E2E

## Beskrivning
Detta projekt är en **fullstack webbapplikation för frisörbokning** 
där användaren kan:
- se alla bokningar
- skapa en ny bokning
- hämta en specifik bokning via ID
- ta bort en bokning

Applikationen är byggd med **Next.js (App Router)** och använder **Prisma + MongoDB** för datalagring.
Alla huvudsakliga användarflöden testas med **automatiserade Cypress E2E-tester** som körs mot en **separat testdatabas**.

Syftet med projektet är att visa hur man bygger och testar ett modernt fullstack-system med fokus på **End-To-End-testning**.

---

## Funktioner
-skapa bokning (namn, tjänst, datum, tid)
- Lista alla bokningar
- Hämta bokning via ID
- Redigera befintliga bokningar
- Ta bort bokningar
- Fomaterad visning av datum och tid
- Validering av obligatoriska fält
- Automatiserade E2E-tester med Cypress
- Testdatabas som återstälss inför varje test

---

## Teknisk stack

### Frontend
- **Next.js (React, App Router)**
- **TypeScript**
- **Tailwind CSS**


### Backend 
- **Next.js API routes (REST)**
- CRUD-endpoints enligt REST-principer


### Databas 
- **MongoDB Atlas**
- **Prisma ORM**

### Test
- **Cypress E2E**
- Cypress tasks för att reseeda testdatabasen


### Versionshantering
- **Git**
- **GitHub**


---

## Användarflöden (E2E-testade)
- Hämta alla bokningar
- Skapa en ny bokning via UI
- Hämta bokning via ID
- Ta bort bokning via UI
- Felhantering vid saknade fält

Alla flöden verifieras automatiskt med Cypress.

---

## Insallation och körning

1. Klona projektet:
```bash
git clone https://github.com/AM940210/cypress-intro.git
cd cypress-intro

# Installera dependencies
2. npm install

# Skapa .env-fil
DATABASE_URL="mongodb+srv://<username>:<password>@cluster0.mongodb.net/mybokningssystem?retryWrites=true&w=majority"

# Synka databasen
3. npx prisma migrate dev

# Starta utvecklingsservern
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
