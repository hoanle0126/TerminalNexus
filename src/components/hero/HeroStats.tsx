import CountUp from "@/components/reactbits/CountUp";
import { HERO_STATS } from "@/config/hero";

/**
 * Hero stats bar — CountUp metrics row (years, projects, technologies).
 * Rule 2: extracted from HeroSection to keep parent under 200 lines.
 * Rule 24: data sourced from config/hero.ts.
 */
export function HeroStats() {
  return (
    <div className="flex flex-wrap gap-6 pt-4 border-t border-white/5">
      {HERO_STATS.map((stat, i) => (
        <div key={i} className="flex flex-col gap-0.5">
          <div className="text-2xl md:text-3xl font-black font-mono text-white">
            <CountUp
              to={stat.value}
              from={0}
              duration={1.8}
              delay={1}
              className="tabular-nums"
            />
            <span className="text-accent-primary">{stat.suffix}</span>
          </div>
          <span className="text-xs text-zinc-500 font-mono tracking-wider uppercase">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
