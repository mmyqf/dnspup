import assert from "node:assert/strict";
import test from "node:test";
import { DnspupApiError, DnspupClient } from "./dnspup-client.mjs";

test("requires server-side credentials", () => {
  assert.throws(() => new DnspupClient({}), /apiKey and apiSecret/);
});

test("sends an authenticated HTTP probe", async () => {
  let captured;
  const client = new DnspupClient({
    apiKey: "key",
    apiSecret: "secret",
    fetchImpl: async (url, options) => {
      captured = { url: url.toString(), options };
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    },
  });

  const body = { type: "http", target: "https://example.com", method: "GET" };
  assert.deepEqual(await client.probe(body), { ok: true });
  assert.equal(captured.url, "https://api.dnspup.com/v1/probes");
  assert.equal(captured.options.method, "POST");
  assert.equal(captured.options.headers["X-API-Key"], "key");
  assert.equal(captured.options.headers["X-API-Secret"], "secret");
  assert.equal(captured.options.body, JSON.stringify(body));
});

test("preserves the stable API error code", async () => {
  const client = new DnspupClient({
    apiKey: "key",
    apiSecret: "secret",
    fetchImpl: async () => new Response(JSON.stringify({ error: { code: "rate_limited", message: "slow down" } }), {
      status: 429,
      statusText: "Too Many Requests",
    }),
  });

  await assert.rejects(client.nodes(), (error) => {
    assert.ok(error instanceof DnspupApiError);
    assert.equal(error.status, 429);
    assert.equal(error.code, "rate_limited");
    return true;
  });
});

test("rejects non-JSON upstream responses", async () => {
  const client = new DnspupClient({
    apiKey: "key",
    apiSecret: "secret",
    fetchImpl: async () => new Response("gateway error", { status: 502 }),
  });

  await assert.rejects(client.account(), (error) => {
    assert.ok(error instanceof DnspupApiError);
    assert.equal(error.code, "invalid_upstream_response");
    return true;
  });
});
