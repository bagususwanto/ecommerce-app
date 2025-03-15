import React, { createContext, useContext, useState } from "react";

interface FloatingProductState {
  image: string | null;
  isVisible: boolean;
  showProduct: (image: string) => void;
  hideProduct: () => void;
}

const FloatingProductContext = createContext<FloatingProductState | undefined>(undefined);

export const FloatingProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [image, setImage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const showProduct = (image: string) => {
    setImage(image);
    setIsVisible(true);
  };

  const hideProduct = () => {
    setIsVisible(false);
    setImage(null);
  };

  return (
    <FloatingProductContext.Provider value={{ image, isVisible, showProduct, hideProduct }}>
      {children}
    </FloatingProductContext.Provider>
  );
};

// Custom Hook untuk akses context
export const useFloatingProduct = () => {
  const context = useContext(FloatingProductContext);
  if (!context) {
    throw new Error("useFloatingProduct harus digunakan dalam FloatingProductProvider");
  }
  return context;
};
