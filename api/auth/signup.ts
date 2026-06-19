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

    return res.status(200).json({ success: true, blob });
  } catch (error: any) {
    console.error("Signup Auth Error:", error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}
