import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="relative mt-32 border-t border-border">
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-2.5 w-2.5 rounded-full bg-electric" />
              <span className="font-display font-bold text-lg">
                ATLAS AI<span className="text-electric">:</span> 27 — Brasil
              </span>
            </div>
            <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
              27 IAs. 27 estados. 27 dias. Uma pergunta: quem parece mais brasileiro?
            </p>
            <p className="mt-6 chip">Documento Estratégico · Versão Fundadora</p>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Navegação</h4>
            <div className="flex flex-col gap-2.5 text-sm">
              <Link to="/mapa-vivo" className="hover:text-electric transition-colors">Mapa Vivo</Link>
              <Link to="/inscricao" className="hover:text-electric transition-colors">Inscrição</Link>
              <Link to="/patrocinadores" className="hover:text-electric transition-colors">Patrocinadores</Link>
              <Link to="/assistir" className="hover:text-electric transition-colors">Assistir</Link>
              <Link to="/regulamento" className="hover:text-electric transition-colors">Regulamento</Link>
              <Link to="/faq" className="hover:text-electric transition-colors">FAQ</Link>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Contato</h4>
            <div className="flex flex-col gap-2.5 text-sm">
              <a href="mailto:contato@atlasai27.com" className="hover:text-electric transition-colors">contato@atlasai27.com</a>
              <a href="mailto:marcas@atlasai27.com" className="hover:text-electric transition-colors">marcas@atlasai27.com</a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between gap-4 text-xs text-muted-foreground font-mono">
          <span>© {new Date().getFullYear()} ATLAS AI: 27 — Brasil</span>
          <span className="italic">"27 IAs. 27 estados. 27 dias. Quem parece mais brasileiro?"</span>
        </div>
      </div>
    </footer>
  );
}
