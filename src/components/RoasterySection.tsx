import { MapPin, Clock, Phone, Mail, Award, Flame, Coffee, CheckCircle } from 'lucide-react';
import { CoffeeArt } from './CoffeeArt';

export function RoasterySection() {
  return (
    <section id="roastery" className="py-16 md:py-24 bg-[#FAF8F5] border-b border-[#EAE3D6]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#966742] mb-2">
            <span>Flagship Bar & Micro-Roastery</span>
            <span aria-hidden="true">·</span>
            <span>Visit Us</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E140D] font-normal tracking-tight [text-wrap:balance]">
            Crafted for Coffee Devotees
          </h2>
          <p className="text-sm text-[#5F4E42] mt-3 leading-relaxed">
            Designed as an open sensory sanctuary. Watch green coffees tumble in our restored 1968 cast-iron drum, taste micro-lot single origins pulled on custom manual needle valves, and enjoy fresh pastries baked daily on premises.
          </p>
        </div>

        {/* Roastery Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Roastery Philosophy & Gear */}
          <div className="lg:col-span-7 bg-white p-8 rounded-xl border border-[#E5DDD0] shadow-xs flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#E5DDD0] flex items-center justify-center text-[#966742]">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-medium text-[#20150E]">
                    Cast-Iron Drum Roasting
                  </h3>
                  <p className="text-xs text-[#7A675A]">
                    Gentle conductive heat transfer for complex sweetness and caramelization
                  </p>
                </div>
              </div>

              <p className="text-xs text-[#5F4E42] leading-relaxed">
                Unlike modern high-velocity convective air roasters that can strip volatile floral aromatics, our vintage German cast-iron drum retains high thermal mass. We roast deliberately slowly in small 15kg charges, monitoring bean temperature rate-of-rise every 10 seconds to pinpoint the exact caramelization inflection point.
              </p>

              {/* Equipment Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#F2ECE3]">
                <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#EBE4D8]">
                  <p className="text-[11px] font-semibold text-[#8C6239] uppercase tracking-wider">Roaster</p>
                  <p className="text-xs font-bold text-[#20150E] mt-0.5">1968 Probat UG15</p>
                  <p className="text-[10px] text-[#7A675A] mt-0.5">Cast-iron dual wall</p>
                </div>

                <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#EBE4D8]">
                  <p className="text-[11px] font-semibold text-[#8C6239] uppercase tracking-wider">Espresso</p>
                  <p className="text-xs font-bold text-[#20150E] mt-0.5">Slayer Steam LP</p>
                  <p className="text-[10px] text-[#7A675A] mt-0.5">Dual-flow extraction</p>
                </div>

                <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#EBE4D8]">
                  <p className="text-[11px] font-semibold text-[#8C6239] uppercase tracking-wider">Grinding</p>
                  <p className="text-xs font-bold text-[#20150E] mt-0.5">Mahlkönig EK43S</p>
                  <p className="text-[10px] text-[#7A675A] mt-0.5">98mm unimodal steel</p>
                </div>
              </div>

              {/* Direct Trade Commitments */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-xs text-[#5F4E42]">
                  <CheckCircle className="w-4 h-4 text-[#34A853] shrink-0" />
                  <span>Paying on average 280% over Fair Trade market minimums directly to producers</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#5F4E42]">
                  <CheckCircle className="w-4 h-4 text-[#34A853] shrink-0" />
                  <span>Zero chemical additives, natural processing, compostable corn-fiber takeaway cups</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#5F4E42]">
                  <CheckCircle className="w-4 h-4 text-[#34A853] shrink-0" />
                  <span>All surplus fresh bakery pastries donated daily to local community shelters</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#F2ECE3] flex items-center justify-between text-xs text-[#7A675A]">
              <span>Visit our open cupping table every Saturday at 11:00 AM for public coffee tastings.</span>
            </div>
          </div>

          {/* Right Column: Cafe Info, Hours, Address & Map Preview */}
          <div className="lg:col-span-5 bg-[#FAF8F5] p-8 rounded-xl border border-[#E5DDD0] shadow-xs flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="font-serif text-xl font-medium text-[#20150E]">
                Hours & Visit Details
              </h3>

              {/* Live Status indicator */}
              <div className="p-3 bg-[#EAF5EC] border border-[#C5E1A5] rounded-lg flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#34A853] animate-pulse" />
                <p className="text-xs text-[#2E7D32] font-medium">
                  Open Today until 7:00 PM · Walk-in seats available
                </p>
              </div>

              {/* Hours List */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between pb-2 border-b border-[#EAE3D6]">
                  <span className="text-[#6B5A4D]">Monday – Friday</span>
                  <span className="font-semibold text-[#20150E]">7:00 AM – 7:00 PM</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#EAE3D6]">
                  <span className="text-[#6B5A4D]">Saturday</span>
                  <span className="font-semibold text-[#20150E]">8:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#EAE3D6]">
                  <span className="text-[#6B5A4D]">Sunday</span>
                  <span className="font-semibold text-[#20150E]">8:00 AM – 5:00 PM</span>
                </div>
              </div>

              {/* Address & Contact */}
              <div className="space-y-3 pt-2 text-xs text-[#5F4E42]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#966742] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#20150E]">Atelier Roasters Flagship</p>
                    <p>482 Broome Street (Corner of Wooster), SoHo, NY 10013</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#966742] shrink-0" />
                  <span>+1 (212) 555-0198</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#966742] shrink-0" />
                  <span>hello@atelier-roasters.com</span>
                </div>
              </div>
            </div>

            {/* Stylized Architectural Directions Map Box */}
            <div className="mt-6 pt-5 border-t border-[#EAE3D6]">
              <div className="p-4 bg-white rounded-lg border border-[#E5DDD0] text-center">
                <p className="text-xs font-semibold text-[#20150E] mb-1">Transit & Parking</p>
                <p className="text-[11px] text-[#7A675A] leading-relaxed">
                  Subway: Spring St (C, E) or Prince St (R, W) — 3 minute walk. Bicycle parking rack right outside the roastery patio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
