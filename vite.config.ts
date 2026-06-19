import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { put, list } from "@vercel/blob";
import bodyParser from "body-parser";

const apiPlugin = () => ({
  name: "api-plugin",
  configureServer(server: any) {
    server.middlewares.use(bodyParser.json());
    server.middlewares.use(async (req: any, res: any, next: any) => {
      const env = loadEnv(server.config.mode, process.cwd(), "");
      const token = env.BLOB_READ_WRITE_TOKEN;
      const crmToken = env.CRM_API_TOKEN;
      const crmUrl = env.CRM_API_URL;

      if (req.url === "/api/crm" && req.method === "POST") {
        try {
          if (!crmToken || !crmUrl) {
            res.statusCode = 500;
            return res.end(JSON.stringify({ error: "Missing CRM credentials" }));
          }

          const payload = {
            first_name: req.body.firstName || 'Unknown',
            last_name: req.body.lastName || 'Unknown',
            email: req.body.email,
            phone: req.body.phone,
            description: req.body.notes || '',
            country_name: 'us',
            custom_fields: {
              Source_ID: req.body.source || 'website'
            }
          };

          const response = await fetch(crmUrl, {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              "authorization": crmToken
            },
            body: JSON.stringify(payload),
          });

          const data = await response.json().catch(() => ({}));
          res.statusCode = response.status;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(data));
        } catch (error: any) {
          console.error("CRM Proxy Error:", error);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: error.message }));
        }
        return;
      }

      if (req.url === "/api/auth/signup" && req.method === "POST") {
        try {
          const { name, email, phone } = req.body;
          if (!name || !email || !phone) {
            res.statusCode = 400;
            return res.end(JSON.stringify({ error: "Missing fields" }));
          }

          const filename = `users/${email}.json`;
          const blob = await put(filename, JSON.stringify({ name, email, phone }), {
            access: "private",
            token,
          });

          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ success: true, blob }));
        } catch (error: any) {
          console.error(error);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: error.message }));
        }
        return;
      }

      if (req.url === "/api/auth/login" && req.method === "POST") {
        try {
          const { email } = req.body;
          if (!email) {
            res.statusCode = 400;
            return res.end(JSON.stringify({ error: "Missing email" }));
          }

          const { blobs } = await list({
            prefix: `users/${email}.json`,
            token,
          });

          res.setHeader("Content-Type", "application/json");
          if (blobs.length > 0) {
            res.end(JSON.stringify({ success: true, message: "Logged in" }));
          } else {
            res.statusCode = 401;
            res.end(JSON.stringify({ error: "User not found" }));
          }
        } catch (error: any) {
          console.error(error);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: error.message }));
        }
        return;
      }

      next();
    });
  },
});

export default defineConfig({
  plugins: [react(), tailwindcss(), apiPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
