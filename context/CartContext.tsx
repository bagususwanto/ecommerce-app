import { createContext, useContext, useEffect, useRef, useState } from "react";
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
  isChange: boolean;
  setIsChange: React.Dispatch<React.SetStateAction<boolean>>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<Cart[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [isChange, setIsChange] = useState(false);
  const { setNotifProps } = useNotif();

  const { notifBottomSheetRef } = useNotif();

  // **Gunakan useEffect untuk update cartCount saat cartItems berubah**
  useEffect(() => {
    setCartCount(cartItems.length);
  }, [cartItems]);

  const handleAddToCart = (product: Product) => {
    setSelectedProduct(product);
    notifBottomSheetRef.current?.close();
    bottomSheetRef.current?.present();
    setNotifProps({
      title: "Complete your shopping",
      description: "Added to the shopping cart",
      buttonText: "Go to Cart",
      routeName: "/cart",
    })
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
        setIsChange,
        isChange,
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
