export type ContactFormState = {
  name: string;
  email: string;
  message: string;
};

export type SanityImage = {
  _type: "image";
  asset: {
    _ref: string;
    _type: string;
  };
};

export type Category = {
  title: string;
  _type: "category";
};

export type ProductVariant = {
  images: SanityImage[];
  price: number;
  quantity: number;
  title: string;
  _type: "productVariant";
};

export type Product = {
  categories: Category[];
  defaultProductVariant: ProductVariant;
  description: any[];
  features: any[];
  slug: { current: string; _type: "slug" };
  title: string;
  variants: null | ProductVariant[];
  imageUrl: string;
};

export type CartItem = {
  product: ProductVariant;
  quantity: number;
};

export type CartContextType = {
  cart: CartItem[];
  setCart?: React.Dispatch<React.SetStateAction<CartItem[]>>;
};
