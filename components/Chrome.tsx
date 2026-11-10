import Link from "next/link";
import { T, localePrefix, type Locale } from "@/lib/i18n";
import { REPORT_URL } from "@/lib/site";

/** Header + footer localises. Le lien de langue bascule FR <-> EN. */
export function Chrome({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const t = T[locale].chrome;
  const p = localePrefix(locale);
  const otherLocale: Locale = locale === "fr" ? "en" : "fr";
  const otherHref = otherLocale === "en" ? "/en" : "/";
  // Changement de langue = changement de layout racine (lang du <html>) : lien classique.
  const otherLabel = otherLocale === "en" ? "EN" : "FR";

  return (
    <>
      <header className="glass sticky top-0 z-50">
        <nav className="container mx-auto px-4 h-14 flex items-center justify-between" aria-label="Navigation">
          <Link href={p || "/"} className="font-bold text-lg tracking-tight">
            Trekr<span className="text-accent">.</span>
            <span className="ml-1.5 text-xs font-medium text-muted-foreground align-middle">
              {locale === "fr" ? "Maroc" : "Morocco"} 🇲🇦
            </span>
          </Link>
          <div className="flex items-center gap-0.5 md:gap-1 overflow-x-auto">
            {[
              { href: `${p}/circuits`, label: t.circuits },
              { href: `${p}/aeroport`, label: t.airport },
              { href: `${p}/2030`, label: t.wc2030 },
              { href: `${p}/carbone`, label: locale === "fr" ? "Carbone" : "Carbon" },
              { href: `${p}/mission`, label: "Mission" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-3 py-1.5 rounded-full text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors whitespace-nowrap"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href={otherHref}
              aria-label={otherLocale === "en" ? "Switch to English" : "Passer en français"}
              className="px-3 py-1.5 rounded-full text-sm font-semibold border border-border text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
            >
              {otherLabel}
            </Link>
          </div>
        </nav>
      </header>

      <div className="flex-1">{children}</div>

      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8 text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            {t.footerLine}{" "}
            <a href="https://www.oncf-voyages.ma" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              {t.ticketsOn}
            </a>
            .
          </p>
          <p className="text-xs text-muted-foreground">{t.footerHonesty}</p>
          <p className="text-xs text-muted-foreground">
            <Link href={`${p}/mission`} className="text-accent hover:underline">
              {locale === "fr" ? "Projet d'utilité publique : gratuit, sans publicité, sans traceur" : "Public-interest project: free, no ads, no trackers"}
            </Link>
            {" · "}
            <a href={REPORT_URL} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              {locale === "fr" ? "Signaler une erreur" : "Report an error"}
            </a>
          </p>
        </div>
      </footer>

    </>
  );
}
