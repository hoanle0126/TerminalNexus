'use client';

import { motion, useSpring } from 'motion/react';
import React, { useState, MouseEvent, useRef } from 'react';

interface ImageItem {
  img: string;
  label: string;
  tag: string;
}

interface ImageRevealProps {
  items: ImageItem[];
  className?: string;
}

export default function ImageReveal({ items, className = '' }: ImageRevealProps) {
  const [img, setImg] = useState<{ src: string; alt: string; opacity: number }>({
    src: '',
    alt: '',
    opacity: 0,
  });

  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const spring = { stiffness: 150, damping: 15, mass: 0.1 };

  const imagePos = {
    x: useSpring(0, spring),
    y: useSpring(0, spring),
  };

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const { clientX, clientY } = e;
    const relativeX = clientX - containerRect.left;
    const relativeY = clientY - containerRect.top;
    imagePos.x.set(relativeX - imageRef.current.offsetWidth / 2);
    imagePos.y.set(relativeY - imageRef.current.offsetHeight / 2);
  };

  const handleImageInteraction = (item: ImageItem, opacity: number) => {
    setImg({ src: item.img, alt: item.label, opacity });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMove}
      className={`relative w-4/5 mx-auto p-4 ${className}`}
    >
      {items.map((item) => (
        <div
          key={item.label}
          onMouseEnter={() => handleImageInteraction(item, 1)}
          onMouseMove={() => handleImageInteraction(item, 1)}
          onMouseLeave={() => handleImageInteraction(item, 0)}
          className="w-full py-5 cursor-pointer text-center flex justify-between items-center text-primary border-b dark:border-neutral-800 border-neutral-50 last:border-none"
        >
          <p className="text-5xl">{item.label}</p>
          <span>
            {item.tag} <span className="w-3 h-3 bg-primary inline-block"></span>
          </span>
        </div>
      ))}

      <motion.img
        ref={imageRef}
        src={img.src}
        alt={img.alt}
        className="w-[300px] h-[220px] rounded-lg object-cover absolute top-0 left-0 transition-opacity duration-200 ease-in-out pointer-events-none"
        style={{
          x: imagePos.x,
          y: imagePos.y,
          opacity: img.opacity,
        }}
      />
    </section>
  );
}
