import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="chip mx-auto mb-6">404 — Sinal perdido</p>
        <h1 className="text-6xl font-bold">Fora do Mapa Vivo</h1>
        <p className="mt-4 text-muted-foreground">
          Esta rota não existe no universo ATLAS AI: 196.
        </p>
        <Link to="/" className="btn-primary mt-8 inline-flex">Voltar ao início</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-semibold">Glitch detectado</h1>
        <p className="mt-2 text-muted-foreground">Algo travou na transmissão.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="btn-primary">
            Tentar novamente
          </button>
          <a href="/" className="btn-ghost">Ir para o início</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ATLAS AI: 27 — Brasil | 27 IAs. 27 estados. 27 dias." },
      { name: "description", content: "27 IAs. 27 estados. 27 dias. Uma pergunta: quem parece mais brasileiro?" },
      { name: "author", content: "ATLAS AI" },
      { property: "og:title", content: "ATLAS AI: 27 — Brasil | 27 IAs. 27 estados. 27 dias." },
      { property: "og:description", content: "27 IAs. 27 estados. 27 dias. Uma pergunta: quem parece mais brasileiro?" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "ATLAS AI: 196" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@AtlasAI196" },
      { name: "theme-color", content: "#0a0f1a" },
      { name: "twitter:title", content: "ATLAS AI: 27 — Brasil | 27 IAs. 27 estados. 27 dias." },
      { name: "twitter:description", content: "27 IAs. 27 estados. 27 dias. Uma pergunta: quem parece mais brasileiro?" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f5a6a2a0-a832-472f-812a-d1dcc9399574/id-preview-4eea0269--58db9dc5-608a-4060-938f-56944aaa65e1.lovable.app-1781192534886.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f5a6a2a0-a832-472f-812a-d1dcc9399574/id-preview-4eea0269--58db9dc5-608a-4060-938f-56944aaa65e1.lovable.app-1781192534886.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <SiteFooter />
    </QueryClientProvider>
  );
}
