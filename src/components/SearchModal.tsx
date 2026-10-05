import React, { useState, useEffect, useRef } from 'react';
import { Search, X, MapPin, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  products: Product[];
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  products,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = query.trim() === ''
    ? []
    : products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.farm.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input header */}
        <div className="p-4 border-b border-stone-200 flex items-center gap-3 bg-[#FAF9F5]">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sourdough, heirloom tomatoes, raw milk, farm names..."
            className="w-full text-sm bg-transparent border-none focus:outline-none text-stone-900 placeholder:text-stone-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-stone-400 hover:text-stone-600 rounded-md cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-medium text-stone-500 hover:text-stone-800 px-2 py-1 bg-stone-200/60 rounded-md cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Results area */}
        <div className="max-h-96 overflow-y-auto p-2">
          {query.trim() === '' ? (
            <div className="p-6 text-center text-xs text-stone-500 space-y-2">
              <p className="font-medium text-stone-700">Popular seasonal searches:</p>
              <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                {['Heirloom Tomatoes', 'Country Sourdough', 'Jersey Milk', 'Wildflower Honey', 'Chanterelles'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-md text-xs cursor-pointer transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center text-stone-500 text-xs">
              No products found matching "{query}". Try checking another farm or pantry staple.
            </div>
          ) : (
            <ul className="divide-y divide-stone-100">
              {filtered.map((product) => (
                <li key={product.id}>
                  <button
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="w-full p-3 flex items-center gap-3 hover:bg-stone-50 rounded-lg text-left transition-colors cursor-pointer group"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-lg object-cover bg-stone-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                        <MapPin className="w-3 h-3 text-emerald-700" />
                        <span className="truncate">{product.farm}</span>
                      </div>
                      <h4 className="text-xs font-semibold text-stone-900 group-hover:text-emerald-800 transition-colors truncate">
                        {product.name}
                      </h4>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs font-bold text-stone-900 tabular-nums">
                        ${product.price.toFixed(2)}
                      </div>
                      <div className="text-[10px] text-stone-500">{product.unit}</div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
