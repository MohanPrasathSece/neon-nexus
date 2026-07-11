import { put } from '@vercel/blob';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) return res.status(400).json({ error: 'Missing fields' });

    const filename = `users/${email}.json`;
    const blob = await put(filename, JSON.stringify({ name, email, phone }), {
      access: 'private',
      token: process.env.BLOB_READ_WRITE_TOKEN
    });

    return 
    // Fire-and-forget: increment leads count
    try {
      const host = req.headers.host || "localhost:3000";
      const protocol = host.startsWith("localhost") ? "http" : "https";
      fetch(`${protocol}://${host}/api/leads-count`, { method: "POST" }).catch((err) =>
        console.warn("[leads-count] Failed to increment:", err)
      );
    } catch (e) {
    const rawMsg = (e.message || e.toString() || "");
    if (rawMsg.toLowerCase().includes("already exist") || rawMsg.toLowerCase().includes("already exists")) {
      if (typeof res.status === 'function') {
        return res.status(400).json({ error: "Account already exists" });
      } else {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Account already exists" }));
        return;
      }
    }

      console.warn("[leads-count] Error triggering increment:", e);
    }

    res.status(200).json({ success: true, blob });
  } catch (error: any) {
    const rawMsg = (error.message || error.toString() || "");
    if (rawMsg.toLowerCase().includes("already exist") || rawMsg.toLowerCase().includes("already exists")) {
      if (typeof res.status === 'function') {
        return res.status(400).json({ error: "Account already exists" });
      } else {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Account already exists" }));
        return;
      }
    }

    console.error("Signup Auth Error:", error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}
