import { useState } from 'react';
import { COFFEE_BEANS } from '../data/coffeeData';
import { CoffeeBeanItem } from '../types/coffee';
import { CoffeeArt } from './CoffeeArt';
import { Check, Plus } from 'lucide-react';

interface BeansSectionProps {
  onAddBeansToCart: (bean: CoffeeBeanItem, grind: string, size: '250g' | '1kg', price: number) => void;
}

export function BeansSection({ onAddBeansToCart }: BeansSectionProps) {
  // Local state for each bean card's active grind and size selection
  const [selections, setSelections] = useState<Record<string, { grind: string; size: '250g' | '1kg'; addedNotice: boolean }>>({
    'bean-1': { grind: 'Whole Bean (Recommended)', size: '250g', addedNotice: false },
    'bean-2': { grind: 'Whole Bean (Recommended)', size: '250g', addedNotice: false },
    'bean-3': { grind: 'Whole Bean (Recommended)', size: '250g', addedNotice: false },
    'bean-4': { grind: 'Whole Bean (Recommended)', size: '250g', addedNotice: false },
  });

  const grindOptions = [
    'Whole Bean (Recommended)',
    'Pour Over / V60',
    'AeroPress',
    'French Press',
    'Espresso Machine',
  ];

  const handleGrindChange = (beanId: string, grind: string) => {
    setSelections((prev) => ({
      ...prev,
      [beanId]: { ...(prev[beanId] || { size: '250g', addedNotice: false }), grind },
    }));
  };

  const handleSizeChange = (beanId: string, size: '250g' | '1kg') => {
    setSelections((prev) => ({
      ...prev,
      [beanId]: { ...(prev[beanId] || { grind: 'Whole Bean (Recommended)', addedNotice: false }), size },
    }));
  };

  const handleAdd = (bean: CoffeeBeanItem) => {
    const sel = selections[bean.id] || { grind: 'Whole Bean (Recommended)', size: '250g', addedNotice: false };
    const price = sel.size === '1kg' ? bean.price1kg : bean.price250g;
    onAddBeansToCart(bean, sel.grind, sel.size, price);

    // Show quick added feedback
    setSelections((prev) => ({
      ...prev,
      [bean.id]: { ...sel, addedNotice: true },
    }));
    setTimeout(() => {
      setSelections((prev) => ({
        ...prev,
        [bean.id]: { ...(prev[bean.id] || sel), addedNotice: false },
      }));
    }, 1800);
  };

  return (
    <section id="beans" className="py-16 md:py-24 bg-[#F5EFEB] border-b border-[#E6DCD0]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#966742] mb-2">
            <span>The Roastery Retail Counter</span>
            <span aria-hidden="true">·</span>
            <span>Shipped or In-Store Pickup</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E140D] font-normal tracking-tight [text-wrap:balance]">
            Single-Origin Micro-Lots & Seasonal Blends
          </h2>
          <p className="text-sm text-[#5F4E42] mt-3 leading-relaxed">
            Direct-trade green lots sourced from smallholder farmers, meticulously roasted to order on our vintage 1968 Probat cast-iron drum. Nitrogen flushed with degassing valve.
          </p>
        </div>

        {/* Bean Showcase Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {COFFEE_BEANS.map((bean) => {
            const currentSel = selections[bean.id] || { grind: 'Whole Bean (Recommended)', size: '250g', addedNotice: false };
            const currentPrice = currentSel.size === '1kg' ? bean.price1kg : bean.price250g;

            return (
              <div
                key={bean.id}
                className="bg-white rounded-xl border border-[#E5DDD0] shadow-xs overflow-hidden flex flex-col justify-between"
              >
                {/* Visual Top Bar & Image */}
                <div className="grid grid-cols-1 sm:grid-cols-12 border-b border-[#EAE3D6]">
                  <div className="sm:col-span-5 h-48 sm:h-auto border-b sm:border-b-0 sm:border-r border-[#EAE3D6] relative">
                    <CoffeeArt type="beans" className="w-full h-full" />
                    <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-xs px-2 py-0.5 rounded text-[11px] font-mono tabular-nums text-[#69482F] border border-[#DFD6C7]">
                      SCA {bean.score.toFixed(1)}
                    </div>
                  </div>

                  <div className="sm:col-span-7 p-5 flex flex-col justify-between">
                    <div>
                      {/* Quiet unboxed location and harvest */}
                      <p className="text-xs uppercase tracking-wider text-[#966742] font-semibold">
                        {bean.country} · {bean.region}
                      </p>
                      <h3 className="font-serif text-xl font-medium text-[#20150E] mt-1 leading-snug">
                        {bean.name}
                      </h3>
                      <p className="text-xs text-[#7A675A] mt-1">
                        {bean.farm} · {bean.altitude}
                      </p>

                      {/* Flavor notes */}
                      <div className="mt-3 text-xs text-[#38261B] bg-[#FAF8F5] p-2.5 rounded-lg border border-[#EBE4D8]">
                        <span className="font-semibold text-[#8C6239] block text-[11px] uppercase tracking-wider mb-1">
                          Flavor Profile
                        </span>
                        <div className="flex flex-wrap items-center gap-1.5 font-medium">
                          {bean.notes.map((note, idx) => (
                            <span key={idx}>
                              {note}
                              {idx < bean.notes.length - 1 && <span className="opacity-40 ml-1.5">/</span>}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Processing & Roast data */}
                    <div className="mt-4 pt-3 border-t border-[#F2ECE3] flex items-center justify-between text-xs text-[#6B5A4D]">
                      <span>{bean.process} Process</span>
                      <span aria-hidden="true">·</span>
                      <span>{bean.roastLevel} Roast</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[11px] text-[#8C7A6D]">{bean.roastDate}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Customization & Add to Cart Controls */}
                <div className="p-5 bg-[#FCFAF7] space-y-4">
                  {/* Size and Grind selectors */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {/* Size Selector */}
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#695547] mb-1.5">
                        Package Weight
                      </label>
                      <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#EFE9DF] rounded-lg">
                        <button
                          type="button"
                          onClick={() => handleSizeChange(bean.id, '250g')}
                          className={`py-1.5 px-2 text-xs font-medium rounded-md transition-colors ${
                            currentSel.size === '250g'
                              ? 'bg-white text-[#20150E] shadow-xs'
                              : 'text-[#6B5A4D] hover:text-[#20150E]'
                          }`}
                        >
                          250g (${bean.price250g.toFixed(2)})
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSizeChange(bean.id, '1kg')}
                          className={`py-1.5 px-2 text-xs font-medium rounded-md transition-colors ${
                            currentSel.size === '1kg'
                              ? 'bg-white text-[#20150E] shadow-xs'
                              : 'text-[#6B5A4D] hover:text-[#20150E]'
                          }`}
                        >
                          1kg (${bean.price1kg.toFixed(2)})
                        </button>
                      </div>
                    </div>

                    {/* Grind Selector */}
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#695547] mb-1.5">
                        Grind Profile
                      </label>
                      <select
                        value={currentSel.grind}
                        onChange={(e) => handleGrindChange(bean.id, e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#D5C9B8] rounded-md focus:outline-none focus:border-[#221711] text-[#20150E]"
                      >
                        {grindOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Price & Add to Cart button */}
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <span className="text-xs text-[#8C7A6D] block">Price for {currentSel.size}:</span>
                      <span className="font-mono tabular-nums text-xl font-semibold text-[#20150E]">
                        ${currentPrice.toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAdd(bean)}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-md transition-all shadow-xs ${
                        currentSel.addedNotice
                          ? 'bg-[#2E7D32] text-white'
                          : 'bg-[#221711] text-[#FFFDF9] hover:bg-[#3D291D]'
                      }`}
                    >
                      {currentSel.addedNotice ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added to Bag</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 text-[#E6C59E]" />
                          <span>Add to Order</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
