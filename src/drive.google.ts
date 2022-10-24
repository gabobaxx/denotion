import { v4 as uuid } from 'https://deno.land/std@0.82.0/uuid/mod.ts';

const HTML = await Deno.readFile(
	`${new URL('.', import.meta.url).pathname}index.html`
);

const folderId = Deno.env.get('GOOGLE_BOOKS_FOLDER_ID');
const token = Deno.env.get('GOOGLE_TOKEN');

const singleFileUrl = (id: string | undefined) =>
	`https://www.googleapis.com/drive/v3/files/${id}/watch`;

async function generateAPIChannel(): Promise<Response> {
	const id = uuid.generate();
	const response = await fetch(singleFileUrl(folderId), {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			id, // Your channel ID.
			type: 'web_hook',
			address: 'https://denotion.deno.dev/notification',
		}),
	});
	console.log(response);
	return new Response(response.body, {
		status: 200,
		headers: {
			'content-type': 'text/html',
		},
	});
}

export const handler = async (host: string, request: Request) => {
	try {
		if (request.url === `${host}/generate`) {
			return await generateAPIChannel();
		}
		if (request.url === `${host}/notification`) {
			console.log(request);
			return Response.redirect(`${host}`);
		}
		return new Response(HTML, {
			status: 200,
		});
	} catch (error) {
		console.error(error);
		const body = `Error: ${error.message}`;
		return new Response(body, { status: 500 });
	}
};
