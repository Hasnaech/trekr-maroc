"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import type { Locale } from "@/lib/i18n";

/**
 * Concierge Trekr : chat flottant ancre sur les donnees du moteur
 * (route API /api/concierge). Sans cle API configuree, message
 * honnete et renvoi vers la recherche magique. Jamais de reponse
 * inventee : le perimetre est garanti cote serveur.
 */

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const T_UI = {
  fr: {
    title: "Concierge Trekr",
    subtitle: "Trajets, horaires théoriques, immersion : je réponds depuis les données du moteur.",
    placeholder: "Posez votre question...",
    open: "Ouvrir le concierge",
    close: "Fermer",
    hello: "Salam ! Je suis le concierge Trekr. Demandez-moi un trajet (\"Casa vers Fès ?\"), un circuit, ou quoi voir et goûter dans une ville marocaine.",
    noKey: "Le concierge IA n'est pas encore activé sur ce déploiement (clé API absente). Utilisez la recherche magique de la page d'accueil : elle comprend le français, l'anglais et la darija.",
    error: "Petit souci technique. Réessayez dans un instant, ou utilisez la recherche de la page d'accueil.",
    thinking: "...",
  },
  en: {
    title: "Trekr Concierge",
    subtitle: "Routes, theoretical timetables, local immersion: I answer from the engine's data.",
    placeholder: "Ask your question...",
    open: "Open the concierge",
    close: "Close",
    hello: "Salam! I'm the Trekr concierge. Ask me for a route (\"Casa to Fes?\"), a circuit, or what to see and taste in a Moroccan city.",
    noKey: "The AI concierge is not enabled on this deployment yet (missing API key). Use the magic search on the homepage: it understands English, French and Darija.",
    error: "Small technical issue. Try again in a moment, or use the homepage search.",
    thinking: "...",
  },
};

export default function Concierge({ locale }: { locale: Locale }) {
  const t = T_UI[locale];
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, busy]);

  const send = async () => {
    const text = input.trim();
    if (!text || busy) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      if (data.error === "no_key") {
        setMessages([...next, { role: "assistant", content: t.noKey }]);
      } else if (data.reply) {
        setMessages([...next, { role: "assistant", content: data.reply }]);
      } else {
        setMessages([...next, { role: "assistant", content: t.error }]);
      }
    } catch {
      setMessages([...next, { role: "assistant", content: t.error }]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? t.close : t.open}
        className="fixed bottom-5 right-5 z-50 w-13 h-13 p-3.5 rounded-full bg-marine text-white shadow-lg spring hover:scale-110"
      >
        {open ? <X className="w-5 h-5" aria-hidden="true" /> : <MessageCircle className="w-5 h-5" aria-hidden="true" />}
      </button>

      {/* Panneau */}
      {open && (
        <div className="fixed bottom-20 right-5 z-50 w-[min(92vw,380px)] glass rounded-[24px] shadow-2xl flex flex-col overflow-hidden card-in" style={{ height: "min(70vh, 520px)" }}>
          <div className="px-4 py-3 border-b border-border bg-marine text-white">
            <p className="font-bold text-sm">🧞 {t.title}</p>
            <p className="text-[10px] text-white/75 leading-snug">{t.subtitle}</p>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            <Bubble role="assistant">{t.hello}</Bubble>
            {messages.map((m, i) => (
              <Bubble key={i} role={m.role}>{m.content}</Bubble>
            ))}
            {busy && <Bubble role="assistant">{t.thinking}</Bubble>}
            <div ref={bottomRef} />
          </div>

          <form
            className="p-2 border-t border-border flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.placeholder}
              aria-label={t.placeholder}
              dir="auto"
              className="flex-1 bg-transparent text-sm px-2 py-2 focus:outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Envoyer"
              className="p-2.5 rounded-xl bg-accent text-white disabled:opacity-40 spring hover:scale-105"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

function Bubble({ role, children }: { role: "user" | "assistant"; children: React.ReactNode }) {
  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-3 py-2 leading-relaxed whitespace-pre-wrap ${
          role === "user" ? "bg-accent text-white" : "bg-muted text-foreground"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
