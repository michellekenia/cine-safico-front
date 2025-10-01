// Componente de barra de carregamento simples
const LoadingBar = () => {
  return (
    <div className="w-full h-1 bg-accent/20 relative overflow-hidden rounded-full">
      <div className="absolute top-0 left-0 h-full bg-accent animate-pulse" style={{width: '60%'}} />
    </div>
  );
};

export default LoadingBar;
