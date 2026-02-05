import { Github, Linkedin, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full glass-dark border-t border-white/10 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                <span className="text-dark font-bold text-xl">C</span>
              </div>
              <span className="text-xl font-bold text-accent">ComentaApp</span>
            </div>
            <p className="text-accent-darkGray text-sm">
              Plataforma de reclamações urbanas para melhorar nossa cidade.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-accent font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-accent-darkGray hover:text-primary transition-colors text-sm"
                >
                  Sobre nós
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-accent-darkGray hover:text-primary transition-colors text-sm"
                >
                  Como funciona
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-accent-darkGray hover:text-primary transition-colors text-sm"
                >
                  Termos de uso
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-accent-darkGray hover:text-primary transition-colors text-sm"
                >
                  Privacidade
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-accent font-semibold mb-4">Redes Sociais</h3>
            <div className="flex gap-3">
              <a
                href="https://github.com/jvandraade/comentaapp2.0"
                target="_blank"
                className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Github className="w-5 h-5 text-accent-gray" />
              </a>
              <a
                href="https://www.linkedin.com/in/joão-vitor-andrade-santos/"
                target="_blank"
                className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Linkedin className="w-5 h-5 text-accent-gray" />
              </a>
              <a
                href="https://www.instagram.com/vitao_andraade/"
                target="_blank"
                className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Instagram className="w-5 h-5 text-accent-gray" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-accent-darkGray text-sm">
            © 2026 ComentaApp. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
