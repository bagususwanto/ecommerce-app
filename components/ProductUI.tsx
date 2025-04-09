import { Image, View } from "react-native";
import { Text } from "./ui/text";
import { Product } from "~/types/product";
import { cn } from "~/lib/utils";

interface ProductUIProps {
  products: Product;
  imageClassName?: string;
}

export function ProductUI({ products, imageClassName }: ProductUIProps) {
  if (!products) {
    return <Text className="text-black text-lg">No product found</Text>;
  }

  return (
    <>
      <View className="flex flex-row gap-4">
        <Image
          source={{ uri: products.imageUrl }}
          className={cn("rounded-md w-40 h-40", imageClassName)}
          alt={products.productNo}
          resizeMode="cover"
        />
        <View className="flex flex-col w-60 mt-2">
          <Text className="font-bold text-black text-lg flex-wrap">
            {products.productName}
          </Text>
          <Text className="text-black font-light text-md flex-wrap">
            {products.productNo}
          </Text>
          <Text className="text-black font-normal text-sm">
            Min. Order: {products.minOrder} (PCS)
          </Text>
        </View>
      </View>
    </>
  );
}
