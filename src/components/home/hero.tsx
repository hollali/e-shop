"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { bannersQuery } from "@/sanity/lib/queries";
import { HeroSkeleton } from "./hero-skeleton";

export function Hero() {
  const [slides, setSlides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    client.fetch(bannersQuery).then((data) => {
      if (data && data.length > 0) setSlides(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (loading) return <HeroSkeleton />;
  if (slides.length === 0) return null;

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);
  const slide = slides[current];

  return (
    <div className="relative overflow-hidden bg-gray-900 text-white">
      {slide.image && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      )}
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center text-center py-24 md:py-32">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
            {slide.title}
          </h1>
          {slide.subtitle && (
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-lg">
              {slide.subtitle}
            </p>
          )}
          {slide.link && (
            <Link
              href={slide.link}
              className="inline-flex items-center h-12 px-8 bg-white text-gray-900 font-semibold rounded-md hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </Link>
          )}
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-colors"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-colors"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${
              i === current ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
