# The Big Bang Theory Project
This project is experimental to learn new technologies and to have fun. It is not intended to be used in production. WORK IN PROGRESS!!!

## What is this?
This project consists in two parts. 
- An API that provides information about the characters of the TV show "The Big Bang Theory". The data is scraped from [IMDB](https://www.imdb.com/title/tt0898266/fullcredits/?ref_=tt_cl_sm). The API is built with [Hono](https://honojs.dev/) and deployed on Cloudflare Workers.
- A frontend that shows the characters of the TV show. The frontend is built with [Astro](https://astro.build/) with [Tailwindcss](https://tailwindcss.com/) in pude VanillaJS and deployed on [Vercel](https://vercel.com/).

1. If you want to run the scparer locally, you can do so by running `npm run scrape`. This will create or update a `characters.json` file in the db directory. 
2. You can then run `npm run dev:api` to start the API locally on url http://localhost:8787/.
3. If you want to run the frontend locally, you can do so by running `npm run dev`. This will start the frontend on url http://localhost:3000/.

## Live Preview
* The API is available at https://big-bang-theory-api.lesalvucci.workers.dev. The API is currently in version 1.0.0.
* The frontend is available at https://big-bang-theory.vercel.app. The frontend is currently in development.

## API
### GET /
Returns API available endpoints

### GET /all
Returns all characters with pagination. The default page size is 10. You can change the page size by adding a `limit` query parameter. You can also change the page by adding a `page` query parameter. Giving a `limit` parameter with `-1` will return all characters.
Response object is like this example: 
```json
{
  "total": 444,
  "pages": 45
  "limit": 10,
  "items": [
    {
      "id": 1,
      "name": "Johnny Galecki",
      "photo": "https://m.media-amazon.com/images/M/MV5BNzQ2ODY0MTIwMV5BMl5BanBnXkFtZTcwNDQ2NzMzMw@@._V1_UX266.jpg",
      "charName": "Leonard Hofstadter",   
    },
    ...
  ]
}
```

### GET /episodes/:charId
Returns all episodes for a character. The `charId` is the id of the character. The default page size is 10. You can change the page size by adding a `limit` query parameter. You can also change the page by adding a `page` query parameter. Giving a `limit` parameter with `-1` will return all episodes.
Response object is like this example: 
```json
{
  "total": 280,
  "pages": 28,
  "limit": 10,
  "items": [
    {
      "id": 0,
      "text": "The Stockholm Syndrome (2019) ... Leonard Hofstadter",
      "url": "https://www.imdb.com/title/tt6674736/?ref_=ttfc_fc_cl_i1"
    },
    ...
  ]
}
```

### GET /search
Searches for characters by name or charName. Query parameter `q` is required with at least 3 chars.


