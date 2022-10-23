import { v4 as uuid } from 'https://deno.land/std@0.82.0/uuid/mod.ts';

export const handler = (request: Request): Response => {
	try {
		const id = uuid.generate();
		console.log({ id, request });
		return new Response('Hello World', { status: 200 });
	} catch (error) {
		console.error(error);
		const body = `Error: ${error.message}`;
		return new Response(body, { status: 500 });
	}
};
