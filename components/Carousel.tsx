import * as React from "react";
import { Dimensions, Image, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { cn } from "~/lib/utils";

const media = [
  "https://dummyimage.com/800x400/808080/ffffff&text=Slide+1",
  "https://dummyimage.com/800x400/808080/ffffff&text=Slide+2",
  "https://dummyimage.com/800x400/808080/ffffff&text=Slide+3",
];
const width = Dimensions.get("window").width;

function MyCarousel() {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <View className={cn("mt-4")}>
      <Carousel
        ref={ref}
        width={width - 30}
        height={(width - 200) / 2}
        data={media}
        onProgressChange={progress}
        loop
        autoPlay
        autoPlayInterval={5000}
        renderItem={({ item }) => (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Image
              source={{ uri: item }}
              style={{ width: "100%", height: "100%", borderRadius: 10 }}
              resizeMode="cover"
            />
          </View>
        )}
      />

      <Pagination.Basic
        progress={progress}
        data={media}
        dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
        activeDotStyle={{ backgroundColor: "#04349c" }}
        containerStyle={{ gap: 5, marginTop: -26 }}
        onPress={onPressPagination}
      />
    </View>
  );
}

export default MyCarousel;
