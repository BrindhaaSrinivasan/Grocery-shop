import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Store, Truck, Clock } from 'lucide-react';
import { CartItem, FulfillmentType } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  fulfillmentType: FulfillmentType;
  onSetFulfillmentType: (type: FulfillmentType) => void;
  pickupTimeSlot: string;
  onSetPickupTimeSlot: (slot: string) => void;
  specialInstructions: string;
  onSetSpecialInstructions: (instructions: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  fulfillmentType,
  onSetFulfillmentType,
  pickupTimeSlot,
  onSetPickupTimeSlot,
  specialInstructions,
  onSetSpecialInstructions,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = fulfillmentType === 'delivery' ? (subtotal >= 45 ? 0 : 3.99) : 0;
  const tax = subtotal * 0.05; // 5% grocery estimate
  const total = subtotal + deliveryFee + tax;
  const freeDeliveryThreshold = 45;
  const amountToFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  const timeSlots = [
    'Today: 3:00 PM – 5:00 PM',
    'Today: 5:30 PM – 7:30 PM',
    'Tomorrow: 9:00 AM – 11:00 AM',
    'Tomorrow: 2:00 PM – 4:00 PM',
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-stone-200">
          {/* Drawer Header */}
          <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-[#FAF9F5]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-emerald-800" />
              <h2 className="font-display text-lg font-semibold text-stone-900">
                Your Market Basket
              </h2>
              <span className="text-xs bg-stone-200 text-stone-700 px-2 py-0.5 rounded-full font-semibold">
                {items.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-200/50 transition-colors cursor-pointer"
              aria-label="Close basket"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Fulfillment Toggle */}
          <div className="px-6 py-3 bg-stone-50 border-b border-stone-200">
            <div className="grid grid-cols-2 gap-2 p-1 bg-stone-200/70 rounded-lg text-xs font-medium">
              <button
                onClick={() => onSetFulfillmentType('pickup')}
                className={`flex items-center justify-center gap-1.5 py-1.5 rounded-md transition-all cursor-pointer ${
                  fulfillmentType === 'pickup'
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Store className="w-3.5 h-3.5 text-emerald-700" />
                <span>Store Pickup (Free)</span>
              </button>

              <button
                onClick={() => onSetFulfillmentType('delivery')}
                className={`flex items-center justify-center gap-1.5 py-1.5 rounded-md transition-all cursor-pointer ${
                  fulfillmentType === 'delivery'
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Truck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Local Courier</span>
              </button>
            </div>

            {/* Free Delivery Bar */}
            {fulfillmentType === 'delivery' && (
              <div className="mt-2 text-xs text-stone-600">
                {amountToFreeDelivery > 0 ? (
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span>Add ${amountToFreeDelivery.toFixed(2)} for free delivery</span>
                      <span className="font-semibold text-emerald-800">
                        {Math.round((subtotal / freeDeliveryThreshold) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, (subtotal / freeDeliveryThreshold) * 100)}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-emerald-700 font-medium text-[11px] flex items-center gap-1">
                    ✓ You qualified for free neighborhood delivery!
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 text-stone-500">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-medium text-stone-800">Your basket is empty</h3>
                  <p className="text-xs text-stone-500 mt-1 max-w-xs">
                    Explore our crisp seasonal produce, morning sourdough, and farm butter to fill your bag.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <ul className="divide-y divide-stone-100">
                {items.map((item) => (
                  <li key={item.product.id} className="py-3 flex gap-3 items-center">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-lg object-cover bg-stone-100 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-stone-900 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-stone-500 truncate">
                        ${item.product.price.toFixed(2)} {item.product.unit}
                      </p>

                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="inline-flex items-center gap-1.5 bg-stone-100 rounded-md px-1.5 py-0.5 border border-stone-200">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="p-0.5 text-stone-600 hover:text-stone-900 cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-medium tabular-nums min-w-[14px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="p-0.5 text-stone-600 hover:text-stone-900 cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="p-1 text-stone-400 hover:text-red-600 transition-colors cursor-pointer ml-auto"
                          aria-label={`Remove ${item.product.name}`}
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-semibold text-sm text-stone-900 tabular-nums">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {items.length > 0 && (
              <div className="pt-2 space-y-3">
                {/* Time slot picker */}
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-stone-500" />
                    <span>{fulfillmentType === 'pickup' ? 'Estimated Pickup Window' : 'Delivery Window'}</span>
                  </label>
                  <select
                    value={pickupTimeSlot}
                    onChange={(e) => onSetPickupTimeSlot(e.target.value)}
                    className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900 cursor-pointer"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Grocer Note */}
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Special Instructions for our Grocer
                  </label>
                  <input
                    type="text"
                    value={specialInstructions}
                    onChange={(e) => onSetSpecialInstructions(e.target.value)}
                    placeholder="e.g., please choose green avocados, leave on porch"
                    className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer / Checkout summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-[#FAF9F5] space-y-3">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-stone-900 tabular-nums">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>
                    {fulfillmentType === 'pickup' ? 'Curbside Pickup' : 'Local Courier Fee'}
                  </span>
                  <span className="font-medium text-stone-900 tabular-nums">
                    {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span className="font-medium text-stone-900 tabular-nums">${tax.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-semibold text-stone-900">
                  <span>Estimated Total</span>
                  <span className="font-bold text-base tabular-nums">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg font-medium text-sm transition-colors cursor-pointer shadow-md"
              >
                <span>Checkout · ${total.toFixed(2)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
