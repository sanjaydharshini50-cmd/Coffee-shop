import { useState, useEffect } from 'react';
import { Check, Clock, Coffee, Sparkles, X, ChevronRight } from 'lucide-react';
import { PlacedOrder } from '../types/coffee';

interface OrderSuccessModalProps {
  order: PlacedOrder | null;
  onClose: () => void;
}

export function OrderSuccessModal({ order, onClose }: OrderSuccessModalProps) {
  if (!order) return null;

  const [step, setStep] = useState<number>(2); // 1 = Received, 2 = Brewing, 3 = Ready

  // Simulate preparation transition
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setStep(3);
    }, 12000);

    return () => clearTimeout(timer1);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#120B07]/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-[#FAF8F5] rounded-xl border border-[#E5DDD0] shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="bg-[#221711] text-[#FAF8F5] p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#A8988A] hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-full bg-[#3D291D] border border-[#5A3F2E] flex items-center justify-center mx-auto mb-3 text-[#E6C59E]">
            <Coffee className="w-6 h-6 animate-pulse" />
          </div>

          <p className="text-xs uppercase tracking-widest text-[#C49257] font-semibold">
            Order Queued at Roastery Bar
          </p>
          <h3 className="font-serif text-2xl font-semibold mt-1">
            Order #{order.orderId}
          </h3>
          <p className="text-xs text-[#C8B8A8] mt-1">
            Thank you, {order.customerName}. Estimated pickup: {order.pickupTime}
          </p>
        </div>

        {/* Live Status Progress Bar */}
        <div className="p-6 bg-white border-b border-[#EAE3D6]">
          <div className="flex items-center justify-between text-xs mb-3 font-medium">
            <span className={step >= 1 ? 'text-[#20150E] font-semibold' : 'text-[#8C7A6D]'}>
              1. Received
            </span>
            <span className={step >= 2 ? 'text-[#A34825] font-semibold' : 'text-[#8C7A6D]'}>
              2. Grinding & Brewing
            </span>
            <span className={step >= 3 ? 'text-[#2E7D32] font-semibold' : 'text-[#8C7A6D]'}>
              3. Ready at Counter
            </span>
          </div>

          {/* Progress Bar Line */}
          <div className="w-full bg-[#EFE9DF] h-2 rounded-full overflow-hidden">
            <div 
              className="bg-[#221711] h-full transition-all duration-1000 ease-out"
              style={{
                width: step === 1 ? '33%' : step === 2 ? '68%' : '100%'
              }}
            />
          </div>

          <div className="mt-4 p-3 bg-[#FAF8F5] rounded-lg border border-[#EAE3D6] flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#A34825] animate-ping" />
            <p className="text-xs text-[#5C4A3E]">
              {step === 2 && (
                <>
                  <span className="font-semibold text-[#20150E]">Barista active:</span> Extraction in progress on our espresso bar.
                </>
              )}
              {step === 3 && (
                <>
                  <span className="font-semibold text-[#2E7D32]">Ready for Pickup!</span> Head to the pickup counter with Order #{order.orderId}.
                </>
              )}
            </p>
          </div>
        </div>

        {/* Order Details & Summary */}
        <div className="p-6 space-y-4 text-xs">
          <h4 className="font-semibold uppercase tracking-wider text-[#695547] pb-1 border-b border-[#EAE3D6]">
            Order Summary
          </h4>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {order.items.map((item, idx) => {
              const itemObj = item.item as any;
              return (
                <div key={idx} className="flex justify-between items-start py-1">
                  <div>
                    <span className="font-medium text-[#20150E]">
                      {item.quantity}x {itemObj.name}
                    </span>
                    {item.customization && (
                      <p className="text-[11px] text-[#7A675A]">
                        {item.customization.size} · {item.customization.temperature}
                        {item.customization.milk !== 'none' && ` · ${item.customization.milk}`}
                      </p>
                    )}
                    {item.type === 'bean' && (
                      <p className="text-[11px] text-[#7A675A]">
                        {itemObj.size} · {itemObj.grind}
                      </p>
                    )}
                  </div>
                  <span className="font-mono tabular-nums text-[#20150E]">
                    ${(item.unitPrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#EAE3D6] space-y-1 text-xs">
            <div className="flex justify-between text-[#7A675A]">
              <span>Subtotal</span>
              <span className="font-mono tabular-nums">${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#7A675A]">
              <span>Tax</span>
              <span className="font-mono tabular-nums">${order.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-sm text-[#20150E] pt-1 border-t border-[#F2ECE3]">
              <span>Total at Counter</span>
              <span className="font-mono tabular-nums">${order.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Pickup Instructions */}
          <div className="p-3 bg-[#EFE9DF] rounded-lg border border-[#DFD6C7] text-xs text-[#5C4A3E]">
            <p className="font-semibold text-[#20150E] mb-0.5">Pickup Location</p>
            <p>
              Atelier Roasters Flagship, 482 Broome Street. Present your name <span className="font-semibold">{order.customerName}</span> or Order #{order.orderId} at the pickup station.
            </p>
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-4 px-6 bg-white border-t border-[#EAE3D6] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-semibold text-[#FFFDF9] bg-[#221711] hover:bg-[#3D291D] rounded-md transition-colors"
          >
            Back to Café Menu
          </button>
        </div>
      </div>
    </div>
  );
}
