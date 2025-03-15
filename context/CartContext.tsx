import { createContext, useContext, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { Product } from "~/types/product";

type CartContextType = {
  selectedProduct: Product | null;
  handleAddToCart: (product: Product) => void;
  bottomSheetRef: React.RefObject<BottomSheet>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleAddToCart = (product: Product) => {
    setSelectedProduct(product);
    bottomSheetRef.current?.expand();
  };

  return (
    <CartContext.Provider
      value={{ selectedProduct, handleAddToCart, bottomSheetRef }}>
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
