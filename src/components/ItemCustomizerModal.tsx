import { useState } from 'react';
import { X, Plus, Minus, Check } from 'lucide-react';
import { MenuItem, CustomizationOptions } from '../types/coffee';
import { CoffeeArt } from './CoffeeArt';

interface ItemCustomizerModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem, customization: CustomizationOptions, quantity: number, unitPrice: number) => void;
}

export function ItemCustomizerModal({ item, isOpen, onClose, onAddToCart }: ItemCustomizerModalProps) {
  if (!isOpen || !item) return null;

  const [size, setSize] = useState<'8oz' | '12oz' | '16oz'>('12oz');
  const [bean, setBean] = useState<'house' | 'single-origin' | 'decaf'>('house');
  const [milk, setMilk] = useState<'whole' | 'oat' | 'almond' | 'macadamia' | 'none'>(
    item.category === 'pourover' ? 'none' : 'oat'
  );
  const [temperature, setTemperature] = useState<'hot' | 'iced' | 'extra-hot'>(
    item.name.toLowerCase().includes('cold') || item.name.toLowerCase().includes('ice') ? 'iced' : 'hot'
  );
  const [sweetness, setSweetness] = useState<'none' | 'light' | 'regular'>('none');
  const [syrup, setSyrup] = useState<'none' | 'vanilla' | 'cardamom' | 'caramel'>('none');
  const [extraShot, setExtraShot] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  // Compute calculated unit price
  let unitPrice = item.price;
  if (size === '16oz') unitPrice += 0.85;
  if (size === '8oz' && item.price > 4.5) unitPrice -= 0.40;
  if (bean === 'single-origin') unitPrice += 0.75;
  if (milk === 'oat' || milk === 'almond') unitPrice += 0.65;
  if (milk === 'macadamia') unitPrice += 0.85;
  if (syrup !== 'none') unitPrice += 0.75;
  if (extraShot) unitPrice += 1.25;

  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    const customization: CustomizationOptions = {
      size,
      bean,
      milk,
      temperature,
      sweetness,
      syrup,
      extraShot,
      notes: notes.trim() || undefined,
    };
    onAddToCart(item, customization, quantity, unitPrice);
    onClose();
  };

  const isDrink = item.category === 'espresso' || item.category === 'pourover' || item.category === 'specialties';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#140D08]/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-[#FAF8F5] rounded-xl border border-[#E5DDD0] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-[#EAE3D6] bg-white">
          <div>
            <h3 className="font-serif text-lg font-semibold text-[#20150E]">{item.name}</h3>
            <p className="text-xs text-[#7A675A]">Customise your cup</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#7A675A] hover:text-[#20150E] hover:bg-[#F3ECE0] transition-colors"
            aria-label="Close customizer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1 text-sm">
          {/* Item Preview Banner */}
          <div className="flex gap-4 p-3 bg-white rounded-lg border border-[#EAE3D6] items-center">
            <div className="w-16 h-16 rounded-md overflow-hidden shrink-0 border border-[#E5DDD0]">
              <CoffeeArt type={item.artType} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-[#5C4A3E] leading-relaxed line-clamp-2">{item.description}</p>
              {item.notes && item.notes.length > 0 && (
                <div className="flex items-center gap-1.5 text-[11px] text-[#8C6239] mt-1.5 truncate">
                  <span className="font-medium">Tasting:</span>
                  <span>{item.notes.join(' · ')}</span>
                </div>
              )}
            </div>
          </div>

          {isDrink ? (
            <>
              {/* Cup Size */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#695547] mb-2">
                  Serving Size
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: '8oz', label: '8oz Small', desc: 'Dense & Rich' },
                    { id: '12oz', label: '12oz Standard', desc: 'Balanced Cup' },
                    { id: '16oz', label: '16oz Large', desc: '+$0.85' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSize(s.id as any)}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        size === s.id
                          ? 'border-[#221711] bg-white text-[#221711] shadow-xs'
                          : 'border-[#E2D8C8] bg-[#F7F4EE] text-[#695547] hover:border-[#C4B4A2]'
                      }`}
                    >
                      <p className="font-semibold text-xs">{s.label}</p>
                      <p className="text-[11px] opacity-70">{s.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Temperature */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#695547] mb-2">
                  Temperature
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'hot', label: 'Hot (65°C)' },
                    { id: 'iced', label: 'Over Clear Ice' },
                    { id: 'extra-hot', label: 'Extra Hot' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTemperature(t.id as any)}
                      className={`py-2 px-3 rounded-lg border text-center text-xs font-medium transition-all ${
                        temperature === t.id
                          ? 'border-[#221711] bg-white text-[#221711] shadow-xs'
                          : 'border-[#E2D8C8] bg-[#F7F4EE] text-[#695547] hover:border-[#C4B4A2]'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bean Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#695547] mb-2">
                  Bean Lot
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'house', label: 'House Blend', desc: 'Chocolate & Pecan' },
                    { id: 'single-origin', label: 'Ethiopia Washed', desc: 'Floral · +$0.75' },
                    { id: 'decaf', label: 'Swiss Water Decaf', desc: 'No caffeine' },
                  ].map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBean(b.id as any)}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        bean === b.id
                          ? 'border-[#221711] bg-white text-[#221711] shadow-xs'
                          : 'border-[#E2D8C8] bg-[#F7F4EE] text-[#695547] hover:border-[#C4B4A2]'
                      }`}
                    >
                      <p className="font-semibold text-xs">{b.label}</p>
                      <p className="text-[11px] opacity-75">{b.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Milk Option */}
              {item.category !== 'pourover' && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#695547] mb-2">
                    Milk Selection
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'oat', label: 'Oat Milk', sub: 'Oatly Barista · +$0.65' },
                      { id: 'whole', label: 'Organic Whole', sub: 'Local Farm' },
                      { id: 'almond', label: 'Califia Almond', sub: '+$0.65' },
                      { id: 'macadamia', label: 'Macadamia', sub: '+$0.85' },
                      { id: 'none', label: 'No Milk / Black', sub: 'Clean espresso' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setMilk(m.id as any)}
                        className={`p-2.5 rounded-lg border text-left transition-all ${
                          milk === m.id
                            ? 'border-[#221711] bg-white text-[#221711] shadow-xs'
                            : 'border-[#E2D8C8] bg-[#F7F4EE] text-[#695547] hover:border-[#C4B4A2]'
                        }`}
                      >
                        <p className="font-semibold text-xs">{m.label}</p>
                        <p className="text-[10px] opacity-75">{m.sub}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Syrups & Addons */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#695547] mb-2">
                  Artisanal Syrups (+$0.75)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'none', label: 'None' },
                    { id: 'vanilla', label: 'Madagascar Vanilla' },
                    { id: 'cardamom', label: 'Cardamom Spice' },
                    { id: 'caramel', label: 'Smoked Caramel' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSyrup(s.id as any)}
                      className={`p-2 rounded-lg border text-center text-xs font-medium transition-all ${
                        syrup === s.id
                          ? 'border-[#221711] bg-white text-[#221711] shadow-xs'
                          : 'border-[#E2D8C8] bg-[#F7F4EE] text-[#695547] hover:border-[#C4B4A2]'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Extra Shot Toggle */}
              <div className="flex items-center justify-between p-3 rounded-lg border border-[#E5DDD0] bg-white">
                <div>
                  <p className="font-semibold text-xs text-[#20150E]">Extra Ristretto Shot</p>
                  <p className="text-[11px] text-[#7A675A]">Adds deep body and extra caffeine (+$1.25)</p>
                </div>
                <button
                  type="button"
                  onClick={() => setExtraShot(!extraShot)}
                  className={`w-6 h-6 rounded flex items-center justify-center border transition-colors ${
                    extraShot ? 'bg-[#221711] border-[#221711] text-white' : 'border-[#C9BDAF] bg-white'
                  }`}
                  aria-label="Toggle extra shot"
                >
                  {extraShot && <Check className="w-4 h-4" />}
                </button>
              </div>
            </>
          ) : (
            /* Bakery Heating / Preparation */
            <div className="p-3 rounded-lg border border-[#E5DDD0] bg-white">
              <p className="font-semibold text-xs text-[#20150E] mb-1">Bakery Serving</p>
              <p className="text-xs text-[#6B5A4D]">
                Freshly baked today at 5:30 AM by our pastry kitchen. Served warm upon request.
              </p>
            </div>
          )}

          {/* Barista Notes */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#695547] mb-1.5">
              Special Requests or Allergies
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. extra hot, side of sparkling water, warm pastry..."
              className="w-full px-3 py-2 text-xs bg-white border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#221711] text-[#20150E]"
            />
          </div>
        </div>

        {/* Footer Actions with Total & Add to Cart */}
        <div className="p-4 px-6 border-t border-[#EAE3D6] bg-white flex items-center justify-between gap-4">
          <div className="flex items-center border border-[#D5C9B8] rounded-lg bg-[#FAF8F5]">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 text-[#5C4A3E] hover:text-[#20150E] transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-mono tabular-nums px-3 text-sm font-semibold text-[#20150E]">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 text-[#5C4A3E] hover:text-[#20150E] transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleAdd}
            className="flex-1 inline-flex items-center justify-between px-5 py-2.5 text-xs font-semibold text-[#FFFDF9] bg-[#221711] hover:bg-[#3D291D] rounded-lg transition-colors shadow-xs"
          >
            <span>Add to Order</span>
            <span className="font-mono tabular-nums text-[#E2C39D] font-bold text-sm">
              ${totalPrice.toFixed(2)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
