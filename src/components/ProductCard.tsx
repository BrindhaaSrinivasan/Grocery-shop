import React, { useState } from 'react';
import { Plus, Minus, Check, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  quantityInCart: number;
  onAddToCart: (product: Product, quantity?: number) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  quantityInCart,
  onAddToCart,
  onUpdateQuantity,
  onQuickView,
}) => {
  const [imageError, setImageError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 800);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateQuantity(product.id, quantityInCart + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateQuantity(product.id, Math.max(0, quantityInCart - 1));
  };

  return (
    <article
      onClick={() => onQuickView(product)}
      className="group bg-white rounded-xl border border-stone-200/90 overflow-hidden flex flex-col justify-between transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
    >
      {/* Product Image Container (65-70% visual height) */}
      <div className="relative aspect-[4/3] w-full bg-[#F5F3EF] overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center p-4 text-center"
            style={{ backgroundColor: product.fallbackColor + '15' }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white mb-2 shadow-xs"
              style={{ backgroundColor: product.fallbackColor }}
            >
              <span className="font-serif text-lg font-bold">{product.name.charAt(0)}</span>
            </div>
            <span className="text-xs font-medium text-stone-600 line-clamp-1">{product.farm}</span>
          </div>
        )}

        {/* Subtle top metadata tags (unboxed clean tag, not pill spam) */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          {product.isOrganic && (
            <span className="bg-stone-900/80 backdrop-blur-xs text-emerald-300 text-[11px] font-medium px-2 py-0.5 rounded-sm">
              Organic
            </span>
          )}
          {product.isSeasonal && (
            <span className="bg-amber-900/80 backdrop-blur-xs text-amber-200 text-[11px] font-medium px-2 py-0.5 rounded-sm">
              Seasonal
            </span>
          )}
          {product.isArtisan && !product.isOrganic && (
            <span className="bg-stone-900/80 backdrop-blur-xs text-stone-200 text-[11px] font-medium px-2 py-0.5 rounded-sm">
              Artisan
            </span>
          )}
        </div>

        {/* Quick view button hint on hover */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-stone-700 text-xs px-2.5 py-1 rounded-md shadow-xs font-medium">
            <Eye className="w-3.5 h-3.5" /> Quick View
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div>
          {/* Farm Provenance & Distance */}
          <div className="text-[11px] font-medium uppercase tracking-wider text-stone-500 truncate mb-1">
            <span>{product.farm}</span>
            <span className="mx-1 text-stone-400">·</span>
            <span>{product.distance}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-medium text-base text-stone-900 group-hover:text-emerald-900 transition-colors leading-snug line-clamp-2">
            {product.name}
          </h3>

          {/* Quiet description snippet */}
          <p className="text-xs text-stone-500 mt-1 line-clamp-1">
            {product.description}
          </p>
        </div>

        {/* Price & Action Module */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-stone-900 font-semibold text-base tabular-nums">
              ${product.price.toFixed(2)}
            </div>
            <div className="text-[11px] text-stone-500 leading-none">
              {product.unit}
            </div>
          </div>

          {/* Interactive button / stepper */}
          {quantityInCart === 0 ? (
            <button
              onClick={handleAdd}
              className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                justAdded
                  ? 'bg-emerald-700 text-white'
                  : 'bg-stone-100 hover:bg-stone-900 hover:text-white text-stone-800'
              }`}
              aria-label={`Add ${product.name} to basket`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Added
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" /> Add
                </>
              )}
            </button>
          ) : (
            <div
              className="inline-flex items-center gap-2 bg-stone-900 text-stone-100 rounded-lg px-2 py-1 shadow-xs"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleDecrement}
                className="w-5 h-5 flex items-center justify-center text-stone-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-semibold tabular-nums min-w-[14px] text-center">
                {quantityInCart}
              </span>
              <button
                onClick={handleIncrement}
                className="w-5 h-5 flex items-center justify-center text-stone-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
