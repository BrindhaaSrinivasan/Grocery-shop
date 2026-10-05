import React from 'react';
import { ArrowRight, ShoppingBasket, Truck, Clock, Sparkles } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';

interface HeroProps {
  onExploreHarvest: () => void;
  onViewHours: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreHarvest, onViewHours }) => {
  return (
    <section id="hero" className="relative w-full overflow-hidden bg-stone-900 text-stone-100">
      {/* Visual focal anchor with measured scrim */}
      <div className="relative min-h-[580px] lg:min-h-[640px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMAGE}
            alt="Interior of Mercer Green Grocers with crates of fresh local vegetables and sourdough loaves"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-90"
          />
          {/* Measured gradient scrim for WCAG AA readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/75 to-stone-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/20" />
        </div>

        {/* Content container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 w-full">
          <div className="max-w-2xl space-y-6">
            {/* Quiet unboxed metadata kicker */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-emerald-300 font-medium">
              <span>Fresh Daily Deliveries</span>
              <span aria-hidden="true">·</span>
              <span>18 Local Farms within 40 Miles</span>
              <span aria-hidden="true">·</span>
              <span>Est. 2018</span>
            </div>

            {/* Headline with balanced wrap */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.1] [text-wrap:balance]">
              Honest food from local soil, right around the corner.
            </h1>

            {/* Subtitle measure 65ch */}
            <p className="text-base sm:text-lg text-stone-300 font-normal leading-relaxed max-w-xl">
              From dawn-harvested heirloom produce and wood-fired sourdough to raw creamery milk and pantry provisions. Order online for 30-minute curbside pickup or same-day neighborhood delivery.
            </p>

            {/* Primary Action Zone */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onExploreHarvest}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-semibold text-sm rounded-lg transition-colors cursor-pointer shadow-md group whitespace-nowrap"
              >
                <ShoppingBasket className="w-4 h-4 text-stone-950" />
                <span>Shop Today's Harvest</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                onClick={onViewHours}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-stone-800/80 hover:bg-stone-800 text-stone-200 text-sm font-medium rounded-lg border border-stone-700/60 backdrop-blur-sm transition-colors cursor-pointer whitespace-nowrap"
              >
                <Clock className="w-4 h-4 text-stone-400" />
                <span>Store Hours & Curbside</span>
              </button>
            </div>

            {/* Quick service guarantees */}
            <div className="pt-6 border-t border-stone-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero-Emission Cargo Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Guaranteed Freshness</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <span>Zero Plastic Produce Bags</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
