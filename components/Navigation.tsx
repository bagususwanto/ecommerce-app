import { Tabs } from "expo-router";
import {
  ClipboardCheck,
  Heart,
  Home,
  ReceiptText,
  UserRound,
} from "lucide-react-native";
import { Header, HeaderSimple } from "./header/Header";

export function Navigation() {
  return (
    <Tabs
      screenOptions={{ headerShown: false, tabBarActiveTintColor: "#04349c" }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: true,
          header: () => <Header />,
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="approval"
        options={{
          title: "Approval",
          headerShown: true,
          header: () => <HeaderSimple />,
          tabBarIcon: ({ color }) => <ClipboardCheck size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="transaction"
        options={{
          title: "Transaction",
          headerShown: true,
          header: () => <HeaderSimple />,
          tabBarIcon: ({ color }) => <ReceiptText size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: "Wishlist",
          headerShown: true,
          header: () => <HeaderSimple />,
          tabBarIcon: ({ color }) => <Heart size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          headerShown: true,
          tabBarIcon: ({ color }) => <UserRound size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
