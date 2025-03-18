import { TouchableOpacity, Dimensions, View, Image } from "react-native";
import { Heart, Plus } from "lucide-react-native";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Text } from "./ui/text";
import { Product } from "~/types/product";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 2 - 16;

type ProductCardProps = {
  productNo: string;
  productName: string;
  imageUrl: string;
  onAddToCart: () => void;
};

export const ProductCard = ({
  productNo,
  productName,
  imageUrl,
  onAddToCart,
}: ProductCardProps) => {
  const onWishlist = () => console.log("Add to wishlist");

  return (
    <Card
      className="rounded-lg p-4 shadow-md border border-gray-200"
      style={{ width: CARD_WIDTH, minHeight: 300 }}>
      <View className="flex items-center justify-center mb-4">
        <Image
          source={{ uri: imageUrl }}
          className="rounded-md w-full h-40"
          alt={productNo}
          resizeMode="cover"
        />
      </View>
      <View className="mb-4 flex-1">
        <Text className="font-bold text-black text-lg">{productName}</Text>
        <Text className="text-black text-md">{productNo}</Text>
      </View>
      <View className="flex-row justify-between items-center">
        <Button onPress={onAddToCart} size={"sm"}>
          <View className="flex-row items-center gap-2">
            <Plus color="white" size={18} />
            <Text>Cart</Text>
          </View>
        </Button>
        <TouchableOpacity onPress={onWishlist}>
          <Heart color="gray" size={24} />
        </TouchableOpacity>
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
            productNo={product.productNo}
            productName={product.productName}
            imageUrl={product.imageUrl}
            onAddToCart={() => onAddToCart(product)}
          />
        </View>
      ))}
    </View>
  );
};
