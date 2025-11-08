import XLogo from "./XLogo";
import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#2F3E46] text-secondary-foreground mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left: Cine Sáfico */}
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="text-xl font-bold">Cine Sáfico</span>
            <span className="text-accent text-lg">⚢</span>
          </div>

          {/* Center: Copyright */}
          <div className="flex-1 flex justify-center mb-4 md:mb-0">
            <p className="text-xs text-white">© 2025 Cine Sáfico</p>
          </div>

          {/* Right: Contact & Social */}
          <div className="flex items-center space-x-4">
            <a 
              href="mailto:saficocine@gmail.com" 
              className="text-sm text-white hover:underline"
            >
              saficocine@gmail.com
            </a>
            <a 
              href="https://x.com/saficocine" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-accent transition-colors"
              aria-label="Seguir no X (Twitter)"
            >
              <XLogo className="h-4 w-4" />
            </a>
            <a 
              href="https://www.instagram.com/saficocine/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-accent transition-colors"
              aria-label="Seguir no Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;