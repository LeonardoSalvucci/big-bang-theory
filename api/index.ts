import { Hono } from 'hono'
import { cors } from 'hono/cors'
import Character from '../db/characters.json'
import { paginate } from './utils/paginate'

const app = new Hono()
app.use('*', cors())

/**
 * @api {get} / Get all available endpoints
 */
app.get('/', (c) => {
  return c.json({
    all: {
      type: 'GET',
      url: '/all',
      pagination: true,
      params: [
        'page',
        'limit'
      ]
    },
    episodes: {
      type: 'GET',
      url: '/episodes/:charId',
      pagination: true,
      params: [
        'page',
        'limit'
      ]
    },
    search: {
      type: 'GET',
      url: '/search',
      pagination: false,
      params: [
        'q'
      ]
    }
  })
})

/**
 * @api {get} /all Get all characters. This will not
 */
app.get('/all', (c) => {
  const { page: pageNumber, limit: pageSize } = c.req.query()
  return c.json(paginate(Character, { pageNumber, pageSize, exclude: ['episodes', 'episodesLink'] }))
})

/**
 * @api {get} /episodes/:charId Get all episodes for a character
 */
app.get('/episodes/:charId', (c) => {
  const charId = parseInt(c.req.param('charId'))
  const { page: pageNumber, limit: pageSize } = c.req.query()

  const character = Character.find((char) => char.id === charId)

  if (!character) {
    return c.json({ error: 'Character not found' }, 404)
  }

  return c.json(paginate(character.episodes, { pageNumber, pageSize }))
})

/**
 * @api {get} /search Search for a character by it's name or charName
 */
app.get('/search', (c) => {
  const { q } = c.req.query()

  if (!q || q.length < 3) {
    return c.json({ error: 'Query must be at least 3 characters long' }, 400)
  }

  const reg = new RegExp(q, 'gi')
  return c.json(Character.filter((char) => reg.test(char.name) || reg.test(char.charName)))
})

export default app
