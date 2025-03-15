import { createContext, useContext, useState } from "react";

interface ScrollContextType {
  isScrolled: boolean;
  scrollDirection: "up" | "down" | null;
  handleScroll: (event: any) => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
    null
  );
  const [prevScrollY, setPrevScrollY] = useState(0);

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;

    // Tentukan arah scroll
    if (offsetY > prevScrollY) {
      setScrollDirection("down");
    } else if (offsetY < prevScrollY) {
      setScrollDirection("up");
    }

    setIsScrolled(offsetY > 50); // Tetap pakai batasan 50px untuk efek scroll
    setPrevScrollY(offsetY); // Simpan posisi scroll terakhir
  };

  return (
    <ScrollContext.Provider
      value={{ isScrolled, scrollDirection, handleScroll }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScroll() {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScroll must be used within a ScrollProvider");
  }
  return context;
}
