import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Sobre o Cine Sáfico
          </h1>
          <p className="text-xl text-muted-foreground">
            Celebrando a diversidade e autenticidade do cinema LGBTQ+ feminino
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="bg-gradient-card rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-primary mb-6">Nossa Missão</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-foreground leading-relaxed mb-6">
                O Cine Sáfico nasce da necessidade de criar um espaço dedicado à representação 
                autêntica e diversa de mulheres LGBTQ+ no cinema. Acreditamos que as histórias 
                sáficas merecem ser contadas, vistas e celebradas em toda sua complexidade e beleza.
              </p>
              <p className="text-foreground leading-relaxed mb-6">
                Nosso objetivo é conectar amantes do cinema com obras que retratam experiências 
                lésbicas, bissexuais e queer femininas de forma genuína, longe de estereótipos 
                e representações superficiais.
              </p>
              <p className="text-foreground leading-relaxed">
                Mais que um catálogo, somos uma comunidade que valoriza a arte cinematográfica 
                como ferramenta de representação, empoderamento e transformação social.
              </p>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">Nossa Visão</h2>
              <p className="text-foreground leading-relaxed mb-4">
                Sonhamos com um futuro onde histórias sáficas não sejam mais raras ou marginalizadas, 
                mas sim parte natural e celebrada do panorama cinematográfico mundial.
              </p>
              <p className="text-foreground leading-relaxed mb-4">
                Queremos ser a referência para quem busca representação autêntica, 
                conectando pessoas através de narrativas que tocam, inspiram e transformam.
              </p>
              <p className="text-foreground leading-relaxed">
                Acreditamos no poder transformador do cinema e no direito de todas as pessoas 
                se verem representadas na tela grande.
              </p>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-accent rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Nossos Valores</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Representação autêntica e diversa</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Inclusão e respeito à diversidade</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Qualidade cinematográfica</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Comunidade e conexão</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Transformação social através da arte</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section>
          <div className="text-center bg-muted/30 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-primary mb-6">Junte-se à Nossa Comunidade</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Faça parte de uma comunidade que celebra a diversidade, compartilha descobertas 
              cinematográficas e constrói um futuro com mais representação sáfica no cinema.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/filmes" 
                className="btn-secondary inline-flex items-center justify-center"
              >
                Explorar Filmes
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;