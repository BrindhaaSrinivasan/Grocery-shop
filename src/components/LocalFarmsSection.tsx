import React from 'react';
import { MapPin, Calendar, HeartHandshake, ShieldCheck } from 'lucide-react';
import { PARTNER_FARMS, PRODUCE_IMAGE, SOURDOUGH_IMAGE, DAIRY_HONEY_IMAGE } from '../data/products';

export const LocalFarmsSection: React.FC = () => {
  return (
    <section id="farms" className="py-16 sm:py-24 bg-[#FAF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-emerald-800 mb-2">
            <HeartHandshake className="w-4 h-4" />
            <span>Rooted in Our Community</span>
            <span aria-hidden="true">·</span>
            <span>40-Mile Sourcing Radius</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-stone-900 font-semibold tracking-tight">
            Meet the hands that grow and bake your food.
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Unlike industrial supermarket chains with weeks-old supply chains, our produce travels less than 40 miles and is typically picked within 24 hours of resting on our wooden crates.
          </p>
        </div>

        {/* Farms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PARTNER_FARMS.map((farm) => (
            <div
              key={farm.id}
              className="bg-white rounded-xl p-6 border border-stone-200/90 shadow-xs flex flex-col justify-between hover:border-stone-300 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="flex items-center gap-1 font-medium text-emerald-800">
                    <MapPin className="w-3.5 h-3.5" /> {farm.distance}
                  </span>
                  <span>Est. {farm.sinceYear}</span>
                </div>

                <h3 className="font-display text-lg font-semibold text-stone-900 leading-snug">
                  {farm.name}
                </h3>

                <p className="text-xs text-stone-500 font-medium uppercase tracking-wide">
                  {farm.location}
                </p>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {farm.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100">
                <div className="text-[11px] font-semibold text-stone-700">Specialty Harvest</div>
                <div className="text-xs text-emerald-800 font-medium truncate mt-0.5">
                  {farm.specialty}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Grocer pledge box */}
        <div className="mt-12 p-6 sm:p-8 bg-[#1C2826] text-stone-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1 max-w-2xl">
            <h4 className="font-display text-xl text-white font-semibold flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" /> The Mercer Freshness Guarantee
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              If an apple isn’t crisp, a loaf isn’t fragrant, or greens aren’t lively, simply let our counter staff know. We’ll immediately replace it or refund your payment with a smile.
            </p>
          </div>
          <div className="text-xs text-stone-400 font-mono shrink-0">
            Certified Organic · No GMOs · Fair Grower Contracts
          </div>
        </div>
      </div>
    </section>
  );
};
