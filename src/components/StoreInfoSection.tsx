import React from 'react';
import { MapPin, Phone, Mail, Clock, Car, Bike, Coffee, Sparkles } from 'lucide-react';
import { STORE_SCHEDULE } from '../data/products';

export const StoreInfoSection: React.FC = () => {
  return (
    <section id="hours" className="py-16 sm:py-24 bg-white border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Location & Schedule */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-emerald-800 mb-2">
                <Clock className="w-4 h-4" />
                <span>Visit Us In Person</span>
                <span aria-hidden="true">·</span>
                <span>Open 7 Days a Week</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl text-stone-900 font-semibold tracking-tight">
                Store Hours & Neighborhood Pickup
              </h2>
              <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
                Step into our sunlit shop to smell the morning bread and browse the produce wooden crates, or pull up for contact-free curbside pickup.
              </p>
            </div>

            {/* Operating Hours Table */}
            <div className="bg-[#FAF9F5] rounded-xl p-5 border border-stone-200/80">
              <h3 className="font-semibold text-stone-900 text-sm mb-3">
                Weekly Operating Schedule
              </h3>
              <div className="divide-y divide-stone-200/60">
                {STORE_SCHEDULE.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-medium text-stone-800">{item.day}</span>
                    <div className="text-right">
                      <span className="font-semibold text-stone-900 tabular-nums">{item.hours}</span>
                      <span className="text-[11px] text-stone-500 block">{item.pickup}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-stone-700">
              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200/70 space-y-1">
                <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-800" /> Location
                </div>
                <p>412 Maple Street</p>
                <p className="text-stone-500 text-xs">Corner of Maple & 4th Avenue</p>
              </div>

              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200/70 space-y-1">
                <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-emerald-800" /> Telephone
                </div>
                <p className="font-mono text-xs">(503) 555-0182</p>
                <p className="text-stone-500 text-xs">Direct line to produce counter</p>
              </div>
            </div>
          </div>

          {/* Right Column: How Curbside Works & Market Amenities */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#FAF9F5] rounded-2xl p-6 sm:p-8 border border-stone-200/80 space-y-6">
              <h3 className="font-display text-xl font-semibold text-stone-900">
                How 30-Minute Curbside Pickup Works
              </h3>

              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-7 h-7 rounded-full bg-emerald-800 text-emerald-100 font-semibold text-xs flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-stone-900">Fill your digital basket</h4>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Select items and choose your preferred pickup window (same day or next day).
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-7 h-7 rounded-full bg-emerald-800 text-emerald-100 font-semibold text-xs flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-stone-900">Hand-selected by our grocers</h4>
                    <p className="text-xs text-stone-600 mt-0.5">
                      We hand-inspect each tomato, tap each sourdough loaf, and pack into reusable kraft cartons.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-7 h-7 rounded-full bg-emerald-800 text-emerald-100 font-semibold text-xs flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-stone-900">Drive up or bike by</h4>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Pull into spots 1–4 on 4th Ave or roll up to our cargo bike dock. We load directly into your trunk.
                    </p>
                  </div>
                </div>
              </div>

              {/* In-store amenities */}
              <div className="pt-6 border-t border-stone-200/80">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">
                  In-Store Market Amenities
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs text-stone-700">
                  <div className="flex items-center gap-2">
                    <Coffee className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Pourover Espresso Bar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-stone-500 shrink-0" />
                    <span>Free 30-min Curbside Stalls</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bike className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Covered Bike Racks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>BYO Container Bulk Station</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
