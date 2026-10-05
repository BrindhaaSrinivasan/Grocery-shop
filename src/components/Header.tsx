import React from 'react';
import { ShoppingBag, Search, Clock, Menu, X, MapPin } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItemCount,
  cartTotal,
  onOpenCart,
  onOpenSearch,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigateSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      {/* Top micro-bar for neighborhood store awareness */}
      <div className="bg-[#1C2826] text-stone-300 text-xs px-4 sm:px-8 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
          <span className="font-medium text-stone-200">Open Today until 8:00 PM</span>
          <span className="text-stone-500 hidden sm:inline">·</span>
          <span className="hidden sm:inline text-stone-400">412 Maple Street (Corner of 4th & Maple)</span>
        </div>
        <div className="flex items-center gap-4 text-stone-300 text-xs">
          <span className="hidden md:inline">Curbside Pickup in 30 mins</span>
          <span className="text-emerald-300 font-medium">Free delivery over $45</span>
        </div>
      </div>

      {/* Main Top Bar strictly obeying 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark in display face */}
        <button
          onClick={() => handleNavClick('hero')}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="font-display text-2xl sm:text-2xl font-semibold tracking-tight text-stone-900 group-hover:text-emerald-800 transition-colors">
            Mercer Green Grocers
          </span>
        </button>

        {/* Zone 2: 4-5 clean text navigation links with subtle hover underlines */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-600">
          <button
            onClick={() => handleNavClick('catalog')}
            className="hover:text-stone-900 transition-colors focus:outline-none cursor-pointer py-1"
          >
            Seasonal Produce
          </button>
          <button
            onClick={() => handleNavClick('catalog-bakery')}
            className="hover:text-stone-900 transition-colors focus:outline-none cursor-pointer py-1"
          >
            Artisan Bakery & Dairy
          </button>
          <button
            onClick={() => handleNavClick('recipe')}
            className="hover:text-stone-900 transition-colors focus:outline-none cursor-pointer py-1"
          >
            Weekly Recipe
          </button>
          <button
            onClick={() => handleNavClick('farms')}
            className="hover:text-stone-900 transition-colors focus:outline-none cursor-pointer py-1"
          >
            Local Family Farms
          </button>
          <button
            onClick={() => handleNavClick('hours')}
            className="hover:text-stone-900 transition-colors focus:outline-none cursor-pointer py-1"
          >
            Store & Hours
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenSearch}
            className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Search grocer catalog"
            title="Search products"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenCart}
            className="flex items-center gap-2.5 px-3.5 py-2 bg-stone-900 text-stone-50 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer text-xs sm:text-sm font-medium shadow-xs"
            aria-label={`Shopping basket with ${cartItemCount} items`}
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-emerald-300" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-500 text-stone-950 font-bold rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                  {cartItemCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline">Basket</span>
            <span className="font-semibold text-stone-200 tabular-nums">
              ${cartTotal.toFixed(2)}
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-lg transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-[#FAF9F5] px-6 py-5 shadow-lg">
          <div className="flex flex-col gap-4 text-base font-medium text-stone-800">
            <button
              onClick={() => handleNavClick('catalog')}
              className="text-left py-2 border-b border-stone-200/60"
            >
              Seasonal Fresh Produce
            </button>
            <button
              onClick={() => handleNavClick('catalog-bakery')}
              className="text-left py-2 border-b border-stone-200/60"
            >
              Artisan Bakery & Hearth Loaves
            </button>
            <button
              onClick={() => handleNavClick('catalog-dairy')}
              className="text-left py-2 border-b border-stone-200/60"
            >
              Pasture Dairy & Brown Eggs
            </button>
            <button
              onClick={() => handleNavClick('recipe')}
              className="text-left py-2 border-b border-stone-200/60"
            >
              Weekly Farm Recipe & Bundle
            </button>
            <button
              onClick={() => handleNavClick('farms')}
              className="text-left py-2 border-b border-stone-200/60"
            >
              Our 18 Local Family Farms
            </button>
            <button
              onClick={() => handleNavClick('hours')}
              className="text-left py-2"
            >
              Store Location, Parking & Hours
            </button>
          </div>
          <div className="mt-5 pt-4 border-t border-stone-200 text-xs text-stone-500 space-y-1">
            <p className="flex items-center gap-1.5 font-medium text-stone-700">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" /> 412 Maple Street, Historic District
            </p>
            <p className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-stone-400" /> Mon–Sat 7:30am–8pm · Sun 9am–6pm
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
