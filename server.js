import { createServer } from "node:http";
import { hostname } from "node:os";

const port = Number(process.env.PORT ?? 3000);
const host = process.env.HOST ?? "127.0.0.1";
const greeting = process.env.GREETING || "Hello from Dewaweb";

const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

createServer((req, res) => {
	if (req.url === "/health") {
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ status: "ok" }));
		return;
	}
	const safeGreeting = escapeHtml(greeting);
	res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
	res.end(`<!doctype html><title>${safeGreeting}</title><h1>${safeGreeting}</h1><p>Served by ${hostname()} at ${new Date().toISOString()}</p>`);
}).listen(port, host, () => console.log(`listening on ${host}:${port}`));
