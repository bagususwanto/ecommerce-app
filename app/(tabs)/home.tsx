import {
  Image,
  Keyboard,
  Pressable,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  Bike,
  Book,
  Heart,
  ShoppingBag,
  ShoppingCart,
  Tv,
} from "lucide-react-native";
import MyCarousel from "~/components/Carousel";
import { Text } from "~/components/ui/text";
import { ProductList } from "~/components/ProductCard";
import { useCart } from "~/context/CartContext";
import { ScrollView } from "react-native";
import { useNotif } from "~/context/NotifContext";
import { useEffect } from "react";
import { useScroll } from "~/context/ScrollContext";
import { TouchableOpacity } from "react-native";
import { SearchBox } from "~/components/header/ui/searchbox";
import { LocationSelect } from "~/components/header/ui/locationselect";
import { LinearGradient } from "expo-linear-gradient";

const categories = [
  { name: "Electronics", img: "https://picsum.photos/50?random=1" },
  { name: "Fashion", img: "https://picsum.photos/50?random=2" },
  { name: "Groceries", img: "https://picsum.photos/50?random=3" },
  { name: "Books", img: "https://picsum.photos/50?random=4" },
  { name: "Fitness", img: "https://picsum.photos/50?random=5" },
];

const products = [
  {
    productNo: "PRD001",
    productName: "Apple iPhone 15 Pro",
    imageUrl:
      "https://images.pexels.com/photos/5082572/pexels-photo-5082572.jpeg",
    minOrder: 1,
  },
  {
    productNo: "PRD002",
    productName: "Samsung Galaxy S23 Ultra",
    imageUrl:
      "https://images.pexels.com/photos/16048883/pexels-photo-16048883.jpeg",
    minOrder: 1,
  },
  {
    productNo: "PRD003",
    productName: "MacBook Pro 16-inch M3",
    imageUrl: "https://images.pexels.com/photos/18105/pexels-photo.jpg",
    minOrder: 1,
  },
  {
    productNo: "PRD004",
    productName: "Sony WH-1000XM5 Headphones",
    imageUrl:
      "https://images.pexels.com/photos/3394659/pexels-photo-3394659.jpeg",
    minOrder: 1,
  },
  {
    productNo: "PRD005",
    productName: "Bose SoundLink Bluetooth Speaker",
    imageUrl:
      "https://images.pexels.com/photos/3394659/pexels-photo-3394659.jpeg",
    minOrder: 1,
  },
  {
    productNo: "PRD006",
    productName: "Logitech MX Master 3S Mouse",
    imageUrl:
      "https://images.pexels.com/photos/3945654/pexels-photo-3945654.jpeg",
    minOrder: 1,
  },
  {
    productNo: "PRD007",
    productName: "Razer BlackWidow V4 Keyboard",
    imageUrl:
      "https://images.pexels.com/photos/1402076/pexels-photo-1402076.jpeg",
    minOrder: 1,
  },
  {
    productNo: "PRD008",
    productName: "LG UltraFine 5K Monitor",
    imageUrl:
      "https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg",
    minOrder: 1,
  },
  {
    productNo: "PRD009",
    productName: "Seagate 2TB External SSD",
    imageUrl:
      "https://images.pexels.com/photos/730647/pexels-photo-730647.jpeg",
    minOrder: 1,
  },
  {
    productNo: "PRD010",
    productName: "Anker Wireless Charger Pad",
    imageUrl:
      "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg",
    minOrder: 1,
  },
  {
    productNo: "PRD011",
    productName: "Apple AirPods Pro 2nd Gen",
    imageUrl:
      "https://images.pexels.com/photos/7188876/pexels-photo-7188876.jpeg",
    minOrder: 1,
  },
  {
    productNo: "PRD012",
    productName: "Samsung 65-inch QLED TV",
    imageUrl:
      "https://images.pexels.com/photos/1444416/pexels-photo-1444416.jpeg",
    minOrder: 1,
  },
  {
    productNo: "PRD013",
    productName: "Fitbit Charge 6 Fitness Tracker",
    imageUrl:
      "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg",
    minOrder: 1,
  },
  {
    productNo: "PRD014",
    productName: "Xiaomi 20000mAh Power Bank",
    imageUrl:
      "https://images.pexels.com/photos/3943724/pexels-photo-3943724.jpeg",
    minOrder: 1,
  },
  {
    productNo: "PRD015",
    productName: "Canon EOS R6 Mirrorless Camera",
    imageUrl:
      "https://images.pexels.com/photos/176634/pexels-photo-176634.jpeg",
    minOrder: 1,
  },
  {
    productNo: "PRD016",
    productName: "Amazon Echo Dot (5th Gen)",
    imageUrl:
      "https://images.pexels.com/photos/3394659/pexels-photo-3394659.jpeg",
    minOrder: 1,
  },
  {
    productNo: "PRD017",
    productName: "iRobot Roomba S9+ Vacuum",
    imageUrl:
      "https://images.pexels.com/photos/8580946/pexels-photo-8580946.jpeg",
    minOrder: 1,
  },
  {
    productNo: "PRD018",
    productName: "XGIMI Halo+ Portable Projector",
    imageUrl:
      "https://images.pexels.com/photos/7235111/pexels-photo-7235111.jpeg",
    minOrder: 1,
  },
  {
    productNo: "PRD019",
    productName: "UGREEN USB-C Hub 6-in-1",
    imageUrl:
      "https://images.pexels.com/photos/4666936/pexels-photo-4666936.jpeg",
    minOrder: 1,
  },
  {
    productNo: "PRD020",
    productName: "Sony DualSense PS5 Controller",
    imageUrl:
      "https://images.pexels.com/photos/3945654/pexels-photo-3945654.jpeg",
    minOrder: 1,
  },
];

export default function HomeScreen() {
  const { handleAddToCart, bottomSheetRef } = useCart();
  const { notifBottomSheetRef } = useNotif();
  const { handleScroll, setIsScrolled } = useScroll();

  useEffect(() => {
    setIsScrolled(false);
  }, []);

  return (
    <ScrollView
      onScroll={handleScroll}
      scrollEventThrottle={16}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss(); // Tutup keyboard jika terbuka
          bottomSheetRef.current?.close(); // Tutup BottomSheet
          notifBottomSheetRef.current?.close();
        }}>
        <LinearGradient
          colors={[
            "#04349c",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
          ]}
          className="flex-1">
          <View className="px-4 py-4 mt-8">
            <View className="flex-col w-[20%]">
              <LocationSelect />
            </View>
            <View className="flex-row items-center mt-4">
              <SearchBox
                placeholder="Search product..."
                className="flex-1 border border-gray-400  max-w-[95%]"
              />

              {/* Wishlist Button */}
              <TouchableOpacity className="ml-4 border-2 border-white rounded-full p-2 shadow-md">
                <Heart color="white" size={18} />
              </TouchableOpacity>
            </View>

            <MyCarousel />

            {/* Category */}
            <View className="flex-row mt-8 justify-around">
              {categories.map((item, index) => (
                <View key={index} className="items-center">
                  <Pressable>
                    <Image
                      source={{ uri: item.img }}
                      className="w-12 h-12 rounded-full shadow-md"
                      resizeMode="contain"
                    />
                  </Pressable>
                  <Text className="text-gray-700 mt-2 text-sm">
                    {item.name}
                  </Text>
                </View>
              ))}
            </View>

            <Text className="text-black  font-semibold text-xl mt-4">
              {/* Your Frequent Orders */}
              For You
            </Text>
            <View className="w-full">
              <ProductList products={products} onAddToCart={handleAddToCart} />
            </View>
          </View>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}
