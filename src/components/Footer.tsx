import React, { useState } from 'react';
import { Mail, Check, ArrowRight, MapPin, Phone } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#1C2826] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800/80">
          {/* Brand & Mission (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <span className="font-display text-2xl font-semibold text-white tracking-tight block">
              Mercer Green Grocers
            </span>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              An independent neighborhood grocer dedicated to living soil agriculture, slow fermented wood-fired sourdough, and pasture dairies. Rooted on Maple Street since 2018.
            </p>
            <div className="pt-2 text-xs text-stone-400 space-y-1.5">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>412 Maple Street, Historic District, OR 97201</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-mono">(503) 555-0182</span>
              </p>
            </div>
          </div>

          {/* Quick links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200">
              Explore Store
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateSection('catalog')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Seasonal Organic Produce
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('catalog-bakery')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Wood-Fired Sourdough & Hearth
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('catalog-dairy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pasture Jersey Milk & Eggs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('recipe')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Grocer's Weekly Recipe
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('farms')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our 18 Regional Family Farms
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('hours')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Store Schedule & Curbside Pickup
                </button>
              </li>
            </ul>
          </div>

          {/* Harvest Dispatch Newsletter (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200">
              The Friday Morning Harvest Dispatch
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Every Thursday evening, we publish what our farm trucks are loading at dawn: rare heirloom varieties, limited bakehouse pastries, and weekend specials.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded-lg text-xs text-emerald-200 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>You're on the harvest list! Look for Thursday's delivery notes.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer shrink-0 flex items-center gap-1"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </form>
            )}
            <span className="text-[11px] text-stone-500 block">
              No spam, ever. Unsubscribe with one click anytime.
            </span>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 Mercer Green Grocers. Locally owned & operated.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>100% Recyclable Packaging</span>
            <span aria-hidden="true">·</span>
            <span>Zero Food Waste Partner</span>
            <span aria-hidden="true">·</span>
            <span>Living Wage Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
