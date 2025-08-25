import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">Cine Sáfico</span>
            <span className="text-accent text-xl">⚢</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'text-accent' : ''}`}
            >
              Início
            </Link>
            <Link 
              to="/filmes" 
              className={`nav-link ${isActive('/filmes') ? 'text-accent' : ''}`}
            >
              Todos os Filmes
            </Link>
            <Link 
              to="/sobre" 
              className={`nav-link ${isActive('/sobre') ? 'text-accent' : ''}`}
            >
              Sobre
            </Link>
          </nav>

          {/* Login Button */}
          <Link to="/login">
            <Button variant="outline" size="sm" className="font-medium">
              Entrar
            </Button>
          </Link>

          {/* Mobile Navigation */}
          <nav className="md:hidden flex items-center space-x-4">
            <Link to="/filmes" className="nav-link text-sm">Filmes</Link>
            <Link to="/sobre" className="nav-link text-sm">Sobre</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;