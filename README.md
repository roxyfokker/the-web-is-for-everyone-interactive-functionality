# Prelude Fonds — Instrumentenoverzicht

Een uitleentool voor het Prelude Fonds om grip te krijgen op de instrumentenvoorraad. Een centrale plek voor alle informatie over de instrumenten binnen COOL.

🔗 [Bekijk de live website](https://the-web-is-for-everyone-interactive-321o.onrender.com/) 

---

## Beschrijving

Dit project is een website en uitleentool waarmee het Prelude Fonds de instrumentenvoorraad kan beheren. In het overzicht zie je in één oogopslag welke instrumenten er zijn en wat de status ervan is. Je kunt op een instrument klikken voor meer details en de status aanpassen.

**Deze sprint heb ik gewerkt aan:**
- Instrument toevoegen via een formulier
- Status van een instrument veranderen (uitlenen / innemen / schade melden)
- Instrument verwijderen route (gebouwd, maar werkt niet vanwege ontbrekende rechten in Directus)
- Filters op categorie en status 
- Alle instrumenten ophalen uit Directus (geen limit van 100 meer)
- Verder gewerkt aan de detailpagina

---

## Installatie

1. Ga naar [nodejs.org](https://nodejs.org) en installeer **Node.js 24.13.0 LTS** (Long Term Support).
2. Fork de repository en open het project in VSCodium.
3. Open de terminal in VSCodium en voer het volgende commando uit:
```bash
   npm install
```
4. Start het project met:
```bash
   npm start
```
   Het project is nu bereikbaar op **http://localhost:8000**.
5. Wanneer je klaar bent, stop je de server met **Control + C** in de terminal.

---

## Gebruik

### User stories

**Instrument toevoegen**
> Als beheerder (Meike / Bianca) van het instrumentenoverzicht wil ik een nieuw instrument kunnen toevoegen via een formulier, zodat het instrument direct zichtbaar is in het overzicht.

**Status veranderen**
> Als docent wil ik op een laagdrempelige manier een instrument kunnen uitlenen of innemen via de QR-code.
> Als docent of beheerder wil ik schade kunnen registreren aan een instrument.

### Hoe werkt het?

**Instrument toevoegen**
Klik op de knop om het formulier te openen. Vul de gegevens in (naam, instrument, merk, serienummer, categorie, eigendom, locatie en beschrijving) en verstuur het formulier. Het nieuwe instrument verschijnt bovenaan het overzicht met een groene highlight en een bevestigingsmelding. Het instrument krijgt automatisch de status *Beschikbaar* en een gegenereerde key op basis van de naam.
<img width="1317" height="756" alt="image" src="https://github.com/user-attachments/assets/624ee15f-fd2e-4d5a-87b7-48200f1d5ee0" />

**Status veranderen**
Op de detailpagina van een instrument staan knoppen om de status aan te passen:
- **Uitlenen** → alleen zichtbaar als het instrument *Beschikbaar* is
- **Innemen** → zichtbaar als het instrument *Uitgeleend* of *In reparatie* is
- **Schade melden** → altijd beschikbaar, zet het instrument op *In reparatie*

---

## Kenmerken

Deze interactieve toepassing is gebouwd met een combinatie van **Node.js**, **Express**, **Liquid**, **Directus** en **client-side JavaScript**.

| Technologie | Gebruik |
|---|---|
| Node.js + Express | Server en routing |
| Liquid | Templates en rendering van pagina's |
| Directus API | Database — instrumentendata |
| Client-side JavaScript | Interactie in de browser (filters, feedback, etc.) |

### Instrument toevoegen — POST route

De POST route verwerkt het formulier en stuurt de data naar de Directus API:
POST route
```
app.post('/instrumenten', async function (request, response)

```
Data uit formulier
```
name: request.body.name,
key: key,
instrument: request.body.instrument,
brand: request.body.brand,
serial_number: request.body.serial_number,
type: request.body.type,
property: request.body.property,
storage_room: request.body.storage_room,
details: request.body.details,
status: request.body.status,
```
key maken
```
const key = request.body.name                // "  Gitaar Akoestisch  "
toLowerCase()                               // "  gitaar akoestisch  "
.trim()                                      // "gitaar akoestisch"
.replace(/\s+/g, '-')                        // "gitaar-akoestisch"   `\s` betekent een spatie    'g' overal in de tekst
```
POST naar Directus
```
await fetch('https://fdnd-agency.directus.app/items/preludefonds_instruments/',{
    method: 'POST',
    body: JSON.stringify({
```
Redirect
```
response.redirect(303, '/instrumenten?success=true&name=' + encodeURIComponent(request.body.name)
```

### Status veranderen — PATCH routes

De status van een instrument wordt aangepast via drie aparte PATCH routes:
POST route
``` uitlenen
app.post('/instrumenten/:id/uitlenen', async function (request, response){
```

``` innemen
app.post('/instrumenten/:id/innemen', async function (request, response){
```

``` scahde melden
app.post('/instrumenten/:id/schade', async function (request, response){
```

Data uit formulier
```
status: 'Uitgeleend'
```

```
status: 'Beschikbaar'
```

```
status: 'In reparatie'
```

POST naar Directus
```
await fetch('https://fdnd-agency.directus.app/items/preludefonds_instruments/' + id, { method: 'PATCH',
    body: JSON.stringify({

```

```
await fetch('https://fdnd-agency.directus.app/items/preludefonds_instruments/' + id, {
    method: 'PATCH',
    body: JSON.stringify({
```

```
await fetch('https://fdnd-agency.directus.app/items/preludefonds_instruments/' + id, {
    method: 'PATCH',
    body: JSON.stringify({

```
Redirect
```
response.redirect(303, '/instrumenten/' + id + '?action=uitgeleend');

```
```
response.redirect(303, '/instrumenten/' + id + '?action=ingenomen');

```
```
response.redirect(303, '/instrumenten/' + id + '?action=schadegemeld');

```


---

## CSS-strategie & conventies

CSS is geschreven met **CSS nesting** en wordt zo veel mogelijk **maximaal 3 lagen diep** genest. Daarnaast wordt de volgende eigenschapsvolgorde aangehouden, van buiten naar binnen naar visueel:

1. **Layout / Positioning**
2. **Box model**
3. **Typography**
4. **Visual styling**
5. **Animation / Interaction**

---

## Commit-conventies

Commits volgen de volgende opbouw: type: beschrijving #issuenummer [wip]

`[wip]` *(work in progress)* is optioneel en geeft aan dat het werk nog niet af is.

| Type | Gebruik |
|---|---|
| `feat` | Nieuwe functionaliteit |
| `fix` | Bug opgelost |
| `style` | Styling |
| `refactor` | Code verbeterd |
| `docs` | Documentatie |
| `test` | Testen |
| `chore` | Kleine technische aanpassingen |

