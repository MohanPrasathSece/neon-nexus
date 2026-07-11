// Vercel Serverless Function
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const leadData = req.body;

    let phone = (leadData.phone || "").replace(/[^0-9+]/g, '');
    if (phone) {
      if (phone.startsWith('+')) {
        phone = '00' + phone.slice(1);
      }
      if (phone.startsWith('41') && phone.length === 11) {
        phone = '00' + phone;
      }
      if (!phone.startsWith('0041')) {
        if (phone.startsWith('0') && !phone.startsWith('00')) {
          phone = '0041' + phone.slice(1);
        } else if (!phone.startsWith('00')) {
          phone = '0041' + phone;
        }
      }
    } else {
      phone = "0000000000";
    }

    const [first_name, ...lastNameParts] = (leadData.name || leadData.firstName + " " + leadData.lastName || "Unknown").trim().split(" ");

    const crmToken = process.env.CRM_API_TOKEN;
    const crmEndpoint = process.env.CRM_API_URL;

    if (!crmToken || !crmEndpoint) {
      console.error("Missing CRM credentials in environment variables.");
      return res.status(500).json({ error: 'Server misconfiguration' });
    }

    // Map fields correctly based on exact API docs
    
        let finalPhone = (leadData.number || leadData.phone || "").replace(/[^0-9+]/g, '');
        if (finalPhone && finalPhone.startsWith('+')) {
            finalPhone = '00' + finalPhone.slice(1);
        }
        let countryName = leadData.countryCode ? leadData.countryCode.toLowerCase() : "ch";

        const payload = {
      country_name: countryName,
      description: "OrbitX Finance",
      phone: finalPhone,
      email: leadData.email,
      first_name: first_name,
      last_name: lastNameParts.length > 0 ? lastNameParts.join(" ") : "Lead",
      custom_fields: {
        Source_ID: "website",
        How_Much_Invested: leadData.invested || "0",
        Outline_Your_Case: leadData.message || leadData.notes || ""
      }
    };

    const response = await fetch(crmEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': crmToken
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
    const errorText = await response.clone().text().catch(()=>"");
    if (errorText.toLowerCase().includes("already exist") || errorText.toLowerCase().includes("already exists")) {
        throw new Error("Failed to create account: Account already exist!");
    }

      console.error("CRM Error:", errorText);
      return res.status(response.status).json({ error: "Failed to submit to CRM", details: errorText });
    }

    try {
      const url = (typeof process !== 'undefined' && process.env && process.env.VITE_DASHBOARD_URL) || "https://lead-dashboard-orcin.vercel.app/api/increment";
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ website: "OrbitX Finance", type: (leadData.message || leadData.notes) ? "contact" : "signup", name: leadData.name, email: leadData.email})
      }).catch(() => {});
    } catch(e){}

    // Since the API response might not be JSON, safely parse it
    let data;
    try {
      data = await response.json();
    } catch {
      data = { success: true };
    }
    return 
    // Fire-and-forget: increment leads count
    try {
      const host = req.headers.host || "localhost:3000";
      const protocol = host.startsWith("localhost") ? "http" : "https";
      fetch(`${protocol}://${host}/api/leads-count`, { method: "POST" }).catch((err) =>
        console.warn("[leads-count] Failed to increment:", err)
      );
    } catch (e) {
      console.warn("[leads-count] Error triggering increment:", e);
    }

    res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error("Internal Server Error:", error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}
