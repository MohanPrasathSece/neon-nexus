// Vercel Serverless Function

const COUNTRY_DIAL_CODES: Record<string, string> = {
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

function formatPhoneForCrm(rawPhone: string, countryCode: string): string {
  // Strip everything except digits
  let digits = rawPhone.replace(/[^0-9]/g, "");

  const dialCode = COUNTRY_DIAL_CODES[countryCode] || "41";

  // Remove any leading country dial code prefixes to avoid duplication
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

  // Remove a leading zero from local number
  if (digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  // Return CRM format: 00 + dialCode + localNumber
  return "00" + dialCode + digits;
}

export default async function handler(req: any, res: any) {
  // CORS preflight
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const leadData = req.body;

    // Determine lead type (signup vs contact)
    const leadType: "signup" | "contact" =
      leadData.source && leadData.source.includes("signup") ? "signup" : "contact";

    const rawPhone = (leadData.phone || leadData.number || "").trim();
    const countryCodeKey = (leadData.countryCode || "CH").toUpperCase();
    const formattedPhone = rawPhone
      ? formatPhoneForCrm(rawPhone, countryCodeKey)
      : "0000000000";

    const countryName = countryCodeKey.toLowerCase();

    const [first_name, ...lastNameParts] = (
      leadData.name ||
      (leadData.firstName ? leadData.firstName + " " + leadData.lastName : "Unknown")
    )
      .trim()
      .split(" ");

    const crmToken = process.env.CRM_API_TOKEN;
    const crmEndpoint = process.env.CRM_API_URL;

    if (!crmToken || !crmEndpoint) {
      console.error("Missing CRM credentials in environment variables.");
      return res.status(500).json({ error: "Server misconfiguration" });
    }

    const payload = {
      country_name: countryName,
      description: "OrbitX Finance",
      phone: formattedPhone,
      email: leadData.email,
      first_name: first_name,
      last_name: lastNameParts.length > 0 ? lastNameParts.join(" ") : "",
      custom_fields: {
        Source_ID: "website",
        How_Much_Invested: leadData.invested || "0",
        Outline_Your_Case: leadData.message || leadData.notes || "",
      },
    };

    const response = await fetch(crmEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${crmToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // Ignore CRM errors so the user can still create their account
      return res.status(200).json({ success: true, ignoredError: true });
    }

    // ✅ CRM accepted — now increment the lead dashboard counter
    try {
      const dashboardUrl =
        process.env.VITE_DASHBOARD_URL ||
        "https://lead-dashboard-orcin.vercel.app/api/increment";
      await fetch(dashboardUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          website: "OrbitX Finance",
          type: leadType,
          name: leadData.name,
          email: leadData.email,
        }),
      }).catch(() => {});
    } catch (e) {
      // fire-and-forget, never fail the main response
    }

    let data: any;
    try {
      data = await response.json();
    } catch {
      data = { success: true };
    }

    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error("Internal Server Error:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
}
