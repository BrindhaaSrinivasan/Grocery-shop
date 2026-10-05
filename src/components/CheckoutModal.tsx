import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, MapPin, Phone, Mail, User, Store, Truck, CreditCard, Banknote, Printer } from 'lucide-react';
import { CartItem, FulfillmentType, OrderDetails } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  items: CartItem[];
  fulfillmentType: FulfillmentType;
  pickupTimeSlot: string;
  specialInstructions: string;
  onClose: () => void;
  onOrderSuccess: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  items,
  fulfillmentType,
  pickupTimeSlot,
  specialInstructions,
  onClose,
  onOrderSuccess,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'pay_at_store' | 'card' | 'cod'>('pay_at_store');
  const [createdOrder, setCreatedOrder] = useState<OrderDetails | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = fulfillmentType === 'delivery' ? (subtotal >= 45 ? 0 : 3.99) : 0;
  const tax = subtotal * 0.05;
  const total = subtotal + deliveryFee + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const order: OrderDetails = {
      orderId: `MGG-${randomNum}`,
      customerName: name,
      customerPhone: phone,
      customerEmail: email || 'pickup@mercergrocers.com',
      fulfillmentType,
      pickupTimeSlot,
      deliveryAddress: fulfillmentType === 'delivery' ? address : undefined,
      specialInstructions,
      paymentMethod,
      items: [...items],
      subtotal,
      deliveryFee,
      tax,
      total,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setCreatedOrder(order);
    setStep('success');
    onOrderSuccess(order);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in"
    >
      <div
        className="relative bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-[#FAF9F5]">
          <div className="flex items-center gap-2">
            <span className="font-display text-lg font-semibold text-stone-900">
              {step === 'form' ? 'Checkout & Order Confirmation' : 'Order Received!'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Fulfillment recap */}
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                {fulfillmentType === 'pickup' ? (
                  <Store className="w-4 h-4 text-emerald-800" />
                ) : (
                  <Truck className="w-4 h-4 text-emerald-800" />
                )}
                <span className="font-semibold text-stone-900">
                  {fulfillmentType === 'pickup' ? 'Curbside Pickup at 412 Maple St' : 'Local Courier Delivery'}
                </span>
              </div>
              <span className="text-stone-600 font-medium">{pickupTimeSlot}</span>
            </div>

            {/* Customer Information */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-600">
                Customer Details
              </h3>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Sarah Jenkins"
                    className="w-full text-xs pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(503) 555-0199"
                      className="w-full text-xs pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sarah@example.com"
                      className="w-full text-xs pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                </div>
              </div>

              {fulfillmentType === 'delivery' && (
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Delivery Street Address & Unit <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required={fulfillmentType === 'delivery'}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="742 Evergreen Terrace, Apt 3B"
                      className="w-full text-xs pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-600">
                Payment Method
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <label
                  className={`p-3 rounded-lg border text-xs cursor-pointer flex flex-col gap-1 transition-colors ${
                    paymentMethod === 'pay_at_store'
                      ? 'border-emerald-800 bg-emerald-50/50 text-stone-900 font-medium'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    className="sr-only"
                    checked={paymentMethod === 'pay_at_store'}
                    onChange={() => setPaymentMethod('pay_at_store')}
                  />
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Store className="w-4 h-4 text-emerald-800" />
                    <span>Pay at Counter</span>
                  </div>
                  <span className="text-[11px] text-stone-500">Card or cash upon pickup</span>
                </label>

                <label
                  className={`p-3 rounded-lg border text-xs cursor-pointer flex flex-col gap-1 transition-colors ${
                    paymentMethod === 'card'
                      ? 'border-emerald-800 bg-emerald-50/50 text-stone-900 font-medium'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    className="sr-only"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                  />
                  <div className="flex items-center gap-1.5 font-semibold">
                    <CreditCard className="w-4 h-4 text-emerald-800" />
                    <span>Card on File</span>
                  </div>
                  <span className="text-[11px] text-stone-500">Contactless tap terminal</span>
                </label>

                <label
                  className={`p-3 rounded-lg border text-xs cursor-pointer flex flex-col gap-1 transition-colors ${
                    paymentMethod === 'cod'
                      ? 'border-emerald-800 bg-emerald-50/50 text-stone-900 font-medium'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    className="sr-only"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                  />
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Banknote className="w-4 h-4 text-emerald-800" />
                    <span>Cash on Delivery</span>
                  </div>
                  <span className="text-[11px] text-stone-500">Pay courier directly</span>
                </label>
              </div>
            </div>

            {/* Total recap and submit button */}
            <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-500 block">Total Due:</span>
                <span className="text-xl font-bold text-stone-900 tabular-nums">${total.toFixed(2)}</span>
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg font-medium text-sm transition-colors cursor-pointer shadow-sm"
              >
                Place Grocery Order
              </button>
            </div>
          </form>
        ) : (
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
              <CheckCircle className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-semibold">
                Order #{createdOrder?.orderId}
              </span>
              <h3 className="font-display text-2xl font-semibold text-stone-900 mt-1">
                Thank you, {createdOrder?.customerName}!
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-md mx-auto">
                Our counter grocers have received your harvest order. We are carefully packing your items right now.
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="text-left bg-stone-50 rounded-xl p-4 border border-stone-200 text-xs space-y-2.5">
              <div className="flex justify-between pb-2 border-b border-stone-200 font-medium text-stone-700">
                <span>Fulfillment Window:</span>
                <span className="text-stone-900 font-semibold">{createdOrder?.pickupTimeSlot}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-stone-200 text-stone-600">
                <span>Pickup Location:</span>
                <span className="text-stone-900 font-medium">412 Maple Street (Stall 1-4)</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-stone-200 text-stone-600">
                <span>Payment Method:</span>
                <span className="text-stone-900 font-medium uppercase text-[11px]">
                  {createdOrder?.paymentMethod.replace(/_/g, ' ')}
                </span>
              </div>

              <div className="pt-1">
                <span className="font-semibold text-stone-800 block mb-1">
                  Items ({createdOrder?.items.reduce((s, i) => s + i.quantity, 0)} items):
                </span>
                <ul className="space-y-1 text-stone-600 max-h-32 overflow-y-auto">
                  {createdOrder?.items.map((i) => (
                    <li key={i.product.id} className="flex justify-between">
                      <span className="truncate pr-2">
                        {i.quantity}x {i.product.name}
                      </span>
                      <span className="tabular-nums font-medium text-stone-800">
                        ${(i.product.price * i.quantity).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-stone-900 text-sm">
                <span>Total Amount:</span>
                <span className="tabular-nums">${createdOrder?.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-stone-300 rounded-lg text-xs font-medium text-stone-700 hover:bg-stone-50 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" /> Print Receipt
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-medium cursor-pointer"
              >
                Return to Grocer Shop
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
