import { v4 as uuid } from 'https://deno.land/std@0.82.0/uuid/mod.ts';

const HTML = await Deno.readFile(
	`${new URL('.', import.meta.url).pathname}index.html`
);

export const handler = (request: Request): Response => {
	try {
		const id = uuid.generate();
		console.log({ request, id });
		return new Response(HTML, {
			status: 200,
			headers: {
				'content-type': 'text/html',
			},
		});
		// return new Response(response, { status: 200 });
	} catch (error) {
		console.error(error);
		const body = `Error: ${error.message}`;
		return new Response(body, { status: 500 });
	}
};
