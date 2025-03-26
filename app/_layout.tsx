import "~/global.css";

import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform } from "react-native";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { PortalHost } from "@rn-primitives/portal";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { CartProvider } from "~/context/CartContext";
import { FloatingProductProvider } from "~/context/FloatingProductContext";
import { NotifProvider } from "~/context/NotifContext";
import { ScrollProvider } from "~/context/ScrollContext";
import { HeaderCart } from "~/components/header/Header";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
  const hasMounted = React.useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === "web") {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add("bg-background");
    }
    setAndroidNavigationBar(colorScheme);
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <NotifProvider>
          <CartProvider>
            <FloatingProductProvider>
              <ScrollProvider>
                {/* <StatusBar style={isDarkColorScheme ? "light" : "dark"} /> */}
                <StatusBar style={"light"} />
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen
                    name="login"
                    options={{
                      title: "Login",
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="cart"
                    options={{
                      title: "",
                      headerShown: true,
                      header: () => <HeaderCart />,
                    }}
                  />
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />
                </Stack>
                <PortalHost />
              </ScrollProvider>
            </FloatingProductProvider>
          </CartProvider>
        </NotifProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;
