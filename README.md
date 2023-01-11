# The Big Bang Theory - Characters Open API
This project is experimental to learn new technologies and to have fun. It is not intended to be used in production. WORK IN PROGRESS!!!

## What is this?
This is an API that provides information about the characters of the TV show "The Big Bang Theory". The data is scraped from [IMDB](https://www.imdb.com/title/tt0898266/fullcredits/?ref_=tt_cl_sm). The API is built with [Hono](https://honojs.dev/) and deployed on Cloudflare Workers.

If you want to run the scparer locally, you can do so by running `npm run scrape`. This will create or update a `characters.json` file in the db directory. 
You can then run `npm run dev` to start the API locally on url http://localhost:8787/.

## API
The API is available at https://big-bang-theory-api.lesalvucci.workers.dev. The API is currently in version 1.0.0.

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
      "name": "Johnny Galecki",
      "photo": "https://m.media-amazon.com/images/M/MV5BNzQ2ODY0MTIwMV5BMl5BanBnXkFtZTcwNDQ2NzMzMw@@._V1_UX266.jpg",
      "charName": "Leonard Hofstadter"
    },
    ...
  ]
}
```

### GET /search
Searches for characters by name or charName. Query parameter `q` is required with at least 3 chars.
