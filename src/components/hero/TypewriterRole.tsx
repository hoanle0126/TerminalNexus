"use client";

import { useEffect, useRef, useState } from "react";

const ROLES = ["Full-Stack Developer", "Cloud Architect", "UI Engineer"];

export function TypewriterRole() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const fullLength = currentRole.length;

    if (!isDeleting && displayed.length < fullLength) {
      // Typing
      timeoutRef.current = setTimeout(() => {
        setDisplayed(currentRole.slice(0, displayed.length + 1));
      }, 70);
    } else if (!isDeleting && displayed.length === fullLength) {
      // Pause then start deleting
      timeoutRef.current = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      // Deleting
      timeoutRef.current = setTimeout(() => {
        setDisplayed(displayed.slice(0, displayed.length - 1));
      }, 40);
    } else if (isDeleting && displayed.length === 0) {
      // Move to next role
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayed, isDeleting, roleIndex]);

  return (
    <div className="flex items-center gap-2 font-mono text-xl md:text-2xl text-accent-primary">
      <span className="text-accent-primary/60 select-none">&gt;&nbsp;</span>
      <span>{displayed}</span>
      <span className="inline-block w-0.5 h-6 bg-accent-primary animate-blink-cursor" />
    </div>
  );
}
