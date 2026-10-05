import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#1C140E] text-[#D8CEBE] py-16 border-t border-[#2F2117]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#2E2016]">
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-serif text-2xl font-semibold text-[#FFFDF9] tracking-tight block">
              Atelier Roasters
            </span>
            <p className="text-xs text-[#A8988A] leading-relaxed max-w-sm">
              An independent micro-lot specialty coffee roaster and bakery dedicated to single-origin transparency, vintage cast-iron roasting, and precision extraction.
            </p>
            <div className="pt-2 text-xs text-[#8C7A6D] space-y-1">
              <p>482 Broome Street, SoHo, New York, NY 10013</p>
              <p>Monday – Sunday · 7:00 AM – 7:00 PM</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <p className="font-semibold uppercase tracking-wider text-[#C49257]">Quick Navigation</p>
            <ul className="space-y-2 text-[#B3A293]">
              <li>
                <a href="#menu" className="hover:text-white transition-colors">Daily Counter Menu</a>
              </li>
              <li>
                <a href="#beans" className="hover:text-white transition-colors">Single-Origin Retail Beans</a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-white transition-colors">Brew Ratio Calculator & Timer</a>
              </li>
              <li>
                <a href="#tasting" className="hover:text-white transition-colors">Tasting Flights & Cuppings</a>
              </li>
              <li>
                <a href="#roastery" className="hover:text-white transition-colors">Roastery & Equipment</a>
              </li>
            </ul>
          </div>

          {/* Micro-Lot Dispatch Newsletter */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#C49257]">
              Micro-Lot Harvest Dispatches
            </p>
            <p className="text-xs text-[#A8988A] leading-relaxed">
              Receive notifications when rare limited harvests (Panama Geisha, Pink Bourbon, natural anaerobics) drop off the roaster.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#2A1E16] border border-[#3E2D22] rounded-lg text-xs text-[#34A853] flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Thank you. You are enrolled in seasonal harvest releases.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 text-xs bg-[#2A1E16] border border-[#3E2D22] rounded-md focus:outline-none focus:border-[#C49257] text-[#FFFDF9] placeholder:text-[#7A6B5F]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-[#1C140E] bg-[#C49257] hover:bg-[#D9A66B] rounded-md transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Quiet Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A6A5E]">
          <p>© 2026 Atelier Roasters Co. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Specialty Coffee Association Certified</span>
            <span aria-hidden="true">·</span>
            <span>Direct Farm Trade</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
