// Vercel Serverless Function
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { firstName, lastName, email, phone, notes, source } = req.body;

    const crmToken = process.env.CRM_API_TOKEN || "AFF_1_92cbc1bc76284e19b711bab22587d75f"; // In production, this must be an environment variable

    const crmEndpoint = "https://inwo.crmcore.me/api/lead_management/api/affiliates";

    // Map fields according to assumed CRM API documentation
    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      notes: notes,
      source: source,
      token: crmToken
    };

    const response = await fetch(crmEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': \`Bearer \${crmToken}\` - Depends on exactly how the CRM API expects the token. Using payload.token as fallback.
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("CRM Error:", errorText);
      return res.status(response.status).json({ error: "Failed to submit to CRM", details: errorText });
    }

    const data = await response.json();
    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error("Internal Server Error:", error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}
