import { createContext, useContext, useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Cart } from "~/types/cart";

type CheckoutContextType = {
  handleShowNote: (cart: Cart) => void;
  noteBottomSheetRef: React.RefObject<BottomSheetModal>;
  note: string;
  setNote: React.Dispatch<React.SetStateAction<string>>;
  checkoutItems: Cart[];
  setCheckoutItems: React.Dispatch<React.SetStateAction<Cart[]>>;
};

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const noteBottomSheetRef = useRef<BottomSheetModal>(null);
  const [note, setNote] = useState("");
  const [checkoutItems, setCheckoutItems] = useState<Cart[]>([]);

  const handleShowNote = () => {
    noteBottomSheetRef.current?.present();
  };

  return (
    <CheckoutContext.Provider
      value={{
        note,
        setNote,
        checkoutItems,
        setCheckoutItems,
        handleShowNote,
        noteBottomSheetRef,
      }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
}
