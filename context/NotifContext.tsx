import { createContext, useContext, useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Product } from "~/types/product";

type RouteName = "/cart" | "/wishlist" | "/checkout";

type NotifContextType = {
  selectedProduct: Product | null;
  handleShowNotif: (product: Product) => void;
  notifBottomSheetRef: React.RefObject<BottomSheetModal>;
  notifProps: {
    title: string;
    description: string;
    buttonText: string;
    routeName: RouteName;
  };
  setNotifProps: React.Dispatch<
    React.SetStateAction<{
      title: string;
      description: string;
      buttonText: string;
      routeName: RouteName;
    }>
  >;
};

const NotifContext = createContext<NotifContextType | undefined>(undefined);

export function NotifProvider({ children }: { children: React.ReactNode }) {
  const notifBottomSheetRef = useRef<BottomSheetModal>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [notifProps, setNotifProps] = useState({
    title: "",
    description: "",
    buttonText: "",
    routeName: "" as RouteName,
  });

  const handleShowNotif = (product: Product) => {
    setSelectedProduct(product);
    notifBottomSheetRef.current?.present();
  };

  return (
    <NotifContext.Provider
      value={{
        selectedProduct,
        handleShowNotif,
        notifBottomSheetRef,
        notifProps,
        setNotifProps,
      }}>
      {children}
    </NotifContext.Provider>
  );
}

export function useNotif() {
  const context = useContext(NotifContext);
  if (!context) {
    throw new Error("useNotif must be used within a NotifProvider");
  }
  return context;
}
