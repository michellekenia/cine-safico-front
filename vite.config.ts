import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    proxy: {
      // Qualquer requisição que comece com /api...
      '/api': {
        // ...será redirecionada para o seu backend na Render.
        target: 'https://cine-safico.onrender.com',
        // Muda a 'origin' do header para o target, essencial para o CORS funcionar
        changeOrigin: true,
        // Remove o /api do início da URL antes de enviar para o backend
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
