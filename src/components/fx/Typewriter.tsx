"use client";
import { useEffect, useRef, useState } from "react";

/** Rotating typewriter — types each word, pauses, deletes, advances. */
export function Typewriter({
  words,
  className,
}: {
  words: string[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) setText(words[0] ?? "");
  }, [words]);

  useEffect(() => {
    if (reduced.current || words.length === 0) return;
    const word = words[index % words.length];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && text === word) {
      t = setTimeout(() => setDeleting(true), 1700);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      t = setTimeout(
        () => {
          setText((prev) =>
            deleting ? word.slice(0, prev.length - 1) : word.slice(0, prev.length + 1),
          );
        },
        deleting ? 45 : 85,
      );
    }
    return () => clearTimeout(t);
  }, [text, deleting, index, words]);

  return (
    <span className={className} aria-live="polite">
      {text || " "}
      {!reduced.current && <span className="typewriter__caret" aria-hidden="true">&nbsp;</span>}
    </span>
  );
}
