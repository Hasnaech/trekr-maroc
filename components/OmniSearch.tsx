"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { parseOmni } from "@/lib/omni";
import { T, localePrefix, type Locale } from "@/lib/i18n";

/**
 * Recherche magique : une phrase en francais, anglais ou darija,
 * l'axe est compris et le trajet s'ouvre. Heuristique locale,
 * sans serveur : fonctionne hors ligne et repond instantanement.
 */
export default function OmniSearch({ locale }: { locale: Locale }) {
  const router = useRouter();
  const t = T[locale].omni;
  const p = localePrefix(locale);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const submit = (text: string) => {
    const parsed = parseOmni(text);
    if (parsed) {
      setError("");
      router.push(`${p}/train/${parsed.origin}/${parsed.destination}`);
    } else {
      setError(t.error + t.examples[0]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mb-4">
      <form
        className="glass rounded-[24px] p-2 pl-4 flex items-center gap-2 card-in"
        onSubmit={(e) => {
          e.preventDefault();
          submit(value);
        }}
      >
        <Sparkles className="w-4 h-4 text-accent flex-shrink-0" aria-hidden="true" />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={t.placeholder}
          aria-label={t.placeholder}
          className="flex-1 bg-transparent text-sm py-2.5 focus:outline-none placeholder:text-muted-foreground"
          dir="auto"
        />
        <button
          type="submit"
          className="rounded-2xl bg-accent text-white text-sm font-semibold px-5 py-2.5 spring hover:scale-[1.03] hover:brightness-105 flex-shrink-0"
        >
          {t.go}
        </button>
      </form>

      {error && (
        <p role="alert" className="text-xs text-red-600 dark:text-red-400 mt-2 text-center">{error}</p>
      )}

      <div className="mt-3 flex flex-wrap justify-center gap-1.5">
        {t.examples.map((ex) => (
          <button
            key={ex}
            type="button"
            onClick={() => {
              setValue(ex);
              submit(ex);
            }}
            dir="auto"
            className="text-[11px] px-2.5 py-1 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-accent/50 transition-colors"
          >
            {ex}
          </button>
        ))}
      </div>
      <p className="text-[10px] text-muted-foreground text-center mt-2">{t.note}</p>
    </div>
  );
}
