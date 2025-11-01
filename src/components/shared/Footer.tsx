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

          {/* Right: Contact */}
          <div className="text-center md:text-right">
            <p className="text-sm">
              Entre em contato: 
              <a 
                href="mailto:saficocine@gmail.com" 
                className="text-white hover:underline ml-1"
              >
                saficocine@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;