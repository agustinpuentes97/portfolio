"use client";
import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "../data/projects";
import { ABOUT } from "../data/about";
import { I18N } from "../data/i18n";

const isImg = c => /^(https?:|data:|\/|\.)/.test(c);
const bg = c => (isImg(c) ? `url("${c}")` : c);
const pad = n => String(n + 1).padStart(2, "0");

const Sun = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
);
const Moon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" /></svg>
);

export default function Portfolio() {
  const ovRef = useRef(null);
  const [view, setView] = useState("works");
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0); // se conserva al cerrar para que el fade-out no quede vacío
  const [dark, setDark] = useState(false);
  const [lang, setLang] = useState("en");
  const cur = PROJECTS[idx];
  const t = I18N[lang];

  // Devuelve el texto en el idioma actual. Si el campo es un texto simple
  // (no bilingüe todavía), lo muestra igual en los dos idiomas.
  const pick = v => (v && typeof v === "object") ? (v[lang] ?? v.en ?? v.es ?? "") : (v ?? "");

  // Cerrar con Esc
  useEffect(() => {
    const onKey = e => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, []);

  // Volver arriba del todo cada vez que se abre un proyecto
  useEffect(() => {
    if (open && ovRef.current) ovRef.current.scrollTop = 0;
  }, [open, idx]);

  // Tema claro / oscuro (por defecto claro)
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  // Idioma según el navegador de quien visita (por defecto inglés)
  useEffect(() => {
    const nl = (navigator.language || "").toLowerCase();
    setLang(nl.startsWith("es") ? "es" : "en");
  }, []);

  const go = v => { setOpen(false); setView(v); };

  return (
    <div className={`app${open ? " open" : ""}${view === "info" ? " info" : ""}`}>
      <header>
        <div className="bar">
          <div>Agustín Puentes</div>
          <nav>
            <button aria-current={view === "works"} onClick={() => go("works")}>{t.selectedWorks}</button>
            <button aria-current={view === "info"} onClick={() => go("info")}>{t.generalInfo}</button>
          </nav>
          <div className="r">
            <button className="theme" aria-label={dark ? t.light : t.dark} onClick={() => setDark(d => !d)}>
              {dark ? <Sun /> : <Moon />}
            </button>
          </div>
        </div>
      </header>

      <main>
        <div className="grid">
          {PROJECTS.map((p, i) => (
            <button
              key={i}
              className={`tile${open && idx === i ? " active" : ""}`}
              onClick={() => { setIdx(i); setOpen(true); }}
              aria-label={`${p.client} — ${pick(p.title)}`}
            >
              <span className="thumb" style={{ backgroundImage: bg(p.cover) }} />
              <span className="cap">{pad(i)}.<br />{p.client}<span>{pick(p.title)}</span></span>
            </button>
          ))}
        </div>
      </main>

      <section className="infopage">
        <div className="about">
          <div className="photo" style={ABOUT.photo ? { backgroundImage: `url("${ABOUT.photo}")` } : undefined} />
          <div className="bio">
            {ABOUT.bio.map((b, i) => (
              <div key={i}><h4>{pick(b.label)}</h4><p>{pick(b.text)}</p></div>
            ))}
          </div>
          <div className="col">
            <h3>{t.experience}</h3>
            <ul className="lines">
              {ABOUT.experience.map((e, i) => (
                <li key={i}>{e.company}<small>{pick(e.role)} — {e.years}</small></li>
              ))}
            </ul>
          </div>
          <div className="col">
            <h3>{t.skills}</h3>
            <ul className="plain">
              {ABOUT.skills.map((s, i) => <li key={i}>{pick(s)}</li>)}
            </ul>
            <h3 className="gap">{t.contact}</h3>
            <ul className="plain">
              {ABOUT.contact.map((c, i) => (
                <li key={i}><a href={c.href} target="_blank" rel="noreferrer">{pick(c.label)}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="ov" ref={ovRef} onClick={e => e.target === e.currentTarget && setOpen(false)}>
        <div className="panel">
          <p className="pc"><b>{cur.client}</b><br />{pick(cur.title)}</p>
          <p className="pr">{pick(cur.roles)} {cur.year}</p>
          {cur.description && <p className="pd">{pick(cur.description)}</p>}
          <button className="x" onClick={() => setOpen(false)}>{t.close}</button>
        </div>
        <div className="stages">
          {PROJECTS.map((p, i) => {
            const b = p.image || p.cover;
            return (
              <div key={i} className={`stage${idx === i ? " on" : ""}`} style={{ backgroundImage: bg(b) }}>
                {p.video && idx === i ? <video src={p.video} autoPlay muted loop playsInline /> : !p.video && !isImg(b) && <span>{pick(p.title)}</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
