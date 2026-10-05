export type ProductCategory = 'all' | 'produce' | 'bakery' | 'dairy' | 'pantry' | 'deli';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  unit: string;
  farm: string;
  distance: string;
  isOrganic?: boolean;
  isArtisan?: boolean;
  isSeasonal?: boolean;
  description: string;
  storageTip: string;
  image: string;
  fallbackColor: string;
  nutritionHighlight?: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type FulfillmentType = 'pickup' | 'delivery';

export interface OrderDetails {
  orderId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  fulfillmentType: FulfillmentType;
  pickupTimeSlot?: string;
  deliveryAddress?: string;
  specialInstructions?: string;
  paymentMethod: 'pay_at_store' | 'card' | 'cod';
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  createdAt: string;
}

export interface PartnerFarm {
  id: string;
  name: string;
  location: string;
  distance: string;
  specialty: string;
  description: string;
  sinceYear: number;
}
