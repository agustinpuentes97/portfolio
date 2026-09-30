// ── AQUÍ SE EDITA LA PÁGINA "GENERAL INFO" ───────────────────
// photo:      ruta de tu foto, ej: "/agustin.jpg" (el archivo va en la carpeta public/).
//             Si lo dejás vacío ("") se muestra un recuadro gris.
// bio:        bloques de texto. "label" es el título chico en mayúsculas.
// experience: una entrada por trabajo (empresa, rol y años).
// skills:     lista de habilidades, una por línea.
// contact:    links. Reemplazá los de ejemplo por los tuyos.

export const ABOUT = {
  photo: "/agustin-puentes_picture.png",
  bio: [
    {
      label: "Who I am",
      text: "I’m Agustín Puentes, a Creative Director and Art Director with a background in Multimedia Arts. I work at the intersection of design, communication, content and technology, developing concepts and visual systems for brands, digital projects and multimedia experiences. I’m interested in turning ideas into coherent visual languages from brand identities and narratives to audiovisual pieces, campaigns, digital experiences and interactive projects",
    },
    { label: "Where I am now", text: "I’m currently working as a Creative Coordinator, contributing to creative and art direction across different projects while developing creative guidelines and helping structure processes within the creative department. My work combines strategy, conceptual development, visual direction, team coordination and experimentation with new AI tools and digital production workflows." },
    { label: "How I work", text: "I work through research, experimentation and collaboration. I start by understanding the context, the problem and what makes each project unique. From there, I develop concepts, references and a visual language that can translate consistently across different media. I enjoy turning ideas into structured creative systems. My approach combines creative direction, design, audiovisual production, technology and AI to develop solutions that are both conceptually strong and visually relevant." },
  ],
  experience: [
    { company: "Owlbox", role: "Creative Coordinator", years: "2026 / Present" },
    { company: "wewant studio", role: "Creative Director", years: "2020 / Present" },
    { company: "Fiat Armada", role: "Paid Media", years: "2019 / 2020" },
  ],
  skills: [
    "Creative Direction",
    "Art Direction",
    "Multimedia Design",
    "Creative Strategy",
    "Content & Audiovisual",
    "AI & Creative Technology"
  ],
  contact: [
    { label: "Email", href: "mailto:agustin.puentes97@gmail.com" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/agustin-puentes" },

  ],
};