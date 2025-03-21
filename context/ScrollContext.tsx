import { createContext, useContext, useState } from "react";
import { useSharedValue } from "react-native-reanimated";

interface ScrollContextType {
  scrollY: any;
  setIsScrolled: React.Dispatch<React.SetStateAction<boolean>>;
  isScrolled: boolean;
  scrollDirection: "up" | "down" | null;
  handleScroll: (event: any) => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const scrollY = useSharedValue(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
    null
  );

  const handleScroll = (event: any) => {
    const newScrollY = event.nativeEvent.contentOffset.y;

    // Update scroll direction
    setScrollDirection(newScrollY > scrollY.value ? "down" : "up");

    // Perbarui isScrolled hanya jika melewati threshold tertentu
    if (newScrollY > 50 && !isScrolled) {
      setIsScrolled(true);
    } else if (newScrollY <= 50 && isScrolled) {
      setIsScrolled(false);
    }

    scrollY.value = newScrollY;
  };

  return (
    <ScrollContext.Provider
      value={{
        scrollY,
        setIsScrolled,
        isScrolled,
        scrollDirection,
        handleScroll,
      }}>
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
