import { Dimensions, View, Image } from "react-native";
import { Heart, Plus } from "lucide-react-native";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Text } from "./ui/text";
import { Product } from "~/types/product";
import IconButton from "./IconButton";
import { useWishlist } from "~/context/WishlistContext";
import { useNotif } from "~/context/NotifContext";
import { useCart } from "~/context/CartContext";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 2 - 16;

type ProductCardProps = {
  productCard: Product;
  onAddToCart: () => void;
};

export const ProductCard = ({ productCard, onAddToCart }: ProductCardProps) => {
  const { wishlistItems, setWishlistItems } = useWishlist();
  const { setNotifProps, notifBottomSheetRef } = useNotif();
  const { setSelectedWishlist } = useWishlist();

  const isWishlist = wishlistItems.some(
    (item) => item.productNo === productCard.productNo
  );

  const onWishlist = () => {
    const updatedWishlistItems = isWishlist
      ? wishlistItems.filter((item) => item.productNo !== productCard.productNo)
      : [
          ...wishlistItems,
          {
            productNo: productCard.productNo,
            productName: productCard.productName,
            imageUrl: productCard.imageUrl,
            minOrder: productCard.minOrder,
          },
        ];

    setWishlistItems(updatedWishlistItems);

    if (!isWishlist) {
      setSelectedWishlist({
        productNo: productCard.productNo,
        productName: productCard.productName,
        imageUrl: productCard.imageUrl,
        minOrder: productCard.minOrder,
      });

      setNotifProps({
        title: "Product added to wishlist",
        description: "Product has been added to your wishlist",
        buttonText: "Go to wishlist",
        routeName: "/wishlist",
      });

      notifBottomSheetRef.current?.present();
    }
  };

  return (
    <Card
      className="rounded-lg p-4 shadow-md border border-gray-200"
      style={{ width: CARD_WIDTH, minHeight: 300 }}>
      <View className="flex items-center justify-center mb-4">
        <Image
          source={{ uri: productCard.imageUrl }}
          className="rounded-md w-full h-40"
          alt={productCard.productNo}
          resizeMode="cover"
        />
      </View>
      <View className="mb-4 flex-1">
        <Text className="font-bold text-black text-lg">
          {productCard.productName}
        </Text>
        <Text className="text-black font-normal text-md">
          {productCard.productNo}
        </Text>
      </View>
      <View className="flex-row justify-between items-center">
        <Button onPress={onAddToCart} size={"sm"}>
          <View className="flex-row items-center gap-2">
            <Plus color="white" size={18} />
            <Text className="font-bold">Cart</Text>
          </View>
        </Button>
        <IconButton
          icon={Heart}
          size={20}
          color={isWishlist ? "red" : "gray"}
          onPress={onWishlist}
          fill={isWishlist ? "red" : "transparent"}
        />
      </View>
    </Card>
  );
};

type ProductListProps = {
  products: Product[];
  onAddToCart: (product: Product) => void;
};

export const ProductList = ({ products, onAddToCart }: ProductListProps) => {
  return (
    <View className="flex-row flex-wrap items-center gap-1">
      {products.map((product) => (
        <View key={product.productNo} style={{ width: CARD_WIDTH }}>
          <ProductCard
            productCard={product}
            onAddToCart={() => onAddToCart(product)}
          />
        </View>
      ))}
    </View>
  );
};
