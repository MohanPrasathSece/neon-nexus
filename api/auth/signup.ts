import { put } from "@vercel/blob";

const COUNTRY_DIAL_CODES: Record<string, string> = {
  IE: "353",
  CH: "41",
  FR: "33",
  BE: "32",
  CA: "1",
  US: "1",
  GB: "44",
  DE: "49",
  ES: "34",
  IT: "39",
  NL: "31",
  SE: "46",
  AU: "61",
  IN: "91",
  AE: "971",
  SG: "65",
  ZA: "27",
  BR: "55",
  MX: "52",
  JP: "81",
  CY: "357",
  AT: "43",
};

function formatPhoneForSignup(rawPhone: string, countryCode: string): string {
  let digits = rawPhone.replace(/[^0-9]/g, "");
  const dialCode = COUNTRY_DIAL_CODES[countryCode] || "41";

  for (const code of Object.values(COUNTRY_DIAL_CODES)) {
    if (digits.startsWith("00" + code)) {
      digits = digits.slice(2 + code.length);
      break;
    }
    if (digits.startsWith(code) && digits.length > code.length + 5) {
      digits = digits.slice(code.length);
      break;
    }
  }

  if (digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  return "+" + dialCode + digits;
}

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const { name, email, phone, countryCode = "CH" } = req.body;
    if (!name || !email || !phone) return res.status(400).json({ error: "Missing fields" });

    const formattedPhone = formatPhoneForSignup(phone, countryCode.toUpperCase());
    const country = countryCode.toLowerCase();

    const filename = `users/${email}.json`;
    const blob = await put(
      filename,
      JSON.stringify({ name, email, phone: formattedPhone, country }),
      {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN,
        addRandomSuffix: false,
        cacheControlMaxAge: 0,
      }
    );

    return res.status(200).json({ success: true, blob });
  } catch (error: any) {
    const rawMsg = (error?.message || error?.toString() || "").toLowerCase();

    if (rawMsg.includes("already exist") || rawMsg.includes("already exists")) {
      return res.status(409).json({ error: "already_exists" });
    }

    console.error("Signup Auth Error:", error);
    return res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
}
