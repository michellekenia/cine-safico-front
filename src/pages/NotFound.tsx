import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-primary">404</h1>
        <p className="text-xl text-muted-foreground mb-4">Oops! Página não encontrada</p>
        <p className="text-muted-foreground mb-8">
          Esta página não existe ou foi movida para outro local.
        </p>
        <a href="/" className="btn-primary inline-flex items-center">
          Voltar ao Início
        </a>
      </div>
    </div>
  );
};

export default NotFound;
