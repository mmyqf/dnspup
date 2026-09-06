import { createServer } from "node:http";
import { DnspupApiError, DnspupClient } from "./dnspup-client.mjs";

const client = new DnspupClient({
  apiKey: process.env.DNSPUP_API_KEY,
  apiSecret: process.env.DNSPUP_API_SECRET,
  timeoutMs: 20_000,
});
const port = Number(process.env.PORT ?? 3000);

createServer(async (request, response) => {
  if (request.method !== "POST" || request.url !== "/api/speed-test") {
    return sendJson(response, 404, { error: "not_found" });
  }

  try {
    const input = await readJson(request);
    const target = validateTarget(input.target);
    const nodeIds = validateNodeIds(input.nodeIds);
    const result = await client.probe({
      type: "http",
      target,
      ipVersion: input.ipVersion === "6" ? "6" : "4",
      count: 4,
      method: "GET",
      ...(nodeIds.length ? { nodeIds } : {}),
    });
    return sendJson(response, 200, result);
  } catch (error) {
    if (error instanceof DnspupApiError) {
      return sendJson(response, error.status, { error: error.code ?? "upstream_error" });
    }
    const status = error instanceof SyntaxError || error instanceof TypeError ? 400 : 500;
    return sendJson(response, status, { error: status === 400 ? "invalid_request" : "internal_error" });
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`dnspup speed-test example listening on http://127.0.0.1:${port}`);
});

async function readJson(request) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > 16 * 1024) {
      throw new TypeError("request body is too large");
    }
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function validateTarget(value) {
  const target = new URL(value);
  if (target.protocol !== "http:" && target.protocol !== "https:") {
    throw new TypeError("target must use HTTP or HTTPS");
  }
  if (target.username || target.password) {
    throw new TypeError("target must not contain credentials");
  }
  return target.toString();
}

function validateNodeIds(value) {
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.length > 20 || value.some((id) => typeof id !== "string" || !id)) {
    throw new TypeError("nodeIds must be an array of at most 20 non-empty strings");
  }
  return value;
}

function sendJson(response, status, body) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(body));
}
