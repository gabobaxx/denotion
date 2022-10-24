import { serve } from 'https://deno.land/std@0.160.0/http/server.ts';
import { handler } from './drive.google.ts';

const PORT = 8080;
const ENV = Deno.env.get('ENVIROMENT');
const HOST =
	ENV === 'production'
		? 'https://denotion.deno.dev'
		: `http://localhost:${PORT}`;

console.log(`Server running.`);
await serve(async (REQUEST: Request) => await handler(HOST, REQUEST), {
	port: PORT,
});
