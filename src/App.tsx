import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { BeansSection } from './components/BeansSection';
import { BrewCalculator } from './components/BrewCalculator';
import { TastingReservation } from './components/TastingReservation';
import { RoasterySection } from './components/RoasterySection';
import { Footer } from './components/Footer';
import { ItemCustomizerModal } from './components/ItemCustomizerModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { MenuItem, CoffeeBeanItem, CustomizationOptions, CartItem, PlacedOrder } from './types/coffee';

export default function App() {
  // Cart state persisted in localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_coffee_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal & Drawer UI states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customizerItem, setCustomizerItem] = useState<MenuItem | null>(null);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('atelier_coffee_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Total cart calculation
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  // Add customized menu item
  const handleAddCustomizedItem = (
    item: MenuItem,
    customization: CustomizationOptions,
    quantity: number,
    unitPrice: number
  ) => {
    const configKey = `${item.id}-${customization.size}-${customization.bean}-${customization.milk}-${customization.temperature}-${customization.sweetness}-${customization.syrup}-${customization.extraShot ? 'extra' : 'standard'}`;
    
    setCart((prev) => {
      const existingIndex = prev.findIndex((ci) => ci.cartItemId === configKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prev,
        {
          cartItemId: configKey,
          item,
          type: 'menu',
          quantity,
          customization,
          unitPrice,
        },
      ];
    });

    setIsCartOpen(true);
  };

  // Quick add menu item with default standard customization
  const handleQuickAdd = (item: MenuItem) => {
    const defaultCustomization: CustomizationOptions = {
      size: '12oz',
      bean: 'house',
      milk: item.category === 'pourover' ? 'none' : 'oat',
      temperature: item.name.toLowerCase().includes('cold') || item.name.toLowerCase().includes('ice') ? 'iced' : 'hot',
      sweetness: 'none',
      syrup: 'none',
      extraShot: false,
    };

    const configKey = `${item.id}-quick-default`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((ci) => ci.cartItemId === configKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [
        ...prev,
        {
          cartItemId: configKey,
          item,
          type: 'menu',
          quantity: 1,
          customization: defaultCustomization,
          unitPrice: item.price,
        },
      ];
    });

    setIsCartOpen(true);
  };

  // Add whole beans to cart
  const handleAddBeansToCart = (
    bean: CoffeeBeanItem,
    grind: string,
    size: '250g' | '1kg',
    unitPrice: number
  ) => {
    const configKey = `${bean.id}-${size}-${grind.replace(/\s+/g, '-')}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((ci) => ci.cartItemId === configKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [
        ...prev,
        {
          cartItemId: configKey,
          item: { ...bean, grind, size },
          type: 'bean',
          quantity: 1,
          unitPrice,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Scroll to section helpers
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#221711] flex flex-col">
      {/* Top Bar Contract Navigation */}
      <Navbar
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReserve={() => setIsReserveModalOpen(true)}
      />

      {/* Main Experience */}
      <main className="flex-1">
        <Hero
          onExploreMenu={() => scrollTo('menu')}
          onExploreBeans={() => scrollTo('beans')}
          onOpenReserve={() => setIsReserveModalOpen(true)}
        />

        <MenuSection
          onSelectItem={(item) => setCustomizerItem(item)}
          onQuickAdd={handleQuickAdd}
        />

        <BeansSection onAddBeansToCart={handleAddBeansToCart} />

        <BrewCalculator />

        <TastingReservation
          isOpenModal={isReserveModalOpen}
          onCloseModal={() => setIsReserveModalOpen(false)}
        />

        <RoasterySection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Drink / Pastry Customizer Modal */}
      <ItemCustomizerModal
        item={customizerItem}
        isOpen={!!customizerItem}
        onClose={() => setCustomizerItem(null)}
        onAddToCart={handleAddCustomizedItem}
      />

      {/* Cart & Pickup Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderPlaced={(order) => setPlacedOrder(order)}
      />

      {/* Live Order Confirmation & Status Tracker Modal */}
      <OrderSuccessModal
        order={placedOrder}
        onClose={() => setPlacedOrder(null)}
      />
    </div>
  );
}
