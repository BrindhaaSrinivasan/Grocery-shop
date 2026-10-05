import React, { useState } from 'react';
import { ChefHat, Clock, Users, PlusCircle, Check } from 'lucide-react';
import { RECIPE_OF_THE_WEEK, SOURDOUGH_IMAGE, PRODUCE_IMAGE } from '../data/products';
import { Product } from '../types';

interface RecipeSpotlightProps {
  products: Product[];
  onAddMultipleToCart: (items: { product: Product; quantity: number }[]) => void;
}

export const RecipeSpotlight: React.FC<RecipeSpotlightProps> = ({
  products,
  onAddMultipleToCart,
}) => {
  const [bundleAdded, setBundleAdded] = useState(false);

  const recipeProducts = RECIPE_OF_THE_WEEK.ingredients
    .map((item) => ({
      ingredientInfo: item,
      product: products.find((p) => p.id === item.productId),
    }))
    .filter((item): item is { ingredientInfo: typeof item.ingredientInfo; product: Product } => Boolean(item.product));

  const bundleTotal = recipeProducts.reduce((sum, item) => sum + item.product.price, 0);

  const handleAddBundle = () => {
    const itemsToAdd = recipeProducts.map((item) => ({
      product: item.product,
      quantity: 1,
    }));
    onAddMultipleToCart(itemsToAdd);
    setBundleAdded(true);
    setTimeout(() => setBundleAdded(false), 2000);
  };

  return (
    <section id="recipe" className="py-16 sm:py-20 bg-[#F4F1EB] border-y border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-emerald-800 mb-2">
            <ChefHat className="w-4 h-4" />
            <span>From Our Grocer's Kitchen</span>
            <span aria-hidden="true">·</span>
            <span>Harvest Recipe of the Week</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-stone-900 font-semibold tracking-tight">
            {RECIPE_OF_THE_WEEK.title}
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base leading-relaxed">
            {RECIPE_OF_THE_WEEK.story}
          </p>
          <div className="flex items-center gap-4 text-xs font-medium text-stone-500 mt-3">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-stone-400" /> Prep: {RECIPE_OF_THE_WEEK.prepTime}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-stone-400" /> Yield: {RECIPE_OF_THE_WEEK.servings}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Ingredients Bundle Box (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-xl p-6 border border-stone-200/90 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-semibold text-stone-900 text-sm">
                Fresh Ingredients in Stock
              </h3>
              <span className="text-xs text-stone-500 font-medium">
                4 local items
              </span>
            </div>

            <ul className="divide-y divide-stone-100 space-y-3">
              {recipeProducts.map(({ ingredientInfo, product }) => (
                <li key={product.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3 text-sm">
                  <div>
                    <span className="font-medium text-stone-900 block">{product.name}</span>
                    <span className="text-xs text-stone-500">{ingredientInfo.amount} · {product.farm}</span>
                  </div>
                  <span className="font-semibold text-stone-800 text-xs tabular-nums shrink-0">
                    ${product.price.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-stone-100 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-stone-600">Complete Bundle Total</span>
                <span className="font-bold text-stone-900 text-base tabular-nums">
                  ${bundleTotal.toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleAddBundle}
                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium text-sm transition-colors cursor-pointer shadow-xs ${
                  bundleAdded
                    ? 'bg-emerald-700 text-white'
                    : 'bg-emerald-800 hover:bg-emerald-700 text-white'
                }`}
              >
                {bundleAdded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-200" />
                    <span>All 4 Items Added to Basket!</span>
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-4 h-4 text-emerald-300" />
                    <span>Add All Recipe Ingredients to Basket</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Cooking Steps & Visual (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-xl p-6 sm:p-8 border border-stone-200/90 shadow-xs space-y-6">
            <h3 className="font-display text-xl font-semibold text-stone-900">
              Method & Grocer's Technique
            </h3>

            <div className="space-y-4">
              {RECIPE_OF_THE_WEEK.instructions.map((step, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-800 font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-sm text-stone-700 leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-stone-100 text-xs text-stone-500 italic">
              "We love this recipe because zero food goes to waste: yesterday's sourdough gets a glorious second life soaked in sweet vine tomatoes." — Clara, Mercer Produce Lead
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
