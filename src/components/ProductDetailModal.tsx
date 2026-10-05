import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, MapPin, Sparkles, AlertCircle, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  quantityInCart: number;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  quantityInCart,
  onClose,
  onAddToCart,
}) => {
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, qty);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 600);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-stone-600 hover:text-stone-900 bg-white/80 hover:bg-white rounded-full backdrop-blur-xs shadow-xs transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Visual Showcase */}
          <div className="relative aspect-[4/3] md:aspect-auto h-64 md:h-full bg-stone-100">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
              {product.isOrganic && (
                <span className="bg-emerald-900/90 text-emerald-200 text-xs px-2.5 py-0.5 rounded-sm font-medium">
                  Certified Organic
                </span>
              )}
              {product.isSeasonal && (
                <span className="bg-amber-900/90 text-amber-200 text-xs px-2.5 py-0.5 rounded-sm font-medium">
                  Seasonal Harvest
                </span>
              )}
              {product.isArtisan && (
                <span className="bg-stone-900/90 text-stone-200 text-xs px-2.5 py-0.5 rounded-sm font-medium">
                  Small-Batch
                </span>
              )}
            </div>
          </div>

          {/* Details & Contiguous Purchase Module */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Origin attribution */}
              <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-medium tracking-wide uppercase">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>{product.farm}</span>
                <span className="text-stone-300">·</span>
                <span className="text-stone-500 lowercase">{product.distance}</span>
              </div>

              <div>
                <h2 className="font-display text-2xl font-semibold text-stone-900 leading-snug">
                  {product.name}
                </h2>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-stone-900 tabular-nums">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-stone-500">
                    {product.unit}
                  </span>
                </div>
              </div>

              <p className="text-sm text-stone-600 leading-relaxed">
                {product.description}
              </p>

              {/* Kitchen Storage Tip */}
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200/80 text-xs text-stone-700 space-y-1">
                <div className="font-semibold text-stone-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Grocer's Storage Advice
                </div>
                <p className="text-stone-600">{product.storageTip}</p>
              </div>

              {product.nutritionHighlight && (
                <div className="text-xs text-stone-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>{product.nutritionHighlight}</span>
                </div>
              )}
            </div>

            {/* Purchase Action Box */}
            <div className="pt-4 border-t border-stone-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-stone-600">Quantity</span>
                <div className="flex items-center gap-3 border border-stone-300 rounded-lg px-2.5 py-1 bg-white">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    disabled={qty <= 1}
                    className="p-1 text-stone-600 hover:text-stone-900 disabled:opacity-30 cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-semibold tabular-nums min-w-[20px] text-center text-stone-900">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="p-1 text-stone-600 hover:text-stone-900 cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAdd}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-lg font-medium text-sm transition-colors cursor-pointer shadow-xs"
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Added to Basket!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-emerald-400" />
                    <span>Add {qty} to Basket · ${(product.price * qty).toFixed(2)}</span>
                  </>
                )}
              </button>

              {quantityInCart > 0 && (
                <p className="text-center text-xs text-stone-500">
                  You already have {quantityInCart} in your basket
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
