import React, { useState, useMemo } from 'react';
import { ProductCategory, Product } from '../types';
import { ProductCard } from './ProductCard';
import { Filter, SlidersHorizontal, Sparkles, X } from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  activeCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  cartItemsMap: Record<string, number>;
  onAddToCart: (product: Product, quantity?: number) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  cartItemsMap,
  onAddToCart,
  onUpdateQuantity,
  onQuickView,
}) => {
  const [filterOrganic, setFilterOrganic] = useState(false);
  const [filterArtisan, setFilterArtisan] = useState(false);
  const [filterSeasonal, setFilterSeasonal] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [searchFilter, setSearchFilter] = useState('');

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'All Provisions' },
    { id: 'produce', label: 'Fresh Produce' },
    { id: 'bakery', label: 'Artisan Bakery' },
    { id: 'dairy', label: 'Dairy & Eggs' },
    { id: 'pantry', label: 'Local Pantry' },
    { id: 'deli', label: 'Prepared & Deli' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (activeCategory !== 'all' && p.category !== activeCategory) return false;
        if (filterOrganic && !p.isOrganic) return false;
        if (filterArtisan && !p.isArtisan) return false;
        if (filterSeasonal && !p.isSeasonal) return false;
        if (searchFilter.trim() !== '') {
          const match =
            p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
            p.farm.toLowerCase().includes(searchFilter.toLowerCase());
          if (!match) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [products, activeCategory, filterOrganic, filterArtisan, filterSeasonal, sortBy, searchFilter]);

  const hasActiveFilters = filterOrganic || filterArtisan || filterSeasonal || searchFilter;

  const clearAllFilters = () => {
    setFilterOrganic(false);
    setFilterArtisan(false);
    setFilterSeasonal(false);
    setSearchFilter('');
    onSelectCategory('all');
  };

  return (
    <section id="catalog" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-emerald-800 mb-1">
            <span>Market Stalls & Provisions</span>
            <span aria-hidden="true">·</span>
            <span>Harvested Daily</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-stone-900 font-semibold tracking-tight">
            Today's Fresh Provisions
          </h2>
        </div>

        {/* Quiet unboxed text count */}
        <div className="text-xs text-stone-500 font-medium">
          Showing <span className="font-semibold text-stone-900">{filteredProducts.length}</span> handcrafted items
        </div>
      </div>

      {/* Category Tabs (Segmented Control conforming to Section 1.A DO) */}
      <div className="overflow-x-auto pb-2 scrollbar-none">
        <div className="inline-flex items-center gap-1.5 p-1.5 bg-stone-200/60 rounded-xl">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Secondary Controls Bar: Filters & Sorting */}
      <div className="mt-6 pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
        {/* Toggle Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-stone-500 font-medium flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Filter by:
          </span>

          <button
            onClick={() => setFilterOrganic(!filterOrganic)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
              filterOrganic
                ? 'bg-emerald-800 border-emerald-800 text-white'
                : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
            }`}
          >
            Certified Organic
          </button>

          <button
            onClick={() => setFilterArtisan(!filterArtisan)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
              filterArtisan
                ? 'bg-emerald-800 border-emerald-800 text-white'
                : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
            }`}
          >
            Small-Batch Artisan
          </button>

          <button
            onClick={() => setFilterSeasonal(!filterSeasonal)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
              filterSeasonal
                ? 'bg-emerald-800 border-emerald-800 text-white'
                : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
            }`}
          >
            Seasonal Harvest
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-stone-500 hover:text-stone-900 underline ml-2 cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 text-xs">
          <label htmlFor="sort-select" className="text-stone-500 font-medium whitespace-nowrap">
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-stone-800 font-medium focus:outline-none focus:ring-1 focus:ring-stone-900 cursor-pointer text-xs"
          >
            <option value="featured">Featured / Seasonality</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="mt-8">
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-xl border border-stone-200 p-8 space-y-3">
            <p className="text-sm font-medium text-stone-800">
              No provisions found matching these filters.
            </p>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Our small grocery carries small-batch rotations. Try clearing filters to see the full morning harvest.
            </p>
            <button
              onClick={clearAllFilters}
              className="mt-2 px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-medium cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                quantityInCart={cartItemsMap[product.id] || 0}
                onAddToCart={onAddToCart}
                onUpdateQuantity={onUpdateQuantity}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
