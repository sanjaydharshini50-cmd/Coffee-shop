import { ShoppingBag } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenReserve: () => void;
}

export function Navbar({ cartCount, cartTotal, onOpenCart, onOpenReserve }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#EAE3D6] transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark in display face */}
        <a 
          href="#" 
          className="font-serif text-2xl font-semibold tracking-tight text-[#221711] hover:text-[#7A4B29] transition-colors whitespace-nowrap"
        >
          Atelier Roasters
        </a>

        {/* Zone 2: 4-6 clean text navigation links with subtle hover underlines */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#5F4E42]">
          <a href="#menu" className="hover:text-[#221711] transition-colors hover:underline underline-offset-8 decoration-1 decoration-[#C28E5C]">
            Menu
          </a>
          <a href="#beans" className="hover:text-[#221711] transition-colors hover:underline underline-offset-8 decoration-1 decoration-[#C28E5C]">
            Origin Beans
          </a>
          <a href="#calculator" className="hover:text-[#221711] transition-colors hover:underline underline-offset-8 decoration-1 decoration-[#C28E5C]">
            Brew Calculator
          </a>
          <a href="#tasting" className="hover:text-[#221711] transition-colors hover:underline underline-offset-8 decoration-1 decoration-[#C28E5C]">
            Tastings
          </a>
          <a href="#roastery" className="hover:text-[#221711] transition-colors hover:underline underline-offset-8 decoration-1 decoration-[#C28E5C]">
            The Roastery
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenReserve}
            className="hidden sm:inline-flex px-4 py-2 text-xs font-semibold tracking-wide text-[#3B271B] border border-[#D5C9B8] rounded-md hover:bg-[#F3ECE0] transition-colors whitespace-nowrap"
          >
            Reserve Table
          </button>
          <button
            onClick={onOpenCart}
            aria-label="View Cart"
            className="inline-flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#FFFDF9] bg-[#221711] hover:bg-[#3D291D] rounded-md transition-all shadow-sm whitespace-nowrap group"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#E6C59E] group-hover:scale-110 transition-transform" />
            <span>Order Pickup</span>
            {cartCount > 0 && (
              <span className="font-mono tabular-nums bg-[#C28E5C] text-[#221711] text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-4 text-center">
                {cartCount}
              </span>
            )}
            {cartTotal > 0 && (
              <span className="hidden sm:inline font-mono tabular-nums text-[#D8C7B5] border-l border-white/20 pl-2">
                ${cartTotal.toFixed(2)}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
