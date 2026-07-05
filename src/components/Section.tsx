import type { ReactNode } from "react";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-7xl px-[clamp(1rem,4vw,2rem)] py-[clamp(3.5rem,8vw,7rem)] ${className}`}
    >
      {children}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-3xl mb-[clamp(2rem,5vw,4rem)] ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <div className="chip mb-5">{eyebrow}</div>}
      <h2 className="fluid-h2 font-bold tracking-tight">{title}</h2>
      {description && (
        <p className="mt-5 fluid-lead text-muted-foreground leading-relaxed">{description}</p>
      )}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-[clamp(6rem,14vw,10rem)] pb-[clamp(3rem,8vw,5rem)]">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="relative mx-auto w-full max-w-5xl px-[clamp(1rem,4vw,2rem)] text-center">
        {eyebrow && <div className="chip mx-auto mb-6">{eyebrow}</div>}
        <h1 className="fluid-h1 font-bold tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 fluid-lead text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-10 flex flex-wrap gap-3 justify-center">{children}</div>}
      </div>
    </section>
  );
}
