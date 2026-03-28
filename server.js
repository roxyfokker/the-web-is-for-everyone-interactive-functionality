// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from 'express'

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';

// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express();

const apiResponse = await fetch('https://fdnd-agency.directus.app/items/preludefonds_instruments')
const apiResponseJSON = await apiResponse.json()

// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({extended: true}));

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static('public'));

// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine('liquid', engine.express());

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set('views', './views');

app.get('/', async function (request, response) {
  response.render('dashboard.liquid');
});

app.get('/instrumenten', async function (request, response) {

  //paginaas
  const page = parseInt(request.query.page) || 1; //ai
  const limit = 20; // ai
  const offset = (page - 1) * limit; // ai

  let url = 'https://fdnd-agency.directus.app/items/preludefonds_instruments/'
  let params = new URLSearchParams();

  // filteren
  if (request.query.status) {
    params.append('filter[status][_eq]', request.query.status);
  }

  // sorteren
  params.append('sort', request.query.sort || '-id');

  // pagins 
  params.append('limit', limit); // ai
  params.append('offset', offset); // ai
  // Totaal aantal ophalen
  params.append('meta', 'total_count'); // ai
  url = url + '?' + params.toString(); // ai

  const instrumentsResponse = await fetch(url) 
  const instrumentsResponseJSON = await instrumentsResponse.json()

  const totalItems = instrumentsResponseJSON.meta.total_count; // ai
  const totalPages = Math.ceil(totalItems / limit); // ai
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1); // ai

  response.render('instrumenten_overzicht.liquid', {
    instruments: instrumentsResponseJSON.data,
    path: request.path,
    status: request.query.status || null,
    sort: request.query.sort || null,
    totalItems: totalItems,
    pages: pages
  });
});

app.get('/instrumenten/:key', async function (request, response) {
  const url = 'https://fdnd-agency.directus.app/items/preludefonds_instruments/' + request.params.key;

  const instrumentsResponse = await fetch(url) 
  const instrumentsResponseJSON = await instrumentsResponse.json()

  response.render('instrument-detail.liquid', {
    instruments: instrumentsResponseJSON.data,
    actie:request.query.action || null
  });
});


app.post('/instrumenten', async function (request, response){

  const key = request.body.name                // "  Gitaar Akoestisch  "
  .toLowerCase()                               // "  gitaar akoestisch  "
  .trim()                                      // "gitaar akoestisch"
  .replace(/\s+/g, '-')                        // "gitaar-akoestisch"   `\s` betekent een spatie    'g' overal in de tekst


  await fetch('https://fdnd-agency.directus.app/items/preludefonds_instruments/',{
    method: 'POST',
    body: JSON.stringify({
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
    }),
    headers: {
       'Content-Type': 'application/json;charset=UTF-8'
    }
  });

  response.redirect(303, '/instrumenten#' + key);
});

/*
app.post('/instrumenten/delete', async function (request, response){

  console.log('Delete aangeroepen')
  console.log('ID:', request.body.id)

   const fetchResponse = await fetch('https://fdnd-agency.directus.app/items/preludefonds_instruments/' + request.body.id, {
    method: 'DELETE'
  });

  console.log('Directus status:', fetchResponse.status)

  response.redirect(303, '/instrumenten');
});
*/




/*
// Zie https://expressjs.com/en/5x/api.html#app.get.method over app.get()
app.get(…, async function (request, response) {
  
  // Zie https://expressjs.com/en/5x/api.html#res.render over response.render()
  response.render(…)
})
*/

/*
// Zie https://expressjs.com/en/5x/api.html#app.post.method over app.post()
app.post(…, async function (request, response) {

  // In request.body zitten alle formuliervelden die een `name` attribuut hebben in je HTML
  console.log(request.body)

  // Via een fetch() naar Directus vullen we nieuwe gegevens in

  // Zie https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch over fetch()
  // Zie https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify over JSON.stringify()
  // Zie https://docs.directus.io/reference/items.html#create-an-item over het toevoegen van gegevens in Directus
  // Zie https://docs.directus.io/reference/items.html#update-an-item over het veranderen van gegevens in Directus
  const fetchResponse = await fetch(…, {
    method: …,
    body: JSON.stringify(…),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })

  // Als de POST niet gelukt is, kun je de response loggen. Sowieso een goede debugging strategie.
  // console.log(fetchResponse)

  // Eventueel kun je de JSON van die response nog debuggen
  // const fetchResponseJSON = await fetchResponse.json()
  // console.log(fetchResponseJSON)

  // Redirect de gebruiker daarna naar een logische volgende stap
  // Zie https://expressjs.com/en/5x/api.html#res.redirect over response.redirect()
  response.redirect(303, …)
})
*/


// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000; als deze applicatie ergens gehost wordt, waarschijnlijk poort 80
app.set('port', process.env.PORT || 8000)

// Start Express op, gebruik daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console
  console.log(`Daarna kun je via http://localhost:${app.get('port')}/ jouw interactieve website bekijken.\n\nThe Web is for Everyone. Maak mooie dingen 🙂`)
})
