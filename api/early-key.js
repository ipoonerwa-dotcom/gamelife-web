// 11-14, the Gang site's only server code (a Vercel function, deployed as /api/early-key; tools/build_gang_site.mjs copies
// it to api/early-key.js in the site, which has no package.json, so it runs as CommonJS). It releases the key of a locked chapter's early text (chapters-cz/C*.early, made
// by tools/encrypt_early.mjs) once FirstPageVault reports that chapter open: total tax has reached its threshold, or its
// fallback day has come. Until then it refuses. The keys are only in the EARLY_KEYS environment variable (one line of
// JSON, {"C3":"<64 hex>",…}); without it the endpoint says so and the site waits for the time lock as before.
//
//   GET /api/early-key?c=C3   200 {"chapter":"C3","key":"…"} | 403 not open yet | 400 bad chapter | 502 chain | 503 no keys
//
// chapter(i) returns (number, taxThreshold, latest, open, openedAt, hash, key); `open` is the vault's own projection,
// the same one status() shows, so the key comes out the moment the threshold is met even before anyone syncs the vault.
const VAULT = "0xB054061A66D796D8530287DFa1D3112c634Bfc1E";
const RPC = ["https://bsc-dataseed.bnbchain.org", "https://bsc-dataseed1.defibit.io", "https://bsc-rpc.publicnode.com"];
const INDEX = { C3: 0, C4: 1, C5: 2, C6: 3, C7: 4 };
const CHAPTER = "0xa3ef2041"; // chapter(uint256)

module.exports = async function earlyKey(req, res) {
  const send = (status, body, cache = "no-store") => {
    res.statusCode = status;
    res.setHeader("content-type", "application/json; charset=utf-8");
    res.setHeader("cache-control", cache);
    res.end(JSON.stringify(body));
  };
  const c = new URL(req.url || "/", "http://site").searchParams.get("c") || "";
  if (!Object.prototype.hasOwnProperty.call(INDEX, c)) return send(400, { error: "bad chapter" });

  let key = "";
  try {
    key = String(JSON.parse(process.env.EARLY_KEYS || "{}")[c] || "");
  } catch {
    key = "";
  }
  if (!/^[0-9a-f]{64}$/.test(key)) return send(503, { error: "early keys are not configured" });

  const data = CHAPTER + INDEX[c].toString(16).padStart(64, "0");
  let ret = "";
  for (const url of RPC) {
    try {
      const r = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "eth_call", params: [{ to: VAULT, data }, "latest"] }),
        signal: AbortSignal.timeout(8000),
      });
      const j = await r.json();
      if (typeof j.result === "string" && j.result.length >= 2 + 64 * 4) {
        ret = j.result;
        break;
      }
    } catch {
      /* the next node */
    }
  }
  if (!ret) return send(502, { error: "could not read the vault" });

  const open = BigInt("0x" + ret.slice(2 + 64 * 3, 2 + 64 * 4)) !== 0n;
  if (!open) return send(403, { error: "this chapter has not opened yet" });
  return send(200, { chapter: c, key }, "public, max-age=300");
};
