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
