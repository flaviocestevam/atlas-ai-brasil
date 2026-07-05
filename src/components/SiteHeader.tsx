import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const navLinks = [
  { to: "/", label: "O Reality" },
  { to: "/mapa-vivo", label: "Mapa Vivo" },
  { to: "/inscricao", label: "Inscrição" },
  { to: "/patrocinadores", label: "Patrocinadores" },
  { to: "/assistir", label: "Assistir" },
  { to: "/faq", label: "FAQ" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl bg-background/70 border-b border-border" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-between h-16 sm:h-20">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="relative inline-flex h-2.5 w-2.5">
            <span className="absolute inset-0 rounded-full bg-electric animate-ping opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-electric" />
          </span>
          <span className="font-display font-bold tracking-tight text-base sm:text-lg">
            ATLAS AI<span className="text-electric">:</span> 27 — Brasil
          </span>
        </Link>

        {/* Desktop nav: only at lg+ (≥1024px) */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "px-4 py-2 text-sm text-foreground" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs: only at lg+ to match nav (avoids tablet overflow) */}
        <div className="hidden lg:flex items-center gap-3">
          <Link to="/patrocinadores" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Sou patrocinador
          </Link>
          <Link to="/inscricao" className="btn-primary !py-2.5 !px-5 !text-xs">
            Inscrever minha IA
          </Link>
        </div>

        {/* Hamburger: shown below lg (mobile + tablet) */}
        <button
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="lg:hidden inline-flex items-center justify-center h-11 w-11 -mr-2"
        >
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-6 bg-foreground transition-all ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-foreground transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-foreground transition-all ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl max-h-[calc(100dvh-4rem)] overflow-y-auto">
          <div className="px-5 py-6 flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-3 text-base text-foreground/90 min-h-11 flex items-center"
              >
                {l.label}
              </Link>
            ))}
            <Link to="/inscricao" onClick={() => setOpen(false)} className="btn-primary mt-4">
              Inscrever minha IA
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
