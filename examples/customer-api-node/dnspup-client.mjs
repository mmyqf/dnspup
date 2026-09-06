const DEFAULT_BASE_URL = "https://api.dnspup.com";

export class DnspupApiError extends Error {
  constructor(message, { status, code, response }) {
    super(message);
    this.name = "DnspupApiError";
    this.status = status;
    this.code = code;
    this.response = response;
  }
}

export class DnspupClient {
  constructor({ apiKey, apiSecret, baseUrl = DEFAULT_BASE_URL, timeoutMs = 15_000, fetchImpl = fetch }) {
    if (!apiKey || !apiSecret) {
      throw new TypeError("apiKey and apiSecret are required");
    }
    if (!Number.isInteger(timeoutMs) || timeoutMs <= 0) {
      throw new TypeError("timeoutMs must be a positive integer");
    }

    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.baseUrl = new URL(baseUrl);
    this.timeoutMs = timeoutMs;
    this.fetch = fetchImpl;
  }

  account() {
    return this.#request("GET", "/v1/account");
  }

  tools() {
    return this.#request("GET", "/v1/tools");
  }

  nodes() {
    return this.#request("GET", "/v1/nodes");
  }

  probe(input) {
    return this.#request("POST", "/v1/probes", input);
  }

  batchProbes(input) {
    return this.#request("POST", "/v1/batch-probes", input);
  }

  websiteCheck(input) {
    return this.#request("POST", "/v1/tools/website-check", input);
  }

  monitors() {
    return this.#request("GET", "/v1/monitors");
  }

  createMonitor(input) {
    return this.#request("POST", "/v1/monitors", input);
  }

  monitor(monitorId) {
    return this.#request("GET", `/v1/monitors/${encodeURIComponent(monitorId)}`);
  }

  monitorHistory(monitorId) {
    return this.#request("GET", `/v1/monitors/${encodeURIComponent(monitorId)}/history`);
  }

  monitorEvents(monitorId) {
    return this.#request("GET", `/v1/monitors/${encodeURIComponent(monitorId)}/events`);
  }

  async #request(method, path, body) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);
    const headers = {
      Accept: "application/json",
      "X-API-Key": this.apiKey,
      "X-API-Secret": this.apiSecret,
    };

    if (body !== undefined) {
      headers["Content-Type"] = "application/json";
    }

    try {
      const response = await this.fetch(new URL(path, this.baseUrl), {
        method,
        headers,
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: controller.signal,
      });
      const text = await response.text();
      const payload = text ? parseJson(text) : null;

      if (!response.ok) {
        const error = payload?.error;
        const code = typeof error === "string" ? error : error?.code ?? payload?.code;
        const message = error?.message ?? payload?.message ?? `${response.status} ${response.statusText}`;
        throw new DnspupApiError(message, { status: response.status, code, response: payload });
      }

      return payload;
    } finally {
      clearTimeout(timeout);
    }
  }
}

function parseJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    throw new DnspupApiError("dnspup returned a non-JSON response", {
      status: 502,
      code: "invalid_upstream_response",
      response: null,
    });
  }
}
