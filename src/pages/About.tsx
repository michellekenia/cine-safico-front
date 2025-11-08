import { Link } from "react-router-dom";
import useScrollToTop from "../hooks/useScrollToTop";

const About = () => {
  useScrollToTop();

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Cine Sáfico
          </h1>
          <p className="text-xl text-muted-foreground">
            Celebrando a diversidade e autenticidade do cinema LBT feminino
          </p>
        </div>

        {/* Missão */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-[#4b2676] via-[#6d3fa9] to-[#b983ff] border-2 border-[#4b2676] rounded-2xl shadow-2xl p-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-white leading-relaxed mb-6 text-lg md:text-xl">
                <strong className="text-white text-2xl font-bold">Cine Sáfico</strong> nasce da necessidade de criar um espaço dedicado à
                representação de mulheres LBT no cinema. Acreditamos que as histórias
                sáficas devem ser contadas, vistas e celebradas em toda sua
                complexidade e beleza.
              </p>
              <p className="text-white leading-relaxed mb-6 text-lg md:text-xl">
                Nosso objetivo é conectar amantes do cinema com obras que retratam
                experiências lésbicas, bissexuais e queer femininas de forma
                genuína, longe de estereótipos e representações superficiais.
              </p>
              <p className="text-white leading-relaxed text-lg md:text-xl">
                Mais que um catálogo, queremos construir uma comunidade, unindo
                pessoas que valorizam a arte cinematográfica como ferramenta de
                representação e transformação social.
              </p>
            </div>
          </div>
        </section>

        {/* Dedicação e Transparência */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-6">Compromisso</h2>
          <div className="flex flex-col gap-8">
            <div className="bg-muted/40 border border-[#e5d8f6] rounded-xl shadow p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">Explorando o Cinema Sáfico com Eficiência</h3>
              <p className="text-muted-foreground leading-relaxed text-lg md:text-xl">
As informações sobre produções sáficas ainda são insuficientes e dispersas, exigindo que o público gaste horas vasculhando a internet para descobrir o que assistir e onde encontrar. Por isso, o Cine Sáfico tem como objetivo centralizar esses dados e, assim, diminuir o tempo gasto na busca pelo filme ideal.              </p>
            </div>
            <div className="bg-muted/40 border border-[#e5d8f6] rounded-xl shadow p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">Transparência e Credibilidade da Fonte</h3>
              <p className="text-muted-foreground leading-relaxed text-lg md:text-xl">
                Toda a base de dados do catálogo foi construída a partir de uma lista de filmes sáficos do Letterboxd. Todas as informações, incluindo avaliações, são provenientes dessa fonte original. Nosso foco principal está na eficiência da informação e na qualidade da experiência de uso, tornando sua busca por cinema sáfico mais rápida e prazerosa.
              </p>
            </div>
          </div>
        </section>

        {/* Futuro */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-6">Construindo o Futuro</h2>
          <div className="bg-gradient-to-br from-[#4b2676] via-[#6d3fa9] to-[#b983ff] border-2 border-[#4b2676] rounded-2xl shadow-2xl p-8">
            <div className="prose prose-xl max-w-none flex flex-col items-start justify-center">
              <div className="w-full">
                <p className="text-[#f3eaff] leading-relaxed text-lg md:text-xl mb-6">
                  Queremos ser uma comunidade e para isso temos um caminho a percorrer.
                </p>
                <p className="text-[#f3eaff] leading-relaxed mb-4 text-lg md:text-xl">
                  A plataforma receberá novas funcionalidades em breve, e para construirmos o melhor, precisamos trabalhar em conjunto.
                </p>
                <p className="text-[#f3eaff] leading-relaxed mb-4 text-lg md:text-xl">
                  Se você quer contribuir com essa evolução, entre em contato:
                </p>
                <p className="text-[#f3eaff] leading-relaxed flex items-center gap-3 text-lg md:text-xl">
                  <span aria-label="E-mail" title="E-mail">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f3eaff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="5" width="18" height="14" rx="2"/>
                      <polyline points="3 7 12 13 21 7"/>
                    </svg>
                  </span>
                  saficocine@gmail.com
                </p>
                
                {/* Redes Sociais */}
                <div className="flex flex-col gap-3 mt-3">
                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/saficocine/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[#f3eaff] hover:text-white transition-colors duration-200 group text-lg md:text-xl"
                    aria-label="Seguir no Instagram"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="currentColor" strokeWidth="2"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <span className="group-hover:underline">@saficocine</span>
                  </a>
                  
                  {/* X (Twitter) */}
                  <a
                    href="https://x.com/saficocine"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[#f3eaff] hover:text-white transition-colors duration-200 group text-lg md:text-xl"
                    aria-label="Seguir no X"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <span className="group-hover:underline">@saficocine</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Time */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-6 text-center">Time</h2>
          <div className="prose prose-lg max-w-none grid md:grid-cols-3 gap-8">
            {/* Michelle Kênia */}
            <div className="flex flex-col items-center gap-2 mb-4 bg-muted/40 rounded-xl shadow p-6 text-center transition-transform duration-200 hover:scale-105 hover:shadow-2xl border border-[#e5d8f6]">
              <div className="w-24 h-24 rounded-full mb-3 flex items-center justify-center overflow-hidden border-4 border-[#b983ff] bg-muted">
                <img src="/team/michelle.jpeg" alt="Michelle Kênia" className="w-full h-full object-cover rounded-full" />
              </div>
              <div className="flex flex-col items-center">
                <strong className="text-center">
                  Ideação<br />& Desenvolvimento
                </strong>
                <span className="text-center">Michelle Kênia</span>
              </div>
              <a
                href="https://github.com/michellekenia"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2"
                aria-label="GitHub Michelle Kênia"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.868 8.184 6.839 9.525.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.274.098-2.656 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.382.202 2.402.1 2.656.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.135 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" fill="#333"/>
                </svg>
              </a>
            </div>
            {/* Cristiano Pereira */}
            <div className="flex flex-col items-center gap-2 mb-4 bg-muted/40 rounded-xl shadow p-6 text-center transition-transform duration-200 hover:scale-105 hover:shadow-2xl border border-[#e5d8f6]">
              <div className="w-24 h-24 rounded-full mb-3 flex items-center justify-center overflow-hidden border-4 border-[#b983ff] bg-muted">
                <img src="/team/cris.jpeg" alt="Cristiano Pereira" className="w-full h-full object-cover rounded-full" />
              </div>
              <div className="flex flex-col items-center">
                <strong className="text-center">
                  Mentoria Técnica<br />& Desenvolvimento
                </strong>
                <span className="text-center">Cristiano Pereira</span>
              </div>
              <a
                href="https://github.com/CrisPer12"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2"
                aria-label="GitHub Cristiano Pereira"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.868 8.184 6.839 9.525.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.274.098-2.656 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.382.202 2.402.1 2.656.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.135 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" fill="#333"/>
                </svg>
              </a>
            </div>
            {/* Tali de Melo */}
            <div className="flex flex-col items-center gap-2 mb-4 bg-muted/40 rounded-xl shadow p-6 text-center transition-transform duration-200 hover:scale-105 hover:shadow-2xl border border-[#e5d8f6]">
              <div className="w-24 h-24 rounded-full mb-3 flex items-center justify-center overflow-hidden border-4 border-[#b983ff] bg-muted">
                <img src="/team/tali.jpeg" alt="Tali de Melo" className="w-full h-full object-cover rounded-full" />
              </div>
              <div className="flex flex-col items-center">
                <strong className="text-center">Curadoria</strong>
                <span className="text-center">Tali de Melo</span>
              </div>
              <a
                href="https://letterboxd.com/osasco12/lists/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex flex-col items-center"
                aria-label="Perfil Letterboxd Tali de Melo"
              >
                <svg width="100" height="40" viewBox="0 0 260 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="60" cy="40" r="30" fill="#ff8c2a" />
                  <circle cx="130" cy="40" r="30" fill="#43e77a" />
                  <circle cx="200" cy="40" r="30" fill="#3fd7ff" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Comunidade */}
        <section className="mb-12">
          <div className="prose prose-lg max-w-none bg-muted/40 rounded-xl shadow p-6 text-center flex flex-col items-center justify-center border border-[#e5d8f6]">
            <h2 className="text-3xl font-bold text-primary mb-6 text-center">
              Junte-se à Nossa Comunidade
            </h2>
            <p className="text-lg text-muted-foreground mb-8 text-center max-w-2xl">
              Faça parte de uma comunidade que celebra a diversidade, compartilha
              descobertas cinematográficas e constrói um futuro com mais
              representação sáfica no cinema.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/filmes"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-br from-[#7c2ae8] via-[#a259ff] to-[#b983ff] hover:brightness-110 transition-shadow shadow-lg"
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