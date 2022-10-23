import { serve } from 'https://deno.land/std@0.160.0/http/server.ts';
import { handler } from './drive.google.ts';

const port = 8080;

console.log(`Server running.`);
await serve(handler, { port });
