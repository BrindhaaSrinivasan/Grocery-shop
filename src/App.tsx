/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Product, ProductCategory, CartItem, FulfillmentType, OrderDetails } from './types';
import { PRODUCTS } from './data/products';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { RecipeSpotlight } from './components/RecipeSpotlight';
import { LocalFarmsSection } from './components/LocalFarmsSection';
import { StoreInfoSection } from './components/StoreInfoSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';
import { ShoppingBag, Sparkles } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Initial friendly starter item so user immediately sees a populated basket experience
    return [
      { product: PRODUCTS[0], quantity: 2 }, // Heirloom tomatoes
      { product: PRODUCTS[6], quantity: 1 }, // Artisan Country Sourdough
    ];
  });

  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [fulfillmentType, setFulfillmentType] = useState<FulfillmentType>('pickup');
  const [pickupTimeSlot, setPickupTimeSlot] = useState('Today: 3:00 PM – 5:00 PM');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  // Global hotkey for quick search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 2800);
  };

  const cartItemsMap = useMemo(() => {
    const map: Record<string, number> = {};
    for (const item of cartItems) {
      map[item.product.id] = item.quantity;
    }
    return map;
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cartItems]);

  const cartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showNotification(`Added ${product.name} to basket`);
  };

  const handleAddMultipleToCart = (itemsToAdd: { product: Product; quantity: number }[]) => {
    setCartItems((prev) => {
      let updated = [...prev];
      for (const item of itemsToAdd) {
        const index = updated.findIndex((i) => i.product.id === item.product.id);
        if (index > -1) {
          updated[index] = {
            ...updated[index],
            quantity: updated[index].quantity + item.quantity,
          };
        } else {
          updated.push({ product: item.product, quantity: item.quantity });
        }
      }
      return updated;
    });
    showNotification(`Added recipe ingredients bundle to basket!`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item.product.id !== productId);
      }
      return prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleOrderSuccess = (order: OrderDetails) => {
    // Empty the cart on successful completion
    setCartItems([]);
  };

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'catalog-bakery') {
      setActiveCategory('bakery');
      const elem = document.getElementById('catalog');
      elem?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (sectionId === 'catalog-dairy') {
      setActiveCategory('dairy');
      const elem = document.getElementById('catalog');
      elem?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-stone-900 font-sans selection:bg-emerald-100 selection:text-emerald-950">
      {/* Header with Top Bar Contract */}
      <Header
        cartItemCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setCartDrawerOpen(true)}
        onOpenSearch={() => setSearchModalOpen(true)}
        onNavigateSection={scrollToSection}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreHarvest={() => scrollToSection('catalog')}
          onViewHours={() => scrollToSection('hours')}
        />

        {/* Morning Harvest Bulletin */}
        <div className="bg-[#EFECE6] border-y border-stone-200/80 py-3 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs text-stone-700">
            <div className="flex items-center gap-2 truncate">
              <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
              <span className="font-semibold text-stone-900">Today's Morning Drop:</span>
              <span className="truncate">
                Riverbend Heirloom Brandywine Tomatoes & Hearth & Grain Country Sourdough arrived at 6:45 AM.
              </span>
            </div>
            <button
              onClick={() => {
                setActiveCategory('produce');
                scrollToSection('catalog');
              }}
              className="text-emerald-800 font-medium hover:underline shrink-0 hidden sm:inline cursor-pointer"
            >
              View produce arrival →
            </button>
          </div>
        </div>

        {/* Main Product Catalog */}
        <ProductCatalog
          products={PRODUCTS}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          cartItemsMap={cartItemsMap}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
          onQuickView={(p) => setQuickViewProduct(p)}
        />

        {/* Weekly Recipe Spotlight */}
        <RecipeSpotlight
          products={PRODUCTS}
          onAddMultipleToCart={handleAddMultipleToCart}
        />

        {/* Local Partner Farms */}
        <LocalFarmsSection />

        {/* Store Location & Curbside Pickup Info */}
        <StoreInfoSection />
      </main>

      {/* Footer */}
      <footer className="bg-[#1C2826] text-stone-300 pt-16 pb-12 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800/80">
            <div className="lg:col-span-5 space-y-4">
              <span className="font-display text-2xl font-semibold text-white tracking-tight block">
                Mercer Green Grocers
              </span>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
                An independent neighborhood grocer dedicated to living soil agriculture, slow fermented wood-fired sourdough, and pasture dairies. Rooted on Maple Street since 2018.
              </p>
              <div className="pt-2 text-xs text-stone-400 space-y-1">
                <p>412 Maple Street, Historic District, OR 97201</p>
                <p className="font-mono text-stone-300">(503) 555-0182</p>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200">
                Store Sections
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    onClick={() => scrollToSection('catalog')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Seasonal Fresh Produce
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('catalog-bakery')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Wood-Fired Sourdough & Hearth
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('catalog-dairy')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Pasture Milk & Brown Eggs
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('recipe')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Grocer's Weekly Recipe
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('farms')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Our 18 Regional Family Farms
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('hours')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Store Schedule & Curbside Pickup
                  </button>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-4 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200">
                Neighborhood Harvest Dispatch
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Receive Thursday night notes on rare heirloom arrivals, bakehouse morning specials, and seasonal farm boxes.
              </p>
              <div className="pt-1 text-xs text-emerald-400 font-medium">
                Free curbside loading · Plastic-free produce bins · Living wage grocers
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
            <p>© 2026 Mercer Green Grocers. Locally owned & operated.</p>
            <div className="flex items-center gap-4 text-[11px]">
              <span>Curbside Pickup (Spots 1–4)</span>
              <span aria-hidden="true">·</span>
              <span>Cargo Bike Dock</span>
              <span aria-hidden="true">·</span>
              <span>Open 7 Days</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button on Mobile if items exist */}
      {cartCount > 0 && !cartDrawerOpen && (
        <div className="sm:hidden fixed bottom-4 right-4 z-30">
          <button
            onClick={() => setCartDrawerOpen(true)}
            className="flex items-center gap-2 px-4 py-3 bg-stone-900 text-stone-50 rounded-full shadow-xl text-xs font-semibold cursor-pointer active:scale-95 transition-transform"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-300" />
            <span>Basket ({cartCount})</span>
            <span className="bg-emerald-700 px-1.5 py-0.5 rounded-full text-[10px] font-bold">
              ${cartTotal.toFixed(2)}
            </span>
          </button>
        </div>
      )}

      {/* Quick View Modal */}
      <ProductDetailModal
        product={quickViewProduct}
        quantityInCart={quickViewProduct ? cartItemsMap[quickViewProduct.id] || 0 : 0}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        items={cartItems}
        onClose={() => setCartDrawerOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        fulfillmentType={fulfillmentType}
        onSetFulfillmentType={setFulfillmentType}
        pickupTimeSlot={pickupTimeSlot}
        onSetPickupTimeSlot={setPickupTimeSlot}
        specialInstructions={specialInstructions}
        onSetSpecialInstructions={setSpecialInstructions}
        onProceedToCheckout={() => {
          setCartDrawerOpen(false);
          setCheckoutModalOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        items={cartItems}
        fulfillmentType={fulfillmentType}
        pickupTimeSlot={pickupTimeSlot}
        specialInstructions={specialInstructions}
        onClose={() => setCheckoutModalOpen(false)}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        products={PRODUCTS}
        onClose={() => setSearchModalOpen(false)}
        onSelectProduct={(product) => {
          setQuickViewProduct(product);
        }}
      />

      {/* Subtle toast feedback */}
      {notification && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-stone-100 text-xs font-medium px-4 py-2.5 rounded-lg shadow-lg border border-stone-700 animate-in fade-in slide-in-from-bottom-2 duration-150 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{notification}</span>
        </div>
      )}
    </div>
  );
}
