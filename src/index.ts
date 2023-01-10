import { Hono } from 'hono';
import Character from '../db/characters.json';

const app = new Hono();

app.get('/all', (c) => c.json(Character))
app.get('/searchByName', (c) => {
	const { q } = c.req.query();

	if (!q || q.length < 3) {
		return c.json({ error: 'Query must be at least 3 characters long' }, 400);
	}

	const reg = new RegExp(q, 'gi');
	return c.json(Character.filter((char) => reg.test(char.name)))
})

export default app