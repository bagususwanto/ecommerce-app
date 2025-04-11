import { createContext, useContext, useState } from "react";
import { Product } from "~/types/product";

type WishlistContextType = {
  wishlistItems: Product[];
  setWishlistItems: React.Dispatch<React.SetStateAction<Product[]>>;
  selectedWishlist: Product | null;
  setSelectedWishlist: React.Dispatch<React.SetStateAction<Product | null>>;
};

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [selectedWishlist, setSelectedWishlist] = useState<Product | null>(
    null
  );

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        setWishlistItems,
        selectedWishlist,
        setSelectedWishlist,
      }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
