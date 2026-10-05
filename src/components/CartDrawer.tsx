import { useState } from 'react';
import { X, Plus, Minus, Trash2, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem, PlacedOrder } from '../types/coffee';
import { CoffeeArt } from './CoffeeArt';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onOrderPlaced: (order: PlacedOrder) => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderPlaced,
}: CartDrawerProps) {
  const [pickupTime, setPickupTime] = useState<string>('ASAP (~12-15 mins)');
  const [customerName, setCustomerName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [orderNotes, setOrderNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const tax = subtotal * 0.08875;
  const total = subtotal + tax;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0 || !customerName.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const order: PlacedOrder = {
        orderId: `AR-${Math.floor(1000 + Math.random() * 9000)}`,
        customerName: customerName.trim(),
        phone: phone.trim() || '+1 (555) 234-8901',
        items: [...items],
        subtotal,
        tax,
        total,
        pickupTime,
        orderTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'brewing',
        notes: orderNotes.trim() || undefined,
      };

      setIsSubmitting(false);
      onClearCart();
      onClose();
      onOrderPlaced(order);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-[#120B07]/50 backdrop-blur-xs transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#E5DDD0] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-[#EAE3D6] bg-white flex items-center justify-between">
            <div>
              <h2 className="font-serif text-lg font-semibold text-[#20150E]">Your Order Bag</h2>
              <p className="text-xs text-[#7A675A] font-mono tabular-nums">
                {items.length} {items.length === 1 ? 'item' : 'items'} for Counter Pickup
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#7A675A] hover:text-[#20150E] hover:bg-[#F3ECE0] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body items list */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="py-20 text-center text-[#7A675A]">
                <div className="w-16 h-16 rounded-full bg-[#EFE9DF] text-[#8C7A6D] flex items-center justify-center mx-auto mb-3">
                  <CoffeeArt type="latte" className="w-10 h-10 opacity-70" />
                </div>
                <p className="font-serif text-base text-[#20150E]">Your order bag is empty</p>
                <p className="text-xs text-[#8C7A6D] mt-1">
                  Explore our seasonal espresso, pour-overs, or single-origin beans.
                </p>
                <button
                  onClick={onClose}
                  className="mt-5 px-4 py-2 text-xs font-semibold text-[#20150E] border border-[#D5C9B8] rounded-md hover:bg-white transition-colors"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((cartItem) => {
                  const isBean = cartItem.type === 'bean';
                  const item = cartItem.item as any;

                  return (
                    <div
                      key={cartItem.cartItemId}
                      className="p-3 bg-white rounded-lg border border-[#EAE3D6] shadow-2xs flex gap-3 items-start"
                    >
                      <div className="w-14 h-14 rounded-md overflow-hidden shrink-0 border border-[#E5DDD0]">
                        <CoffeeArt type={isBean ? 'beans' : item.artType || 'latte'} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-sm font-semibold text-[#20150E] truncate">
                            {item.name}
                          </h4>
                          <span className="font-mono tabular-nums text-xs font-semibold text-[#20150E]">
                            ${(cartItem.unitPrice * cartItem.quantity).toFixed(2)}
                          </span>
                        </div>

                        {/* Customization Details */}
                        {isBean ? (
                          <p className="text-[11px] text-[#7A675A] mt-0.5">
                            {item.size} · {item.grind}
                          </p>
                        ) : cartItem.customization ? (
                          <div className="text-[11px] text-[#7A675A] mt-0.5 space-y-0.5">
                            <p>
                              {cartItem.customization.size} · {cartItem.customization.temperature}
                              {cartItem.customization.milk !== 'none' && ` · ${cartItem.customization.milk} milk`}
                            </p>
                            {cartItem.customization.bean !== 'house' && (
                              <p className="text-[#8C6239] font-medium">Single Origin Ethiopia</p>
                            )}
                            {cartItem.customization.extraShot && (
                              <p className="text-[#8C6239]">+ Extra Ristretto Shot</p>
                            )}
                            {cartItem.customization.syrup !== 'none' && (
                              <p>+ {cartItem.customization.syrup} syrup</p>
                            )}
                            {cartItem.customization.notes && (
                              <p className="italic text-[#9C897B]">"{cartItem.customization.notes}"</p>
                            )}
                          </div>
                        ) : null}

                        {/* Quantity Stepper & Remove */}
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#F5EFE6]">
                          <div className="flex items-center border border-[#E0D5C5] rounded bg-[#FAF8F5]">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(cartItem.cartItemId, cartItem.quantity - 1)}
                              className="p-1 text-[#695547] hover:text-[#20150E]"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono tabular-nums text-xs px-2 font-medium text-[#20150E]">
                              {cartItem.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(cartItem.cartItemId, cartItem.quantity + 1)}
                              className="p-1 text-[#695547] hover:text-[#20150E]"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemoveItem(cartItem.cartItemId)}
                            className="text-[#9C897B] hover:text-[#A34825] p-1 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pickup time selector */}
            {items.length > 0 && (
              <div className="pt-4 border-t border-[#EAE3D6] space-y-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#695547] mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#9C7A58]" />
                    <span>Pickup Time</span>
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {['ASAP (~12-15 mins)', 'In 30 mins', 'In 45 mins'].map((timeOption) => (
                      <button
                        key={timeOption}
                        type="button"
                        onClick={() => setPickupTime(timeOption)}
                        className={`p-2 text-center rounded-md border text-[11px] font-medium transition-all ${
                          pickupTime === timeOption
                            ? 'border-[#221711] bg-white text-[#221711] font-semibold'
                            : 'border-[#E2D8C8] bg-[#F7F4EE] text-[#695547] hover:border-[#C4B4A2]'
                        }`}
                      >
                        {timeOption.replace(' (~12-15 mins)', '')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Customer Details Form */}
                <div className="space-y-2 pt-2 text-xs">
                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[#695547] mb-1">
                      Name for Pickup Order *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Julian Wright"
                      className="w-full px-3 py-2 bg-white border border-[#D5C9B8] rounded-md focus:outline-none focus:border-[#221711] text-[#20150E]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[#695547] mb-1">
                      Phone Number (For SMS pickup notification)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 304-2041"
                      className="w-full px-3 py-2 bg-white border border-[#D5C9B8] rounded-md focus:outline-none focus:border-[#221711] text-[#20150E]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[#695547] mb-1">
                      Order Notes (Optional)
                    </label>
                    <input
                      type="text"
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      placeholder="Any specific counter requests..."
                      className="w-full px-3 py-2 bg-white border border-[#D5C9B8] rounded-md focus:outline-none focus:border-[#221711] text-[#20150E]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer with Subtotal & Submit */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#EAE3D6] bg-white space-y-3">
              <div className="space-y-1 text-xs text-[#7A675A]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-[#20150E]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Local Sales Tax (8.875%)</span>
                  <span className="font-mono tabular-nums text-[#20150E]">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#F2ECE3] text-sm font-semibold text-[#20150E]">
                  <span>Total Due at Counter</span>
                  <span className="font-mono tabular-nums text-base text-[#20150E]">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                disabled={isSubmitting || !customerName.trim()}
                className={`w-full flex items-center justify-between px-5 py-3 text-xs font-semibold rounded-lg transition-all shadow-xs ${
                  !customerName.trim()
                    ? 'bg-[#E5DDD0] text-[#8C7A6D] cursor-not-allowed'
                    : 'bg-[#221711] text-[#FFFDF9] hover:bg-[#3D291D]'
                }`}
              >
                <span>
                  {isSubmitting ? 'Transmitting to Barista...' : 'Place Pickup Order'}
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono tabular-nums text-[#E2C39D] font-bold text-sm">
                  ${total.toFixed(2)}
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>

              <p className="text-[11px] text-center text-[#8C7A6D] flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#34A853]" />
                <span>Zero pre-payment required. Pay with tap or card at pickup bar.</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
