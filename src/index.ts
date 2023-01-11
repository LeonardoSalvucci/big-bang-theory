import { Hono } from 'hono';
import Character from '../db/characters.json';

const app = new Hono();

/**
 * @api {get} /all Get all characters
 */
app.get('/all', (c) => c.json(Character))

/**
 * @api {get} /search Search for a character by it's name or charName
 */
app.get('/search', (c) => {
	const { q } = c.req.query();

	if (!q || q.length < 3) {
		return c.json({ error: 'Query must be at least 3 characters long' }, 400);
	}

	const reg = new RegExp(q, 'gi');
	return c.json(Character.filter((char) => reg.test(char.name) || reg.test(char.charName)))
})

export default app