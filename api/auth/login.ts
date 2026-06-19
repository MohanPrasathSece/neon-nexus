import { list } from '@vercel/blob';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Missing email' });

    const prefix = `users/${email}.json`;
    const { blobs } = await list({
      prefix,
      token: process.env.BLOB_READ_WRITE_TOKEN
    });

    if (blobs.length > 0) {
      return res.status(200).json({ success: true, message: "Logged in" });
    } else {
      return res.status(401).json({ error: "User not found" });
    }
  } catch (error: any) {
    console.error("Login Auth Error:", error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}
