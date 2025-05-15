import { useEffect, useState } from "react";

interface TypingEffectProps {
  phrases: string[];
  typingSpeed?: number; // Vitesse de frappe
  deletingSpeed?: number; // Vitesse de suppression
  pauseTime?: number; // Temps de pause entre phrases
  loop?: boolean; // Activer/désactiver la boucle
}

export default function TypingEffect({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 1000,
  loop = true,
}: TypingEffectProps) {
  const [text, setText] = useState(""); // Texte affiché
  const [index, setIndex] = useState(0); // Index de la phrase actuelle
  const [subIndex, setSubIndex] = useState(0); // Sous-index pour l'effet de frappe
  const [isDeleting, setIsDeleting] = useState(false); // Indique si on est en train de supprimer
  const [isPaused, setIsPaused] = useState(false); // Pause entre les transitions
  const [showCursor, setShowCursor] = useState(true); // État du curseur clignotant

  useEffect(() => {
    if (isPaused) return; // Si en pause, ne pas continuer

    // ——— STOP si on vient de taper entièrement la dernière phrase et loop désactivé
    if (!loop
      && index === phrases.length - 1
      && !isDeleting
      && subIndex === phrases[index].length
    ) {
      return;
    }

    // Définir le délai en fonction de l'état actuel
    const timeout = setTimeout(() => {
      if (isDeleting) {
        // Supprimer les caractères un par un
        setSubIndex((prev) => prev - 1);

        // Si tout est supprimé, passer à la phrase suivante
        if (subIndex === 0) {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % phrases.length); // Passer à la phrase suivante
          if (!loop && index === phrases.length - 1) {
            clearTimeout(timeout);
            return; // Fin de la séquence si boucle désactivée
          }
        }
      } else {
        // Ajouter les caractères un par un
        setSubIndex((prev) => prev + 1);

        // Si la phrase complète est écrite, mettre en pause
        if (subIndex === phrases[index].length) {
          setIsPaused(true);
          setTimeout(() => {
            setIsPaused(false);
            setIsDeleting(true);
          }, pauseTime);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [phrases, subIndex, isDeleting, index, isPaused, typingSpeed, deletingSpeed, pauseTime, loop]);

  useEffect(() => {
    const cursorBlink = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 400);

    return () => clearInterval(cursorBlink);
  }, []);

  return (
    <span className="whitespace-break-spaces">
      {phrases[index]?.substring(0, subIndex) || ""}
      <span
        style={{
          opacity: showCursor ? 1 : 0,
          transition: "opacity 0.1s",
        }}
      >|</span>
    </span>
  );
}
