import { createContext, useContext, useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Product } from "~/types/product";
import { Cart } from "~/types/cart";
import { useNotif } from "./NotifContext";

type CartContextType = {
  selectedProduct: Product | null;
  handleAddToCart: (product: Product) => void;
  bottomSheetRef: React.RefObject<BottomSheetModal>;
  cartItems: Cart[];
  setCartItems: React.Dispatch<React.SetStateAction<Cart[]>>;
  cartCount: number;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<Cart[]>([]);
  const [cartCount, setCartCount] = useState(0);

  const { notifBottomSheetRef } = useNotif();

  const handleAddToCart = (product: Product) => {
    setSelectedProduct(product);
    notifBottomSheetRef.current?.close();
    bottomSheetRef.current?.present();
  };

  return (
    <CartContext.Provider
      value={{
        selectedProduct,
        handleAddToCart,
        bottomSheetRef,
        cartItems,
        setCartItems,
        cartCount,
        setCartCount,
      }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
