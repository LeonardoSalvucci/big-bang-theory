import { Hono } from 'hono';
import Character from '../db/characters.json';

const app = new Hono();

app.get('/all', (c) => c.json(Character))

export default app