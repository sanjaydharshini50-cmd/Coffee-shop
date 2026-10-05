export type Category = 'all' | 'espresso' | 'pourover' | 'specialties' | 'bakery' | 'beans';

export interface MenuItem {
  id: string;
  name: string;
  category: Category;
  description: string;
  price: number;
  origin?: string;
  notes?: string[];
  roastLevel?: 'Light' | 'Medium-Light' | 'Medium' | 'Dark';
  dietary?: string[];
  artType: 'latte' | 'pourover' | 'espresso' | 'coldbrew' | 'pastry' | 'beans';
  popular?: boolean;
  caffeine: 'High' | 'Medium' | 'Low' | 'Decaf';
  customizable: boolean;
}

export interface CoffeeBeanItem {
  id: string;
  name: string;
  region: string;
  country: string;
  farm: string;
  altitude: string;
  process: 'Washed' | 'Natural' | 'Honey' | 'Anaerobic' | 'Natural & Washed Blend';
  variety: string;
  notes: string[];
  roastLevel: 'Light' | 'Medium-Light' | 'Medium';
  price250g: number;
  price1kg: number;
  roastDate: string;
  score: number;
  bodyProfile: string;
  acidity: string;
}

export interface CustomizationOptions {
  size: '8oz' | '12oz' | '16oz';
  bean: 'house' | 'single-origin' | 'decaf';
  milk: 'whole' | 'oat' | 'almond' | 'macadamia' | 'none';
  temperature: 'hot' | 'iced' | 'extra-hot';
  sweetness: 'none' | 'light' | 'regular';
  syrup: 'none' | 'vanilla' | 'cardamom' | 'caramel';
  extraShot: boolean;
  notes?: string;
}

export interface CartItem {
  cartItemId: string;
  item: MenuItem | (CoffeeBeanItem & { grind: string; size: '250g' | '1kg' });
  type: 'menu' | 'bean';
  quantity: number;
  customization?: CustomizationOptions;
  unitPrice: number;
}

export interface ReservationData {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  experience: 'tasting-flight' | 'cupping-workshop' | 'casual-table';
  notes?: string;
}

export interface PlacedOrder {
  orderId: string;
  customerName: string;
  phone: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  pickupTime: string;
  orderTime: string;
  status: 'received' | 'brewing' | 'ready';
  notes?: string;
}
