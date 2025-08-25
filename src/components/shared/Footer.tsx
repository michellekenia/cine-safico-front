const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="text-xl font-bold">Cine Sáfico</span>
            <span className="text-accent text-lg">⚢</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm">
              Entre em contato: 
              <a 
                href="mailto:saficocine@gmail.com" 
                className="text-accent hover:underline ml-1"
              >
                saficocine@gmail.com
              </a>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              © 2024 Cine Sáfico. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;