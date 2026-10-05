import { ArrowRight, Compass, Flame, Clock } from 'lucide-react';
import { CoffeeArt } from './CoffeeArt';

interface HeroProps {
  onExploreMenu: () => void;
  onExploreBeans: () => void;
  onOpenReserve: () => void;
}

export function Hero({ onExploreMenu, onExploreBeans, onOpenReserve }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 border-b border-[#EAE3D6] bg-gradient-to-b from-[#FAF8F5] via-[#F6F1EA] to-[#FAF8F5]">
      {/* Subtle architectural grid pattern background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(#221711 1px, transparent 1px)`,
          backgroundSize: '28px 28px'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Roaster Daily Note - Unboxed Clean Editorial Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-2.5 px-4 mb-8 bg-[#EFE9DF]/80 border border-[#DFD6C7] rounded-lg text-xs text-[#5C4A3E]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
            <span className="font-semibold text-[#291C14]">Bar Open & Roasting Today:</span>
            <span>Ethiopia Yirgacheffe G1 Chelchele (Washed)</span>
          </div>
          <div className="flex items-center gap-4 text-[#7A675A]">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#9C7A58]" />
              <span>Counter pickup in ~12 mins</span>
            </span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">Walk-ins welcome & table bookings available</span>
          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Unboxed kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#966742] mb-4">
              <span>Single-Origin Micro-Lots</span>
              <span aria-hidden="true">·</span>
              <span>Cast-Iron Drum Roasted</span>
              <span aria-hidden="true">·</span>
              <span>Direct Trade</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1E140D] font-normal leading-[1.08] tracking-tight mb-6 [text-wrap:balance]">
              Slow roasted with exactitude. <br />
              <span className="italic font-serif font-light text-[#7C4927]">Brewed for pure terroir.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#5F4E42] max-w-xl font-normal leading-relaxed mb-8 [text-wrap:pretty]">
              We source singular micro-lots directly from dedicated growers across Ethiopia, Colombia, and Kenya. Roasted in 15kg small batches on vintage cast-iron, every harvest is dialed to preserve delicate florality, natural sweetness, and sparkling origin clarity.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <button
                onClick={onExploreMenu}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#FFFDF9] bg-[#221711] hover:bg-[#3D291D] rounded-md transition-all shadow-sm group whitespace-nowrap"
              >
                <span>Order for Pickup</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#E4BA8C]" />
              </button>

              <button
                onClick={onExploreBeans}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#38261A] bg-[#FFFFFF] border border-[#D5C9B8] hover:bg-[#F5EFE6] rounded-md transition-colors whitespace-nowrap"
              >
                <span>Shop Whole Beans</span>
              </button>

              <button
                onClick={onOpenReserve}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-[#6B5749] hover:text-[#221711] transition-colors whitespace-nowrap"
              >
                <span>Reserve a Cupping Table</span>
              </button>
            </div>

            {/* Adjacent Proof Metrics (Claim-to-Proof Adjacency) */}
            <div className="pt-6 border-t border-[#EAE3D6] grid grid-cols-3 gap-6">
              <div>
                <p className="font-serif text-2xl font-semibold text-[#20150E] tabular-nums">48h</p>
                <p className="text-xs text-[#7A675A] mt-0.5">Peak freshness roast window</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-semibold text-[#20150E] tabular-nums">88+ pts</p>
                <p className="text-xs text-[#7A675A] mt-0.5">SCA specialty cupping grade</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-semibold text-[#20150E] tabular-nums">100%</p>
                <p className="text-xs text-[#7A675A] mt-0.5">Direct farm gate pricing</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none bg-white p-4 rounded-xl border border-[#E5DDD0] shadow-[0_12px_40px_-15px_rgba(43,27,19,0.12)]">
              {/* Main Feature Display */}
              <div className="relative h-72 sm:h-84 rounded-lg overflow-hidden border border-[#EAE3D6]">
                <CoffeeArt type="pourover" className="w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C120B]/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                  <div className="flex items-center gap-2 text-xs font-medium text-[#E8C59D] uppercase tracking-wider mb-1">
                    <span>Pour Over Bar</span>
                    <span aria-hidden="true">·</span>
                    <span>Single Origin</span>
                  </div>
                  <h2 className="font-serif text-xl font-normal leading-snug">
                    Hario V60 Single-Origin Extraction
                  </h2>
                  <p className="text-xs text-[#D9C8B8] mt-1 line-clamp-1">
                    Brewed with 93°C mountain spring water, 1:16 ratio, 3:15 min drawdown.
                  </p>
                </div>
              </div>

              {/* Supporting Secondary Cards below */}
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div 
                  onClick={onExploreMenu}
                  className="p-3 rounded-lg bg-[#FAF8F5] border border-[#E9E1D4] hover:border-[#C49257] cursor-pointer transition-all flex items-center gap-3 group"
                >
                  <div className="w-12 h-12 rounded-md overflow-hidden shrink-0 border border-[#E2D8C9]">
                    <CoffeeArt type="latte" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#231710] group-hover:text-[#966742] transition-colors truncate">
                      Espresso Bar
                    </p>
                    <p className="text-[11px] text-[#7A675A] font-mono tabular-nums">From $3.85</p>
                  </div>
                </div>

                <div 
                  onClick={onExploreBeans}
                  className="p-3 rounded-lg bg-[#FAF8F5] border border-[#E9E1D4] hover:border-[#C49257] cursor-pointer transition-all flex items-center gap-3 group"
                >
                  <div className="w-12 h-12 rounded-md overflow-hidden shrink-0 border border-[#E2D8C9]">
                    <CoffeeArt type="beans" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#231710] group-hover:text-[#966742] transition-colors truncate">
                      Whole Beans
                    </p>
                    <p className="text-[11px] text-[#7A675A] font-mono tabular-nums">From $18.50</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
